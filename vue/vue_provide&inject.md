# vue - provide&inject

1.provide就相当于加强版父组件prop

2.inject就相当于加强版子组件的props 

因为以上两者可以在父组件与子组件、孙子组件、曾孙子...组件数据交互，也就是说不仅限于prop的父子组件数据交互，只要在上一层级的声明的provide，那么下一层级无论多深都能够通过inject来访问到provide的数据



这里可以通过inject直接访问其两个层级上的数据，其用法与props完全相同，同样可以参数校验等


## 父组件

```html
<template>
	<div class="test">
		<son prop="data"></son>
	</div>
</template>
 
<script>
export default {
	name: 'Test',
	provide: {
		name: 'Garrett'
	}
}
 
```

孙子组件，注意这里是孙子组件，父级 -> 子组件 -> 孙子组件三个层级关系

```html
<template>
	<div>
		{{name}}
	</div>
</template>
 
<script>
export default {
	name: 'Grandson',
	inject: [name]
}
</script>
```
这里可以通过inject直接访问其两个层级上的数据，其用法与props完全相同，同样可以参数校验等

## 缺点
这么做也是有明显的缺点的，在任意层级都能访问导致数据追踪比较困难，不知道是哪一个层级声明了这个或者不知道哪一层级或若干个层级使用了，因此这个属性通常并不建议使用能用vuex的使用vuex，不能用的多传参几层，但是在做组件库开发时，不对vuex进行依赖，且不知道用户使用环境的情况下可以很好的使用
