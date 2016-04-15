# CrazyFT
前端 为自由 而疯狂

一、技术组合方案：

  1. nodejs的npm组件库管理
  2. bower的js依赖库管理
  3. requirejs管理js的依赖关系、实现异步加载和按需加载
  4. grunt作为项目自动化构建工具、实现项目的自动化打包及自动化调试
  5. angular的spa解决方案

二、环境配置

1. 执行node组件初始化命令：
   npm install
  执行该命令会自动读取package.json文件的组件列表，为项目初始化npm组件库
2. 执行bower组件初始化命令：
  bower install
  执行该命令会自动读取bower.json文件的js依赖库列表
3. 执行grunt自定义命令

  a. grunt bowerbuild
  命令会将bower管理的js依赖库自动
  
  b. grunt
  命令会自动完成项目打包工作（包含图片压缩、js压缩转转译及合并、css合并压缩、html压缩并剔除注释）
  
  c. grunt server
  命令会将项目自动发布成一个网络服务，并自动打开浏览器，当文件出现修改时完成实时编译并自动刷新浏览器内容
  
  grunt更多自定义命令本人已经添加到Gruntfile.js的注释下

三、目录说明

1. dest目录为打包时自动生成目录

2. src目录存放所有源代码

  a. css存放所有的css文件
  
  b. js目录存放所有的js文件
  
  c. tpls目录存放所有的html模板文件
  
  d. public存放公共文件（目前主要是bower）
  
  e. index.html应用入口
  
3. sass目录存放所有scss文件代码（当运行grunt server时会自动编译到src/css/）
