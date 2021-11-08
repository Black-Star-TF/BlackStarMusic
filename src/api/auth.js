
import request from '@/utils/request.js'
// timestamp=1503019930000
// 生成二维码key
export function getKey(params){
  return request({
    url: '/login/qr/key',
    params
  })
}

// 获取能够生成二维码的数据
export function getQR(params){
  return request({
    url: '/login/qr/create',
    params
  })
}

// 检查二维码状态
export function checkQRStatus(params){
  return request({
    url: '/login/qr/check',
    params
  })
}

// 退出登录
export function logout(){
  return request({
    url: '/logout'
  })
}


// 使用手机号登录
export function loginWithPhone(data){
  let timestamp = new Date().getTime()
  return request({
    url: `/login/cellphone?timestamp=${timestamp}`,
    method: 'POST',
    data
  })
}

// 获取账号信息
export function getUserProfile(){
  return request({
    url: '/user/account'
  })
}

// 获取用户详情
export function getUserDetail(params){
  return request({
    url: '/user/detail',
    params
  })
}

/**
 * 获取用户歌单
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
 * - uid : 用户 id
 * - limit : 返回数量 , 默认为 30
 * - offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param {Object} params
 * @param {number} params.uid
 * @param {number} params.limit
 * @param {number} params.offset
 */
export function getUserPlaylist(params){
  return request({
    url: '/user/playlist',
    params
  })
}