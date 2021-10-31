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
        meta:{
          keepAlive: true,
        },
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
        path: '/playlistdetail/:id',
        meta:{ hasKey: true },
        component: ()=> import('@/views/playlist-detail'),
        // children: [
      },
      {
        // 设置
        path: '/settings',
        component: ()=> import('@/views/settings')
      },
      {
        path: '/download',
        component: ()=> import('@/views/download'),
        children:[
          {
            path: '',
            redirect: 'single'
          },
          {
            path: 'single',
          },
          {
            path: 'program'
          },
          {
            path: 'downloading'
          },

        ]
      },
      {
        path: '/recent',
        component: ()=> import('@/views/recent'),
      },
      {
        path: '/search',
        meta:{ hasKey: true },
        component: ()=> import('@/views/search'),
      }
    ]
  },
  {
    path: '/videodetail/:id',
    component: ()=> import('@/views/video-detail'),
  },
  {
    path: '/mvdetail/:id',
    component: ()=> import('@/views/mv-detail'),
  }
]

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
