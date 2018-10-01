
#!/usr/bin/env node 

const program = require('commander')


// 定义使用方法
program
  .usage('<command>')


program
    .version('1.0.0')
    .description('xserver中间件应用模板工程的cli')

program.parse(process.argv);
 
if (!program.args.length) {
  program.help()
}

