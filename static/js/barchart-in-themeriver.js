console.log('Entering barchar in themeriver. ');

const dateSort = function(a,b){
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
    let data_tt = data.filter(datum => {return datum['省份'] === '总计'});
    let data_hb = data.filter(datum => {return datum['省份'] === '湖北'});
    data_tt = data_tt.sort(dateSort);
    data_hb = data_hb.sort(dateSort);
    console.log(data_tt);
    console.log(data_hb);
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
    let c = 0; 
    intervalId = setInterval(function(){
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
    '确诊人数': '#ff901a',
    '治愈人数': '#1aff86',
    '死亡人数': '#ff1a35'
}

const renderbarchart = function(data, isTatal){
    let g;
    let yscalehere;
    console.log(isTatal)
    if(isTatal){
        g = d3.select('#maingroup');
        yscalehere = yBandScale;
        data = data.reverse()
        console.log('总计', data);
        // tmp_data = []
        // tmp_data.push(data[2]);
        // tmp_data.push(data[1]);
        // tmp_data.push(data[0]);
        // data = tmp_data;
        // console.log('总计', data);
    }else{
        g = d3.select('#hubeigroup');
        yscalehere = nyBandScale;
        console.log('湖北', data);
    }
    
    g.selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', 100)
    .attr('y', datum => yscalehere(yBarValue(datum)))
    .attr('height', yscalehere.bandwidth() / 3)
    .attr('fill', function(datum){return barchart_color[datum.name]})
    .transition().ease(d3.easeLinear).duration(aduration)
    .attr('width', (datum) => {return xBarScale(xBarValue(datum))}); // use xSacle to re-scale data space (domain) and return the rescaled population; 
}
