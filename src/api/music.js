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