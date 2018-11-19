# axios 封装

[vue axios请求超时的正确处理方法](https://www.jb51.net/article/137589.htm)
```js
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {

// Tip: 1
// 请求开始的时候可以结合 vuex 开启全屏的 loading 动画

// Tip: 2 
// 带上 token , 可以结合 vuex 或者重 localStorage
// if (store.getters.token) {
//     config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
// } else {
//     // 重定向到登录页面    
// }

// Tip: 3
// 根据请求方法，序列化传来的参数，根据后端需求是否序列化
// if (config.method.toLocaleLowerCase() === 'post' 
//   || config.method.toLocaleLowerCase() === 'put' 
//   || config.method.toLocaleLowerCase() === 'delete') {

//   config.data = qs.stringify(config.data)
// }
      


  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {



  //  1.判断请求超时
  // if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
  //   console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
  //   // return service.request(originalRequest);//例如再重复请求一次
  // }

  //  2.需要重定向到错误页面
  // const errorInfo = error.response
  // console.log(errorInfo)
  // if (errorInfo) {
  //   // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
  //   const errorStatus = errorInfo.status; // 404 403 500 ... 等
  //   router.push({
  //     path: `/error/${errorStatus}`
  //   })
  // }

 
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data


 


    // 根据返回的code值来做不同的处理（和后端约定）
			// switch (data.code) {
			// 	case '':
			// 	break;
			// 	default:
			// }
			// 若不是正确的返回code，且已经登录，就抛出错误
			// const err = new Error(data.description)

			// err.data = data
			// err.response = response

			// throw err

 


  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    // const res = response.data
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('FedLogOut').then(() => {
    //         location.reload()// 为了重新实例化vue-router对象 避免bug
    //       })
    //     })
    //   }
    //   return Promise.reject('error')
    // } else {
    //   return response.data
    // }
  },error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

```


基本的使用
```js

 
import request from '@/utils/request'

export default {

 
  checkExsis(data) {
    return request({
      url: '/login/checkExsis',
      method: 'get',
      params: { iphone: data }
    })
  },
 
 
  getInfo(token) {
    return request({
      url: '/login/getInfo',
      method: 'get',
      params: { token }
    })
  }
  login(username, password) {
    return request({
      url: '/user/login',
      method: 'post',
      data: {
        username,
        password
      }
    })
  },

}


```

封装 主要看封装后自己使用是否喜欢这样使用啊。
[Vue二次封装axios为插件使用](https://juejin.im/post/5ae432aaf265da0b9c1063c8)


test --  请求超时要如何处理
[axios 请求超时处理](https://blog.csdn.net/zgpeterliu/article/details/79636333)
