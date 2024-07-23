const _require("lodash")
let config = _.cloneDeep(require("./config_default"))
try {
  const envConfig = require('./config')
  config = _.merge(config,envConfig);
} catch(e){
  //
}

module.exports =config 