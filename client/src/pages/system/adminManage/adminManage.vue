<template>
  <div id='admin_recruitment_box'>
    <Tabs value="1">
      <TabPane label="用户信息总览" name="1">
        <Table :columns="columns" :data="recruitmentList">
        </Table>
        <Page @on-page-size-change="pageSizeChange" @on-change="pageChange" v-model="page" style="margin-top: 20px;"
              :total="total" show-sizer :page-size="pageSize"/>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>

import {deleteAdmin, getAdminList} from "@/api";

export default {
  name: "adminManage",
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
          title: '真实姓名',
          key: 'realName',
          width: 360,
        },
        {
          title: '性别',
          key: 'gender',
          width: 360,
        },
        {
          title: '手机',
          key: 'phone',
          width: 360,
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
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.handleDelete(params.index, params.row)
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      total: 0,
      pageSize: 20,
      page: 1,
    }
  },
  mounted() {
    this.getRecruitmentList()
  },
  methods:{
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getRecruitmentList();
    },
    pageChange(page) {
      this.page = page;
      this.getRecruitmentList();
    },
    async handleDelete(index, row) {
      // eslint-disable-next-line no-console
      console.log(row.id);
      this.$Modal.confirm({
        title: '提示',
        content: '确定删除该条招聘信息吗？',
        onOk: async () => {
          let res = await deleteAdmin({
            adminId: row.id
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
      let data = await getAdminList({
        page: this.page,
        pageSize: this.pageSize,
      });
      let adminList=data.result
      adminList.forEach(item=>{
        if (item.gender==1){
          item.gender='男'
        }
        else {
          item.gender='女'
        }
      })
      this.recruitmentList = data.result;
      this.total = data.total;
    }
  }
}

</script>

<style scoped>

</style>