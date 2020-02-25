> 总结一下Koa服务端开发的具体过程，得到一个供今后使用的项目起手式。本项目采用的技术还包括了: Typescript, TypeORM, routing-controllers等。
>

## 检查node版本

根据官网: Koa requires **node v7.6.0** or higher for ES2015 and async function support.

##  安装tsc依赖

全局安装typescript

```bash
cnpm install -g typescript
tsc -v
```

## 构建Node.js项目

- 进入项目目录, 初始化项目: `npm init`

- 生成tsc配置文件 (tsconfig.json): `tsc --init`

## 安装项目依赖
```
cnpm i koa koa-router --save
cnpm i --save-dev @types/koa @types/koa-router
cnpm i --save-dev typescript ts-node nodemon
```

## 文件配置

### 配置 tsconfig.json


```json
{
    "compilerOptions": {
        "target": "es2017",
        "module": "commonjs",
        "outDir": "./dist",
        "sourceMap": true,
        "removeComments": true,
        "noImplicitAny": false,
        "preserveConstEnums": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "typeRoots": [
            "node_modules/@types",
            "typings"
        ]
    },
    "compileOnSave": false,
    "include": [
        "./src/***/*",
    ],
    "exclude": [
        "node_modules",
        "dist"
    ]
}
```

### 配置热加载

在 `package.json` 中配置

```json
{
    "scripts": {
        "start": "nodemon --config nodemon.json"
    }
}
```

项目根目录新建文件  `nodemon.json`

```json
{
    "verbose": false,
    "debug": false,
    "exec": "ts-node ./app.ts",
    "ignore": [
        "node_modules",
        "./test",
        "**/*.d.ts",
        "*.test.ts",
        "*.spec.ts",
        "fixtures/*",
        "test/**/*",
        "docs/*"
    ],
    "events": {
        "restart": ""
    },
    "watch": [
        "./app",
        "./configs"
    ],
    "ext": "ts",
    "inspect": true
}
```

### 项目入口配置
在 `package.json` 中配置

```json
{
    "main": "app.ts"
}
```

根目录下新建 `app.ts` 文件

```typescript
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    ctx.body = 'Hello World';
});
 
app.listen(3000);
```

此时运行 `npm start` 命令， 打开浏览器输入  `localhost:3000` ，看到那条熟悉的语句，那就大功告成了。

最终完成的项目起手式在我的Github  Repository: [Koa-TS](https://github.com/yiming-zeng/Koa-TS)