export default [
  {
    path: '',
    redirect: 'rcmd'
  },
  {
    path: 'rcmd',
    component: () => import('@/views/discovery/rcmd')
  },
  {
    path: 'playlist',
    component: () => import('@/views/discovery/playlist')
  },
  {
    path: 'djradio',
    component: () => import('@/views/discovery/radio')
  },
  {
    path: 'chart',
    component: () => import('@/views/discovery/chart')
  },
  {
    path: 'singer',
    component: () => import('@/views/discovery/singer')
  },
  {
    path: 'newest',
    component: () => import('@/views/discovery/newest'),
    children:[
      {
        path:'',
        redirect: 'newsong'
      },
      {
        path: 'newsong',
        component: () => import('@/views/discovery/newest/new-song'),
      },
      {
        path: 'newalbum'
      },
    ]
  }
]