const { fs, path, } = require("./_require");
function isExists(path) {
    if (fs.existsSync(path)) {
      return true;
    }
    return;
  }
  
  function isDir(path) {
    if (fs.existsSync(path) && fs.statSync(path).isDirectory()) {
      //先判断存在不存在  再判断文件类型，判断是不是文件夹
      return true;
    }
    return false;
  }


  /* 
    demo:
    const basePathG = __dirname;
    let arrG = fs.readdirSync(path.join(__dirname, "./routes"));
    let pathArrData=[] 
    listFilePath(pathArrData, arrG, basePathStr="/routes", basePathG)
*/

  /**
   * 
   * @param {*存遍历文件路径} pathArrData 
   * @param {*需遍历文件夹及名列} pathArr 
   * @param {*路径字符串} basePathStr 
   * @param {*基楚路径} basePath   * 
   * 
   */
  function listFilePath(pathArrData, pathArr, basePathStr="", basePath) {
    pathArr = pathArr ? pathArr : arrG;
    basePathStr = basePathStr ? basePathStr : basePathStrG;
    basePath = basePath ? basePath : basePathG;
  
    let i,
      length = pathArr.length;
    for (i = 0; i < length; i++) {
      let pathStr = path.join(basePath, `${basePathStr}/${pathArr[i]}`);
      if (!isExists(pathStr)) {
        //检查是否有该文件或者目录  没有就继续下一个循环
        continue;
      }
      if (isDir(pathStr)) {
        //检查是不是文件夹
        let arr = fs.readdirSync(pathStr);
        
        listFilePath(pathArrData, arr, `${basePathStr}/${pathArr[i]}`, basePath);
      } else {
        pathArrData.push(pathStr)
        // if(basePathStr == "/images") {
        //     app.use(str, require(pathStr));
        // } else {
        //     app.all(str, require(pathStr));   //切记不要用app.use
        // }
        
      }
    }
  }

  module.exports = {
    isExists,isDir,listFilePath
  };