# 使用 D3 绘制 svg 图

# 事件监听

on("eventName",function)；该函数是添加一个监听事件，它的第一个参数是事件类型，第二个参数是响应事件的内容 d3.select(this), 选择当前元素
常见的事件类型

- click：鼠标单击某元素时触发，相当于 mousedown 和 mouseup 的组合
- mouseover：鼠标放在某元素上触发
- mouseout：鼠标移出某元素时触发
- mousemove：鼠标移动时触发
- mousedown：鼠标按钮被按下时触发
- mouseup：鼠标按钮被松开时触发
- dblclick：鼠标双击时触发

# 最简单的柱状图

```js
var marge = { top: 60, bottom: 60, left: 60, right: 60 }; //设置边距
var dataset = [250, 210, 170, 130, 90]; //数据（表示矩形的宽度）
var svg = d3.select("#testSvg3"); //得到svg画布
console.log(svg);
var g = svg
  .append("g") //定义一个用来装整个图表的一个分组，并设置他的位置
  .attr("transform", "translate(" + marge.top + "," + marge.left + ")");
var rectHeight = 30; //设置每一个矩形的高度

g.selectAll("rect")
  .data(dataset)
  .enter()S
  .append("rect")
  .attr("x", 30) //设置左上点的x
  .attr("y", function(d, i) {
    //设置左上点的y
    return i * rectHeight;
  })
  .attr("width", function(d) {
    //设置宽
    return d;
  })
  .attr("height", rectHeight - 5) //设置长
  .attr("fill", "blue"); //颜色填充
```

# 绘制柱状图

```js
//1.创建svg画布
let marge = { top: 60, bottom: 60, left: 60, right: 60 };
let width = document.getElementById(this.id).clientWidth;
let height = document.getElementById(this.id).clientHeight * 2;
console.log(width, height);
const svg = d3
  .select(document.getElementById("testSvg2"))
  .attr("width", width)
  .attr("height", height);
// const svg = d3.select(this.$el).select('svg').attr('width', width).attr('height', height)
let g = svg
  .append("g")
  .attr("transform", "translate(" + marge.top + "," + marge.left + ")");
//2.数据集
let dataset = [60, 20, 30, 53, 33, 40, 27, 35, 20, 33];
//3.坐标轴
//x轴序数比例尺（d3.scaleBand()并不是一个连续性的比例尺，domain()中使用一个数组，不过range()需要是一个连续域）
let ranges = d3.range(dataset.length);
let xcale = d3
  .scaleBand()
  .domain(ranges)
  .range([0, width - marge.left - marge.right]);
let xAxis = d3.axisBottom(xcale);
g.append("g")
  .attr(
    "transform",
    "translate(" + 0 + "," + (height - marge.top - marge.bottom) + ")"
  )
  .call(xAxis);
//y轴线性比例尺
let yscale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([height - marge.top - marge.bottom, 0]);
let yAxis = d3.axisLeft(yscale);
g.append("g")
  .attr("transform", "translate(0, 0)")
  .call(yAxis);
//4.为每个矩形和对应的文字创建一个分组<g>
let gs = g
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("g");
//5.绘制矩形
//设置矩形之间的间隙
let rectPadding = 20;
gs.append("rect")
  .attr("x", function(d, i) {
    //xcale(i): 画布真实宽度(48)横坐标且从0开始, 0, 48, 96 ... 432
    return xcale(i) + rectPadding / 2;
  })
  .attr("width", function() {
    //xcale.step() 画布真实宽度(48):width-marge.left-marge.right/dataset.lenght
    return xcale.step() - rectPadding;
  })
  .attr("y", function(d) {
    return yscale(d);
  })
  .attr("height", function(d) {
    return height - marge.top - marge.bottom - yscale(d);
  })
  .attr("fill", "blue")
  .on("mouseover", function() {
    let rect = d3
      .select(this)
      .transition()
      .duration(1500)
      .attr("fill", "yellow");
  })
  .on("mouseout", function() {
    let rect = d3
      .select(this)
      .transition()
      .delay(1500)
      .duration(1500)
      .attr("fill", "blue");
  });

//6.绘制文字
gs.append("text")
  .attr("x", function(d, i) {
    return xcale(i) + rectPadding / 2;
  })
  .attr("width", function() {
    return xcale.step() - rectPadding;
  })
  .attr("y", function(d) {
    return yscale(d);
  });
```
