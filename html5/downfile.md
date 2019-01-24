# 下载文件
```js

			// this.$post(this.api.identify.applyOnlineExport, reqData, config)
			// .then((res) => {
			// 	console.log(res)
			// 	let fileName =  res.headers["content-disposition"].split(";")[1].split("filename=")[1]
			// 	console.log(fileName);

			// 		 let URLString= `${res.config.url}?${res.config.data}`
			// 		 console.log(URLString);

					// const elink = document.createElement('a')
					// elink.style.display = 'none'
					// elink.href = URL.createObjectURL(URLString)
					// console.log(elink.href);
					// document.body.appendChild(elink)
					// elink.click()
					// URL.revokeObjectURL(elink.href) // 释放URL 对象
					// document.body.removeChild(elink)


				//  获取的respone hearder ，中文名字乱码。。。。。
				//  const blob = new Blob([res.data])
				//  if ('download' in document.createElement('a')) { // 非IE下载
				// 	const elink = document.createElement('a')
				// 	elink.download = fileName
				// 	elink.style.display = 'none'
				// 	elink.href = URL.createObjectURL(blob)
				// 	document.body.appendChild(elink)
				// 	elink.click()
				// 	URL.revokeObjectURL(elink.href) // 释放URL 对象
				// 	document.body.removeChild(elink)
				// } else {
				// 		// IE10+下载
				// 	navigator.msSaveBlob(blob, fileName)
				// }
            // }).catch(e => {
            //     this.$message({ message: e.data.msg, type: 'error' })
            // })
```
