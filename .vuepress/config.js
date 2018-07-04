let fs = require('fs');
let path = require('path');
let join = require('path').join;


// 生成类似
//   title: 'Group 1',
//   collapsable: false,
//   children: [
//     '/gulp/bbb.md',
//     '/gulp/build-bushu.md',
//     '/gulp/build-gulp.md',
//   ]
// },

// gensildbarCf('gulp',"gulp文档");
function gensildbarCf(dirName, title, collapsable = true) {
  //  获得路径下文件名 array
  let genFilesByDir = function (startPath) {
    let files = fs.readdirSync(startPath);
    let reg = /(^_|[^(md)]$)/; // _开头 和不是 md 结尾的
    return files.reduce((preitem, item) => {
      if (!reg.test(item)) {

        preitem.push(`/${startPath}/${item}`);
      }
      return preitem;
    }, [])
  }

  return {
    title,
    collapsable,
    children: genFilesByDir(dirName)
  }
}

module.exports = {
  title: 'CaiCai9426',
  description: '菲菲Blog,陆续更新中',
  // base:'/blog_vuepress/',
  searchMaxSuggestions: 6,
  head: [
        ['link', { rel: 'icon', href: `/logo.png` }],
        // ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
      ],
  themeConfig: {
    nav: [
      // {
      //   text: 'Home',
      //   link: '/',
      //   items: [
      //     {
      //       text: 'vue',
      //       link: '/gulp/',
      //     },
      //     // {
      //     //   text: 'Vue',
      //     //   items: [{
      //     //       text: 'Chinese',
      //     //       link: '/source/gulp/build-bushu',
      //     //     },
      //     //   ]
      //     // }
      //   ]
      // },
      {
        text: 'blog',
        link: '/deploy/jenkins_cicl.html#jenkins'
      },
      {
        text: '项目',
        link: '/project/'
      },
      // {
      //   text: '关于我',
      //   link: '/feifei/'
      // }
    ],
    sidebar: [
      gensildbarCf('vue', 'vue文档'),
      gensildbarCf('deploy', '部署'),
      gensildbarCf('js', 'JS文档'),
      gensildbarCf('gulp', 'gulp文档'),
      gensildbarCf('gitnote', 'git相关文档'),
      gensildbarCf('webpack', 'Webpack'),
      // gensildbarCf('weinxin', '微信'),
      gensildbarCf('css', 'CSS'),
      // gensildbarCf('guide', 'guide文档'),
    ]
  }
}
