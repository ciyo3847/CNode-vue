<template>
  <div>
    <Card class="ivu-card-base ivu-card-nopad">
      <div slot="title" class="flex flex-sb">
        <span>最近创建的话题</span>
        <a href="javascript:;" @click="readCreatMore()">查看更多</a>
      </div>
      <detilTopic :list='userList.recent_topics' :isIndex='false' :limit="creatLimit"></detilTopic>
    </Card>
    <Card class="ivu-card-base ivu-card-nopad">
      <div slot="title" class="flex flex-sb">
        <span>最近参加的话题</span>
        <a href="javascript:;" @click="readAttendMore()">查看更多</a>
      </div>
      <detilTopic :list='userList.recent_replies' :isIndex='false' :limit="attendLimited"></detilTopic>
    </Card>
  </div>
</template>
<script>
  import detilTopic from '../components/detilTopic'
  export default{
    components: {
      detilTopic
    },
    data () {
      return {
        userList: [],
        creatLimit: 4,
        attendLimited: 4
      }
    },
    methods: {
      readCreatMore () {
        this.$router.push({ path: 'createTopic' })
      },
      readAttendMore () {
        this.$router.push({ path: 'attendTopic' })
      },
      getData () {
        this.$http({
          url: `${this.Url.getUser}${this.$route.params.loginname}`,
          method: 'get'
        }).then((res) => {
          this.userList = res.data.data
          console.log(this.userList)
        }).catch((res) => {
          console.log('UserCom.vue: ', res)
        })
      }
    },
    mounted () {
      this.getData()
    }
  }
</script>