<template>
  <div>
    <Tabs value="全国学历要求分布">
      <TabPane label="全国学历要求分布" name="全国学历要求分布">
        <div id="getJobCountByEducation"></div>
      </TabPane>
      <TabPane label="学历要求分布" name="学历要求分布">
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
              <Button type="primary" @click="getJobCountByEducationByCondition">查询</Button>
              <Button style="margin-left: 20px;" @click="reset">重置</Button>
            </li>
          </ul>
        </div>
        <div id="getJobCountByEducationByCondition"></div>
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
  getJobCountByEducation,
  getJobCountByEducationByCondition,
} from '@/api';
import {educationList, experienceList} from "@/data";

HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
export default {
  name: "educationAnalysis",
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
    this.getJobCountByEducation();
    this.getJobCountByEducationByCondition();
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
    async getJobCountByEducation(){
      let res = await getJobCountByEducation();
      let data = res.result;
      let experience = [];
      let count = [];
      data.forEach(item=>{
        experience.push(item.education);
        count.push(item.count);
      })
      // 饼图
      Highcharts.chart('getJobCountByEducation', {
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
          }
        },
        title: {
          text: '全国学历要求分布'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
              enabled: true,
              format: '{point.name}'
            }
          }
        },
        series: [{
          type: 'pie',
          name: '学历要求',
         /* data: [
            ['大专', count[0]],
            ['本科', count[1]],
            ['硕士', count[2]],
            ['博士', count[3]],
            ['其他', count[4]],
          ]*/
          data: data.map(item=>{
            return {
              name: item.education,
              y: item.count
            }
          })
        }]
      });

    },

    async getJobCountByEducationByCondition(){
      let res = await getJobCountByEducationByCondition({
        ...this.searchInfo
      });
      let data = res.result;
      let position = [];
      let count = [];
      data.forEach(item=>{
        position.push(item.education);
        count.push(item.count);
      })
      // 饼图
      Highcharts.chart('getJobCountByEducationByCondition', {
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0
          }
        },
        title: {
          text: '学历要求分布'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            depth: 35,
            dataLabels: {
              enabled: true,
              format: '{point.name}'
            }
          }
        },
        series: [{
          type: 'pie',
          name: '学历要求',
          /*data: [
            ['大专', count[0]],
            ['本科', count[1]],
            ['硕士', count[2]],
            ['博士', count[3]],
            ['其他', count[4]],
          ]*/
          data: data.map(item=>{
            return {
              name: item.education,
              y: item.count
            }
          })
        }]
      });
    },
  }
}
</script>

<style scoped>

</style>