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
    component: () => import('@/views/discovery/rcmd')
  },
  {
    path: 'playlist',
    name: 'playlist',
    meta:{
      keepAlive: true,
    },
    component: () => import('@/views/discovery/playlist')
  },
  {
    path: 'djradio',
    meta:{
      keepAlive: true,
    },
    component: () => import('@/views/discovery/radio')
  },
  {
    path: 'chart',
    meta:{
      keepAlive: true,
    },
    component: () => import('@/views/discovery/chart')
  },
  {
    path: 'singer',
    meta:{
      keepAlive: true,
    },
    component: () => import('@/views/discovery/singer')
  },
  {
    path: 'newest',
    meta:{
      keepAlive: true,
    },
    component: () => import('@/views/discovery/newest'),
  }
]