export default [
  {
    path: '',
    redirect: 'rcmd'
  },
  {
    path: 'rcmd',
    meta:{
      keepAlive: true,
    },
    component: () => import('@/views/discovery/rcmd/index')
  },
  {
    path: 'playlist',
    name: 'playlist',
    meta:{
      keepAlive: true,
    },
    component: () => import('@/views/discovery/playlist/index')
  },
  {
    path: 'djradio',
    meta:{
      keepAlive: true,
    },
    component: () => import('@/views/discovery/radio/index')
  },
  {
    path: 'toplist',
    meta:{
      keepAlive: true,
    },
    component: () => import('@/views/discovery/top-list/index')
  },
  {
    path: 'singer',
    meta:{
      keepAlive: true,
    },
    component: () => import('@/views/discovery/singer/index')
  },
  {
    path: 'newest',
    meta:{
      keepAlive: true,
    },
    component: () => import('@/views/discovery/newest/index'),
  }
]