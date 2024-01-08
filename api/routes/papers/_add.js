var express = require("express");
var router = express.Router();
const { oauth, tool, db, log } = require("../../common/tool/_require");
const { buildUUID,buildShortUUID } = require("../../common/tool/_uuid");

/*
 *   page 页数
 *   limit 一页几条
 * */
router.use("", async function (req, res, next) {
    let config = tool.getParams(req, "config",true);
    const {title}=config
    
    if (!config.title) {
        res.send(tool.toJson(null, "试卷名不能为空", 1002));
        return;
      }
      
    /*   let insertSqlArr=  [options,type,answer,analysis,qtype,question];
      insertSqlArr.forEach((value, index) => {
        insertSqlArr[index] = `'${
          value ? (value + '').replace(/'/g, `"`) : value
        }'`;
      }); */
      try {
        const paper_id=buildUUID();
        let sql = `INSERT INTO test_paper_config(id,title) VALUES ("${paper_id}","${title}")`;   
        const sqlRes=await db.query(sql);
        
          if(sqlRes){
            try {
              const bigItems=config.bigItems;
              const paperTypeArr=[];
              const paperTypeIds=[];
              bigItems.forEach(item=>{
                const paper_type_id=buildUUID();
                const { type, title, desInfo}=item
                paperTypeIds.push(paper_type_id)
                paperTypeArr.push(`("${paper_type_id}","${title}","${type}","${desInfo}","${paper_id}")`)
              })              
              let paperTypeSql=`INSERT INTO test_paper_type(id,title,type,des_info,config_id) VALUES ${paperTypeArr.join(',')}`;
              const paperTypeRes=await db.query(paperTypeSql);

              if(paperTypeRes){
                try {                  
                  const bigItems=config.bigItems
                  let sqlArr=[];
                  bigItems.forEach((item,index)=>{
                    const {tkList}=item;
                    const  paperTypeId=paperTypeIds[index]
                    tkList.forEach(question => {
                      const paper_info_id=buildUUID();
                      sqlArr.push(`("${paper_info_id}","${paper_id}","${paperTypeId}","${question.id}")`) 
                    });
                  })
                  
                  let sqlData=sqlArr.join(",")  
                  let paperInfoSql=`INSERT INTO test_paper_info(id,config_id,type_id,question_id) VALUES ${sqlData}`;
                  await db.query(paperInfoSql);

                }catch (err) {
                  res.send(tool.toJson(null, `试题保存失败，失败原因：${err}`, 1002));
                }
              }
            }catch (err) {
              res.send(tool.toJson(null, `大题保存失败，失败原因：${err}`, 1002));
            }
          }
      } catch (err) {
        res.send(tool.toJson(null, `题目添加失败，失败原因：${err}`, 1002));
        return;
      }
  
    
    res.send(tool.toJson("试卷添加成功", null, 1000));
  });
  
  module.exports = router;