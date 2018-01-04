<template>
  <div class="header">
    <div class="container">
      <div class="nav">
        <img src="" alt="" class="logo">
        <ul>
          <li><router-link to='/'>首页</router-link></li>
          <li>发表</li>
          <li>消息</li>
        </ul>
      </div>
      <div class="extra">
        <!-- <a href="javascript:;" @click='login = true'>登录</a> -->
        <div class="user-info">
          <span class="name ivu-mar-r-s">{{authorList.loginname}}</span>
          <img :src='authorList.avatar_url' alt="" class="avatar-img">
        </div>
      </div>
    </div>
    <Modal
        title="登录"
        v-model="login"
        class="ivu-modal-nofooter">
        <login></login>
    </Modal>
  </div>
</template>
<script>
  import login from './login'
  export default {
    data () {
      return {
        login: false,
        authorList: []
      }
    },
    components: {
      login
    },
    methods: {

    },
    mounted () {
      this.$http({
          url: this.Url.login,
          method: 'post',
          params: {
            accesstoken: this.$token
          }
        }).then((res) => {
          this.authorList = res.data
        }).catch((res) => {
          console.log('UserCom.vue: ', res)
        })
    }
  }
</script>