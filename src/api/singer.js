import request from '@/utils/request.js'

// 获取歌手列表
export function getSingerList(type,area,initial,limit,offset){
  return request({
    url: '/artist/list',
    params:{
      type,
      area,
      initial,
      limit,
      offset
    }
  })
}