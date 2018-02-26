<template>
  <div>
    <Card class="ivu-card-base ivu-card-nopad">
      <div slot="title" class="flex flex-sb">
        <span>最近创建的话题</span>
        <a v-if='userList.recent_topics.length' href="javascript:;" @click="readCreatMore()">查看更多</a>
      </div>
      <detilTopic :list='userList.recent_topics' :isIndex='false' :limit="creatLimit"></detilTopic>
      <div class="demo-spin-col"  v-if='loading'>
        <Spin >
         <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
      </div>
    </Card>
    <Card class="ivu-card-base ivu-card-nopad">
      <div slot="title" class="flex flex-sb">
        <span>最近参加的话题</span>
        <a v-if='userList.recent_replies.length' href="javascript:;" @click="readAttendMore()">查看更多</a>
      </div>
      <detilTopic :list='userList.recent_replies' :isIndex='false' :limit="attendLimited"></detilTopic>
      <div class="demo-spin-col"  v-if='loading'>
        <Spin >
         <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
      </div>
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
        attendLimited: 4,
        loading: true
      }
    },
    watch: {
      '$route' (to, from) {
        // this.userList = []
        this.loading = !this.loading
        this.getData()
      }
    },
    methods: {
      readCreatMore () {
        this.$router.push({ name: 'createTopic' })
      },
      readAttendMore () {
        this.$router.push({ name: 'attendTopic' })
      },
      getData () {
        let loginname = this.$route.params.loginname ? this.$route.params.loginname : localStorage.loginname
        this.$http({
          url: `${this.Url.getUser}${loginname}`,
          method: 'get'
        }).then((res) => {
          this.userList = res.data.data
          this.loading = !this.loading
          // console.log(this.userList)
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