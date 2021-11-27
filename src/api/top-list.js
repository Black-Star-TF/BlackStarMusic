import request from '@/utils/request.js'

// 获取排行榜数据
export function getToplist(){
  return request({
    url: '/toplist'
  })
}

// 获取排行榜详情
export function getToplistDetail(id){
  return request({
    url: '/top/list',
    params: {
      id
    }
  })
}

// 获取歌手排行榜
export function getArtistToplist(){
  return request({
    url: '/toplist/artist'
  })
}