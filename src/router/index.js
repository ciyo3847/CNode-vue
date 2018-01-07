import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home'
import topic from '@/views/topic'
import author from '@/views/author'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/topic/:topicId',
    name: 'topic',
    component: topic
  },
  {
    path: '/author/:authorId',
    name: 'author',
    component: author
  }
]

var router = new VueRouter({
  routes
})
export default router
