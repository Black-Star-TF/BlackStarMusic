import request from '@/utils/request.js'
// 请求推荐歌单
export const getRecommendPlaylist = params => request.get('/personalized', {params}) 
// 请求热门歌单分类
export const getHotPlaylistCate = () => request.get('/playlist/hot')
// 请求全部歌单分类
export const getPlaylistCate = () => request.get('/playlist/catlist')
// 获取歌单列表
export const getPlaylists = params => request.get('/top/playlist', {params})
// 获取歌单详情
export const getPlaylistDetail = params => request.get('/playlist/detail', {params})
// 获取歌单评论
export const getPlaylistComments = params => request.get('/comment/playlist', {params})
// 获取歌单收藏者
export const getPlaylistSubscribers = params => request.get('/playlist/subscribers', {params})