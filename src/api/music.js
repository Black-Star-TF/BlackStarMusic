import request from '@/utils/request.js'
//  推荐页轮播图

export function getRecommendBanner(){
	return request({
		url: '/banner'
	})
}

// 请求推荐最新歌曲
export function getrecommendNewestSong(){
	return request({
		url: '/personalized/newsong'
	})
}

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
export function getAllNewAlbum(){
	return request({
		url: '/album/new'
	})
}

// 请求歌曲信息
export function getSongsDetail(ids){
	return request({
		url: '/song/detail',
		params:{
			ids
		}
	})
}

// 请求歌曲url
export function getSongUrl(id){
	return request({
		url: '/song/url',
		params:{
			id
		}
	})
}

// 获取喜欢的歌曲列表
export function getLikedSongList(uid){
	return request({
		url: '/likelist',
		params: {
			uid
		}
	})
}