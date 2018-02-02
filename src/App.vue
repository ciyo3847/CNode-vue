<template>
  <div id="app">
    <top></top>
    <router-view/>
    <BackTop></BackTop>
  </div>
</template>

<script>
import top from './components/header'
export default {
  name: 'app',
  components: {
    top
  },
  mounted () {
    let me = this
    this.$http.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      me.$Message.error(error.response.data.error_msg)
      return Promise.reject(error)
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f2f3f5;
  /*text-align: center;*/
  /*margin-top: 60px;*/
}
</style>
