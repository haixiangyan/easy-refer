import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Public from '../views/Public.vue'
import Refer from '@/views/Refer.vue'
import Resume from '@/views/Resume.vue'
import User from '@/views/User.vue'
import NotFound from '@/views/NotFound.vue'
import Login from '@/views/Login.vue'
import EditUser from '@/views/EditUser.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/public',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/public',
    name: 'Public',
    component: Public
  },
  {
    path: '/refer',
    name: 'Refer',
    component: Refer,
    meta: {requireAuth: true}
  },
  {
    path: '/resume',
    name: 'Resume',
    component: Resume,
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
