import * as echarts from '../../../components/ec-canvas/echarts';
var util = require('../../../utils/util.js');
var questionUtil = require('../../../utils/question.js');
const app = getApp();

function listToMap(list){
  let obj = {};
  for (let i = 0; i < list.length;i++){
    let key = list[i].str_date;
    let val = list[i].num;
    obj[key] = val;
  }
  return obj;
}

function initChart(canvas, width, height){
  questionUtil.getDoQuestionChart().then(res=>{
    console.info('getDoQuestionChart', res)
    if(res.errno == 0){
      let dateData = util.getDateStr(8);
      console.info('dateData', dateData)
      let dataList = []
      for (let i = 0; i < dateData.length;i++){
        let val = listToMap(res.data)[dateData[i]]
        if(val){
          dataList.push(val);
        }else{
          dataList.push(0);
        }
      }
      chart(canvas, width, height, dataList, dateData)
    }else{
      util.showErrorToast('查询失败' + err);
    }
  }).catch((err) => {
    console.info('err', err)
    util.showErrorToast('查询失败' + err);
  });
}

function chart(canvas, width, height, data,dateData) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '每日练习数',
      left: 'center'
    },
    color: ["#37A2DA"],
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dateData,
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: 'A',
      type: 'line',
      data: data
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {
  }
});

