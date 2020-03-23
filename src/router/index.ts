import Vue from 'vue'
import VueRouter from 'vue-router'
import Public from '../views/Public.vue'
import Application from '@/views/Application.vue'
import Job from '@/views/Job.vue'
import User from '@/views/User.vue'
import NotFound from '@/views/NotFound.vue'
import AuthService from '@/services/AuthService'
import Login from '@/views/Login.vue'

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
    path: '/login',
    name: 'Login',
    component: Login
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

const privateRouteNames: string[] = ['Application', 'Job', 'User']

router.beforeEach((to, from, next) => {
  if (!to.name) return next(new Error('No route name'))

  if (!AuthService.isLogin && privateRouteNames.indexOf(to.name) >= 0) {
    next('/login')
  } else {
    next()
  }
})

export default router
