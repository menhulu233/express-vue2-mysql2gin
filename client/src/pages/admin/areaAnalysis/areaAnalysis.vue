<template>
<div>
  <Tabs value="每个省的职位数量">
    <TabPane label="每个省的职位数量" name="每个省的职位数量">
      <div id="getJobCountByProvince"></div>
    </TabPane>
    <TabPane label="全国岗位数目热力图" name="全国岗位数目热力图">
      <div id="chart" style="width: 100%; height: 400px;"></div>
    </TabPane>
    <TabPane label="每个城市的职位数量" name="每个城市的职位数量">
      <div class="top" style="margin-bottom: 20px;">
        <ul class="myul">
          <li>
            <span>省份：</span>
            <Input v-model="searchInfo.province" placeholder="请输入省份" style="width: 200px;"/>
          </li>
          <li>
            <Button type="primary" @click="getJobCountByCity">查询</Button>
          </li>
        </ul>
      </div>
      <div id="getJobCountByCity"></div>
    </TabPane>
    <TabPane label="行业职位分布" name="行业职位分布">
      <div class="top" style="margin-bottom: 20px;">
        <ul class="myul">
          <li>
            <span>省份：</span>
            <Input v-model="searchInfo.province" placeholder="请输入省份" style="width: 200px;"/>
          </li>
          <li>
            <span>城市：</span>
            <Input v-model="searchInfo.city" placeholder="请输入城市" style="width: 200px;"/>
          </li>
          <li>
            <Button type="primary" @click="getJobCountByIndustry">查询</Button>
          </li>
        </ul>
      </div>
      <div id="getJobCountByIndustry"></div>
    </TabPane>
    <TabPane label="职位岗位分布" name="职位岗位分布">
      <div class="top" style="margin-bottom: 20px;">
        <ul class="myul">
          <li>
            <span>省份：</span>
            <Input v-model="searchInfo.province" placeholder="请输入省份" style="width: 200px;"/>
          </li>
          <li>
            <span>城市：</span>
            <Input v-model="searchInfo.city" placeholder="请输入城市" style="width: 200px;"/>
          </li>
          <li>
            <span>行业：</span>
            <Input v-model="searchInfo.industry" placeholder="请输入行业" style="width: 200px;"/>
          </li>
          <li>
            <Button type="primary" @click="getJobCountByJob">查询</Button>
          </li>
        </ul>
      </div>
      <div id="getJobCountByJob"></div>
    </TabPane>
  </Tabs>
</div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import * as echarts from 'echarts';
import 'echarts/map/js/china.js'
import {getJobCountByCity, getJobCountByIndustry, getJobCountByJob, getJobCountByProvince} from '@/api';

HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
export default {
  name: "areaAnalysis",
  data(){
    return{
     // 筛选
      searchInfo: {
        // 省
        province: '山东',
        // 城市
        city: '青岛',
        // 行业
        industry: '计算机软件'
      }
    }
  },
  mounted(){
    this.getJobCountByProvince();
    this.getJobCountByCity();
    this.getJobCountByIndustry();
    this.getJobCountByJob();
    this.getChinaMap();
  },
  methods:{
    async getJobCountByProvince(){
      let res = await getJobCountByProvince();
      let data = res.result;
      let province = [];
      let count = [];
      data.forEach(item=>{
        province.push(item.province);
        count.push(item.count);
      })
      Highcharts.chart('getJobCountByProvince', {
        chart: {
          type: 'column'
        },
        title: {
          text: '每个省的职位数量'
        },
        xAxis: {
          categories: province,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: '职位数量'
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} 个</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [{
          name: '职位数量',
          data: count

        }]
      });

    },
    async getJobCountByCity(){
      let res = await getJobCountByCity({
        province: this.searchInfo.province
      });
      let data = res.result;
      let city = [];
      let count = [];
      data.forEach(item=>{
        city.push(item.city);
        count.push(item.count);
      })
      Highcharts.chart('getJobCountByCity', {
        chart: {
          type: 'column'
        },
        title: {
          text: '每个城市的职位数量'
        },
        xAxis: {
          categories: city,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: '职位数量'
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} 个</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [{
          name: '职位数量',
          data: count

        }]
      });
    },
    async getJobCountByIndustry(){
      let res = await getJobCountByIndustry({
        province: this.searchInfo.province,
        city: this.searchInfo.city
      });
      let data = res.result;
      let industry = [];
      let count = [];
      data.forEach(item=>{
        industry.push(item.industry);
        count.push(item.count);
      })
      Highcharts.chart('getJobCountByIndustry', {
        chart: {
          type: 'column'
        },
        title: {
          text: '每个行业的职位数量'
        },
        xAxis: {
          categories: industry,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: '职位数量'
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} 个</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [{
          name: '职位数量',
          data: count

        }]
      });
    },
    async getJobCountByJob(){
      let res = await getJobCountByJob({
        province: this.searchInfo.province,
        city: this.searchInfo.city,
        industry: this.searchInfo.industry
      });
      let data = res.result;
      let position = [];
      let count = [];
      data.forEach(item=>{
        position.push(item.position);
        count.push(item.count);
      })
      Highcharts.chart('getJobCountByJob', {
        chart: {
          type: 'column'
        },
        title: {
          text: '每个职位的职位数量'
        },
        xAxis: {
          categories: position,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: '职位数量'
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} 个</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [{
          name: '职位数量',
          data: count

        }]
      });
    },
    async getChinaMap(){
      let res = await getJobCountByProvince();
      let data = res.result;

      let dataList=[]
      data.forEach(item=>{
        dataList.push({'name':item.province,'value':item.count})
      })

      let myChart = echarts.init(document.getElementById('chart'));
      let options = {
        title: {
          left: "center",
          textStyle: {
            color: "#fff",
            fontSize: 30,
          },
          subtextStyle: {
            fontSize: 20,
          },
        },
        tooltip: {
          triggerOn: "click",
          formatter: function(e) {
            if(e.value){
              return e.seriesName + "<br />" + e.name + "：" + e.value;
            }
            else{
              return e.seriesName + "<br />" + e.name + "：0" ;
            }
          },
        },
        // 热力地图
        visualMap: {
          min: 0,
          max: 5000,
          textStyle: {
            color: "#fff",
          },
        },

        series: [
          {
            name: "岗位数目",
            data: dataList,
            type: "map",
            map: "china",
            zoom: 1.2,
            aspectScale: 0.75,
            label: {
              // 默认文本标签样式
              normal: {
                color: "white",
                show: true,
              },
              // 高亮文本标签样式
              emphasis: {
                color: "yellow",
                fontSize: 22,
                fontWeight: "bold",
              },
            },
            itemStyle: {
              // 默认区域样式
              normal: {
                // 区域背景透明
                areaColor: "transparent",
                borderColor: "rgba(39,211,233, 1)",
                borderWidth: 1,
              },
              // 高亮区域样式
              emphasis: {
                // 高亮区域背景色
                areaColor: "#01ADF2",
              },
            },
          },
        ],
      };

      myChart.setOption(options);
    }

  }
}
</script>

<style scoped>

</style>