<template>
  <div class="content">
    <div class="container">
      <Card class="">
        <ul class="li-after-cicle li-col">
          <li class="after-no"><img :src="userList.avatar_url" alt="" width="64"></li>
          <li class="ivu-mar-l-l">{{ userList.loginname }}</li>
          <li>{{ userList.score }}积分</li>
          <li>{{ userList.recent_topics ? userList.recent_topics.length : '0' }}个话题收藏</li>
          <li><Icon type="social-github" class="ivu-mar-r-xs"></Icon>{{ userList.githubUsername }}</li>
          <li>注册时间 {{ userList.create_at }}</li>
        </ul>
        <!-- <div class="demo-spin-col"  v-if='loading'>
          <Spin fix>
           <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
          </Spin>
        </div> -->
      </Card>
      <router-view></router-view>
    </div>
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
        userList: []
      }
    },
    watch: {
      '$route' (to, from) {
        // this.loading = !this.loading
        this.getData()
      }
    },
    methods: {
      getData () {
        this.$http({
          url: `${this.Url.getUser}${this.$route.params.loginname}`,
          method: 'get'
        }).then((res) => {
          this.userList = res.data.data
          // this.loading = !this.loading
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