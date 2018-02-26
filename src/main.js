// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import iView from 'iview'
import mavonEditor from 'mavon-editor'
import 'iview/dist/styles/iview.css'
import 'mavon-editor/dist/css/index.css'
import './assets/styles/all.less'

localStorage.setItem('token', '')
localStorage.setItem('loginname', '')
localStorage.setItem('avatar_url', '')

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$token = '66c267cd-a0a3-451c-858b-137c9f97998e'

Vue.use(VueAxios, axios)
Vue.use(iView)
Vue.use(Vuex)
Vue.use(mavonEditor)

let url = 'https://cnodejs.org/api/v1/'
Vue.prototype.Url = {
  getTopicList: `${url}topics`,
  getTopic: `${url}topic/`,
  login: `${url}accesstoken`,
  collectTopic: `${url}topic_collect/collect`,
  cancelCollectTopic: `${url}topic_collect/de_collect`,
  reply: `${url}reply/`,
  getUser: `${url}user/`,
  userCollectTopic: `${url}topic_collect/`,
  publishTopic: `${url}topics`
  // setReplice: `${url}post/topic/${topic_id}/replies`
}

const store = new Vuex.Store({
  state: {
    tab: 'all',
    activeIndex: 0
  },
  mutations: {
    changeTab (state, tab) {
      state.tab = tab.tab
      state.activeIndex = tab.activeIndex
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,  // 注入到根实例中
  store,
  render: h => h(App)
})
