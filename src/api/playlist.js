import request from '@/utils/request.js'

// 请求推荐歌单
export function getRecommendPlaylist(limit = 10){
	return request({
		url: '/personalized',
		params: {
			limit
		}
	})
}

// 请求热门歌单分类
export function getHotPlaylistCate(){
	return request({
		url: '/playlist/hot'
	})
}

// 请求全部歌单分类
export function getPlaylistCate(){
	return request({
		url: '/playlist/catlist'
	})
}

// 获取歌单列表
export function getPlaylists(cat,limit,offset){
	return request({
		url: '/top/playlist',
		params: {
			cat,
			limit,
			offset
		}
	})
}

// 获取歌单详情
export function getPlaylistDetail(id){
	return request ({
		url: '/playlist/detail',
		params:{
			id
		}
	})
}

// 获取歌单评论
export function getPlaylistComments(id, limit = null, offset = null){
	return request({
		url: '/comment/playlist',
		params:{
			id,
			limit,
			offset
		}
	})
}

// 请求歌单收藏者
export function getPlaylistSubscribers(id,limit = null,offset = null){
	return request({
		url: '/playlist/subscribers',
		params:{
			id,
			limit,
			offset
		}
	})
}