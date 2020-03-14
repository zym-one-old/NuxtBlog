## 依赖安装

在 `nginx` 安装的目标文件夹下安装如下依赖

- `gcc` : 源码编译依赖环境
- `zlib` : 提供了很多种压缩和解压缩的方式，用于对 `http` 包的内容进行 `gzip`
- `pcre` : `nginx` 的 `http` 模块使用 `pcre` 来解析正则表达式
- `openssl` : 安全套接字层密码库，囊括主要的密码算法、常用的密钥和证书封装管理功能及SSL协议，并提供丰富的应用程序供测试或其它目的使用

```
// gcc
apt-get install build-essential
apt-get install libtool
gcc --version

// zlib
wget http://zlib.net/zlib-1.2.11.tar.gz
tar -zxvf zlib-1.2.11.tar.gz 
cd zlib-1.2.11
./configure  
make 
make install 

// pcre
wget https://netix.dl.sourceforge.net/project/pcre/pcre/8.38/pcre-8.38.tar.gz
tar -zxvf pcre-8.38.tar.gz
cd pcre-8.38
./configure  
make  
make install

// openssl
wget https://www.openssl.org/source/openssl-1.0.2n.tar.gz
tar -zxvf openssl-1.0.2n.tar.gz
```

## 安装编译

采用源码编译安装的方式

```
// 下载并解压nginx压缩包
wget https://nginx.org/download/nginx-1.8.1.tar.gz
tar -zxvf nginx-1.8.1.tar.gz

cd nginx-1.8.1

// 配置nginx
./configure --sbin-path=/usr/local/nginx/nginx \
--conf-path=/usr/local/nginx/nginx.conf \
--pid-path=/usr/local/nginx/nginx.pid \
--with-http_ssl_module \
--with-pcre=/usr/local/pcre-8.38 \
--with-zlib=/usr/local/zlib-1.2.11 \
--with-openssl=/usr/local/openssl-1.0.2n
// 编译
make
// 安装
make install
```

在编译过程中出现错误  ` [-Werror=implicit-fallthrough=] ` ，因为gcc将所有的警告当成错误进行处理

解决办法:  进入文件`/objs/Makefile` 中，删除其中的 `-Werrori`

```
CFLAGS =  -pipe  -O -W -Wall -Wpointer-arith -Wno-unused-parameter -Werror -g　
```

## nginx.conf 配置

```
 server {
        listen       80;
        server_name  domain_name;
        location / {
            proxy_pass  http://127.0.0.1:8081/;
            # 或直接指定项目文件
            # root   html;
            # index  index.html index.htm;
        }
}
```

使用 `nginx` 配置子目录代理多个服务，即在一个域名下部署多个服务，通过 `domain_name/project_name` 访问

`nginx` 的配置修改

```
// nginx.conf
server {
       listen      80;
       server_name domain_name;
       location /project_name/ {
           proxy_pass  http://127.0.0.1:8082/;
       }
}
```

在 `vue` 项目中还需要进行代码的修改:

`vue-router` 为 `history` 模式时，需要将 `base` 属性的值设为 `nginx` 上配置的子目录的值

```javascript
// router/index.js
export default new Router({
    mode: 'history', 
    base: '/project_name/',
    routes
}
```
将资源的读取方式从绝对路径换成相对目录，这样就能根据当前的子目录正确获取资源
```javascript
// vue.config.js
module.exports = {
  publicPath: "./"
};
```

## 基本使用命令

- 启动 `./nginx` 
- 重启 `./nginx -s reload`
- 快速关闭 `./nginx -s stop`
- 优雅关闭 (graceful shutdown) `./nginx -s quit`
- 检查配置文件是否正常 `./nginx -t`








