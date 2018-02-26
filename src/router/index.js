import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home'
import topic from '@/views/topic'
import author from '@/views/author'
import authorIndex from '@/views/authorIndex'
import createTopic from '@/views/createTopic'
import attendTopic from '@/views/attendTopic'
import publish from '@/views/publish'
import message from '@/views/message'
import me from '@/views/me'
import login from '@/views/login'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    component: login
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
    component: publish,
    meta: { requiresAuth: true }
  },
  {
    path: '/message',
    name: 'message',
    component: message,
    meta: { requiresAuth: true }
  },
  {
    path: '/me',
    name: 'me',
    component: me,
    meta: { requiresAuth: true }
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
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('token')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
