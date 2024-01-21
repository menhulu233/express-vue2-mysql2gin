<template>
  <div>
    <Tabs value="建议反馈" ref="tabs">
      <TabPane label="建议结果" name="suggestionsList">
        <Table stripe :columns="columns1" :data="data1"></Table>
      </TabPane>
      <TabPane label="提交建议" name="提交建议">
        <Form :model="formItem" :label-width="80">
          <FormItem label="建议内容">
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请输入你的建议"/>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="submit">提交建议</Button>
            <Button style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import {addQuestion, getQuestionsList} from "@/api";
import config from '@/config'

export default {
  name: "question", data() {
    return {
      formItem: {
        textarea: ''
      },
      columns1: [
        {
          title: '內容',
          key: 'content'
        },
        {
          title: '日期',
          key: 'date'
        },
        {
          title: '状态',
          key: 'status'
        }
      ],
      data1: []
    }
  },
  mounted() {
    this.getQuestion()
    this.$refs.tabs.activeKey = 'suggestionsList'

  },
  methods: {

    getDate() {
      let currentDate = new Date();

      let year = currentDate.getFullYear(); // 获取当前年份
      let month = currentDate.getMonth() + 1; // 获取当前月份（注意月份是从0开始的，所以要加1）
      let day = currentDate.getDate(); // 获取当前日期
      let hours = currentDate.getHours(); // 获取当前小时
      let minutes = currentDate.getMinutes(); // 获取当前分钟
      let seconds = currentDate.getSeconds(); // 获取当前秒数

      return "提交时间" + year + "-" + month + "-" + day + '-' + hours + ":" + minutes + ":" + seconds
    },

    async getQuestion() {
      let res = await getQuestionsList()
      let result = res.result
      let adminId = config.getCache('adminId')
      let data = result.filter(item => item.adminId == adminId)
      this.data1 = data
    },
    async submit() {
      let content = this.formItem.textarea
      let status = '未处理';
      let adminId = config.getCache('adminId')
      let message=await addQuestion({
        adminId: adminId,
        content: content,
        status: status,
        date: this.getDate()
      })
      if (message.code==200){
        this.getQuestion()
        this.$Message.info('提交成功');
      }
      else{
        this.$Message.warning('提交失败');
      }
    },
  }
}

</script>

<style scoped>

</style>