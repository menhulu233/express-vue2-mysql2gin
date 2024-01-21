<template>
  <div class="mine">
    <Tabs value="name1">
      <TabPane label="基本资料" name="name1">
        <ul class="ul">
          <li>
            <div class="left">头像：</div>
            <div class="right" @click="jsUploadImage">
              <Avatar :src="avatar" shape="square" icon="ios-person" />
            </div>
          </li>
          <li>
            <div class="left">手机号：</div>
            <div class="right">
              {{phone}}
            </div>
          </li>
          <li>
            <div class="left">姓名：</div>
            <div class="right">
              <Input maxlength="20" v-model="realName" placeholder="请输入姓名"
                     style="width: 30rem"/>
            </div>
          </li>
          <li>
            <div class="left">性别：</div>
            <div class="right">
              <el-radio v-model="gender" :label="1">男</el-radio>
              <el-radio v-model="gender" :label="0">女</el-radio>
            </div>
          </li>
<!--  city: '', // 期望城市
      industry: '', // 期望行业
      position: '', // 期望职位
      salaryStart: 0, // 期望最低薪资
      salaryEnd: 10000, // 期望最高薪资
      education: '', // 我的学历
      experience: '', // 我的工作经验        -->
          <li>
            <div class="left">期望城市：</div>
            <div class="right">
              <Input maxlength="20" v-model="city" placeholder="请输入期望城市"
                     style="width: 30rem"/>
            </div>
          </li>
          <li>
            <div class="left">期望行业：</div>
            <div class="right">
              <Input maxlength="20" v-model="industry" placeholder="请输入期望行业"
                     style="width: 30rem"/>
            </div>
          </li>
          <li>
            <div class="left">期望职位：</div>
            <div class="right">
              <Input maxlength="20" v-model="position" placeholder="请输入期望职位"
                     style="width: 30rem"/>
            </div>
          </li>
          <li>
            <div class="left">期望薪资：</div>
            <div class="right">
              <Input maxlength="20" v-model="salaryStart" placeholder="请输入期望最低薪资"
                     style="width: 30rem"/>
              <span>~</span>
              <Input maxlength="20" v-model="salaryEnd" placeholder="请输入期望最高薪资"
                     style="width: 30rem"/>
            </div>
          </li>
          <li>
            <div class="left">我的学历：</div>
            <div class="right">
              <Select v-model="education" placeholder="学历" style="width: 200px;">
                <Option v-for="i in educationList" :key="i.value" :value="i.value">{{ i.label }}</Option>
              </Select>
            </div>
          </li>
          <li>
            <div class="left">我的工作经验：</div>
            <div class="right">
              <Select v-model="experience" placeholder="工作经验" style="width: 200px;">
                <Option v-for="i in experienceList" :key="i.value" :value="i.value">{{ i.label }}</Option>
              </Select>
            </div>
          </li>
          <li>
            <div class="left"></div>
            <div class="right">
              <Button @click="saveAdmin" type="primary">保存信息</Button>
            </div>
          </li>
        </ul>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import config from './../../../config'
import {getAdminInfo, reviseAdminInfo, uploadFile} from "../../../api";
import {check_name} from "@/common/js/myFun";
import {educationList, experienceList} from "@/data";

export default {
  name: "Mine",
  data(){
    return{
      experienceList,
      educationList,

      realName: '',
      gender: 1,
      avatar: '',
      phone: '',
      /* // 期望城市
        city: {
            type: Sequelize.STRING(20),
        },
        // 期望行业
        industry: {
            type: Sequelize.STRING(30),
        },
        // 期望职位
        position: {
            type: Sequelize.STRING(30),
        },
        // 期望最低薪资
        salaryStart: {
            type: Sequelize.INTEGER,
        },
        // 期望最高薪资
        salaryEnd: {
            type: Sequelize.INTEGER,
        },
        // 我的学历
        education: {
            type: Sequelize.STRING(30),
        },
        // 我的工作经验
        experience: {
            type: Sequelize.STRING(30),
        }*/
      city: '', // 期望城市
      industry: '', // 期望行业
      position: '', // 期望职位
      salaryStart: 0, // 期望最低薪资
      salaryEnd: 10000, // 期望最高薪资
      education: '', // 我的学历
      experience: '', // 我的工作经验
    }
  },
  mounted() {
    if(config.getCache('adminId')){
      getAdminInfo({
        adminId: config.getCache('adminId')
      }).then(res=>{
        if(res.code === 200){
          // eslint-disable-next-line no-console
          console.log(res.result.adminInfo);
          this.realName = res.result.adminInfo.realName;
          this.gender = res.result.adminInfo.gender;
          this.avatar = res.result.adminInfo.avatar;
          this.phone = res.result.adminInfo.phone;
          this.city = res.result.adminInfo.city;
          this.industry = res.result.adminInfo.industry;
          this.position = res.result.adminInfo.position;
          this.salaryStart = res.result.adminInfo.salaryStart || 0;
          this.salaryEnd = res.result.adminInfo.salaryEnd || 10000;
          this.education = res.result.adminInfo.education;
          this.experience = res.result.adminInfo.experience;
        }else{
          this.$Modal.error({
            title: '提示',
            content: res.data
          });
        }
      })
    }else{
      this.$router.replace('/admin')
    }
  },
  methods:{
    jsUploadImage(){
      // eslint-disable-next-line no-console
      console.log(2);
      // 生成一个input
      let input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';

      input.onchange = (e) => {
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('file', file);
        uploadFile(formData).then(res=>{
          if(res.code === 200){
            this.avatar = res.result.url;
          }else{
            this.$Modal.error({
              title: '提示',
              content: res.data
            });
          }
        })
      };
      input.click();

    },
    async saveAdmin() {
      let {realName, gender, avatar,city,industry,position,salaryStart,salaryEnd,education,experience} = this;
      if (!check_name(realName)) {
        return this.$Message.warning('昵称格式错误');
      }
      if(!city){
        return this.$Message.warning('请输入期望城市');
      }
      if(!industry){
        return this.$Message.warning('请输入期望行业');
      }
      if(!position){
        return this.$Message.warning('请输入期望职位');
      }
      if(!education){
        return this.$Message.warning('请输入我的学历');
      }
      if(!experience){
        return this.$Message.warning('请输入我的工作经验');
      }

      let data = await reviseAdminInfo({
        reviseGender: gender, avatar,city,industry,position,salaryStart,salaryEnd,education,experience,
        reviseRealName: realName, id: config.getCache('adminId')
      });
      if (data.code === 200) {
        this.$Message.success(data.data);
        // 刷新界面
        window.location.reload();
      } else {
        this.$Message.error(data.data);
      }
    },
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.mine{
  padding: 2rem
}

  ul>li{
    >.left{
      margin-top: 10px
      margin-bottom: 5px
    }
  }
</style>
