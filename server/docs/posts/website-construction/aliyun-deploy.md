> 目前市面上有多种云服务器可供选择，如:腾讯云、阿里云等
>
> 本文以阿里云ECS为例，系统为 Ubantu 18.04 64位

## 安装node、npm

查看本机的node版本: `win+r/cmd` `node-v  `

```
// 从Node.js的站点中获取对应版本的压缩档源代码并解压缩
wget https://nodejs.org/dist/v12.13.0/node-v12.13.0-linux-x64.tar.xz
tar xvf node-v12.13.0-linux-x64.tar.xz
// 建立软连接
ln -s /root/node-v12.13.0-linux-x64/bin/node /usr/local/bin/node
ln -s /root/node-v12.13.0-linux-x64/bin/npm /usr/local/bin/npm
```
## 安装cnpm

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
ln -s /root/node-v12.13.0-linux-x64/bin/cnpm /usr/local/bin/cnpm
```
## 安装pm2

```
cnpm install pm2 -g
ln -s /root/node-v12.13.0-linux-x64/bin/pm2 /usr/local/bin/pm2
```
pm2常用命令
-  查看当前正在运行的进程: `pm2 list` 
-  重启所有进程: `pm2 restart all`
-  停止所有进程:  `pm2 stop all`
-  关闭并删除所有进程: `pm2 delete all`
-  保存当前应用列表: `pm2 save`
-  显示每个进程的CPU和内存占用情况: `pm2 monit` 

## 上传前期准备
在package.json文件中配置
```json
"config": {
    "nuxt": {
        "host": "0.0.0.0",
        "port": 80
    }
}    
```
在本地执行 `npm run build` 命令打包，需要上传的文件包括

-  .nuxt
-  assets
-  server
-  static
-  nuxt.config.js
-  package.json

## 安装模块，启动应用

使用FileZilla代码到home/app目录下，进入应用目录 `cd /` `cd home` `cd app`

```
cnpm install
pm2 start npm --name "app" -- start
```
## 补充

要实现外网ip的访问，需要配置实例安全组规则
1. 协议类型: HTTP(80)
2. 授权对象: 0.0.0.0/0

后期遇到特殊情况需要删除服务器中的node_modules目录，可安装rimraf实现快速删除
```
cnpm install rimraf -g
ln -s /root/node-v12.13.0-linux-x64/bin/rimraf /usr/local/bin/rimraf
rimraf node_modules
```