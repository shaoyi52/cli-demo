const config = require('../../config/config_default');

export default (path: any, command) => {
  const confJson = command === 'build' ? config.conf.build : config.conf.dev
  fs.writeFileSync(path.join(__dirname, './conf.json'),  JSON.stringify(confJson, null, '\t')
};
