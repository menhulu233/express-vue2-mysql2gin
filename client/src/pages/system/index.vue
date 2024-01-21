<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" :style="{height:clientHeight+'px'}" hide-trigger collapsible :collapsed-width="78"
             v-model="isCollapsed">
        <Menu :active-name="activeName" @on-select="replacePath" theme="dark" width="auto" :class="menuitemClasses">
          <MenuItem name="/system/dataManage">
            <Icon type="md-contact"/>
            <span>爬虫数据管理</span>
          </MenuItem>
          <MenuItem name="/system/recruitmentManage">
            <Icon type="md-list-box"/>
            <span>数据总览</span>
          </MenuItem>
          <MenuItem name="/system/adminManage">
            <Icon type="md-list-box"/>
            <span>用户数据总览</span>
          </MenuItem>
          <MenuItem name="/system/questionManage">
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
            招聘网站数据可视化分析录入平台</h1>
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
      if (this.$route.path.includes('/system/dataManage')) {
        return '/system/dataManage'
      } else if (this.$route.path.includes('/system/recruitmentManage')) {
        return '/system/recruitmentManage'
      }
    }
  },
  mounted() {
    if (this.$route.path !== '/system/login') {
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

  },
  watch: {
    '$route.path': function (newVal) {
      this.active = newVal;
      if (newVal !== '/system/login') {
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
            config.delCache('systemId');
            this.$router.replace('/system/login');
          }
        });
      }
    },
    isLogin() {
      if (!config.getCache('systemId')) {
        this.$router.replace('/system/login')
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
