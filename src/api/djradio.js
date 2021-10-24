import request from '@/utils/request.js'

// 请求推荐电台
export function getRecommendRadio(){
	return request({
		url: '/dj/personalize/recommend'
	})
}

// 获取电台banner
export function getRadioBanner(){
	return request({
		url: '/dj/banner',
	})
}

// 获取付费精品电台
export function getPaidRadio(limit = 30, offset = 0){
	return request({
		url: '/dj/paygift',
		params: {
			limit,
			offset
		}
	})
}

// 获取推荐电台分类
export function getRecommendRadioCate(){
	return request({
		url: '/dj/category/recommend'
	})
}

// 获取分类推荐电台列表
export function getRadioList(type){
	return request({
		url: '/dj/recommend/type',
		params:{
			type
		}
	})
}
