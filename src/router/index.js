import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import discoveryRoutes from './discovery'

const routes = [
  {
    path: '/',
    redirect: '/discovery',
    component: ()=> import('@/components/layout'),
    children: [
      {
        // 发现音乐
        path: '/discovery',
        component: ()=> import('@/views/discovery'),
        children: discoveryRoutes
      },
      {
        path: '/privatefm',
        component: ()=> import('@/views/privatefm')
      },
      {
        path: '/video',
        component: ()=> import('@/views/video'),
        children:[
          {
            path: '',
            redirect: 'mv',
          },
          {
            path: 'mv',
            component: ()=> import('@/views/video/mv'),
          },
          {
            path: 'shipin'
          }
        ]
      },
      {
        path:'totalmv',
        component: ()=> import('@/views/total-mv'),
      },
      {
        path: '/firend',
        component: ()=> import('@/views/firend')
      },




      {
        // 设置
        path: '/settings',
        component: ()=> import('@/views/settings')
      },
    ]
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
