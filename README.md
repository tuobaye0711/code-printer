# code-printer
print and show the animation of your code | 打印并展示你的代码特效

[Demo](http://tuobaye.com/demo/code-printer)

***

使用说明：

您可以fork过去直接修改，也可以按照如下步骤操作

``` bash
git clone https://github.com/tuobaye0711/code-printer.git
```

安装依赖文件
``` bash
npm install
```

打包文件
``` bash
npm start
```

起服务
``` bash
npm run server
```

修改配置说明：

resume 文件存放简历或者其他静态资源

source/code.js 存放需要打印并展示样式的代码（CSS/JS）

source/app.js 是主代码，可以修改一些比如说打印速度、高亮色等配置