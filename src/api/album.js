import request from '@/utils/request.js'

// 专辑详情
export const getAlbumDetail = params => request.get('/album', { params })
// 专辑评论
export const getAlbumComments = params => request.get('/comment/album', { params })