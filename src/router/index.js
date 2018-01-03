import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home'
// import freeHero from '@/components/freeHero'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  }
  // {
  //   path: '/hero/free-hero',
  //   name: 'freeHero',
  //   component: freeHero
  // }
]

var router = new VueRouter({
  routes
})
export default router
