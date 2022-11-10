import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title:'众乐乐博客'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('@/views/article/detail.vue')
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import('@/views/article/edit.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
