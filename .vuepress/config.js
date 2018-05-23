let  fs = require('fs');
let path = require('path');
let  join = require('path').join;
function findSync(startPath) {
    let result=[];
    function finder(path) {
        let files=fs.readdirSync(path);
        files = files.filter( (value,index,arg) => {
          return  value.search(/^_/);  //过滤
        })
        files.forEach((val,index) => {
            result.push(`${path}/${val}`)
            // let stats=fs.statSync(fPath);
            // if(stats.isDirectory()) finder(fPath);
            // if(stats.isFile()) result.push(fPath);
        });
    }
    finder(startPath)
    return result;
}
 

module.exports = {
  title: 'Hello VuePress CAICAI',
  description: 'Just playing around',
  // base:'/blog_vuepress/',
  themeConfig: {
    nav: [
      {
        text: 'Home',
        link: '/',
        items: [{
            text: 'gulp',
            link: '/gulp/bbb',
            items: [{
                text: 'Chinese',
                link: '/gulp/build-bushu',
              },
              {
                text: 'Japanese',
                link: '/gulp/build-gulp'
              }
            ]
          },
          // {
          //   text: 'Japanese',
          //   link: '/language/japanese',
          //   items: [{
          //       text: 'Chinese',
          //       link: '/language/chinese',
          //     },
          //     {
          //       text: 'Japanese',
          //       link: '/language/japanese'
          //     }
          //   ]
          // }
        ]
      },
      // {
      //   text: 'Guide',
      //   link: '/guide/'
      // },
      // {
      //   text: 'External',
      //   link: 'https://google.com'
      // },
    ],
    sidebar: [
      // '/',
      // '/caicai',
      {
        title: 'VUE',
        collapsable: true,
        children: findSync('./vue')
        // children:[ 'VUE\aa.md', 'VUE\animatiom.md' ]
      },
      {
        title: 'gulp',
        collapsable: true,
        children: findSync('./gulp')
        // children:[ 'VUE\aa.md', 'VUE\animatiom.md' ]
      },
      // {
      //   '/b/':[
      //     "",
      //     'bbb','build-bushu','build-gulp'
      //   ]
      // },
      // {
      //   title: 'Group 2',
      //   collapsable: false,
      //   children: [ 'bbb','build-bushu']
      // }
    ]
  },


}
// module.exports = {
//   dest: 'vuepress',
//   locales: {
//     '/': {
//       lang: 'zh-CN',
//       title: 'VuePress',
//       description: 'Vue 驱动的静态站点生成工具'
//     }
//   },
//   head: [
//     ['link', { rel: 'icon', href: `/logo.png` }],
//     ['link', { rel: 'manifest', href: '/manifest.json' }],
//     ['meta', { name: 'theme-color', content: '#3eaf7c' }],
//     ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
//     ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
//     ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
//     ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
//     ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
//     ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
//   ],
//   serviceWorker: true,
//   theme: 'vue',
//   themeConfig: {
//     repo: 'docschina/vuepress',
//     editLinks: true,
//     docsDir: 'docs',
//     locales: {
//       '/': {
//         label: '简体中文',
//         selectText: '选择语言',
//         editLinkText: '在 GitHub 上编辑此页',
//         nav: [
//           {
//             text: '指南',
//             link: '/guide/',
//           },
//           {
//             text: '配置参考',
//             link: '/config/'
//           },
//           {
//             text: '默认主题配置',
//             link: '/default-theme-config/'
//           }
//         ],
//         sidebar: {
//           '/guide/': genSidebarConfig('指南')
//         }
//       }
//     }
//   }
// }

// function genSidebarConfig (title) {
//   return [
//     {
//       title,
//       collapsable: false,
//       children: [
//         '',
//         'getting-started',
//         'basic-config',
//         'assets',
//         'markdown',
//         'using-vue',
//         'custom-themes',
//         'i18n',
//         'deploy'
//       ]
//     }
//   ]
// }