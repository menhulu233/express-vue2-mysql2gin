<template>
  <div id='admin_recruitment_box'>
    <Tabs value="1">
      <TabPane label="用户反馈信息总览" name="1">
        <section class="data-main">
          <section class="normal-bg">
            <h3 class="item-head">可编辑表格</h3>
            <section class="item-content">
              <Table :columns="tbColumns" border :data="tbData"></Table>
            </section>
          </section>
        </section>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import {changeQuestion} from "@/api";
import {getQuestionsList} from "@/api";
import { deleteQuestion } from "@/api";
export default {
  name: "questionManage",
  data() {
    return {
      tbColumns: [ //主要是render不同
        {
          title: "反馈内容",
          key: "content",
          render: (h, params) => {
            if (params.row.edit) {
              return h("Input", {
                props: {
                  value: params.row.content,
                },
                attrs: {
                  id: `content_${params.index}`
                },
                on: {
                  "on-blur": () => {
                    this.tbDataCopy[params.index].content = document.querySelector(`#content_${params.index} input`).value;
                  }
                }
              });
            } else {
              return h("span", params.row.content);
            }
          }
        },
        {
          title: "反馈时间",
          key: "date",
          render: (h, params) => {
            if (params.row.edit) {
              return h("Input", {
                props: {
                  value: params.row.date,
                },
                attrs: {
                  id: `date_${params.index}`
                },
                on: {
                  "on-blur": () => {
                    this.tbDataCopy[params.index].date = document.querySelector(`#date_${params.index} input`).value;
                  }
                }
              });
            } else {
              return h("span", params.row.date);
            }
          }
        },
        {
          title: "处理状态",
          key: "status",
          render: (h, params) => {
            // 0：未处理, 1：处理
            if (params.row.edit) {
              return h('RadioGroup', {
                props: {
                  value: params.row.status
                },
                on: {
                  'on-change': (val) => {
                    this.tbDataCopy[params.index].status = val
                  }
                }
              }, [
                h('Radio', {
                  props: {
                    label: 0
                  }
                }, '未处理'),
                h('Radio', {
                  props: {
                    label: 1
                  }
                }, '已处理')
              ])
            } else {
              return h('span', {}, params.row.status ==='未处理' ? '未处理' : '已处理')
            }
          }
        },
        {
          title: "用户id",
          key: "adminId",
          render: (h, params) => {
            if (params.row.edit) {

              return h("Input", {
                props: {
                  value: params.row.adminId,
                },
                attrs: {
                  id: `adminId_${params.index}`
                },
                on: {
                  "on-blur": () => {
                    this.tbDataCopy[params.index].adminId = document.querySelector(`#adminId_${params.index} input`).value;
                  }
                }
              });
            } else {
              return h("span", params.row.adminId);
            }
          }
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            if (params.row.edit) {
              return h("div", [
                h(
                    "span",
                    {
                      style: {
                        cursor: "pointer",
                        color: "#81d740"
                      },
                      on: {
                        click: async () => {
                          for (let key in this.tbDataCopy[params.index]) {
                            this.tbData[params.index][key] = this.tbDataCopy[params.index][key];
                          }
                          //保存数据
                          var status = ''
                          if (this.tbData[params.index].status == 0) {
                            status = '未处理'
                          } else {
                            status = '已处理'
                          }

                          await changeQuestion({
                            id: this.tbData[params.index].id,
                            content: this.tbData[params.index].content,
                            status: status,
                            adminId: this.tbData[params.index].adminId,

                          })
                          this.tbData[params.index].edit = false;
                        }
                      }
                    },
                    "保存"
                ),
                h(
                    "span",
                    {
                      style: {
                        cursor: "pointer",
                        color: "#4d85e8",
                        "margin-left": "20px"
                      },
                      on: {
                        click: () => {
                          this.tbData[params.index].edit = false;
                        }
                      }
                    },
                    "取消"
                )
              ]);
            } else {
              return h("div", [
                h(
                    "span",
                    {
                      style: {
                        cursor: "pointer",
                        color: "green"
                      },
                      on: {
                        click: () => {
                          this.tbData[params.index].edit = true;
                        }
                      }
                    },
                    "编辑"
                ),
                h(
                    "span",
                    {
                      style: {
                        cursor: "pointer",
                        color: "red",
                        "margin-left": "20px"
                      },
                      on: {
                        click: async () => {
                          for (let key in this.tbDataCopy[params.index]) {
                            this.tbData[params.index][key] = this.tbDataCopy[params.index][key];
                          }
                          //保存数据
                          let message=await deleteQuestion({
                            id: this.tbData[params.index].id,
                          })
                          if(message.code==200){
                          this.getData()
                          this.$Message.info('删除成功')
                          this.tbData[params.index].edit = false;
                        }
                        else{
                
                          this.$Message.info('删除失败')
                        }
                        }

                      }
                    },
                    "删除"
                )
              ]);
            }
          }
        }
      ],
      tbData: [],
      tbDataCopy: [],
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      let res = await getQuestionsList()
      let result = res.result
      result.forEach(item => {
        item.edit = false
      })
      this.tbData = result
      this.tbDataCopy = result
    }
  }
}
</script>

<style scoped>

</style>