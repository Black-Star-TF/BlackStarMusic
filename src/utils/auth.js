import Cookies from 'js-cookie'
import {logout} from '@/api/auth'
import store from '@/store'

export function setCookie(str){
  str = str.replaceAll(' HTTPOnly', '')
  str = str.replaceAll('HTTPOnly', '')
  const cookies = str.split(';;');
  cookies.map(cookie => {
    document.cookie = cookie;
    const cookieKeyValue = cookie.split(';')[0].split('=');
    localStorage.setItem(`cookie-${cookieKeyValue[0]}`, cookieKeyValue[1]);
  });
}


// 从Cookies或localStorage中获取cookie
export function getCookie(key){
  return Cookies.get(key) ?? localStorage.getItem(`cookie-${key}`)
}

export function removeCookie(key) {
  Cookies.remove(key);
  localStorage.removeItem(`cookie-${key}`);
}

// MUSIC_U 只有在账户登录的情况下才有 判断登录状态
export function isLoggedIn() {
  return getCookie('MUSIC_U') !== undefined;
}

// 退出登录时清除本地保存的cookie
export function logoutInLocal(){
  logout()
  removeCookie('MUSIC_U')
  removeCookie('_csrf')
  removeCookie('__remember_me')
  // vuex状态更新
  // 更新用户信息
  store.commit('updateData', {key: 'userProfile', value: {}})
  // 更新登录状态
  store.commit('updateData', {key: 'loginStatus', value: false})
  // 更新我的歌单信息
  // 我创建的歌单
  store.commit('updateData', {key: 'playlistsCreatedByMe', value: []})
  // 我收藏的歌单
  store.commit('updateData', {key: 'playlistsSubscribedByMe', value: []})
  // 我喜欢的歌单
  store.commit('updateData', {key: 'likedPlaylistId', value: 0})
  // 我喜欢的音乐列表
  store.commit('updateData', {key: 'likedSongList', value: []})
}
