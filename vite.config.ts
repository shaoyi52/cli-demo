import { UserConfig, ConfigEnv, loadEnv, defineConfig } from 'vite';

import createPlugins from './vite/plugins';

import path from 'path';
export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
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
    plugins: createPlugins(env, command === 'build'),
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
            console.log(path.replace(new RegExp('^' + env.VITE_APP_BASE_API), env.VITE_APP_BASE_API));
            return path.replace(new RegExp('^' + env.VITE_APP_BASE_API), env.VITE_APP_BASE_API);
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
