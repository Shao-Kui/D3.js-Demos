let svg = d3.select('#mainsvg');
let maingroup = svg
.append('g')
.attr('transform', `translate(${300}, ${150})`)
let circle = maingroup
.append('circle')
.attr('r', '100')
.attr('fill', 'green')
.attr('stroke', 'black')
