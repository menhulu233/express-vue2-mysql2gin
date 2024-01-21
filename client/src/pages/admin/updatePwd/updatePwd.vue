<template>
  <div class="mine">
    <Tabs value="name2">

      <TabPane label="密码修改" name="name2">
        <ul class="ul">
          <li>
            <div class="left">旧密码：</div>
            <div class="right">
              <Input v-model="oldPassword" placeholder="请输入你的旧密码" type="password" style="width: 300px" />
            </div>
          </li>
          <li>
            <div class="left">新密码：</div>
            <div class="right">
              <Input v-model="newPassword" placeholder="请设置你的新密码" type="password" style="width: 300px" />
            </div>
          </li>
          <li>
            <div class="left"></div>
            <div class="right">
              <Button @click="revisePwd" type="primary">修改密码</Button>
            </div>
          </li>
        </ul>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import config from './../../../config'
import {revisePassword} from "../../../api";

export default {
  data(){
    return{
      realName: '',
      gender: 1,
      avatar: '',
      phone: '',
      oldPassword: '',
      newPassword: '',
    }
  },
  mounted() {

  },
  methods:{

    async revisePwd(){
      let {oldPassword, newPassword} = this;
      if(!oldPassword || !newPassword){
        return this.$Message.warning('请填写所有字段');
      }
      let data = await revisePassword({
        oldPassword, newPassword, id: config.getCache('adminId')
      });
      if(data.code === 200){
        this.$Message.success(data.data);
        config.delCache('adminId');
        this.$router.replace('/admin/login');
      }else{
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
