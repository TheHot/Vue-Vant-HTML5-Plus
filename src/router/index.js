import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import XinHe from '@/views/xinhe'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/xinhe',
    name: 'XinHe',
    component: XinHe
  }

]

const router = new VueRouter({
  routes
})

export default router
