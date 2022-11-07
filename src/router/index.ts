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
    path: '/article',
    name: 'Article',
    component: () => import('@/views/article.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
