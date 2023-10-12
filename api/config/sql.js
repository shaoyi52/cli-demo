const sqlConfig={
  host:"gateway01.us-west-2.prod.aws.tidbcloud.com", //"127.0.0.1",
  port:"4000", //"3306",
  user:"3W42KdhoYPrKuKU.root", //"root",
  password:"pam82hTnj3ZBzk3oP", //"111111",
  database:"test", //"test",
  connectionLimit: 10,
  multipleStatements: true, //是否允许执行多条sql语句；
  // insecureAuth:true, //加入此项可解决此错误! //使用旧（不安全）的连接方式去连接MySQL 远程连接
  //debug:true,//是否把连接情况打印到文件里
  ssl: {minVersion: 'TLSv1.2', rejectUnauthorized: true}
 }

module.exports = {  
  host: 'gateway01.us-west-2.prod.aws.tidbcloud.com',
  port: 4000,
  user: '3W42KdhoYPrKuKU.root',
  password: '8MRayOmKby694KEM',
  database: 'test',
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  }
};


