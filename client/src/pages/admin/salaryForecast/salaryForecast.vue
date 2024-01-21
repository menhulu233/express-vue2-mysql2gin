<template>
  <div>
    <Tabs value="薪资预测">
      <TabPane label="薪资预测" name="薪资预测">
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
              <Button type="primary" @click="getJobSalaryByCondition">查询</Button>
              <Button style="margin-left: 20px;" @click="reset">重置</Button>
            </li>
          </ul>
        </div>
        <div>
          <ul class="ul">
            <li>
              <div class="left">平均薪资下限</div>
              <div class="right">{{ salaryStart }}</div>
            </li>
            <li>
              <div class="left">平均薪资上限</div>
              <div class="right">{{ salaryEnd }}</div>
            </li>
            <li>
              <div class="left">最高薪资下限</div>
              <div class="right">{{ maxSalaryStart }}</div>
            </li>
            <li>
              <div class="left">最高薪资上限</div>
              <div class="right">{{ maxSalaryEnd }}</div>
            </li>
            <li>
              <div class="left">最低薪资下限</div>
              <div class="right">{{ minSalaryStart }}</div>
            </li>
            <li>
              <div class="left">最低薪资上限</div>
              <div class="right">{{ minSalaryEnd }}</div>
            </li>
          </ul>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import {getJobSalaryByCondition} from '@/api'
import {educationList, experienceList} from "@/data";

export default {
  name: "salaryForecast",
  data() {
    return {
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
      },
      "salaryStart": "", //平均薪资下限
      "salaryEnd": "",  //平均薪资上限
      "maxSalaryStart": "", //最高薪资下限
      "maxSalaryEnd": "", //最高薪资上限
      "minSalaryStart": "", // 最低薪资下限
      "minSalaryEnd": "",//最低薪资上限
    }
  },
  mounted() {
    this.getJobSalaryByCondition()
  },
  methods: {
    // 重置
    reset() {
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
      }
    },
    // 薪资预测
    getJobSalaryByCondition() {
      getJobSalaryByCondition(this.searchInfo).then(res => {
        if (res.code === 200) {
          this.salaryStart = res.result[0].salaryStart
          this.salaryEnd = res.result[0].salaryEnd
          this.maxSalaryStart = res.result[0].maxSalaryStart
          this.maxSalaryEnd = res.result[0].maxSalaryEnd
          this.minSalaryStart = res.result[0].minSalaryStart
          this.minSalaryEnd = res.result[0].minSalaryEnd
        }
      })
    },
  }
}
</script>

<style scoped lang="stylus">
ul>li{
  >.left{
    margin-top: 10px
    margin-bottom: 5px
  }
  >.right{
    font-weight: bold
    color: #1890ff
  }
}
</style>