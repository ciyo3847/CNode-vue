<template>
  <div class="content">
    <div class="container">
      <Card>
        <div slot="title">
          <h1>{{topic.title}}</h1>
          <div class="flex flex-center flex-sb">
            <ul class="li-after-cicle li-col ivu-font-xs">
              <li>发布于 {{topic.create_at}}</li>
              <li v-if="topic.loginname"><router-link :to='{ name: "author", params: { loginname: topic.loginname}}'>作者{{topic.loginname}}</router-link></li>
              <li>{{topic.reply_count}} 次浏览</li>
              <li>来自 {{topic.tab}}</li>
            </ul>
            <a href="javascript:void(0)" @click="collectTopic(topic.id)">
              <Icon type="ios-star" size="30" v-if="is_collect"></Icon>
              <Icon type="ios-star-outline" size="30" v-else></Icon>
            </a>
          </div>
        </div>
        <div v-html='topic.content'></div>
      </Card>
      <Card class="ivu-card-base ivu-card-nopad">
        <div slot="title">
          {{ replayList ? replayList.length : '0'}} 回复
        </div>
        <div v-if='replayList'>
          <div v-for='(item, index) in replayList' class="ivu-pad-m border-top flex flex-wrap">
            <img :src='item.avatar_url' alt="" class="replace-avatar-img ivu-mar-r-m">
            <div class="flex-allspace">
              <p class="clearfix">
                <span class="float-left">
                  {{ item.loginname }} {{ index + 1 }}楼 {{ item.create_at }}
                </span>
                <span class="float-right">
                  <!-- <Icon type="trash-a" size="16" v-if='is_uped' @click="confimDeleteReplace(item.reply_id)"></Icon> -->
                  <a href="javascript:;" @click="replayAction(item.id)">
                    <Icon type="thumbsup" :class='`ivu-mar-l-xs ivu-icon-${item.is_uped ? "up" : "down"}`'></Icon>
                  </a>
                  {{ item.ups_count }}
                  <a href="javascript:;" @click="showReplay(index)">
                    <Icon type="ios-redo" class="ivu-mar-l-xs" size="16"></Icon>
                  </a>
                </span>
              </p>
              <div v-html="item.content"></div>
            </div>
            <!-- <Form :model="repliceContent" :rules="rule" ref="_replace" style="100%" v-if="item.replay_show" class="replay">
              <FormItem prop="text"> -->
              <div class="replay" v-if="item.replay_show">
                <Input v-model="replay_content" placeholder="" type="textarea" :rows="4">
                </Input>
              <!-- </FormItem>
              <FormItem> -->
                <Button class="ivu-mar-t-m" type="primary" @click='_replaceCheck(item.id)'>回复</Button>
              <!-- </FormItem>
            </Form> -->
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
              <Button type="primary" @click='replaceCheck("replace, 0")'>回复</Button>
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
        up_class: '',
        is_collect: '',
        reply_id: '',
        deleteReplaceModal: false,
        mdrender: false,
        topic: {},
        replayList: [],
        replay_content: '',
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
      showReplay (index) {
        this.replay_content = ''
        this.replay_content = `@${this.replayList[index].loginname} `
        this.replayList.map((item, ind) => {
          if (ind === index) {
            item.replay_show = !item.replay_show
          } else {
            item.replay_show = false
          }
        })
      },
      _replaceCheck (id) {
        this.replay_id = id
        // console.log(this.replay_id)
        if (!this.replay_content) {
          this.$Message.error('回复内容不能为空')
          return
        }
        this.setRplace()
      },
      replayAction (id) {
        this.$http({
          url: `${this.Url.reply}${id}/ups`,
          method: 'post',
          data: {
            accesstoken: this.$token
          }
        }).then((res) => {
          this.getData()
        }).catch((res) => {
          this.$Message.error('点赞失败')
          console.log('UserCom.vue: ', res)
        })
      },
      collectTopic (id) {
        let url = this.is_collect ? this.Url.cancelCollectTopic : this.Url.collectTopic
        let successMsg
        let errorMsg
        if (this.is_collect) {
          successMsg = '取消成功'
          errorMsg = '取消失败'
        } else {
          successMsg = '收藏成功'
          errorMsg = '收藏失败'
        }
        this.$http({
          url: url,
          method: 'post',
          data: {
            accesstoken: this.$token,
            topic_id: id
          }
        }).then((res) => {
          this.$Message.success(successMsg)
          this.is_collect = !this.is_collect
        }).catch((res) => {
          this.$Message.error(errorMsg)
        })
      },
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
            content: this.repliceContent.text || this.replay_content,
            replay_id: this.replay_id ? this.replay_id : ''
          }
        }).then((res) => {
          this.$Message.success('评论成功')
          this.getData()
          this.repliceContent.text = ''
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
          let data = res.data.data
          this.topic.create_at = data.create_at
          this.topic.title = data.title
          this.topic.content = data.content
          this.topic.loginname = data.author ? data.author.loginname : 'null'
          this.topic.reply_count = data.reply_count
          this.topic.tab = data.tab
          if (data.replies) {
            data.replies.forEach((item) => {
              let obj = {}
              obj.avatar_url = item.author.avatar_url
              obj.loginname = item.author.loginname
              obj.content = item.content
              obj.create_at = item.create_at
              obj.id = item.id
              obj.is_uped = item.is_uped
              obj.ups_count = item.ups.length
              obj.replay_show = false
              this.replayList.push(obj)
            })
          }
          // console.log(this.topic)
          // console.log(this.replayList)
          this.is_collect = data.is_collect
        })
      }
    },
    mounted () {
      // console.log(this.$route.params.topicId)
      this.getData()
    }
  }
</script>
<style>
  .replay{
    width: 100%;
  }
</style>