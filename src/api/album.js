import request from '@/utils/request.js'


// 请求专辑详情
export function getAlbumDetail(id){
  return request({
    url: '/album',
    params:{
      id
    }
  })
}

// 获取专辑评论
export const getAlbumComments = params => request.get('/comment/album', {params})