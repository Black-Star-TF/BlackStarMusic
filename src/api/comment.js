import request from '@/utils/request.js'

// 获取精彩评论
export function getHotComments(params){
  return request({
    url: '/comment/hot',
    params
  })
}