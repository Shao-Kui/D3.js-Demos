const naiveAxes = function(){

    const xAxis = d3.axisBottom(xScale).tickSize(-innerHeight)
    const xAxisGroup = g.append('g').attr('id', 'xaxis').call(xAxis)
    .attr('transform', `translate(0, ${innerHeight})`);

    const yAxis = d3.axisLeft(yScale).tickSize(-innerWidth);
    const yAxisGroup = g.append('g').attr('id', 'yaxis').call(yAxis);

    return {'xAxisGroup': xAxisGroup, 'yAxisGroup': yAxisGroup}; 
}

const fullAxes = function(){
    // Adding axes; 
    const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    //.tickFormat(d3.format('.2s'))
    .tickPadding(10); // .tickPadding is used to prevend intersection of ticks; 
    const xAxis = d3.axisBottom(xScale)
    .tickFormat(d3.format('.2s'))
    .tickSize(-innerHeight)
    .tickPadding(10);

    let yAxisGroup = g.append('g').call(yAxis)
    .attr('id', 'yaxis');
    yAxisGroup.append('text')
    .attr('transform', `rotate(-90)`)
    .attr('x', -innerHeight / 2)
    .attr('y', -50)
    .attr('fill', '#333333')
    .text(yAxisLabel)
    .attr('text-anchor', 'middle') // Make label at the middle of axis. 
    .attr('font-size', '3.5em')
    .attr('font-weight', 'bold')
    yAxisGroup.selectAll('.domain').remove(); // we can select multiple tags using comma to seperate them and we can use space to signify nesting; 
    
    let xAxisGroup = g.append('g').call(xAxis)
    .attr('transform', `translate(${0}, ${innerHeight})`)
    .attr('id', 'xaxis');
    xAxisGroup.append('text')
    .attr('y', 60)
    .attr('x', innerWidth / 2)
    .attr('fill', '#333333')
    .attr('font-size', '3.5em')
    .attr('text-anchor', 'middle')
    .attr('font-weight', 'bold')
    .text(xAxisLabel);
    xAxisGroup.selectAll('.domain').remove();
}