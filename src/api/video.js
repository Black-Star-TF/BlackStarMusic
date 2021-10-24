import request from '@/utils/request.js'

// 请求推荐mv数据
export function getRecommendMV(){
	return request({
		url: '/personalized/mv'
	})
}

// 请求推荐页独家放送数据
export function getRecommendExclusive(){
	return request({
		url: '/personalized/privatecontent'
	})
}

// 请求独家放送数据
export function getExclusive(limit,offset){
	return request({
		url: '/personalized/privatecontent/list',
		params:{
			limit,
			offset
		}
	})
}


// 获取最新mv
export function getNewestMV(limit,area = null){
  return request({
    url: '/mv/first',
    params:{
      limit,
      area
    }
  })
}

// 获取网易出品
export function getExclusiveVideo(limit,offset = 0){
  return request({
    url: '/mv/exclusive/rcmd',
    params:{
      limit,
      offset
    }
  })
}

// 获取全部mv
export function getAllMV(limit, type = null, area = null, order = null, offset = 0 ){
  return request ({
    url: '/mv/all',
    params: {
      area,
      type,
      limit,
      order,
      offset
    }
  })
}

// 获取mv排行榜
export function getMVToplist(limit,area = null , offset = 0){
  return request({
    url: '/top/mv',
    params:{
      limit,
      area,
      offset
    }
  })
}


// 获取mv地址
export function getMVUrl(id){
  return request({
    url: '/mv/url',
    params:{
      id
    }
  })
}

// 获取mv数据
export function getMVDetail(mvid){
  return request({
    url: '/mv/detail',
    params:{
      mvid
    }
  })
}
