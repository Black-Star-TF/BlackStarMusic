import request from '@/utils/request.js'

// export const xxx = () => request.get()
// export const xxx = params => request.get('', { params })
// 获取歌手列表
export const getSingerList = params => request.get('/artist/list', { params })

// 歌手详情
export const getSingerDetail = params => request.get('/artist/detail', { params })

// 歌手专辑
export const getSingerAlbums = params => request.get('/artist/album', { params })

// 歌手mv
export const getAlbumMVs = params => request.get('/artist/mv', { params })

// 歌手描述
export const getSingerDesc = params => request.get('/artist/desc', { params })

// 相似歌手
export const getSimiSingers = params => request.get('/simi/artist', { params })