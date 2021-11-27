import request from '@/utils/request.js'

// export const xxx = () => request.get()
// export const xxx = params => request.get('', { params })

// 用户详情
export const getUserDetail = params => request.get('/user/detail', { params })
// 用户歌单
export const getUserPlaylist = params => request.get('/user/playlist', { params });
// 用户电台
export const getUserRadio = params => request.get('/user/audio', { params });