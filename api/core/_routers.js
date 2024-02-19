const index = require('../routes/_index.js');
const userList = require('../routes/user/_list.js');

const tagList = require('../routes/tags/_list.js');
const tagAdd = require('../routes/tags/_add.js');
const tagDel = require('../routes/tags/_del.js');

const questionList = require('../routes/questions/_list.js');
const questionAdd = require('../routes/questions/_add.js');
const questionDel = require('../routes/questions/_del.js');

const dictList = require('../routes/dict/_list.js');
const dictAdd = require('../routes/dict/_add.js');
const dictDel = require('../routes/dict/_del.js');
const dictGet = require('../routes/dict/_get.js');

const dictInfoList = require('../routes/dictInfo/_list.js');
const dictInfoAdd = require('../routes/dictInfo/_add.js');
const dictInfoDel = require('../routes/dictInfo/_del.js');
const dictInfoGet = require('../routes/dictInfo/_get.js');

const viewList = require('../routes/view/_list.js');
const viewAdd = require('../routes/view/_add.js');
const viewDel = require('../routes/view/_del.js');
const viewGet = require('../routes/view/_get.js');

const menuList = require('../routes/menu/_list.js');
const menuAdd = require('../routes/menu/_add.js');
const menuDel = require('../routes/menu/_del.js');
const menuGetRouters = require('../routes/menu/_getRouters.js');

let routes = [];

routes.push({ path: '', app: index });
routes.push({ path: '/user/list', app: userList });

routes.push({ path: '/tag/list', app: tagList });
routes.push({ path: '/tag/add', app: tagAdd });
routes.push({ path: '/tag/del', app: tagDel });

routes.push({ path: '/question/list', app: questionList });
routes.push({ path: '/question/add', app: questionAdd });
routes.push({ path: '/question/del', app: questionDel });

routes.push({ path: '/dict/list', app: dictList });
routes.push({ path: '/dict/add', app: dictAdd });
routes.push({ path: '/dict/del', app: dictDel });
routes.push({ path: '/dict/type', app: dictGet, type: 'GET', params: '/:id' });

routes.push({ path: '/dict/data/list', app: dictInfoList });
routes.push({ path: '/dict/data/add', app: dictInfoAdd });
routes.push({ path: '/dict/data/del', app: dictInfoDel });
routes.push({ path: '/dict/data/type', app: dictInfoGet, type: 'GET', params: '/:id' });

routes.push({ path: '/view/list', app: viewList });
routes.push({ path: '/view/add', app: viewAdd });
routes.push({ path: '/view/del', app: viewDel });
routes.push({ path: '/view/get', app: viewGet, type: 'GET', params: '/:urlname/list' });

routes.push({ path: '/menu/list', app: menuList });
routes.push({ path: '/menu/add', app: menuAdd });
routes.push({ path: '/menu/del', app: menuDel });
routes.push({ path: '/menu/getRouters', app: menuGetRouters });

function routers(app) {
  routes.forEach((route) => {
    if (route.params) {
      app.get('/api' + route.path + route.params, route.app); //切记不要用app.use
    } else {
      app.all('/api' + route.path, route.app); //切记不要用app.use
    }
  });
}

module.exports = routers;
