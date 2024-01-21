<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" :style="{height:clientHeight+'px'}" hide-trigger collapsible :collapsed-width="78"
             v-model="isCollapsed">
        <Menu :active-name="activeName" @on-select="replacePath" theme="dark" width="auto" :class="menuitemClasses">
          <Submenu name="1">
            <template #title>
              <Icon type="ios-analytics"/>
              个人中心
            </template>
            <MenuItem name="/admin/userInfo">修改资料</MenuItem>
            <MenuItem name="/admin/updatePwd">修改密码</MenuItem>
          </Submenu>

          <MenuItem name="/admin/recruitmentManage">
            <Icon type="md-list-box"/>
            <span>数据总览</span>
          </MenuItem>
          <Submenu name="2">
            <template #title>
              <Icon type="ios-analytics"/>
              数据可视化
            </template>
            <MenuItem name="/admin/areaAnalysis">工作地区分析</MenuItem>
            <MenuItem name="/admin/experienceAnalysis">工作经验分析</MenuItem>
            <MenuItem name="/admin/salaryAnalysis">薪资水平分析</MenuItem>
            <MenuItem name="/admin/educationAnalysis">学历水平分析</MenuItem>
            <MenuItem name="/admin/ciYun">词云分析</MenuItem>
          </Submenu>
          <MenuItem name="/admin/jobRecommend">
            <Icon type="md-list-box"/>
            <span>职位推荐</span>
          </MenuItem>
          <MenuItem name="/admin/salaryForecast">
            <Icon type="md-list-box"/>
            <span>薪资预测</span>
          </MenuItem>
          <MenuItem name="/admin/question">
            <Icon type="md-list-box"/>
            <span>用户反馈</span>
          </MenuItem>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu"
                size="24"></Icon>
          <h1 style="display: inline-block;font-size: 1.6rem;font-weight: 600;text-align: center;color:#000;">
            招聘网站数据可视化分析平台</h1>
          <div style="float:right;margin-right: 3rem;cursor: pointer" class="right">
            <Dropdown @on-click="dropdown">
              <div style="height: 100%;display: flex;align-items: center;">
                <Avatar :src="userInfo.avatar" shape="square" icon="ios-person"/>
                {{ userInfo.realName }}
              </div>
              <DropdownMenu slot="list">
                <DropdownItem name="gout">
                  <Icon type="md-log-out" style="margin-right: .6rem;"/>
                  退出账号
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Header>
        <Content :style="{padding: '20px', background: '#fff',height: (clientHeight - 64) +'px',overflow: 'auto'}">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import config from "../../config";
import {getAdminInfo} from "@/api";

export default {
  name: "index",
  data() {
    return {
      isCollapsed: false,
      clientHeight: '',
      userInfo: {}
    }
  },
  computed: {
    rotateIcon() {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    },
    menuitemClasses() {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    },
    // eslint-disable-next-line vue/return-in-computed-property
    activeName() {
       if (this.$route.path.includes('/admin/topicManage')) {
        return '/admin/topicManage'
      } else if (this.$route.path.includes('/admin/articleManage')) {
        return '/admin/articleManage'
      } else if (this.$route.path.includes('/admin/answerManage')) {
        return '/admin/answerManage'
      } else if (this.$route.path.includes('/admin/recruitmentManage')) {
        return '/admin/recruitmentManage'
      }
    }
  },
  mounted() {
    if (this.$route.path !== '/admin/login') {
      this.isLogin()
    }
    //设置视口高度
    // eslint-disable-next-line no-undef
    this.clientHeight = $(window).height();
    // eslint-disable-next-line no-undef
    $(window).resize(() => {
      // eslint-disable-next-line no-undef
      this.clientHeight = $(window).height();
    });

    getAdminInfo({
      adminId: config.getCache('adminId')
    }).then(res => {
      if (res.code === 200) {
        // eslint-disable-next-line no-console
        console.log(res.result.adminInfo);
        this.userInfo = res.result.adminInfo
      } else {
        this.$Modal.error({
          title: '提示',
          content: res.data
        });
      }
    })
  },
  watch: {
    '$route.path': function (newVal) {
      this.active = newVal;
      if (newVal !== '/admin/login') {
        this.isLogin()
      }
    }
  },
  methods: {
    dropdown(item) {
      if (item === 'gout') {
        this.$Modal.confirm({
          title: '退出账号',
          content: '确认退出招聘网站数据可视化分析平台吗？',
          onOk: () => {
            config.delCache('adminId');
            this.$router.replace('/admin/login');
          }
        });
      }
    },
    isLogin() {
      if (!config.getCache('adminId')) {
        this.$router.replace('/admin/login')
      }
    },
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    replacePath(name) {
      this.$router.replace(name);
    },
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  height: 100%
  overflow: hidden;
}

.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}

.menu-icon {
  transition: all .3s;
}

.rotate-icon {
  transform: rotate(-90deg);
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}

.menu-item i {
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
  font-size: 16px;
}

.collapsed-menu span {
  width: 0px;
  transition: width .2s ease;
}

.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
