

> 通过拆分代码到不同的文件，将服务端的配置分为环境变量配置，数据库连接配置，中间件配置，路由配置等几个部分

在根目录新建 `confgs` 文件夹

```
├── config
│   ├── environments        ---  环境配置
│   ├── middlewares         ---  Koa 中间件配置
│   ├── connection          ---  数据库连接
│   ├── options             ---  全局配置
│   └── interceptors        ---  全局拦截器
└── variables.env           ---  环境变量文件
```

## 环境变量的配置

在根目录新建文件配置文件 `variables.env` ，这里配置项目的NODE_ENV及其他全局参数

```
NODE_ENV=development
```

在 `confgs` 目录下新建 `environment` 文件夹
```
environments
├── index.ts   ---  变量出口
├── dev.ts     ---  开发环境
└── prod.ts    ---  生产环境
```

在 `dev.ts` 和 `prod.ts` 中，分别配置开发环境和生产环境的环境变量以及数据库连接的参数:
```typescript
export default {
  NODE_ENV: "development", // "production"
  port: 3000,
  db: {
    HOST: "127.0.0.1",
    PORT: 5432,
    USER: "",
    PASS: "",
    DATABASE: ""
  }
};
```
在 `index.ts` 中引入 `dotenv` 模块，引入 `variables.env` 并导出对应的变量，`variables.env` 可`dev.ts` 和 `prod.ts` 中的覆盖同名变量
```typescript
import { join } from 'path'
import * as dotenv from 'dotenv'

import dev from './dev'
import prod from './prod'

const parsedEnvs = (): object => {
    const result = dotenv.config({ path: join(__dirname, '../variables.env') })
    if (result.error) {
        console.log('未找到文件: variables.env')
        return {}
    }
    return result.parsed
}

const isProd = parsedEnvs['NODE_ENV'] === 'production'
const env = isProd ? prod : dev

Object.keys(parsedEnvs || {}).forEach(key => {
    env[key] = parsedEnvs[key]
})

export const Environment = env
```

## 数据连接配置

> *ORM* (Object Relational Mapping) 模式通过使用描述对象和数据库之间映射的元数据，将程序中的对象自动持久化到关系数据库中，是一种为了解决面向对象与关系数据库存在的互不匹配的现象的技术。

目前来说，ORM框架已经广泛应用到服务端开发中，尽管相较于硬编码的方式存在一些性能上的差距，但极大的提高了开发中对持久对象的提取和和数据的加工处理的效率，并降低了维护难度。

TypeORM是一个ORM框架，此外TypeORM的文档也非常全面且易上手，与typedi、routing-controllers能够非常契合的配合使用。

```typescript
import * as entities from '../app/entities'
import { Environment } from './environments'
import { createConnection } from 'typeorm'

const db = Environment.db
createConnection({
  type: 'postgres',
  host: db.HOST,
  port: db.PORT,
  database: db.DATABASE,
  username: db.USER,
  password: db.PASS,
  entities: Object.keys(entities).map(name => entities[name]),
  logging: false,
  synchronize: true,
  extra:  {
    ssl: Environment.dbsslconn,
  }
})
  .then(() => console.log('数据库连接成功'))
  .catch(error => console.log(error))
```
## 服务器创建

> 服务器的创建routing-controllers —— 创建结构化，声明性和组织良好的基于类的控制器

```typescript
import 'reflect-metadata'
import { useKoaServer, useContainer } from 'routing-controllers'
import { Container } from 'typedi'
import { Server } from 'http'
import * as Koa from 'koa'

import { useMiddlewares } from './configs/middlewares'
import { Environment } from './configs/environments'
import { routingConfigs } from './configs/options'

if(Environment.useDB){
  require('./connection')
}

module.exports = (async (): Promise<Server> => {
  try {
    const koa: Koa = new Koa()
    const app: Koa = useKoaServer<Koa>(koa, routingConfigs) 
    useContainer(Container)
    useMiddlewares(app)
    return app.listen(Environment.port, () => {
      console.log(`server listening on ${Environment.port}`)
    })
  } catch (e) {
    console.log(e)
  }
})()
```

### 中间件配置

```typescript
import * as Koa from 'koa'
import * as kcors from '@koa/cors'
import * as bodyparser from 'koa-bodyparser'

export const useMiddlewares = <T extends Koa>(app: T): T => {
  app.use(kcors())
  app.use(bodyparser())
  return app
}
```

### 路由配置

```typescript
import { RoutingControllersOptions } from 'routing-controllers'
import * as interceptors from './interceptors'
import * as controllers from '../app/controllers'

const objectToArray = (dict: any): Array<any> =>
  Object.keys(dict).map(name => dict[name])

export const routingConfigs: RoutingControllersOptions = {
  controllers: objectToArray(controllers), // 路由控制
  interceptors: objectToArray(interceptors), // 全局拦截器
  routePrefix: '/apis', // 路由前缀
  validation: true // 自动验证实体
}
```

### 拦截器配置

利用 `routing-controllers` 的 `InterceptorInterface` 

```typescript
import { InterceptorInterface, Action, Interceptor } from 'routing-controllers'

@Interceptor()
export class AutoAssignJSONInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any): any {
    if (typeof content === 'object'){
        return JSON.stringify(Object.assign({ message: 'ok' }, content))
    }
    return JSON.stringify({ message: content })
  }
}
```
