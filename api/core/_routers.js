const index = require("../routes/_index.js");
const userList = require("../routes/user/_list.js");

const tagList = require("../routes/tags/_list.js");
const tagAdd = require("../routes/tags/_add.js");
const tagDel = require("../routes/tags/_del.js");

const questionList = require("../routes/questions/_list.js");
const questionAdd = require("../routes/questions/_add.js");
const questionDel = require("../routes/questions/_del.js");
let routes=[];


routes.push({path:'',app:index})
routes.push({path:'/user/list',app:userList})

routes.push({path:'/tag/list',app:tagList})
routes.push({path:'/tag/add',app:tagAdd})
routes.push({path:'/tag/del',app:tagDel})

routes.push({path:'/question/list',app:questionList})
routes.push({path:'/question/add',app:questionAdd})
routes.push({path:'/question/del',app:questionDel})


function routers(app) {
  routes.forEach(route=>{
    app.all("/api"+route.path, route.app); //切记不要用app.use
  })
}


module.exports = routers;
