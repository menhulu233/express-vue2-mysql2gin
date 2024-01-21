<template>
  <div>
    <Tabs value="词云分析">
      <TabPane label="词云图" name="词云图">
        <div class="top" style="margin: 20px 0;visibility: visible">
          <ul class="myul">
            <!--    按照searchInfo     province: '', // 省份
                    city: '', // 城市
                    area: '',// 区
                    industry: '', // 行业
                    position: '', // 职位
                    experience: '',// 工作经验
                    education: '',// 学历
                    salaryStart: 0,// 最低薪资
                    salaryEnd: 99999999999999999,// 最高薪资
                    companyName: '',// 公司名称   -->
            <li>
              <span>省份：</span>
              <Input v-model="searchInfo.province" placeholder="省份" style="width: 200px;"/>
            </li>
            <li>
              <span>城市：</span>
              <Input v-model="searchInfo.city" placeholder="城市" style="width: 200px;"/>
            </li>
            <li>
              <span>区：</span>
              <Input v-model="searchInfo.area" placeholder="区" style="width: 200px;"/>
            </li>
            <li>
              <span>行业：</span>
              <Input v-model="searchInfo.industry" placeholder="行业" style="width: 200px;"/>
            </li>
            <li>
              <span>职位：</span>
              <Input v-model="searchInfo.position" placeholder="职位" style="width: 200px;"/>
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
              <InputNumber :max="searchInfo.salaryEnd - 1" :min="0" v-model="searchInfo.salaryStart"/>
            </li>
            <li>
              <span>最高薪资：</span>
              <InputNumber :max="99999999999999999" :min="searchInfo.salaryStart + 1" v-model="searchInfo.salaryEnd"/>
            </li>
            <li>
              <span>公司名称：</span>
              <Input v-model="searchInfo.companyName" placeholder="公司名称" style="width: 200px;"/>
            </li>
            <li>
              <Button type="primary" @click="getWords">搜索</Button>
              <Button style="margin-left: 20px;" @click="resetSearch">重置</Button>
            </li>
          </ul>
        </div>
        <div id="chart" style="width: 800px; height: 450px;visibility: visible">
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>


<script>
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import {getWords} from "@/api";
import {educationList, experienceList} from "@/data";

export default {
  name: "ciYun",
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      worddata: [
        {
          name: "十九大精神",
          value: 15000
        },
        {
          name: "两学一做",
          value: 10081
        }, {
          name: "中华民族",
          value: 9386
        },
        {
          name: "马克思主义",
          value: 7500
        },
        {
          name: "民族复兴",
          value: 7500
        },
        {
          name: "社会主义制度",
          value: 6500
        },
        {
          name: "国防白皮书",
          value: 6500
        },
        {
          name: "创新",
          value: 6000
        },
        {
          name: "民主革命",
          value: 4500
        },
        {
          name: "文化强国",
          value: 3800
        },
        {
          name: "国家主权",
          value: 3000
        },
        {
          name: "伟大复兴",
          value: 2500
        },
        {
          name: "领土完整",
          value: 2300
        },
        {
          name: "安全",
          value: 2000
        },
        {
          name: "从严治党",
          value: 1900
        },
        {
          name: "现代化经济体系",
          value: 1800
        },
        {
          name: "国防动员",
          value: 1700
        },
        {
          name: "信息化战争",
          value: 1600
        },
        {
          name: "局部战争",
          value: 1500
        },
        {
          name: "教育",
          value: 1200
        },
        {
          name: "中国梦",
          value: 1100
        },
        {
          name: "孙子兵法",
          value: 900
        },
        {
          name: "一国两制",
          value: 800
        },
        {
          name: "特色社会主义思想",
          value: 700
        },
      ],
      educationList,
      experienceList,
      searchInfo: {
        province: '', // 省份
        city: '', // 城市
        area: '',// 区
        industry: '', // 行业
        position: '', // 职位
        experience: '',// 工作经验
        education: '',// 学历
        salaryStart: 0,// 最低薪资
        salaryEnd: 99999999999999999,// 最高薪资
        companyName: '',// 公司名称
      }
    }
  },
  mounted() {
    this.getWords()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById("chart"));
      const option = {
        backgroundColor: "#fff",
        // tooltip: {
        //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        // },
        series: [
          {
            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 10,
            //用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [14, 60],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            rotationRange: [0, 0],
            //随机生成字体颜色
            // maskImage: maskImage,
            textStyle: {
              normal: {
                color: function () {
                  return (
                      "rgb(" +
                      Math.round(Math.random() * 255) +
                      ", " +
                      Math.round(Math.random() * 255) +
                      ", " +
                      Math.round(Math.random() * 255) +
                      ")"
                  );
                }
              }
            },
            //位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "200%",
            height: "200%",
            //数据
            data: this.worddata
          }
        ]
      };
      this.chart.setOption(option);
    },
    resetSearch() {
      this.searchInfo = {
        province: '', // 省份
        city: '', // 城市
        area: '',// 区
        industry: '', // 行业
        position: '', // 职位
        experience: '',// 工作经验
        education: '',// 学历
        salaryStart: 0,// 最低薪资
        salaryEnd: 99999999999999999,// 最高薪资
        companyName: '',// 公司名称
      }
      this.getRecruitmentList();
    },
    async getWords() {
      let {result} = await getWords(
          {
            ...this.searchInfo
          }
      )
      this.worddata = result
      this.initChart()
    }
  }
}
</script>

<style scoped>

</style>