import Vue from 'vue'
import VueRouter from 'vue-router'
import Public from '../views/Public.vue'
import Application from '@/views/Application.vue'
import Job from '@/views/Job.vue'
import User from '@/views/User.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/public',
  },
  {
    path: '/public',
    name: 'Public',
    component: Public
  },
  {
    path: '/application',
    name: 'Application',
    component: Application
  },
  {
    path: '/job',
    name: 'Job',
    component: Job
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
