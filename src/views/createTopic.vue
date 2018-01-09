<template>
  <div>
    <Card class="ivu-card-base ivu-card-nopad">
      <div slot="title" class="flex flex-sb">
        <span>最近创建的话题</span>
      </div>
      <detilTopic :list='userList.recent_topics' :isIndex='false'></detilTopic>
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
        userList: []
      }
    },
    methods: {
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