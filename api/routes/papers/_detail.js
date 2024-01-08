var express = require("express");
var router = express.Router();
const { oauth, tool, db, log } = require("../../common/tool/_require");

/*
 *   page 页数
 *   limit 一页几条
 * */
router.use("", async function (req, res, next) {
    let id = tool.getParams(req, "id",true);  
   console.log("id",id)
    if (!id) {
        res.send(tool.toJson(null, "试卷id不能为空！", 1002));
        return;
    }
    let questionslist=[];
    let questions_detail_list=[];
    try {
      const paper_type_list= await db.query(`select * from test_paper_type where config_id="${id}"`);
      
      if(paper_type_list&&paper_type_list.length>0){
        console.log("paper_type_list",paper_type_list)
        const typeIdArr=  paper_type_list.map(type=> `"${type.id}"`)
        try {
          const paper_info_list= await db.query(`select * from test_paper_info where config_id= "${id}" and type_id IN (${typeIdArr.join(',')})`);
          let infoObjArr={}
          let ids=[];//存需查询的题
          paper_info_list.forEach(info=>{
            ids.push(info.question_id);
            if(infoObjArr[info.type_id]){
              infoObjArr[info.type_id].push(info.question_id)
            }else{
              infoObjArr[info.type_id]=[info.question_id]
            }        
          })

          questionslist=paper_type_list.map(type=>{
            if(infoObjArr[type.id]){
              type["question_ids"]=infoObjArr[type.id]
            }
            return type
          })
          ids=ids.map(id=>`"${id}"`)
          questions_detail_list= await db.query(`select * from questions where id IN (${ids.join(',')})`);
        
        } catch (err) {
          res.send(tool.toJson(null, "查询试题信息出错", 1002));

        }
      }
      
    } catch (err) {
      res.send(tool.toJson(null, "查询试卷大题出错", 1002));
      return;
    }
    let questions_detail={}
    questions_detail_list.forEach(detail=>{      
      questions_detail[detail.id]=detail
    })
;    res.send(tool.toJson({questions:questionslist,questions_detail:questions_detail}, "成功！", 1000));

  
  });
  module.exports = router;