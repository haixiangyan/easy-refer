import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Public from '../views/Public.vue'
import Application from '@/views/Application.vue'
import Job from '@/views/Job.vue'
import User from '@/views/User.vue'
import NotFound from '@/views/NotFound.vue'
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
    component: Application,
    meta: {requireAuth: true}
  },
  {
    path: '/job',
    name: 'Job',
    component: Job,
    meta: {requireAuth: true}
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {requireAuth: true}
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

router.beforeEach((to, from, next) => {
  if (!to.name) return next(new Error('No route name'))
  if (!(store.state as any).auth.isLogin as boolean && to.meta.requireAuth) {
    console.log('ll')
    next('/login')
  } else {
    next()
  }
})

export default router
