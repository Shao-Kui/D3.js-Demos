console.log('Entering barchar in themeriver. ');

const dateSort = function(b,a){
    return new Date(b['日期']) - new Date(a['日期']);
}

const toNameValue = function(data){
    let ret = [];
    for(let i = 0; i < barKeys.length; i++){
        ret.push({name: barKeys[i], value: data[barKeys[i]]});
    }
        return ret;
}

const setting_up_barchart = function(data){
    let data_tt = data.filter(datum => {return datum[keyHint] === '总计'});
    let data_hb = data.filter(datum => {return datum[keyHint] === alone});
    data_tt = data_tt.sort(dateSort);
    data_hb = data_hb.sort(dateSort);
    let i = 0; 
    for(; i < data_tt.length; i++){
        for(let j = 0; j < barKeys.length; j++){
            data_tt[i][barKeys[j]] = data_tt[i][barKeys[j]] - data_hb[i][barKeys[j]];
            if(data_tt[i][barKeys[j]] < 0){
                data_tt[i][barKeys[j]] = 0;
            }
        }
        //data_tt[i]['确诊人数'] = data_tt[i]['确诊人数'] - data_hb[i]['确诊人数'];
        //data_tt[i]['治愈人数'] = data_tt[i]['治愈人数'] - data_hb[i]['治愈人数'];
        //data_tt[i]['死亡人数'] = data_tt[i]['死亡人数'] - data_hb[i]['死亡人数'];
    }
    console.log('setting up barchart...');
    // set the animation interval; 
    aduration = totalduration / data_tt.length; 
    console.log(data_tt);
    let c = 0; 
    let intervalId = setInterval(function(){
        if(c >= alldates.length){
            console.log('time to close this animation');
            clearInterval(intervalId); 
        }else{
            renderbarchart(toNameValue(data_tt[c]), true);
            renderbarchart(toNameValue(data_hb[c]), false);
            c = c + 1;
        }
    }, aduration); 
}

const barchart_color = {
    '现有确诊': '#6cd7e6',
    '确诊人数': '#6cd7e6',
    '治愈人数': '#6be86b',
    '死亡人数': '#df5353'
}

const renderbarchart = function(data, isTatal){
    let g;
    let yscalehere;
    if(isTatal){
        g = d3.select('#maingroup');
        yscalehere = yBandScale;
    }else{
        g = d3.select('#hubeigroup');
        yscalehere = nyBandScale;
    }

    const textbarchart = g.selectAll('.text-barchart').data(data, data => data.name);
    textbarchart.enter().append('text').attr('class', 'text-barchart')
    .attr('y', datum => yscalehere(yBarValue(datum)) + yscalehere.bandwidth() / 2 - 12)
    .attr('x', 204)
    .attr('text-anchor', 'start');
    textbarchart.text(d => d.value)
    .transition().ease(d3.easeCubic).duration(aduration)
    .attr('x', (datum) => {
        return 210 + xBarScale(xBarValue(datum));
    });
    
    g.selectAll('.rect-barchart')
    .data(data)
    .join('rect')
    .attr('class', 'rect-barchart') // note to assgin class to it, or it will create new rect each time instead of smooth animation; 
    .attr('x', 194)
    .attr('y', datum => yscalehere(yBarValue(datum))-10)
    .attr('height', yscalehere.bandwidth() / 2)
    .attr('fill', function(datum){return barchart_color[datum.name]})
    .transition().ease(d3.easeCubic).duration(aduration)
    .attr('width', (datum) => {return xBarScale(xBarValue(datum))}); // use xSacle to re-scale data space (domain) and return the rescaled population; 
}
