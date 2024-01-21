<template>
  <div>
    <div class="top" style="margin-bottom: 20px;">
      <Button @click="importExcelData">选择爬取的数据（数据清洗）</Button>
      <span style="margin-left: 10px;">共（{{data.length}}）条</span>
      <Button @click="addJob" type="primary" style="margin-left: 10px;">一键导入数据库</Button>
    </div>
    <div v-if="loading">
      <Progress :percent="progress" :stroke-width="20" status="active" text-inside />
    </div>
    <Table :columns="columns" :data="data">

    </Table>
  </div>
</template>

<script>
import {addJob} from "../../../api";
import {Message} from "view-design";
import xlsx from 'xlsx'

export default {
  name: "dataManage",
  data() {
    return {
      columns: [
        {
          title: '平台',
          key: 'platform',
          width: 160,
        },
        {
          title: '省份',
          key: 'province',
          width: 160,
        },
        {
          title: '城市',
          key: 'city',
          width: 160,
        },
        {
          title: '区域',
          key: 'area',
          width: 160,
        },
        {
          title: '行业',
          key: 'industry',
          width: 160,
        },
        {
          title: '职位',
          key: 'position',
          width: 160,
        },
        {
          title: '职位名称',
          key: 'jobName',
          width: 160,
        },
        {
          title: '工作经验',
          key: 'experience',
          width: 160,
        },
        {
          title: '学历',
          key: 'education',
          width: 160,
        },
        {
          title: '最低薪资',
          key: 'salaryStart',
          width: 160,
        },
        {
          title: '最高薪资',
          key: 'salaryEnd',
          width: 160,
        },
        {
          title: '公司名称',
          key: 'companyName',
          width: 160,
        },
        {
          title: '公司类型',
          key: 'companyType',
          width: 160,
        },
        {
          title: '公司规模',
          key: 'companySize',
          width: 160,
        },
        {
          title: '公司福利',
          key: 'companyWelfare',
          width: 250,
        },
        {
          title: 'url',
          key: 'url',
          width: 300,
        },
      ],
      data: [],
      loading: false,
      progress: 0,
    }
  },
  mounted() {

  },
  methods: {
    readFile(file){
      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = ev =>{
          resolve(ev.target.result)
        }
      })
    },
    // 睡眠
    sleep(time) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, time)
      })
    },
    async addJob(){
      // 获取总数量
      let total = this.data.length;
      // 获取成功导入的数量
      let success = 0;
      // 获取失败导入的数量
      let fail = 0;
      // 获取失败的数据
      let failData = [];
      // 定义进度
      let progress = 0;
      this.progress = progress;
      this.loading = true;
      // for in 循环
      for (let i in this.data){
        let res = await addJob(this.data[i]);
        await this.sleep(20);
        progress = (i / total * 100).toFixed(2);
        this.progress = parseInt(progress);
        if (res.code === 200){
          success++;
        }else {
          fail++;
          failData.push(this.data[i]);
        }
      }
      this.$Notice.success({
        title: '数据处理完毕',
        desc: `共${total}条数据，成功${success}条，重复${fail}条，重复数据未导入数据库`,
        duration: 0
      });
      this.loading = false;
    },
    importExcelData() {
      // 生成一个input
      let input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel';

      input.onchange = async (e) => {
        let file = e.target.files[0];
        try {
          if(!file) return ;

          // 读取文件名
          let fileName = file.name;
          // 去掉后缀
          fileName = fileName.substring(0, fileName.lastIndexOf('.'));
          /*
          *  boss直聘的文件名：山东-济南-新能源-经理-boss直聘.xls 、山东-济南-互联网-Web前端-boss直聘.xls
          *
          * 智联招聘的文件名：浙江-杭州-互联网-HR.xls、山东-青岛-计算机软件-嵌入式工程师.xls*/
          // 先获取平台
          let platform = fileName.split('-')[4] ? fileName.split('-')[4].split('.')[0] : "智联招聘";
          // 获取省份
          let province = fileName.split('-')[0];
          // 获取城市
          let city = fileName.split('-')[1];
          // 获取行业
          let industry = fileName.split('-')[2];
          // 获取职位
          let position = fileName.split('-')[3];
          // eslint-disable-next-line no-console
          console.log({platform, province, city, industry, position})
          // 读取file的内容 二进制
          let data = await this.readFile(file);
          // 解析二进制数据
          let workbook = xlsx.read(data, {
            type: "binary"
          });
          let worksheet = workbook.Sheets[workbook.SheetNames[0]];

          // eslint-disable-next-line no-unused-vars
          let jobList = [];
          // 如果是boss直聘
          if (platform === 'boss直聘'){
            // 将解析的数据转为csv格式
            let res = xlsx.utils.sheet_to_csv(worksheet);
            // 将csv格式的数据转为array
            let jobArr = res.split('\n');
            // 去掉最后一个空元素
            jobArr.pop();
            jobArr.forEach(item => {
              // 每个item的数据 互联网前端开发,济南·长清区·长清大学城,5-6K,经验不限,学历不限,长清大学城帮创网络,https://www.zhipin.com/gongsi/b1aac1ee276791a71nB80ty1FFA~.html,移动互联网未融资0-20人,前端开发WEB开发HTML5小程序Web端全栈开发CSSJavaScript,有无线网，包吃，全勤奖，底薪加提成，补充医疗保险，住房补贴，包住，保底工资，节日福利，团建聚餐，员工旅游，企业年金，宿舍有空调，年终奖，五险一金，绩效奖金，股票期权，零食下午茶，餐补,孙先生经理
              let job = item.split(',');
              // 去掉最后一个空字符串
              job.pop();
              // 得到的数组中 第一个元素是职位名称，第二个元素是公司地址（包含区），第三个元素是薪资（包含起始），第四个元素是工作经验，第五个元素是学历，第六个元素是公司名称，第七个元素是公司url，第八个元素是公司规模，第九个元素是公司福利
              let jobName = job[0];
              let companyAddress = job[1];
              let salary = job[2];
              let experience = job[3];
              let education = job[4];
              let companyName = job[5];
              let url = job[6];
              let companyScale = job[7];
              let companyWelfare = job[9];
              // 获取区【济南·长清区·长清大学城、济南·长清区、济南】
              let area = companyAddress.split('·')[1] ? companyAddress.split('·')[1] : "";
              // 【salary可能为：5-6K、18-25K·14薪】 如果不是这两种就忽略此数据 使用正则匹配
              let reg = /(\d+)-(\d+)K/;
              if (reg.test(salary)){
                // 获取薪资的最小值
                let salaryStart = salary.match(reg)[1] * 1000;
                // 获取薪资的最大值
                let salaryEnd = salary.match(reg)[2] * 1000;
                // companyScale可能为：移动互联网未融资10000人以上、移动互联网D轮及以上1000-9999人
                // 使用正则获取公司规模
                let reg2 = /(\d+)-(\d+)人/;
                let reg3 = /(\d+)人以上/;
                let companyScaleStart = 0;
                let companyScaleEnd = 0;
                let companySize;
                if (reg2.test(companyScale)){
                  companyScaleStart = companyScale.match(reg2)[1];
                  companyScaleEnd = companyScale.match(reg2)[2];
                  companySize = companyScaleStart + "-" + companyScaleEnd + "人";
                }else if (reg3.test(companyScale)){
                  companyScaleStart = companyScale.match(reg3)[1];
                  companySize = companyScaleStart + "人以上"
                }
                // 前面的是公司类型
                let companyType = companyScale.split(companySize)[0];
                // 删除 及
                companyType = companyType.replace(/及/g, "");
                // 删除 以上
                companyType = companyType.replace(/以上/g, "");


                // eslint-disable-next-line no-console
                // console.log({area, jobName, experience, education, salaryStart, salaryEnd, companyName,companyType, companySize, companyWelfare, url});
                jobList.push({area, jobName, experience, education, salaryStart, salaryEnd, companyName,companyType, companySize, companyWelfare, url, platform, province, city, industry, position, });
              }

            })
            this.data = jobList;
          }
          else {
            // 将解析的数据转为csv格式
            let jobArr = xlsx.utils.sheet_to_json(worksheet, {header: [
                "区域", "职位名称", "公司名称", "薪资", "工作经验", "学历", "公司类型", "公司规模", "公司福利", "公司url"
              ]});
            // 智联招聘
            jobArr.forEach(job => {
              let companyAddress = job['区域'];
              let jobName = job['职位名称'];
              let companyName = job['公司名称'];
              let salary = job['薪资'];
              let experience = job['工作经验'] === "不限" ? "经验不限" : job['工作经验'];
              let education = job['学历'];
              let companyType = job['公司类型'];
              let companySize = job['公司规模'];
              let companyWelfare = job['公司福利'].replace(/\n/g, "，");
              let url = job['公司url'];

              // 获取区【上海、上海-浦东】
              let area = companyAddress.split('-')[1] ? companyAddress.split('-')[1] : "";
              // 薪资salary可能为：1千-5千、9千-2万（9千-1.3万）、1万-1.9万、面议
              if(salary!="面议"){
                // 使用正则匹配1千-5千
                let reg = /(\d+\.\d*|\d+)千-(\d+\.\d*|\d+)千/;
                let salaryStart = 0;
                let salaryEnd = 0;
                if (reg.test(salary)){
                  // eslint-disable-next-line no-console
                  console.log(companyName, '千-千');
                  // 获取薪资的最小值
                  salaryStart = salary.match(reg)[1] * 1000;
                  // 获取薪资的最大值
                  salaryEnd = salary.match(reg)[2] * 1000;
                }
                // 使用正则匹配9千-2万 万对应的数字可能是小数
                let reg2 = /(\d+\.\d*|\d+)千-(\d+\.\d*|\d+)万/;
                if (reg2.test(salary)){
                  // eslint-disable-next-line no-console
                  console.log(companyName, '千-万');
                  // 获取薪资的最小值
                  salaryStart = salary.match(reg2)[1] * 1000;
                  // 获取薪资的最大值
                  salaryEnd = salary.match(reg2)[2] * 1000 * 10;
                }
                // 使用正则匹配1万-1.9万
                let reg3 = /(\d+\.\d*|\d+)万-(\d+\.\d*|\d+)万/;
                if (reg3.test(salary)){
                  // eslint-disable-next-line no-console
                  console.log(companyName, '万-万');
                  // 获取薪资的最小值
                  salaryStart = salary.match(reg3)[1] * 10000;
                  // 获取薪资的最大值
                  salaryEnd = salary.match(reg3)[2] * 10000;
                }
                if(salaryEnd === 0 || salaryStart === 0){
                  return
                }
                jobList.push({area, jobName, experience, education, salaryStart, salaryEnd, companyName,companyType, companySize, companyWelfare, url, platform, province, city, industry, position, });
              }
            })
            this.data = jobList;
          }
        }catch (e) {
          // eslint-disable-next-line no-console
          console.log(e);
          Message.error('文件格式不正确');
        }
      };
      input.click();

    },
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
