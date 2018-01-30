import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home'
import topic from '@/views/topic'
import author from '@/views/author'
import authorIndex from '@/views/authorIndex'
import createTopic from '@/views/createTopic'
import attendTopic from '@/views/attendTopic'
import publish from '@/views/publish'

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
    path: '/user/:loginname',
    component: author,
    children: [
      {
        path: '/',
        name: 'author',
        component: authorIndex
      },
      {
        path: 'createTopic',
        name: 'createTopic',
        component: createTopic
      },
      {
        path: 'attendTopic',
        name: 'attendTopic',
        component: attendTopic
      }
    ]
  },
  {
    path: '/publish',
    name: 'publish',
    component: publish
  }
]

var router = new VueRouter({
  // mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
export default router
