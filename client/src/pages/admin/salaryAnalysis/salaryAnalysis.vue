<template>
  <div>
    <Tabs value="全国薪资排行">
      <TabPane label="全国薪资排行" name="全国薪资排行">
        <div id="getJobCountBySalary"></div>
      </TabPane>
      <TabPane label="薪资水平" name="薪资水平">
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
              <span>职位：</span>
              <Input v-model="searchInfo.position" placeholder="职位" style="width: 200px;" />
            </li>
            <li>
              <span>工作经验：</span>
              <Select v-model="searchInfo.experience" placeholder="工作经验" style="width: 200px;">
                <Option v-for="i in experienceList" :key="i.value" :value="i.value">{{ i.label }}</Option>
              </Select>
            </li>
            <li>
              <span>学历：</span>
              <Select v-model="searchInfo.education" placeholder="学历" style="width: 200px;">
                <Option v-for="i in educationList" :key="i.value" :value="i.value">{{ i.label }}</Option>
              </Select>
            </li>
            <li>
              <span>最低薪资：</span>
              <InputNumber :max="searchInfo.salaryEnd - 1" :min="0" v-model="searchInfo.salaryStart" />
            </li>
            <li>
              <span>最高薪资：</span>
              <InputNumber :max="99999999999999999" :min="searchInfo.salaryStart + 1" v-model="searchInfo.salaryEnd" />
            </li>
            <li>
              <Button type="primary" @click="getJobCountBySalaryByCondition">查询</Button>
              <Button style="margin-left: 20px;" @click="reset">重置</Button>
            </li>
          </ul>
        </div>
        <div id="getJobCountBySalaryByCondition"></div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import {
  getJobCountBySalary,
  getJobCountBySalaryByCondition,
} from '@/api';
import {educationList, experienceList} from "@/data";

HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
export default {
  name: "salaryAnalysis",
  data(){
    return{
      experienceList,
      educationList,

      // 筛选
      searchInfo: {
        // 省
        province: '',
        // 城市
        city: '',
        // 行业
        industry: '',
        // 职位
        position: '',
        experience: '',// 工作经验
        education: '',// 学历
        salaryStart: 0,// 最低薪资
        salaryEnd: 99999999999999999,// 最高薪资
      }
    }
  },
  mounted(){
    this.getJobCountBySalary();
    this.getJobCountBySalaryByCondition();
  },
  methods:{
    reset(){
      this.searchInfo = {
        // 省
        province: '',
        // 城市
        city: '',
        // 行业
        industry: '',
        // 职位
        position: '',
        experience: '',// 工作经验
        education: '',// 学历
        salaryStart: 0,// 最低薪资
        salaryEnd: 99999999999999999,// 最高薪资
      }
    },
    async getJobCountBySalary(){
      let res = await getJobCountBySalary();
      let data = res.result;
      let experience = [];
      let count = [];
      data.forEach(item=>{
        experience.push(item.label);
        count.push(item.count);
      })
      Highcharts.chart('getJobCountBySalary', {
        chart: {
          type: 'column'
        },
        title: {
          text: '全国薪资排行'
        },
        xAxis: {
          categories: experience,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: '薪资数量'
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
          name: '薪资数量',
          data: count

        }]
      });

    },

    async getJobCountBySalaryByCondition(){
      let res = await getJobCountBySalaryByCondition({
        ...this.searchInfo
      });
      let data = res.result;
      let position = [];
      let count = [];
      data.forEach(item=>{
        position.push(item.salary);
        count.push(item.count);
      })
      Highcharts.chart('getJobCountBySalaryByCondition', {
        chart: {
          type: 'column'
        },
        title: {
          text: '薪资数量'
        },
        xAxis: {
          categories: position,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: '薪资数量'
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
          name: '薪资数量',
          data: count

        }]
      });
    },
  }
}
</script>

<style scoped>

</style>