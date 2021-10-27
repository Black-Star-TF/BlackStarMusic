import request from '@/utils/request.js'


// 搜索结果
//  1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
export function getSearchResult(params){
  return request({
    url: '/cloudsearch',
    params
  })
}