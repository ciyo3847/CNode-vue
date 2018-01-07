<template>
  <div class="content">
    <div class="container">
      <Card>
        <div slot="title">
          <h1>{{topic.title}}</h1>
          <ul class="li-after-cicle li-col ivu-font-xs">
            <li>发布于 {{topic.create_at}}</li>
            <li>作者 {{topic.author.loginname}}</li>
            <li>{{topic.reply_count}} 次浏览</li>
            <li>来自 {{topic.tab}}</li>
          </ul>
        </div>
        <div v-html='topic.content'></div>
      </Card>
      <Card class="ivu-card-base ivu-card-nopad" v-if='topic.replies.length'>
        <div slot="title">
          {{ topic.replies.length }} 回复
        </div>
        <div>
          <div v-for='(item, index) in topic.replies' class="ivu-pad-m border-top flex">
            <img :src='item.author.avatar_url' alt="" class="replace-avatar-img ivu-mar-r-m">
            <div class="flex-allspace">
              <p class="clearfix">
                <span class="float-left">
                  {{ item.author.loginname }} {{ index + 1 }}楼 {{ item.create_at }}
                </span>
                <span class="float-right">
                  <!-- <Icon type="trash-a" size="16" v-if='is_uped' @click="confimDeleteReplace(item.reply_id)"></Icon> -->
                  <Icon type="ios-heart-outline" class="ivu-mar-l-xs"></Icon>
                  {{ item.ups.length }}
                  <Icon type="ios-redo" class="ivu-mar-l-xs" size="16"></Icon>
                </span>
              </p>
              <div v-html="item.content"></div>
            </div>
          </div>
        </div>
      </Card>
      <Card class="ivu-card-base ivu-card-nopad">
        <div slot="title">
          添加回复
        </div>
        <div class="ivu-pad-m">
          <Form :model="repliceContent" :rules="rule" ref="replace">
            <FormItem prop="text">
              <Input v-model="repliceContent.text" placeholder="" type="textarea" :rows="4">
              </Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click='replaceCheck("replace")'>回复</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
      <!-- <Modal
        v-model="deleteReplaceModal"
        title="删除评论"
        @on-ok="deleteReplace"
        @on-cancel="cancel">
        <p>确认删除评论</p>
    </Modal> -->
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        reply_id: '',
        deleteReplaceModal: false,
        mdrender: false,
        topic: {},
        repliceContent: {
          text: ''
        },
        rule: {
          text: [
            { required: true, message: '回复内容不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // confimDeleteReplace (id) {
      //   this.reply_id = id
      //   this.deleteReplaceModal = true
      // },
      // deleteReplace () {
      //   this.$http({
      //     url: `${this.Url.getTopic}${this.$route.params.topicId}/delete`,
      //     methods: 'post',
      //     data: {
      //       accesstoken: this.$token,
      //       reply_id: this.reply_id
      //     }
      //   }).then((res) => {
      //     this.$Message.success('删除成功')
      //     this.getData()
      //   }).catch((res) => {
      //     this.$Message.error(res.error_msg)
      //   })
      // },
      replaceCheck (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            // this.$Message.success('Success!')
            this.setRplace()
          } else {
            this.$Message.error('Fail!')
          }
        })
      },
      setRplace () {
        console.log(this.repliceContent.text)
        this.$http({
          url: `${this.Url.getTopic}${this.$route.params.topicId}/replies`,
          method: 'post',
          data: {
            accesstoken: this.$token,
            content: this.repliceContent.text
          }
        }).then((res) => {
          this.$Message.success('评论成功')
          this.getData()
          this.repliceContent.text = ''
        }).catch((res) => {
          this.$Message.error(res.error_msg)
        })
      },
      getData () {
        this.$http({
          url: `${this.Url.getTopic}${this.$route.params.topicId}`,
          method: 'get',
          params: {
            accesstoken: this.$token,
            mdrender: this.merender
          }
        }).then((res) => {
          this.topic = res.data.data
        }).catch((res) => {
          console.log('UserCom.vue: ', res)
        })
      }
    },
    mounted () {
      // console.log(this.$route.params.topicId)
      this.getData()
    }
  }
</script>