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

// 获取mv详情
export function getMVDetail(mvid){
  return request({
    url: '/mv/detail',
    params:{
      mvid
    }
  })
}
//获取mv点赞评论数
export function getMVInfo(mvid){
  return request({
    url: '/mv/detail/info',
    params:{
      mvid
    }
  })
}
// 获取mv评论
export function getMVComment(id,limit=null, offset=null){
  return request({
    url: '/comment/mv',
    params:{
      id,
      limit,
      offset
    }
  })
}

// 获取相关视频
export function getRelativeVideo(id){
  return request({
    url: '/related/allvideo',
    params:{
      id
    }
  })
}

// 获取视频标签
export function getVideoGroup(){
  return request({
    url: '/video/group/list'
  })
}

// 获取视频分类
export function getVideoCategory(){
  return request({
    url: '/video/category/list',
  })
}

// 获取视频列表
export function getVideoList(id,offset=null){
  return request({
    url: '/video/group',
    params:{
      id,
      offset
    }
  })
}

// 获取所有视频
export function getAllVideo(offset=null){
  return request({
    url: '/video/timeline/all',
    params:{
      offset
    }
  })
}

// 获取视频播放地址
export function getVideoUrl(id){
  return request({
    url: '/video/url',
    params:{
      id
    }
  })
}

export function getVideoDetail(id){
  return request({
    url: '/video/detail',
    params:{
      id
    }
  })
}

// 获取视频点赞数
export function getVideoInfo(vid){
  return request({
    url: '/video/detail/info',
    params:{
      vid
    }
  })
}
// 获取视频评论
export function getVideoComment(id,limit=null, offset=null){
  return request({
    url: '/comment/video',
    params:{
      id,
      limit,
      offset
    }
  })
}