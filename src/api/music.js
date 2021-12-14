import request from '@/utils/request.js'



//  推荐页轮播图
export const getRecommendBanner = () => request.get('/banner')

// 请求推荐最新歌曲
export const getrecommendNewestSong = () => request.get('/personalized/newsong')

// 获取新歌速递

export function getTopNewSong(type){
	return request({
		url: '/top/song',
		params: {
			 type
		}
	})
}

// 获取推荐新碟
export function getRcmdNewAlbum(area,limit,offset){
	return request({
		url: '/top/album',
		params:{
			limit,
			offset,
			area,
		}
	})
}

// 获取全部新碟
export const getAllNewAlbum = () => request.get('/album/new')


// 请求歌曲信息
// export function getSongsDetail(ids){
// 	return request({
// 		url: '/song/detail',
// 		params: {
// 			ids
// 		}
// 	})
// }
export const getSongsDetail = params => request.get('/song/detail', { params })

// 获取歌曲评论
export const getSongComments = params => request.get('/comment/music', { params })

// 请求歌曲url
export function getSongUrl(id){
	return request({
		url: '/song/url',
		params:{
			id
		}
	})
}

// 获取歌曲歌词
// export function getSongLyric(id){
// 	return request({
// 		url: '/lyric',
// 		params:{
// 			id
// 		}
// 	})
// }
export const getSongLyric = params => request.get('/lyric', { params })


// 获取歌曲相似歌单
export function getSimiPlaylists(id){
	return request({
		url: '/simi/playlist',
		params:{
			id
		}
	})
}

// 获取相似歌曲
export function getSimiSongs(id){
	return request({
		url: '/simi/song',
		params:{
			id
		}
	})
}

// 获取喜欢的歌曲列表
export const getLikedSongList = params => request.get('/likelist', { params })

// 喜欢某个音乐
export const likeSong = params => request.get('/like', { params })