const fs = require("fs");
const path = require("path");

const syncWalkDir=(dir,fn)=> {
  let files = fs.readdirSync(dir);
  let mockFiles=[];

  files.forEach((file) => {      
      let filePath = path.join(dir, file);
      let isDirectory = fs.statSync(filePath).isDirectory();
      if (isDirectory) {
          
       // let files= syncWalkDir(filePath,fn);
       // 递归调用自身处理子目录
        mockFiles=mockFiles.concat(syncWalkDir(filePath,fn));
      } else {
          // 处理文件逻辑
          console.log(filePath);
          if(fn(filePath)){
            mockFiles.push( filePath);
          }
      }
  });

  return mockFiles;
};
exports.syncWalkDir= syncWalkDir;
// 使用示例
/* try {
  syncWalkDir('./myDirectory');
} catch (err) {
  console.error('发生错误:', err);
} */