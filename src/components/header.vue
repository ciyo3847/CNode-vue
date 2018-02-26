<template>
  <div class="header">
    <div class="container">
      <div class="nav">
        <a href="https://cnodejs.org/" class="logo" target="_blank">
          <img src="../assets/cnodejs_light.svg" alt="">
        </a>
        <ul class="li-col flex flex-center">
          <li><router-link to='/'>首页</router-link></li>
          <li><router-link to='/publish'>发表</router-link></li>
          <li><router-link to='/message'>消息</router-link></li>
          <li><router-link to='/me'>我的</router-link></li>
        </ul>
      </div>
      <div class="extra">
        <a href="javascript:;">Write by Vue.js</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        login: false,
        authorList: []
      }
    },
    methods: {

    },
    mounted () {
    }
  }
</script>