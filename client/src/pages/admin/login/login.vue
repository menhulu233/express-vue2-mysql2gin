<template>
  <div class="login-box">
    <div>
      <div class="top">
        <i class="web-font" style="font-size: 6rem;color: #0084ff;letter-spacing: 2px">招聘网站数据可视化分析平台</i>
      </div>
      <div v-if="isLogin" class="middle">
        <div class="title">
          招聘网站数据可视化分析平台
        </div>
        <Input v-model="phone" placeholder="请输入手机号" clearable style="width: 100%;line-height: 4.5rem;"/>
        <Input v-model="password" placeholder="请输入密码" clearable type="password"
               style="width: 100%;line-height: 4.5rem;"/>
        <Button @click="adminLogin" style="margin-top: 1.5rem;" type="primary" long>登录平台</Button>
        <Button @click="isLogin = false" style="margin-top: 1.5rem;" long>去注册</Button>
      </div>
      <div v-else class="middle">
        <div class="title">
          招聘网站数据可视化分析平台
        </div>
        <Input v-model="phone" placeholder="请输入手机号" clearable style="width: 100%;line-height: 4.5rem;"/>
        <Input v-model="password" placeholder="请输入密码" clearable type="password" style="width: 100%;line-height: 4.5rem;"/>
        <Input v-model="confimPassword" placeholder="请确认密码" clearable type="password" style="width: 100%;line-height: 4.5rem;"/>
        <Button @click="adminRegister" style="margin-top: 1.5rem;" type="primary" long>注册账号</Button>
        <Button @click="isLogin = true" style="margin-top: 1.5rem;" long>去登录</Button>
      </div>
    </div>
  </div>
</template>

<script>
import config from './../../../config'
import {addAdmin, adminLogin} from "../../../api";
import fa from "element-ui/src/locale/lang/fa";
import {check_phone} from "@/common/js/myFun";

export default {
  name: "login",
  computed: {
    fa() {
      return fa
    }
  },
  data() {
    return {
      phone: '',
      password: '',
      confimPassword: '',
      // 当前是注册还是登录
      isLogin: true
    }
  },
  methods: {
    async adminLogin() {
      let {phone, password} = this;
      if (!check_phone(phone)) {
        return this.$Message['warning']({
          background: true,
          content: '请输入正确的手机号码'
        });
      }
      if (!password) {
        return this.$Message['warning']({
          background: true,
          content: '请输入密码'
        });
      }
      let data = await adminLogin({
        phone, password
      });
      if (data.code === 200) {
        config.setCache('adminId', data.result.adminInfo.id);
        this.$router.replace('/admin');
        this.$Message['success']({
          background: true,
          content: data.data
        });
      } else {
        this.$Message['error']({
          background: true,
          content: data.data
        });
      }
    },
    async adminRegister() {
      let {phone, password, confimPassword} = this;
      if (!check_phone(phone)) {
        return this.$Message['warning']({
          background: true,
          content: '请输入正确的手机号码'
        });
      }
      if (!password) {
        return this.$Message['warning']({
          background: true,
          content: '请输入密码'
        });
      }
      if (!confimPassword) {
        return this.$Message['warning']({
          background: true,
          content: '请确认密码'
        });
      }
      if (password !== confimPassword) {
        return this.$Message['warning']({
          background: true,
          content: '两次密码不一致'
        });
      }
      let data = await addAdmin({
        password, phone
      });
      if (data.code === 200) {
        this.$Message['success']({
          background: true,
          content: data.data
        });
      } else {
        this.$Message['error']({
          background: true,
          content: data.data
        });
      }
    }
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.login-box {
  position fixed
  width: 100%
  height: 100%
  left: 0
  top: 0
  z-index 999
  background-color: #b8e5f8

  > div {
    width: 100%
    height: 100%
    background url("./../../../common/images/sign.png") no-repeat
    background-size: cover;

    > .middle {
      width: 40rem
      margin: 0 auto
      padding: 2rem
      background-color: #fff
      box-shadow: 0 .1rem .3rem 0 rgba(0, 0, 0, .1);
      border-radius .5rem
      overflow: hidden;

      > .title {
        width: 100%
        height: 3rem
        display flex
        align-items center
        justify-content center
        font-size: 1.8rem
        font-weight: 600
        margin-bottom: 2rem
      }
    }

    > .top {
      width: 100%
      height: 20rem
      display flex
      align-items center
      justify-content center
    }
  }
}
</style>
