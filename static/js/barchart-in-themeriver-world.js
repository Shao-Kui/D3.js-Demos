console.log('Entering barchar in themeriver. ');

var worldId = ['韩国​', '日本​', '意大利​', '伊朗​', '新加坡​', '美国​', '德国​', '法国​', '科威特​', '泰国​', '西班牙​', '巴林​', '澳大利亚​', '马来西亚​', '英国​', '阿联酋​', '越南​', '加拿大​', '瑞士​', '瑞典​', '以色列​', '伊拉克​', '阿曼​', '奥地利​', '俄罗斯​', '克罗地亚​', '挪威​', '希腊​', '菲律宾​', '芬兰​', '黎巴嫩​', '罗马尼亚​', '印度​', '巴基斯坦​', '丹麦​', '格鲁吉亚​', '荷兰​', '墨西哥​', '阿尔及利亚​', '阿富汗​', '阿塞拜疆​', '爱沙尼亚​', '巴西​', '白俄罗斯​', '北马其顿​', '比利时​', '冰岛​', '柬埔寨​', '立陶宛​', '摩纳哥​', '尼泊尔​', '尼日尼亚​', '斯里兰卡​', '新西兰'];

const dateSort = function(b,a){
    return new Date(b['日期']) - new Date(a['日期']);
}

const personSort = function(b,a){
    return (a['确诊人数']) - (b['确诊人数']);
}

const worldSort = function(b,a){
    var i = worldId.length;
    while(i-=1){
        if (worldId[i] === a['国家']){
            break;
        }
    }
    var j = worldId.length;
    while(j-=1){
        if (worldId[i] === b['国家']){
            break;
        }
    }
    return i - j;
}

const toNameValue = function(data){
    let ret = [];
    for(let i = 0; i < barKeys.length; i++){
        ret.push({name: barKeys[i], value: data[barKeys[i]]});
    }
        return ret;
}

const barValue = d => { return(d['确诊人数']); }; 
let barScale;

const setting_up_barchart = function(data){
    data = data.filter(datum => {return datum['国家'] !== '中国'});
    barScale = d3.scaleLinear()
            .domain([d3.min(data, barValue), d3.max(data, barValue)])
            .range([0, 200]);
    let c = 0; 
    let intervalId = setInterval(function(){
        if(c >= alldates.length){
            console.log('time to close this animation');
            clearInterval(intervalId); 
        }else{
            date = alldates[c];
            let data_today = data.filter(datum => {return datum['日期'] === date});
            data_today = data_today.filter(datum => {return datum['确诊人数'] !== 0});
            data_today.sort(personSort);
            renderbarchart(data_today);
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

const renderbarchart = function(data){
    let x = 170;
    let y = 700;
    g = d3.select('#mainsvg').selectAll('.rect-barchart');

    var update = g.data(data);
    var enter = update.enter();
    
    enter.append('rect')
    .attr('class', 'rect-barchart')
    .attr('x', function (d,i) { return x + 22*i; })
    .attr('y', function (d,i) {
        return y - barScale(d['确诊人数']);
    })
    .attr('width', 15)
    .attr('height', d => barScale(d['确诊人数']))
    .attr('fill', d => world_color_themeriver[d['国家']])
    // .attr('fill', '#454445')
    .attr('opacity', 0.)
    .transition().ease(d3.easeCubic)
    .attr('opacity', 1.);

    update.transition().ease(d3.easeCubic).duration(aduration)
    // .attr('fill', '#454445')
    .attr('fill', d => world_color_themeriver[d['国家']])
    .attr('y', function (d,i) {
        return y - barScale(d['确诊人数']);
    })
    .attr('height', d => barScale(d['确诊人数']));

    g = d3.select('#mainsvg').selectAll('.text-barchart');

    var update = g.data(data);
    var enter = update.enter();

    enter.append('text')
    .attr('class', 'text-barchart')
    .attr('x', function (d,i) { return x + 22*i + 15 / 2; })
    .attr('y', function (d,i) {
        return y - barScale(d['确诊人数']) - 5;
    })
    .style('font-size', '.7em')
    .attr('text-anchor', 'middle')
    .text(d => d['确诊人数'])
    .attr('opacity', 0.)
    .transition().ease(d3.easeCubic)
    .attr('opacity', 1.);

    update.transition().ease(d3.easeCubic).duration(aduration)
    .attr('y', function (d,i) {
        return y - barScale(d['确诊人数']) - 5;
    })
    .text(d => d['确诊人数']);

    g = d3.select('#mainsvg');
    g.selectAll('.cnt').remove();

    var aaaa= ['国家', '总数', data.length];
    g.selectAll('.cnt').data(aaaa).enter().append('text')
    .attr('class', 'cnt')
    .attr('x', function (d,i) { return x + 22*data.length + 40; })
    .attr('y', function (d,i) { 
        return y + 10 + 30*i; })
    .style('font-size', '1.7em')
    .attr('text-anchor', 'middle')
    // .style('font-weight', 'bold')
    // .style('font-family', 'FangSong')
    .text(d => d);

    g.selectAll('.label1-barchart').remove();
    g.selectAll('.label2-barchart').remove();
    g.selectAll('.label3-barchart').remove();
    g.selectAll('.label4-barchart').remove();
    g.selectAll('.label-barchart').remove();

    g = d3.select('#mainsvg').selectAll('.label-barchart');

    var update = g.data(data);
    var enter = update.enter();

    enter.append('text')
    .attr('class', 'label-barchart')
    .attr('x', function (d,i) { return x + 22*i + 15 / 2; })
    .attr('y', y + 10)
    .attr('text-anchor', 'middle')
    .style('font-size', '1em')
    .attr("dominant-baseline", "central")
    .text(d => d['国家'][0]);

    update.transition().ease(d3.easeCubic).duration(aduration)
    .text(d => d['国家'][0]);

   
    g = d3.select('#mainsvg').selectAll('.label1-barchart');

    var update = g.data(data);
    var enter = update.enter();
    enter.append('text')
    .attr('class', 'label1-barchart')
    .attr('x', function (d,i) { return x + 22*i + 15 / 2; })
    .attr('y', y + 30)
    .attr('text-anchor', 'middle')
    .style('font-size', '1em')
    .attr("dominant-baseline", "central")
    .text(d => d['国家'][1]);

    update.transition().ease(d3.easeCubic).duration(aduration)
    .text(d => d['国家'][1]);
    
    g = d3.select('#mainsvg').selectAll('.label2-barchart');

    var update = g.data(data);
    var enter = update.enter();
    enter.append('text')
    .attr('class', 'label2-barchart')
    .attr('x', function (d,i) { return x + 22*i + 15 / 2; })
    .attr('y', y + 50)
    .attr('text-anchor', 'middle')
    .style('font-size', '1em')
    .attr("dominant-baseline", "central")
    .text(d => d['国家'][2]);

    update.transition().ease(d3.easeCubic).duration(aduration)
    .text(d => d['国家'][2]);

    g = d3.select('#mainsvg').selectAll('.label3-barchart');

    var update = g.data(data);
    var enter = update.enter();
    enter.append('text')
    .attr('class', 'label3-barchart')
    .attr('x', function (d,i) { return x + 22*i + 15 / 2; })
    .attr('y', y + 70)
    .attr('text-anchor', 'middle')
    .style('font-size', '1em')
    .attr("dominant-baseline", "central")
    .text(d => d['国家'][3]);

    update.transition().ease(d3.easeCubic).duration(aduration)
    .text(d => d['国家'][3]);

    g = d3.select('#mainsvg').selectAll('.label4-barchart');

    var update = g.data(data);
    var enter = update.enter();
    enter.append('text')
    .attr('class', 'label4-barchart')
    .attr('x', function (d,i) { return x + 22*i + 15 / 2; })
    .attr('y', y + 90)
    .attr('text-anchor', 'middle')
    .style('font-size', '1em')
    .attr("dominant-baseline", "central")
    .text(d => d['国家'][4]);

    update.transition().ease(d3.easeCubic).duration(aduration)
    .text(d => d['国家'][4]);

    // const textbarchart = g.selectAll('.text-barchart').data(data, data => data.name);
    // textbarchart.enter().append('text').attr('class', 'text-barchart')
    // .attr('y', datum => yscalehere(yBarValue(datum)) + yscalehere.bandwidth() / 2 - 12)
    // .attr('x', 204)
    // .attr('text-anchor', 'start');
    // textbarchart.text(d => d.value)
    // .transition().ease(d3.easeCubic).duration(aduration)
    // .attr('x', (datum) => {
    //     return 210 + xBarScale(xBarValue(datum));
    // });
    
    // g.selectAll('.rect-barchart')
    // .data(data)
    // .join('rect')
    // .attr('class', 'rect-barchart') // note to assgin class to it, or it will create new rect each time instead of smooth animation; 
    // .attr('x', 194)
    // .attr('y', datum => yscalehere(yBarValue(datum))-10)
    // .attr('height', yscalehere.bandwidth() / 2)
    // .attr('fill', function(datum){return barchart_color[datum.name]})
    // .transition().ease(d3.easeCubic).duration(aduration)
    // .attr('width', (datum) => {return xBarScale(xBarValue(datum))}); // use xSacle to re-scale data space (domain) and return the rescaled population; 
}
