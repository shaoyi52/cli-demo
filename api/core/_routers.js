const index = require("../routes/_index.js");
const userList = require("../routes/user/_list.js");
let routes=[];


routes.push({path:'',app:index})
routes.push({path:'/user/list',app:userList})


function routers(app) {
  routes.forEach(route=>{
    app.all("/api"+route.path, route.app); //切记不要用app.use
  })
}


module.exports = routers;
