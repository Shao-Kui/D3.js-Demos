# 欢迎大家选修并加入数据可视化！
本代码库对应清华大学-计算机系春季学期课程《数据可视化》，由张松海老师任课。代码库内容主要围绕2020年、2021年开始新加入的[D3.js][d3web]编程讲解，其中的框架可作为大作业与其他可视化编程的基础，同时所有样例可供大家参考。任何同学有任何问题，欢迎在Github上issue或给我发邮件（zhangsk18@mails.tsinghua.edu.cn）。2021年开始，每节讲解的代码按照课程分别保存，代码也不再基于Flask，而是VSCODE Live Server、SimpleHTTPServer等。同时，2021年的D3.js课件进行了完全翻新、大量补充，和2020年有较大区别。目前2021的课件、源代码已经大量上传至这个代码库，请参考根目录下的‘2021’文件夹，本文档待完善。

D3.js课上用幻灯片（讲义）：[slides文件夹][theslides]；

D3.js课上录屏（2020年线上）: [哔哩哔哩-BiliBili][recordvideo]；
2021年课程恢复线下，暂无录屏，但课件已经更新。

数据可视化[课程主页][coursevis]；

# 先修条件（Prerequisites）
课程希望各位同学可以有编程基础，这里编程基础不限制哪门具体的语言（虽然更希望是JavaScript与Python）。关于可视化编程需要用到的编程语言（JavaScript），在D3.js介绍的时候，会一并为大家介绍。如果没有编程基础，也完全可以参与课程学习，但需要无编程基础的同学课下用额外的时间补习JavaScript的基础知识。

# D3.js讲解大纲
## Introduction & Manipulation

引言会为大家介绍D3周边的知识与D3的语法基础，包括HTML、JavaScript、Web环境配置等。对于本门课程而言，这些内容是学习D3.js所要了解的基础。D3.js的难点主要在于：实现某个可视化作品前需要了解很多基础语法。相应，第一部分内容会尽可能介绍“实现一个简单可视化作品所用到的基本语法”。包括：如何使用D3.js操控图元（图元的增删改查）、CSV数据的规则与读取、比例尺函数、坐标轴基础与Data-Join基础等。编程实例为基于D3的基础语法绘制一个最简单的柱状图。其中，Data-Join是D3.js的一个核心机制：将图元与数据绑定。我们将介绍如何将数据与图元绑定，并如何通过数据设置图元属性。同时，本章节包含经典的Data-Join，即'enter'、'update'与'exit'三种数据绑定状态的用法与Data-Join的各种接口。

## Animation

第三部分会介绍D3的“Transition”机制，即如何使用D3.js实现动画。包括D3-Transition的基础语法、动画的同步、动画的自定义、插值等。实例为一个动态的散点图，来加强对于D3.js基础语法与动画的熟悉程度。

## Path

第四章节的主要内容围绕<path>图元，也是SVG中最常见的图元之一，仅凭这一种图元就可以实现线段、圆弧、地图、主题河流等多种可视化方案。<path>的多用途在于其'd'属性，而在HTML中，'d'属性的设置又略微复杂，我们会使用D3.js来帮助我们设置‘d’属性。实例为一个折线图与一个饼图。

## Map & Contour

地图与地形数据可视化。

## Interaction

第六部分介绍D3.js的交互机制，本质上也是Web前端的交互机制在D3.js与SVG中的实例。

## Stack

这一部分主要围绕D3.js的堆叠机制，会实现一个堆叠的柱状图与主题河流。

## Hierarchy

层次数据可视化。

## Network

网络数据可视化。

# 安装Python-Flask
2021年起，课程不再基于Flask框架。2021年起，我们每节课都单独拆分了需要用到的代码，请使用VSCode Live Server、SimpleHTTPServer来运行Demo。若需要后端逻辑，可安装Flask并运行2020年的DEMO，主要包含我们课上用到的Demo、一些我们制作的可视化展示。Python的安装请参考[官方网站][pythonweb]，安装后请打开命令行，输入如下命令安装服务器端需要的flask库：
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

# Acknowledgement

首先，非常感谢我的导师张松海教授对于D3.js讲解的支持与指导！同时，感谢周文洋同学共同合作、也要感谢梁缘学长曾经的指导与帮助，和学长真的学习到了很多。当然，最要感谢的还是一起学习D3.js的每一名同学，希望大家都能有所收获，对课程有更多的意见与反馈，多批评、多指正！

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
[d3web]:https://d3js.org/
[coursevis]:https://cg.cs.tsinghua.edu.cn/course/vis/
