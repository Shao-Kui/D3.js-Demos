# D3.js-Demos
文档在不断建设中... ... ...

# 欢迎大家选修并加入数据可视化！
本代码库对应清华大学-计算机系春季学期课程《数据可视化》，由张松海老师任课。代码库中的框架可作为大作业-可视化编程的基础，同时其中的样例可供大家参考。任何同学有任何问题，欢迎在Github上issue或给我发邮件（zhangsk18@mails.tsinghua.edu.cn）。

D3.js课上用幻灯片（讲义）在[slides文件夹][theslides]下。

D3.js课上录屏: [BiliBili][recordvideo]。

# 先修条件（Prerequisites）
课程希望各位同学可以有编程基础，这里编程基础不限制哪门具体的语言，虽然更希望是JavaScript与Python。关于可视化编程需要用到的编程语言（JavaScript），在D3.js介绍的时候，会一并为大家介绍。如果没有编程基础，也完全可以参与课程学习，但需要无编程基础的同学课下用额外的时间补习JavaScript的基础知识。

# D3.js讲解大纲
* Introduction

引言会为大家介绍D3周边的知识。
* Manipulation
* Data-Join
* Path
* Interaction
coming soon...    

# 安装Python-Flask
为大家提供的框架本身搭建非常简单，即使用Python-Flask构建，其中的主要内容是我们课上会用到的Demo与一些我们制作的可视化展示。Python的安装请参考[官方网站][pythonweb]，安装后请打开命令行，输入如下命令安装服务器端需要的flask库：
```
pip install flask flask_cors
```
如果安装成功，即可直接运行服务器。

# 启动服务器
进入项目根目录（包含main.py的目录），打开命令行并输入如下指令：
```
python main.py
```
若出现如下类似的信息则表示服务器启动成功：
```
 * Serving Flask app "main" (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: on
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 331-382-827
 * Running on http://0.0.0.0:11666/ (Press CTRL+C to quit)
```

# 示例导航
* 操控SVG：[链接][control]
* 柱状图：[链接][barchart1]
* 柱状图，图元可交互：链接
* 堆叠柱状图：[链接][stackbarchart]
* Path：[链接][htmlpath]
* 折线图，带上下浮动动画：[链接][linechart]
* 动态气泡图：[链接][scatter1]
* 静态主题河流：[链接][themeriver]
* 动态主题河流与柱状图，从左到右逐渐展现流动过程，柱状图同时随主题河流发生改变：[链接][themeriverlr]
* 世界地图与交互：[链接][mapinteract]
* 力（Force）、节点（Node）与边（Link）：[链接][force]
* 力跟随：[链接][force-following]

[control]:https://github.com/Shao-Kui/D3.js-Demos/blob/master/static/d3-tutorial/manipulation.html
[htmlpath]:https://github.com/Shao-Kui/D3.js-Demos/blob/master/static/html-tutorial/hello-path.html
[pythonweb]:https://www.python.org/
[theslides]:https://github.com/Shao-Kui/D3.js-Demos/tree/master/slides
[linechart]:https://github.com/Shao-Kui/D3.js-Demos/blob/master/static/lineChart.html
[scatter1]:https://github.com/Shao-Kui/D3.js-Demos/blob/master/static/d3-tutorial/scatter.html 
[mapinteract]:https://github.com/Shao-Kui/D3.js-Demos/blob/master/static/renderearth.html
[barchart1]:https://github.com/Shao-Kui/D3.js-Demos/blob/master/static/d3-tutorial/barchart.html
[themeriver]:https://github.com/Shao-Kui/D3.js-Demos/blob/master/static/themeriver.html
[themeriverlr]:https://github.com/Shao-Kui/D3.js-Demos/blob/master/static/themeriver-lr.html
[force]:https://github.com/Shao-Kui/D3.js-Demos/blob/master/static/force.html
[force-following]:https://github.com/Shao-Kui/D3.js-Demos/blob/master/static/force-following.html
[stackbarchart]:https://github.com/Shao-Kui/D3.js-Demos/blob/master/static/stackbarchart.html
[recordvideo]:https://www.bilibili.com/video/BV1HK411L72d
