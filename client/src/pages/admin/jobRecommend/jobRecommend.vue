<template>
  <div id='admin_recruitment_box'>
    <Tabs value="1">
      <TabPane label="职位推荐（根据个人期望）" name="1">

        <Table :columns="columns" :data="recruitmentList">

        </Table>
        <Page @on-page-size-change="pageSizeChange" @on-change="pageChange" v-model="page" style="margin-top: 20px;"
              :total="total" show-sizer :page-size="pageSize"/>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import {deleteJob, getAdminInfo, getJobList} from "@/api";
import moment from "moment";
import {educationList, experienceList} from "@/data";
import config from "@/config";

export default {
  name: "jobRecommend",
  data() {
    return {
      recruitmentList: [],
      columns: [
        {
          title: 'ID',
          key: 'id',
          width: 100,
          fixed: 'left'
        },
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
        // 操作
        {
          title: '操作',
          key: 'action',
          width: 100,
          fixed: 'right',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    // 跳转至原网址 _blank
                    window.open(params.row.url)
                  }
                }
              }, '原网址'),
            ]);
          }
        }
      ],
      total: 0,
      pageSize: 20,
      page: 1,
      experienceList,
      educationList,

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
    getAdminInfo({
      adminId: config.getCache('adminId')
    }).then(res=>{
      if(res.code === 200){
        // eslint-disable-next-line no-console
        console.log(res.result.adminInfo);
        this.searchInfo.city = res.result.adminInfo.city;
        this.searchInfo.industry = res.result.adminInfo.industry;
        this.searchInfo.position = res.result.adminInfo.position;
        this.searchInfo.salaryStart = res.result.adminInfo.salaryStart || 0;
        this.searchInfo.salaryEnd = res.result.adminInfo.salaryEnd || 10000;
        this.searchInfo.education = res.result.adminInfo.education;
        this.searchInfo.experience = res.result.adminInfo.experience;
        this.getRecruitmentList();

      }else{
        this.$Modal.error({
          title: '提示',
          content: res.data
        });
      }
    })
  },
  methods: {
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getRecruitmentList();
    },
    pageChange(page) {
      this.page = page;
      this.getRecruitmentList();
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
    async handleDelete(index, row) {
      // eslint-disable-next-line no-console
      console.log(row.id);
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该条招聘信息吗？',
        onOk: async () => {
          let res = await deleteJob({
            id: row.id
          });
          if (res.code === 200) {
            this.$Message.success('删除成功');
            this.recruitmentList.splice(index, 1);
          } else {
            this.$Message.error('删除失败');
          }
        },
        onCancel: () => {
          this.$Message.info('取消删除');
        }
      });
    },
    async getRecruitmentList() {
      let data = await getJobList({
        page: this.page,
        pageSize: this.pageSize,
        ...this.searchInfo
      });
      if (data.code === 200) {
        data.result.map(i => {
          i.createdAt = moment(i.createdAt).format('YYYY-MM-DD HH:mm:ss')
        })
        this.recruitmentList = data.result;
        this.total = data.total;
      } else {
        this.$Message.warning(data.data)
      }
    },
  }
}
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
#admin_recruitment_box {

  width: 100%

  .recruitment-list {
    width: 100%
  }

  .publish {
    width: 100%

    > ul {
      width: 100%
      display flex
      flex-wrap wrap

      > li {
        width: 50%
        line-height: 4rem
        display flex
        padding 0 1rem
        margin-bottom: 1rem

        > .left {
          flex 3
          min-width 15rem
          max-width 15rem
          text-align right
          padding-right: 1rem
        }

        > .right {
          flex 7
        }
      }
    }
  }
}

</style>
