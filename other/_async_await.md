# async await 

## async await 多亲求同时进行
使用Promise.all()让多个await操作并行
```js

const showColumnInfo = async (id) => {
  console.time('showColumnInfo')
  const [qianduanzhidian, FrontendMagazine] = await Promise.all([
    getZhihuColumn('qianduanzhidian'),
    getZhihuColumn('FrontendMagazine')
  ])
```
`````