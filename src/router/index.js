import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import discoveryRoutes from './discovery'

const routes = [
  {
    path: '/',
    redirect: '/discovery',
    component: () => import('@/views/main'),
    children: [
      {
        // 发现音乐
        path: '/discovery',
        component: () => import('@/views/discovery/index'),
        meta:{
          keepAlive: true,
        },
        children: discoveryRoutes
      },
      {
        path: '/private-fm',
        component: () => import('@/views/private-fm/index')
      },
      {
        path: '/shipin',
        component: () => import('@/views/shipin/index'),
        children:[
          {
            path: '',
            redirect: 'mv',
          },
          {
            path: 'mv',
            component: () => import('@/views/shipin/mv/index'),
          },
          {
            path: 'video',
            component: () => import('@/views/shipin/video/index'),
          }
        ]
      },
      {
        path:'total-mv',
        component: () => import('@/views/total-mv/index'),
      },
      {
        path:'mv-toplist',
      },
      {
        path: '/friend',
        component: () => import('@/views/friend/index')
      },
      {
        path: '/exclusive',
        component: () => import('@/views/exclusive/index')
      },
      {
        path: '/playlist',
        component: () => import('@/views/playlist/index'),
      },
      {
        path: '/album',
        component: () => import('@/views/album/index'),
      },
      {
        path: '/radio',
        component: () => import('@/views/radio/index'),
      },
      {
        path: '/singer',
        component: () => import('@/views/singer/index'),
      },
      {
        path: '/user',
        component: () => import('@/views/user/index'),
      },
      {
        // 设置
        path: '/settings',
        component: () => import('@/views/settings/index')
      },
      {
        path: '/download',
        component: () => import('@/views/download/index'),
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
        component: () => import('@/views/recent/index'),
      },
      {
        path: '/search',
        meta:{ hasKey: true },
        component: () => import('@/views/search/index'),
      },
      {
        path: '/hot-comment',
        component: () => import('@/views/hot-comment/index'),
      },
      {
        path: '/resource-comment',
        component: () => import('@/views/resource-comment/index'),
      },
      {
        path: '/clound'
      },
      {
        path: '/my-radio',
        component: () => import('@/views/my-radio/index'),
      },
      {
        path: '/favorites',
        component: () => import('@/views/favorites/index'),
        children: [
          {
            path: '',
            redirect: 'album'
          },
          {
            path: 'album',
            component: () => import('@/views/favorites/album/index'),
          },
          {
            path: 'singer',
            component: () => import('@/views/favorites/singer/index'),
          },
          {
            path: 'video',
            component: () => import('@/views/favorites/video/index'),
          },
          {
            path: 'column',
            component: () => import('@/views/favorites/column/index'),
          }
        ]
      }
    ]
  },
  {
    path: '/video',
    meta:{ hasKey: true },
    component: () => import('@/views/video/index'),
  },
  {
    path: '/mv',
    meta:{ hasKey: true },
    component: () => import('@/views/mv/index'),
  },
  {
    path: '*',
    component: () => import('@/views/404.vue'),
  }
]

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  routes
})

export default router
