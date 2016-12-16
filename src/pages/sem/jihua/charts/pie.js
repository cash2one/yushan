/**
 * Created by jy on 2016/12/13.
 */
/*eslint-disable */
const echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/pie');
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');

const moduleExports = {
  renderSinglePie(legend, cost) {
    var lin = [];
    var total = 0;
    for (var j in cost) {
      total += parseFloat(cost[j]);
    }
    var total1 = parseInt(total * 0.06)
    for (var i = 0; i < cost.length; i++) {
      if (cost[i] < 10) {
        lin[i] = {
          value: cost[i],
          name: '其他'
        }
      } else if (cost[i] < total1) {
        lin[i] = {
          value: cost[i],
          name: legend[i],
        }
      } else {
        lin[i] = {
          value: cost[i],
          name: legend[i],
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: '{d}%',
                position: 'outer',
              },
              labelLine: {
                show: true,
              }
            }
          }
        }
      }

    }
    return lin;
  },
  renderPie(tit, legend, cost) {
    var legends = [];
    var a = [];
    var datas = this.renderSinglePie(legend, cost);
    var date = 0;
    for (let i = 0; i < datas.length; i++) {
      if (datas[i].name == '其他') {
        date += parseFloat(datas[i].value);
        continue;
      } else {
        a.push(datas[i])
      }
    }
    if (date != 0) {
      var l = {
        value: date,
        name: '其他',
      };
      a.push(l)
    }
    for (let j = 0; j < a.length; j++) {
      legends.push(a[j].name)
    }
    var myChart = echarts.init(document.getElementById('main'));
    var option = {
      title: {
        text: tit,
        x: 'left',
        y: 'top'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        data: legends,
        x: 'right',
        y: 'bottom'
      },
      series: [
        {
          name: '面积模式',
          type: 'pie',
          radius: '70%',
          center: ['30%', '50%'],
          data: a,
          itemStyle: {
            normal: {
              label: {
                show: false,
                formatter: "{d}%",
                position: 'inner'
              },
              labelLine: {
                show: false
              }
            },
            emphasis: {
              label: {
                show: true,
                formatter: "{d}%",
                position: 'inner'
              },
//                                            radius : '40%',
              labelLine: {
                show: false
              },
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    myChart.setOption(option);
    window.onresize = myChart.resize;
  }
};

module.exports = moduleExports;
