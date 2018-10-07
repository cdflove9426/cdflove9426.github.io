# svg 进阶

link: [D3.js的v5版本入门教程（第一章）—— 如何在项目中使用D3.js](https://blog.csdn.net/qq_34414916/article/details/80026180)
[D3.js的V5版本-Vue框架中使用(第一章) ---SVG基础](https://blog.csdn.net/davidPan1234/article/details/80704302)
------------

## 1.svg 的大小

viewport: 物理窗口
viewbox: 实物窗口
preserveAspectRatio: 保留横纵比

(1)viewport: 物理窗口 用 x,y,width,height。这 4 个属性，在页面上固定的矩形区域
(2)viewbox: 实物窗口定义 SVG 元素在 viewport 中的具体尺寸比例列如：

```html
 <svg width="500" height="200" viewBox="0 0 50 20">
  <rect x="20" y="10" width="10" height="5" style="stroke: #000000; fill:none;">
  </rect>
 </svg>
```

viewport 为 [0,0] 到 [500,200]
viewbox 为 [0,0] 到 [50,20]
**SVG 中基本的尺寸则不是 1px，而是 500/50 = 10px（单位是通过比例算的）**

(3)preserveAspectRatio: 保留横纵比
定义上面 viewport 和 viewbox 相互对齐的方式。换句话就是说，它的属性可以改变 viewbox 的具体位置
基本格式为：<align> [<meetorslice>]
`align`：定义 viewport 和 viewbox 的对齐方式，分为 x,y 轴两个方向，X 轴方向有三种方式：左边重合（xMin），x 轴中点重合（xMid），右边重合（xMax）。同理，Y 轴也有 顶边重合（YMin），y 轴中点重合（YMid），底边边重合（YMax）
`meetorslice`：主要就是定义该 SVG 是内嵌，还是裁剪或是 none。 meet || slice || none

## path

### 区分大小写：

- 大写: 参照的是绝对坐标，即，SVG 的右上角
- 小写: 参照的相对坐标，即，前一个点的坐标


### 直线和曲线：
- M/m起点： M(10, 10) 表示，以 (10,10) 为起始点
- L/l线段： L x y (or l dx dy)
- H/h水平线： H x (or h dx)
- V/v垂直线： V y (or v dy)
- Z/z结束： 表示path的结束

### 曲线
**贝塞尔C/c**: 
C x1 y1, x2 y2, x y (or c dx1 dy1, dx2 dy2, dx dy)
```html
<path d="M10 10 C 20 20, 40 20, 50 10" stroke="black" fill="transparent">
</path>
```

**反射贝塞尔C/c**: 
S x2 y2, x y (or s dx2 dy2, dx dy)：原有贝塞尔上再加一段贝塞尔曲线，所以，S/s 一般和 C/c 一起使用
```html
<path d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" stroke="black" fill="transparent"></path>
```

**二次贝塞尔Q/q**:  
Q x1 y1, x y (or q dx1 dy1, dx dy),只需要定义三个点
```html
<path d="M10 80 Q 95 10 180 80" stroke="black" fill="transparent"></path>

```
即为图上点， P1(x1,y1)，P2(x,y)起始点为 M 定义的点p0，例如

 
**弧线:A/a**
