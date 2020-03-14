---
github: https://github.com/yiming-zeng/vue-d3-geo
preview: http://101.37.75.23/projects/vue-d3-geo/
---

> 最近利用Vue和d3.js做了一个可控制参数的地图投影可视化应用，预览地址如上

## 什么是 *D3.js*

`D3.js`  即 *Data-Driven Documents*，是一个基于数据来驱动 `DOM` 操作的 `JavaScript` 库，它不引入新的视觉表示方法，而是借助于现有的 `Web` 元素: `HTML`, `CSS`, `SVG` 以及 `Canvas` 等，通过将数据绑定到 `DOM` 上，然后根据数据来计算对应 `DOM` 的属性值，得到具有丰富的视觉和交互效果的数据可视化组件。

官网: https://d3js.org/

API参考: [地址]( https://github.com/d3/d3/blob/master/API.md)

## *d3-geo*

`d3-geo` 是 `D3.js`  中进行地理投影，生成球面图形的模块

[地址](https://github.com/d3/d3-geo)

## 使用示例

这里就不详细地对 `D3.js` 的API进行解读，主要记录一下遇到的关键问题和代码

### 模块引用

可以直接 `import` 或 `require` 相应地模块：

```javascript
import * as d3 from 'd3'
const d3 = require('d3')
```

或者使用 `Object.assign` 引入多个独立模块，并结合到 `d3` 变量中

```javascript
const d3 = Object.assign(
  {},
  require("d3"),
  require("d3-geo-projection"),
  require("d3-geo-polygon")
);
```

开发过程中遇到的一个问题是需要用到模块中的 `d3.event` ，但是 `d3` 模块中的 `event` 变量为 `null` ，这时需要引入 `d3-selection` 模块，通过 `Object.assign` 并入的方式还是无法访问到该变量，这时候单独将 `d3-selection` 模块引入:

```javascript
const d3Selection = require("d3-selection");
const { transform, sourceEvent } = d3Selection.event;
```

### 元素创建与数据绑定

基本的流程就是通过 `d3.select` 选择元素，然后逐步插入元素、设置属性和插入数据

```javascript
// svg
const el = d3.select(this.$el)
const svg = el.append("svg").attr("width", width).attr(...)...; // 逐个设置属性
const g = svg.append("g")
// 数据绑定在path上，当对应的元素不足时，绑定数据数量 > 对应元素，后面通常先跟 append 操作
const data = g.selectAll("path").data(Features).enter(); 
// 插入元素，也可用insert(可以指定将新元素插入位置)
data.append("path").style("fill", "#444").attr("d", path);
```

如果绘制的是 `canvas` ，需要利用 `canvas` 的 `context` 来进行绘制
```javascript
var canvas = document.getElementById('canvas') // 假设有id为canvas的DOM元素
canvasCtx = canvas.getContext('2d')
// draw
context.beginPath()
drawPath(graticule) // 定义绘制函数，比如我要用到的d3.geoPath()地理路径生成器
canvasCtx.lineWidth = 1; // 设置绘制的参数
canvasCtx.strokeStyle = 'blue';
canvasCtx.stroke()
```

通过以上的 `javascript` 代码可以实现元素的创建，数据绑定和绘制，但为了更轻松完成后续的业务流程，我还是直接定义目标元素，在 `vue` 的  `template` 中:
```html
<svg class="h-full w-full">
    <defs>
        <path id="outline" :d="geoPath(outline)" />
        <path id="graticule" :d="geoPath(graticule)" />
        <clipPath id="clip"><use xlink:href="#outline" /></clipPath>
    </defs>
    <g clip-path="url(#clip)">
        <use xlink:href="#outline" />
        <use xlink:href="#outline" />
        <use xlink:href="#graticule"/>
        <path
              v-for="(item, index) in Features"
              :key="index"
              :d="geoPath(item)"
              />
    </g>
</svg>
```

[SVG元素参考](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element)

### 拖动投影变形

通过绑定 `drag` 事件，拖动过程中通过 `versor` 模块计算并更新拖动手势对应的投影的三维旋转参数

```javascript
import * as versor from "versor";
const d3Selection = require("d3-selection");

...
drag(projection) {
    let v0, q0, r0;
    const dragstarted = () => {
        const { x, y } = d3Selection.event;
        v0 = versor.cartesian(this.projection.invert([x, y]));
        q0 = versor((r0 = this.projection.rotate()));
    };
    const dragged = () => {
        const { x, y } = d3Selection.event;
        const v1 = versor.cartesian(this.projection.rotate(r0).invert([x, y]));
        const q1 = versor.multiply(q0, versor.delta(v0, v1));
        projection.rotate(versor.rotation(q1));
    };
    d3.select("g").call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
      );
}
// 取消拖动变形
d3.select("g").on(".drag", null);
```

### 缩放与移动
利用 `d3.zoom` 
```javascript
const zoomed = () => {
    const { transform } = d3Selection.event;
    d3.select("g").attr("transform", transform);
};
const extent = [
    [0, 0],
    [this.width, this.height]
];
const zoom = d3.zoom();
zoom.extent(extent)
zoom.scaleExtent([zoomMin, zoomMax]) // 缩放的范围
zoomon("zoom", zoomed);

const selection = d3.select("svg").call(zoom);

// 取消滚轮缩放
selection.on("wheel.zoom", null);
// 获取到操作的类型 mousemove/wheel，可进一步定义缩放和移动的事件
d3Selection.event.sourceEvent.type 
```

### 交互行为
通过选择相应的元素并绑定 `click`、`mousemove`  等交互行为的事件实现对元素的交互
```javascript
d3.selectAll("path.geo").on("click", (d, i) => {
    d3.selectAll("path.geo").attr("fill", "#fff");
    const cls = ".geo.index" + i;
    d3.select(cls).attr("fill", "#444");
    Message.success("success");
});
```