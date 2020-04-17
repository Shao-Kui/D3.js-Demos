# 欢迎大家选修并加入数据可视化！
本代码库对应清华大学-计算机系春季学期课程《数据可视化》，由张松海老师任课。代码库内容主要围绕2020年开始新加入的[D3.js][d3web]编程讲解，其中的框架可作为大作业与其他可视化编程的基础，同时所有样例可供大家参考。任何同学有任何问题，欢迎在Github上issue或给我发邮件（zhangsk18@mails.tsinghua.edu.cn）。

D3.js课上用幻灯片（讲义）：[slides文件夹][theslides]；

D3.js课上录屏: [哔哩哔哩-BiliBili][recordvideo]；

# 先修条件（Prerequisites）
课程希望各位同学可以有编程基础，这里编程基础不限制哪门具体的语言（虽然更希望是JavaScript与Python）。关于可视化编程需要用到的编程语言（JavaScript），在D3.js介绍的时候，会一并为大家介绍。如果没有编程基础，也完全可以参与课程学习，但需要无编程基础的同学课下用额外的时间补习JavaScript的基础知识。

# D3.js讲解大纲
## Introduction

引言会为大家介绍D3周边的知识，包括HTML、JavaScript、Web环境配置等。对于本门课程而言，这些内容是学习D3.js所要了解的基础。Introduction中会包含使用D3所必备的知识，但对每个部分的讲解具体还是需要参考其专门的教学课程。

## Manipulation

第二章节Manipulation会为大家介绍如何使用D3.js操控图元（SVG），包括对于select、append、attr这些基础函数使用与演示。同时，本次将为大家带来一个静态柱状图的编程实例，实例将加强大家对于图元操控的熟练度。

## Data-Join

第三章节Data-Join将进入D3.js的一个核心机制：将图元与数据绑定。我们将介绍如何将数据与图元绑定，并如何通过数据设置图元属性。同时，本章节包含经典的Data-Join，即'enter'、'update'与'exit'三种数据绑定状态的用法与Data-Join的各种接口。实例为一个动态的散点图，来加强大家对于Data-Join的熟悉程度。

## Path

第四章节的主角是'path'，一个SVG中最强大的图元之一，仅凭这一种图元就可以实现线段、圆弧、地图、主题河流等多种可视化方案。当然，path的强大在于其'd'属性，而在HTML中，'d'属性的设置又略微复杂，而D3.js是如何帮助我们设置'd'属性的呢？实例会展现一个动态的折线图，让大家感受D3.js中的'd'属性设置。

## Map, Interaction and CSS

第五章节较为特殊，我们将‘实现一个可交互的地图’贯穿整个章节。通过这个实例，会循序渐进的从‘如何使用D3展现一幅地图’，到‘如何在地图中加入交互’，再到如何通过层叠式样式表（CSS）来美化可视化效果，来为大家介绍地图、交互与CSS的内容。同时，本章节会介绍一个用于辅助D3.js但独立于它的库：D3-Tip，可让我们方便地在可视化图标上浮现对话框。

## Stack

第六章节将介绍D3中的一个数据预处理机制：堆叠数据。D3中提供了很多方便、易用的数据预处理接口，本章节将会围绕其中一个来展开。实例会应用D3.js中的数据预处理机制，来完成一个堆叠的柱状图。

## Tree & Graph

第七章：树与图，即对层级数据与网络数据的可视化，尽管在数据结构上前者是后者的特殊形式，但在可视化的实现上其实差别较大。本章将会介绍层级与网络数据的常见形式、常见的预处理形式、D3中提供的对于二者处理的接口。同时，本章节的实例将会是目前课程中最多的一次，首先有二者的直观可视化，同时也有两个带有属性值的层级数据可视化实例。

## ToBeContinued

... ... ...

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

# Acknowledgement

首先，非常感谢我的导师张松海教授对于D3.js讲解的支持与指导！同时，感谢周文洋同（shuai）学（ge）与蔡韵同（jie）学（jie）的共同合作！也要感谢梁缘学长曾经的指导与帮助，和学长真的学习到了很多。虽然尽全力控制自己的发音，但我的中文还是带了些许东北的感觉、我的英文还是带着口音，还请大家包涵。当然，最要感谢的还是一起学习D3.js的每一名同学，希望大家都能有所收获，对课程有更多的意见与反馈，多批评、多指正！

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
