
import request from '@/utils/request.js'

// 二维码key
export const getKey = params => request.get('/login/qr/key', { params });
// 二维码数据
export const getQR = params => request.get('/login/qr/create', { params });
// 二维码状态
export const checkQRStatus = params => request.get('/login/qr/check', { params });
// 退出登录
export const logout = () => request.get('/logout');
// 检查登录状态
export const checkLoginStatus = () => request.get('/login/status');
// 使用手机号登录
export const  loginWithPhone = data => request.post(`/login/cellphone?timestamp=${new Date().getTime()}`, data);
// 获取账号信息
export const getUserProfile = () => request.get('/user/account');
// 获取用户详情
export const getUserDetail = params => request.get('/user/detail', { params });
/**
 * 获取用户歌单
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
 * @param {Object} params
 * @param {number} params.uid    --用户 id
 * @param {number} params.limit  --返回数量 , 默认为 30
 * @param {number} params.offset --偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 */
export const getUserPlaylist = params => request.get('/user/playlist', { params });
