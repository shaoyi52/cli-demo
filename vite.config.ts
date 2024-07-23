import { UserConfig, ConfigEnv, loadEnv, defineConfig } from 'vite';
import dayjs from 'dayjs';
import createPlugins from './vite/plugins';
import path from 'path';
const {getConf, getMockJson,init} = require('./scripts/webpack-init')
const config = require('./config')
const fs = require('fs');
const zlib = require('zlib');
const API_CACHE_DIR = path.join(__dirname, './api-cache')

//init();
export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  const {VITE_APP_ENV} =env;
  const confJson = VITE_APP_ENV === 'production' ? config.conf.build : config.conf.dev
  fs.writeFileSync(path.join(__dirname, './config/conf.json'),  JSON.stringify(confJson, null, '\t'))
  return {
    // 部署生产环境和开发环境下的URL。 
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
    base: env.VITE_APP_CONTEXT_PATH,
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, './src'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    // https://cn.vitejs.dev/config/#resolve-extensions
    plugins: createPlugins(env, command),
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT),
      open: true,
      hmr: true,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'http://localhost:3000', //'http://localhost:8080'
          changeOrigin: true,
          ws: true,
          rewrite: (path) => {
            //console.log(path.replace(new RegExp('^' + env.VITE_APP_BASE_API), env.VITE_APP_BASE_API));
            return path.replace(new RegExp('^' + env.VITE_APP_BASE_API), env.VITE_APP_BASE_API);
          },
          
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              //proxyReq.setHeader('X-Custom-Header', 'value');
              try{
                const {'mock-method': mockMethod, 'mock-key': mockKey} = req.headers
                console.log('proxyReq',mockMethod,mockKey)
                if (mockKey && mockMethod) {
                  req.mockKey = mockKey
                  req.mockMethod = mockMethod
                  const mockJson = getMockJson()
                  console.log('mockJson',mockJson)
                }
              }catch(err){
                console.log(err)
              }
            
            });

            proxy.on('proxyRes', (proxyRes, req, res,options) => {
              let responseData = Buffer.alloc(0)
              let resBody={};
              //console.log('proxyRes',proxyRes)
              let {"mock-key":mockKey,"mock-method":mockMethod}=req.headers
              let {"content-encoding":contentEncoding}=proxyRes.headers
              let {url,method,}=req
            /*   console.log("proxyRes",proxyRes)
              let {Content-Encoding}=proxyRes
              console.log("req",originalUrl,url,method) */
              console.log("req",url,method)

              
              let filePath=""   
              
              if(mockKey&&mockMethod){
                //console.log('RAW Response from the target', JSON.stringify(req, true, 2))
                //console.log('RAW Response from the target', req)

                filePath = path.join(API_CACHE_DIR, `${mockKey}.${mockMethod}.json`)
              }
              
              proxyRes.on('data', (dataChunk) => {
                responseData= Buffer.concat([responseData, dataChunk]);
              });
              //处理数据
              proxyRes.on('end', () => {
                //resBody=zlib['gunzipSync'](responseData);               
                if(filePath){
                 
                  try{
                    if(contentEncoding=="gzip"){
                      resBody=zlib['gunzipSync'](responseData);
                    }else{
                      resBody=responseData
                    }
                    const cacheObj = {
                      date: dayjs().format('YYYY-MM-DD hh:mm:ss'),
                      method,
                      path: req.path,
                      url,
                      //resHeader: res.headers,
                      //reqHeader: req.headers,
                      query:req._parsedUrl.query,
                      //reqBody: await jsonParse(req.reqBody),
                      resBody: (resBody).toString('utf-8')
                    } 
                    //console.log('query',req._parsedUrl.query)
                    fs.writeFileSync(filePath, (JSON.stringify(cacheObj)).toString(), (err) => { err && console.log('writeFile', err)})
                  }catch(err){
                    console.log("err",err)
                  }
                  
                }
                //fs.writeFile(filePath, JSON.stringify((zlib['gunzipSync'](responseData)).toString(),'', '\t'), (err) => { err && console.log('writeFile', err)})

              })
             
            })
          },


          /**
           * URL(url,base)
           * 是一个表示绝对或相对 URL 的 DOMString。
           * 如果ur1 是相对 URL，则会将 base 用作基准 URL
           * 如果 ur 是绝对 URL，则无论参数base是否存在，都将被忽略.
           **/
          bypass(req, res, options) {
            const proxyUrl = new URL(options.rewrite(req.url) || '', options.target as string)?.href || '';
            // req.headers['x-req-proxyUrl'] = proxyUrl; // 设置无效
            res.setHeader('x-res-proxyUrl', proxyUrl); // 有效
          }
        },
        '/v1beta': {
          target: 'https://us-west-2.data.tidbcloud.com', //'http://localhost:8080'
          changeOrigin: true,
          ws: true,
          rewrite: (path) => {
            console.log(path.replace(new RegExp('^' + env.VITE_APP_BASE_API), env.VITE_APP_BASE_API));
            return path.replace(new RegExp('^/v1beta'), '/api/v1beta');
          },
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              proxyReq.setHeader('X-Custom-Header', 'value');
              console.log('proxyReq')
            });

            proxy.on('proxyRes', (proxyReq, req, res) => {
              console.log('proxyRes',res)
            })
          },

          /**
           * URL(url,base)
           * 是一个表示绝对或相对 URL 的 DOMString。
           * 如果ur1 是相对 URL，则会将 base 用作基准 URL
           * 如果 ur 是绝对 URL，则无论参数base是否存在，都将被忽略.
           **/
          bypass(req, res, options) {
            const proxyUrl = new URL(options.rewrite(req.url) || '', options.target as string)?.href || '';
            // req.headers['x-req-proxyUrl'] = proxyUrl; // 设置无效
            res.setHeader('x-res-proxyUrl', proxyUrl); // 有效
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true
        }
      },
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    },
    // 预编译
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'pinia',
        'axios',
        '@vueuse/core',
        'path-to-regexp',
        'echarts',
        '@wangeditor/editor',
        '@wangeditor/editor-for-vue',
        'vue-i18n',
        '@vueup/vue-quill',
        '@iconify/iconify',
        'element-plus/es/components/form/style/css',
        'element-plus/es/components/form-item/style/css',
        'element-plus/es/components/button/style/css',
        'element-plus/es/components/input/style/css',
        'element-plus/es/components/input-number/style/css',
        'element-plus/es/components/switch/style/css',
        'element-plus/es/components/upload/style/css',
        'element-plus/es/components/menu/style/css',
        'element-plus/es/components/col/style/css',
        'element-plus/es/components/icon/style/css',
        'element-plus/es/components/row/style/css',
        'element-plus/es/components/tag/style/css',
        'element-plus/es/components/dialog/style/css',
        'element-plus/es/components/loading/style/css',
        'element-plus/es/components/radio/style/css',
        'element-plus/es/components/radio-group/style/css',
        'element-plus/es/components/popover/style/css',
        'element-plus/es/components/scrollbar/style/css',
        'element-plus/es/components/tooltip/style/css',
        'element-plus/es/components/dropdown/style/css',
        'element-plus/es/components/dropdown-menu/style/css',
        'element-plus/es/components/dropdown-item/style/css',
        'element-plus/es/components/sub-menu/style/css',
        'element-plus/es/components/menu-item/style/css',
        'element-plus/es/components/divider/style/css',
        'element-plus/es/components/card/style/css',
        'element-plus/es/components/link/style/css',
        'element-plus/es/components/breadcrumb/style/css',
        'element-plus/es/components/breadcrumb-item/style/css',
        'element-plus/es/components/table/style/css',
        'element-plus/es/components/tree-select/style/css',
        'element-plus/es/components/table-column/style/css',
        'element-plus/es/components/select/style/css',
        'element-plus/es/components/option/style/css',
        'element-plus/es/components/pagination/style/css',
        'element-plus/es/components/tree/style/css',
        'element-plus/es/components/alert/style/css',
        'element-plus/es/components/checkbox/style/css',
        'element-plus/es/components/date-picker/style/css',
        'element-plus/es/components/transfer/style/css',
        'element-plus/es/components/tabs/style/css',
        'element-plus/es/components/image/style/css',
        'element-plus/es/components/tab-pane/style/css',

        '@/../lib/vform/designer.umd.js'
      ]
    },
    build: {
      /* 其他build生产打包配置省略 */
      //...
      commonjsOptions: {
        include: /node_modules|lib/ //这里记得把lib目录加进来，否则生产打包会报错！！
      }
    }
  };
});
