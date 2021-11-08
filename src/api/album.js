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
export function getAlbumComments(id, limit = null, offset = null){
  return request({
    url: '/comment/album',
    params:{
			id,
			limit,
			offset
		}
  })
}