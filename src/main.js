// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './assets/styles/all.less'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$token = '7AE5A-45CEA-984A4-31594'

Vue.use(VueAxios, axios)
Vue.use(iView)

Vue.prototype.Url = {
  getTopics: 'https://cnodejs.org/api/v1/topics'
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,  // 注入到根实例中
  render: h => h(App)
})
