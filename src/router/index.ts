import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import JobList from '../views/JobList.vue'
import MyReferList from '@/views/MyReferList.vue'
import User from '@/views/User.vue'
import NotFound from '@/views/NotFound.vue'
import Login from '@/views/Login.vue'
import EditUser from '@/views/EditUser.vue'
import AddJob from '@/views/AddJob.vue'
import EditJob from '@/views/EditJob.vue'
import ApplyRefer from '@/views/ApplyRefer.vue'
import OtherRefer from '@/views/OtherRefer.vue'
import EditRefer from '@/views/EditRefer.vue'
import OtherReferList from '@/views/OtherReferList.vue'

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
    name: 'AddJob',
    component: AddJob,
    meta: {requireAuth: true}
  },
  {
    path: '/edit-job',
    name: 'EditJob',
    component: EditJob,
    meta: {requireAuth: true}
  },
  {
    path: '/apply-refer/:jobId',
    name: 'ApplyRefer',
    component: ApplyRefer
  },
  {
    path: '/edit-refer/:referId',
    name: 'EditRefer',
    component: EditRefer,
    meta: {requireAuth: true}
  },
  {
    path: '/my/refer-list',
    name: 'MyReferList',
    component: MyReferList,
    meta: {requireAuth: true}
  },
  {
    path: '/other/refer-list',
    name: 'OtherReferList',
    component: OtherReferList,
    meta: {requireAuth: true}
  },
  {
    path: '/other/refer/:referId/',
    name: 'OtherRefer',
    component: OtherRefer,
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
