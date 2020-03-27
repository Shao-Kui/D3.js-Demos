const naiveAxes = function(g, innerWidth, innerHeight){

    const xAxis = d3.axisBottom(xScale)
    const xAxisGroup = g.append('g').call(xAxis)
    .attr('transform', `translate(0, ${innerHeight})`);

    const yAxis = d3.axisLeft(yScale).tickSize(-innerWidth);
    const yAxisGroup = g.append('g').call(yAxis);

    return {'xAxisGroup': xAxisGroup, 'yAxisGroup': yAxisGroup}; 
}