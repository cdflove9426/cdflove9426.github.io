# Mock 的使用
npm i mockjs
[DOC -http://mockjs.com/](http://mockjs.com)
[方法的使用 Mock.mock()](https://github.com/nuysoft/Mock/wiki/Mock.mock())

```js
import Mock from 'mockjs'
import loginAPI from './login'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/user\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)


export default Mock



// login.js
const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default {
    const List = []
    const count = 100

    for (let i = 0; i < count; i++) {
      List.push(Mock.mock({
        id: '@increment',
        timestamp: +Mock.Random.date('T'),
        author: '@first',
        reviewer: '@first',
        title: '@title(5, 10)',
        forecast: '@float(0, 100, 2, 2)',
        importance: '@integer(1, 3)',
        'type|1': ['CN', 'US', 'JP', 'EU'],
        'status|1': ['published', 'draft', 'deleted'],
        display_time: '@datetime',
        pageviews: '@integer(300, 5000)'
      }))
    }
  loginByUsername: config => {  // config  请求参数
    const { username } = JSON.parse(config.body)
    console.log(userMap[username]);
    return userMap[username]
  },
  logout: () => 'success',
  getList:() => List,
}

```

