# 欢迎大家选修并加入数据可视化！
本代码库对应清华大学-计算机系春季学期课程《数据可视化》，由张松海老师任课。代码库内容主要围绕2020年、2021年开始新加入的[D3.js][d3web]编程讲解，其中的框架可作为大作业与其他可视化编程的基础，同时所有样例可供大家参考。任何同学有任何问题，欢迎在Github上issue或给我发邮件（zhangsk18@mails.tsinghua.edu.cn）。2021年开始，每节讲解的代码按照课程章节分别保存，框架也不再基于Flask，而是[VSCode Live Server][vscodeliveserver]、SimpleHTTPServer等。请注意：2021年与2022年的D3.js课件进行了完全翻新、大量补充，和2020年有较大区别。目前2022的课件、源代码已经大量上传至这个代码库，请参考根目录下的‘[2022][the2022]’文件夹。

D3.js课上用幻灯片（讲义）：[slides文件夹][theslides]；

D3.js课上录屏（2020年线上）: [[哔哩哔哩-BiliBili]][recordvideo]；

2021年课程恢复线下，暂无录屏，但课件已经更新；

**D3.js课上录屏（2022年线上线下结合）**: [[清华云盘]][tsinghuacloud2022] [[哔哩哔哩-BiliBili]][recordvideo2022]；

数据可视化[课程主页][coursevis]。

# 先修条件（Prerequisites）
课程希望各位同学可以有编程基础，这里编程基础不限制哪门具体的语言（虽然更希望是JavaScript与Python）。关于可视化编程需要用到的编程语言（JavaScript），在D3.js介绍的时候，会一并为大家介绍。如果没有编程基础，也完全可以参与课程学习，但需要无编程基础的同学课下用额外的时间补习JavaScript的基础知识。

# D3.js讲解大纲
## D3基础（Introduction & Manipulation）

引言会为大家介绍D3周边的知识与D3的语法基础，包括HTML、JavaScript、Web环境配置等。对于本门课程而言，这些内容是学习D3.js所要了解的基础。D3.js的难点主要在于：实现某个可视化作品前需要了解很多基础语法。相应，第一部分内容会尽可能介绍“实现一个简单可视化作品所用到的基本语法”。包括：如何使用D3.js操控图元（图元的增删改查）、CSV数据的规则与读取、比例尺函数、坐标轴基础与Data-Join基础等。编程实例为基于D3的基础语法绘制一个最简单的柱状图。其中，Data-Join是D3.js的一个核心机制：将图元与数据绑定。我们将介绍如何将数据与图元绑定，并如何通过数据设置图元属性。同时，本章节包含经典的Data-Join，即'enter'、'update'与'exit'三种数据绑定状态的用法与Data-Join的各种接口。

## 动画（Animation）

第三部分会介绍D3的“Transition”机制，即如何使用D3.js实现动画。包括D3-Transition的基础语法、动画的过渡、同步、继承、插值和循环等。实例为一个动态的散点图与一个追踪的柱状图，来加强对于D3.js基础语法与动画的熟悉程度。

## Path

第四部分的主要内容围绕<path>图元，也是SVG中最常见的图元之一，仅凭这一种图元就可以实现线段、圆弧、地图、主题河流等多种可视化方案。<path>的多用途在于其'd'属性，而在HTML中，'d'属性的设置又略微复杂，我们会使用D3.js来帮助我们设置‘d’属性。实例为一个折线图与一个饼图。

## 地图与地形（Map & Contour）

地图与地形数据可视化。本部分包括地理数据的基本格式，即geojson，同时包括基于geojson的‘d’属性生成函数‘d3.geoPath’、地图的投影函数‘d3-projection’。我们会首先基于这些内容实现简易的地图可视化。轮廓线的生成同样会在本部分引入，其核心在于基于矩阵拟合轮廓线的geojson数据，进而绘制方式同地图可视化。

## 交互（Interaction）

第六部分介绍D3.js的交互机制，本质上也是Web前端的交互机制在D3.js与SVG中的实例。我们会先引入各种交互的类型与样例，然后将上一部分的地图数据可视化拓展为交互式地图。一些进阶的交互接口与原理也会简单引入（但对于本讲解不做要求）。

## 堆叠与分布（Stack & Histogram）

这一部分主要围绕D3.js的堆叠机制，主要介绍d3.stack接口，包括其调用方式与返回数据的结构。其中，理解D3堆叠数据后的结构最为重要，因为之后的操作就是基于堆叠数据的‘Data-Join’。进而，样例会实现一个堆叠的柱状图与主题河流。2022年，我们还加入了分布直方图的讲解。

## 层次（Hierarchy）

层次数据可视化。这一部分主要围绕D3.js的层级处理机制，主要介绍d3.hierarchy接口，包括其调用方式与返回的数据接口。层级数据本身只是一个逻辑概念，将其赋予位置信息仍需要d3.tree与d3.partition的支撑。理解这三者后，我们会基于d3.hierarchy分别实现树状图、冰锥图、日晕图（径向冰锥图）。

## 网络（Network）

网络数据可视化。这一部分围绕D3.js的网络数据可视化，尽管D3.js并没有成型的网络数据处理机制（并不类似上一部分）。因此，我们介绍三种不同的网络数据可视化形式，包括弧长连接图、基于d3.chord的弦图、力导图。其中，力导图是一个独立于D3-Transition的机制，我们会单独介绍该模块。

# 安装Python-Flask
2021年起，课程不再基于Flask框架。2021年起，我们每节课都单独拆分了需要用到的代码，请使用VSCode Live Server、SimpleHTTPServer来运行Demo。若需要后端逻辑，可安装Flask并运行2020年的DEMO，主要包含我们课上用到的Demo、一些我们制作的可视化展示。Python的安装请参考[官方网站][pythonweb]，安装后请打开命令行，输入如下命令安装服务器端需要的flask库：
```
pip install flask flask_cors
```
如果安装成功，即可直接运行服务器。

# 启动服务器（已暂停维护）
   
**2021年课程开始暂停维护，2021年开始，所有课上Demo基于[VSCode Live Server][vscodeliveserver]、SimpleHTTPServer等。**

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

# 示例导航（已暂停维护）

**2021年课程开始暂停维护，2021年开始，所有课上Demo按照各章节整理到了各个文件夹，详情参考[2021][the2021]。**
   
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

希望大家对课程内容多提意见、多批评、多指正！感谢张松海教授的指导、感谢梁缘学长、周文洋、徐天行同学的支持！

[tsinghuacloud2022]:https://cloud.tsinghua.edu.cn/d/9e17fcb867f549709a7a/
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
[recordvideo2022]:https://www.bilibili.com/video/BV1qg411X7bB
[d3web]:https://d3js.org/
[coursevis]:https://cg.cs.tsinghua.edu.cn/course/vis/
[the2021]:https://github.com/Shao-Kui/D3.js-Demos/tree/master/2021
[the2022]:https://github.com/Shao-Kui/D3.js-Demos/tree/master/2022
[vscodeliveserver]:https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
