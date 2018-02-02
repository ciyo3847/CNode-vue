<template>
  <div class="header">
    <div class="container">
      <div class="nav">
        <a href="https://cnodejs.org/" class="logo" target="_blank">
          <img src="" alt="">
        </a>
        <ul class="li-col">
          <li><router-link to='/'>首页</router-link></li>
          <li><router-link to='/publish'>发表</router-link></li>
          <li>消息</li>
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