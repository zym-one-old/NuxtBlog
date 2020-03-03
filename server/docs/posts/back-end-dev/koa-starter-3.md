在app目录下包括了controllers、entities和services三个部分

```
├── app
│   ├── controllers  ---  路由控制
│   ├── entities     ---  实体
│   └── services     ---  服务
├── config
├── app.ts
├── package.json
├── tsconfig.json
├── nodemon.json  
└── variables.env
```

## Controllers

引入 `routing-controllers` ，采用装饰器的写法定义控制器的类。

```typescript
import { JsonController } from 'routing-controllers'
import { AppService } from '../services';

@JsonController()
export class AppController {
  constructor(
    private appService: AppService,
  ) {
  }
  // 或引入Typedi的Inject修饰器注入service
  @Inject()
  private appService: AppService
}
```

## Entities

每个实体对应数据库中的一张数据表，而这个实体类下的每一个属性都代表这表中的一列


```typescript
import { Entity, BaseEntity } from 'typeorm'

@Entity('app')
export class App extends BaseEntity {
}
```

### 实体属性的写法

要添加数据库列，只需要将生成的实体的属性用 `@Column` 装饰。默认情况下，字符串被映射到一个varchar(255)类型，数字被映射到一个integer类型（取决于数据库类型）。

也可以根据数据库支持的数据类型进行设置，支持的数据类型可见 [文档](https://github.com/typeorm/typeorm/blob/master/docs/entities.md#column-types)

```typescript
@Column()
name: string;

@Column('text')
name: string;
```
每个表都必须至少有一个主键列，可以设置某个列为主键或者创建一个自动生成的主键列

```typescript
// 主键
@PrimaryColumn()
id: number;

// 自增主键: 可选类型increment uuid rowid
@PrimaryGeneratedColumn()
id: number;
```

可自动更新的日期型属性
```
// 创建时间
@CreateDateColumn() 
created_at: Date
// 更新时间
@UpdateDateColumn()
updated_at: Date
```
### 实体关系写法

通过 `@JoinColumn` 装饰器指定关系的拥有者，`@JoinColumn` 只能在关系的一边使用来使这边做为关系的拥有者，关系拥有者在数据库里的表现就是拥有一个外键列。

```
// 一对一关系
import { A } from "./a";
@Entity()
export class B {
    @OneToOne(type => A)
    @JoinColumn()
    a: A;
}

// 若关系是双向的，则需要在A中同样指定与B的一对一关系
import { B } from "./b";
@Entity()
export class A {
    @OneToOne(type => B, b => b.a)
    b: B;
}
```

此外还有多对一/一对多关系，以及多对多关系的写法，详情可见文档

### 实体验证

借助 `class-validator` 的修饰符完成实体的验证，常用到的如下
```
// 数据类型验证
@IsString()
@IsBoolean()
@IsDate()
@IsNumber()
@IsInt()
@IsJSON()
@IsArray()
@IsEnum()
@IsEmail()
@IsUrl()
// 限定取值
@IsIn(any[])
@IsNotIn(any[]): 
// 数值范围
@IsPositive()
@IsNegative()
@Min(min: number)
@Max(max: number)
// 非空
@IsNotEmpty()
// 长度
@Length(min: number, max?: number)
@MinLength(min: number)
@MaxLength(max: number)
```


## Services

使用 `getRepository` 获得实体的 `repository` ，通过这个 `repository` 可以对相应应的表进行CURD操作

```typescript
import { getRepository, Repository } from 'typeorm'
import { Service } from 'typedi'
import { App } from '../entities'

@Service()
export class AppService {
    repository: Repository<App>
    constructor() {
        this.repository = getRepository(App)
    }
}
```

利用TypeScript的 `async/await` 语法来对 `repository` 的操作

```typescript
async getApp(): Promise<any> {
    const app = await this.repository.find()
    return app
}
```

### 获取数据

```typescript
find() // 获取全部数据
findOne(id) // 根据id(主键)获取数据
find({ name: 'Bears' })  // 获取所有name为Bears的数据
findOne({ name: 'Bears' }) // 获取一个name为Bears的数据

let [allData, count] = await this.repository.findAndCount() // 获取并统计所有数据
// 或者直接用count方法统计
let count = await this.repository.count()
```
### 删除数据

```typescript
// 删除一条数据
let entity = await this.repository.findOne(id);
await this.repository.remove(entity);
// 清空整张表
await this.repository.clear()
```
此外可以通过 `createQueryBuilder` 构建更复杂的操作，可见 [文档](https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md)

### 更新数据

先获取到数据实体，修改属性后，再通过 `save` 方法保存

```typescript
let entity = await this.repository.findOne(id);
entity.name = newName
await this.repository.save(entity)
```
### 创建数据

根据传入的属性创建一条新的记录，要求传入的属性与相应的实体的属性对应

```typescript
async create(user: User): Promise<any> {
    const entity = User.create(user)
    await this.repository.save(entity)
}
```
关于TypeORM更具体的使用方法可见 [官方文档](https://github.com/typeorm/typeorm) 以及 [中文文档](https://www.jianshu.com/p/1c4650e3718a)

