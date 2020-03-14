> 工欲善其事，必先利其器

# 什么是 *GeoJSON*

**GeoJSON** 是一种用于对多种地理数据结构进行编码的数据格式。它支持的几何类型包括: 点 ( *Point* )，线 ( *LineString* )，面 ( *Polygon* ) ，多点 ( *MultiPoint* ) ，多线 ( *MultiLineString* ) ，多面 ( *MultiPolygon* )，以及几何集合 ( *GeometryCollection* ) 。一个 *GeoJSON* 对象可代表一个对应空间区域的几何对象，或者是一个有界空间实体，该实体又被称为特征，其包含一个几何对象和其他属性，同时可用特征集合表示一系列特征。

2015年，国际互联网工程任务组（The *Internet Engineering Task Force*，简称 IETF）与 *GeoJSON* 的一些开创作者门组建了 *GeoJSON* 工作组 [GeoJSON WG](https://datatracker.ietf.org/wg/geojson/charter/) ，对*GeoJSON*进行了标准化工作，并于2016年8月公布了新的 *GeoJSON* 格式标准 [RFC 7946](https://tools.ietf.org/html/rfc7946) 。

## 示例 

### 点

点坐标为 `x, y` 坐标的形式，在投影坐标系中代表东距 `easting` 和北距 `northing` ，在地理坐标系中代表经度 `longitude` 和纬度 `latitude` 

```json
{
    "type": "Point",
    "coordinates": [100.0, 0.0]
}
```

### 线

线的坐标为位置的数组。

```json
{
    "type": "LineString",
    "coordinates": [
        [100.0, 0.0],
        [101.0, 1.0]
    ]
}
```

### 面

面的坐标为线坐标数组的数组。 在这个数组中的第一个元素代表面的边界环，其他元素代表面内部的环/洞

无洞

```json
{
    "type": "Polygon",
    "coordinates": [
        [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0]
        ]
    ]
}
```

有洞，面为外部环代表的面减去内部环代表的面

```json
{
    "type": "Polygon",
    "coordinates": [
        [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0]
        ],
        [
            [100.8, 0.8],
            [100.8, 0.2],
            [100.2, 0.2],
            [100.2, 0.8],
            [100.8, 0.8]
        ]
    ]
}
```


### 多点

多点的坐标为多个点位置的数组

```json
{
    "type": "MultiPoint",
    "coordinates": [
        [100.0, 0.0],
        [101.0, 1.0]
    ]
}
```

### 多线

多线的坐标为线坐标数组的数组

```json
{
    "type": "MultiLineString",
    "coordinates": [
        [
            [100.0, 0.0],
            [101.0, 1.0]
        ],
        [
            [102.0, 2.0],
            [103.0, 3.0]
        ]
    ]
}
```

### 多面

多面的坐标为面坐标数组的数组

```json
{
    "type": "MultiPolygon",
    "coordinates": [
        [
            [
                [102.0, 2.0],
                [103.0, 2.0],
                [103.0, 3.0],
                [102.0, 3.0],
                [102.0, 2.0]
            ]
        ],
        [
            [
                [100.0, 0.0],
                [101.0, 0.0],
                [101.0, 1.0],
                [100.0, 1.0],
                [100.0, 0.0]
            ],
            [
                [100.2, 0.2],
                [100.2, 0.8],
                [100.8, 0.8],
                [100.8, 0.2],
                [100.2, 0.2]
            ]
        ]
    ]
}
```

### 几何集合

在几何集合里的每个元素都属于以上提到的类型

```json
{
    "type": "GeometryCollection",
    "geometries": [{
        "type": "Point",
        "coordinates": [100.0, 0.0]
    }, {
        "type": "LineString",
        "coordinates": [
            [101.0, 0.0],
            [102.0, 1.0]
        ]
    }]
}
```

# 什么是 *TopoJSON*

**TopoJSON** 是 *GeoJSON* 按拓扑学编码后的扩展形式，使用点、弧（有向线）来表示图形。*TopoJSON* 文件由三部分组成：

- `transform` 描述了变换参数；
- `objects` 描述地理实体包含空间及属性信息；
- `arcs` 描述了有向弧的空间关系，弧由一系列起点及相对于起点的有向偏移坐标表示。

基于这种弧的存储方式可以表达出拓扑关系，由于弧只记录一次及地理坐标使用整数，不使用浮点数，相对于 `GeoJSON` ，`TopoJSON` 消除了冗余，即使不经过简化也能使文件大小缩小 80%甚至以上。

## 扩展阅读

- *TopoJSON* 的推导过程: [How To Infer Topology](https://bost.ocks.org/mike/topology/)

- *TopoJSON* 的规范: [topojson-specification](https://github.com/topojson/topojson-specification)

# 数据处理

## 通过官方API

### 使用方法

- 通过 `npm` 全局安装

```
npm install topojson -g
```

- 或直接引用 [库](https://unpkg.com/topojson) ，或者单独引用模块 `topojson-server` / `topojson-simplify` / `topojson-client` 

### API

包括了三个模块

- [topojson-server](https://github.com/topojson/topojson-server) 提供 *GeoJSON* 转为 *TopoJSON* 的方法和命令行工具
- [topojson-simplify](https://github.com/topojson/topojson-simplify) 提供对 *TopoJSON* 数据保留拓扑结构的简化和过滤方法；
- [topojson-client](https://github.com/topojson/topojson-client) 提供操作 *TopoJSON* 的工具，包括图形合并和坐标量化，以及将 *TopoJSON* 转回 *GeoJSON* 的工具。

## 地图综合工具 *mapshaper*

[**mapshaper**](https://mapshaper.org/) 是一个在线的地图综合服务 ，利用它可以完成地理数据格式的转换，支持的数据类型包括：*Shapefile*, *GeoJSON* , *TopoJSON* , *DBF* , *CSV* 。此外，利用 *mapshaper* 可进行数据的简化，即减少数据的细节，实现数据的压缩，支持的方法包括:

- `Douglas-Peucker` :  简化线与原始线保持一定距离，有利于降低点的密度，但是高度简化下容易出现尖角；
- `Visvalingam/effective area` :  通过迭代地去除构成具有两个邻接点的最小三角形的点来简化线；
- `Visvalingam/weighted area` : 优先去除尖角的顶点实现更平滑的效果。

项目文档可见 [文档地址](https://www.cartogis.org/docs/proceedings/2006/bloch_harrower.pdf)

# 数据获取

- [world-atlas](https://github.com/topojson/world-atlas)
- [us-atlas](https://github.com/topojson/us-atlas)
- [Natural Earth](https://www.naturalearthdata.com/downloads/)

