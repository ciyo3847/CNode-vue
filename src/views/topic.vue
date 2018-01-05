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
      <Card class="ivu-card-base ivu-card-nopad">
        <div slot="title" class="ivu-pad-m">
          {{}} 回复
        </div>
        <div>
          <div v-for='(item, index) in topic.replies' class="ivu-pad-m border-top flex">
            <img :src='item.author.avatar_url' alt="" class="replace-avatar-img ivu-mar-r-m">
            <div class="flex-allspace">
              <p class="clearfix">
                <span class="float-left">
                  {{item.author.loginname}} {{ index + 1 }}楼 {{item.create_at}}
                </span>
                <span class="float-right">
                  <Icon type="ios-heart-outline"></Icon>
                  {{item.ups.length}}
                  <Icon type="ios-redo" class="ivu-mar-l-xs" size="16"></Icon>
                </span>
              </p>
              <div v-html="item.content"></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        mdrender: false,
        topic: {}
      }
    },
    methods: {
      getData () {
        this.$http({
          url: `${this.Url.getTopic}${this.$route.params.topicId}`,
          method: 'get',
          params: {
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
      console.log(this.$route.params.topicId)
      this.getData()
    }
  }
</script>