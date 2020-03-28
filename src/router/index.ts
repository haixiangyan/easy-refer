import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import JobList from '../views/JobList.vue'
import ReferList from '@/views/ReferList.vue'
import ResumeList from '@/views/ResumeList.vue'
import User from '@/views/User.vue'
import NotFound from '@/views/NotFound.vue'
import Login from '@/views/Login.vue'
import EditUser from '@/views/EditUser.vue'
import AddJob from '@/views/AddJob.vue'
import Apply from '@/views/Apply.vue'
import Application from '@/views/Application.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/job-list',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/job-list',
    name: 'JobList',
    component: JobList
  },
  {
    path: '/refer-list',
    name: 'ReferList',
    component: ReferList,
    meta: {requireAuth: true}
  },
  {
    path: '/resume-list',
    name: 'ResumeList',
    component: ResumeList,
    meta: {requireAuth: true}
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {requireAuth: true}
  },
  {
    path: '/edit-user',
    name: 'EditUser',
    component: EditUser,
    meta: {requireAuth: true}
  },
  {
    path: '/add-job',
    name: 'EditJob',
    component: AddJob,
    meta: {requireAuth: true}
  },
  {
    path: '/edit-job/:jobId',
    name: 'AddJob',
    component: AddJob,
    meta: {requireAuth: true}
  },
  {
    path: '/apply/:jobId',
    name: 'Apply',
    component: Apply
  },
  {
    path: '/application/:applicationId',
    name: 'Application',
    component: Application,
    meta: {requireAuth: true}
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
    next('/login')
  } else {
    next()
  }
})

export default router
