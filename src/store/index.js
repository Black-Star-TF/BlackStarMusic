import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import plugins from './plugins'
import Player from '@/utils/Player'

import {checkLoginStatus} from '@/api/auth'
import {logoutInLocal} from '@/utils/auth'

import {changeTheme} from '@/utils/common'
Vue.use(Vuex)

const store =  new Vuex.Store({
  state,
  mutations,
  actions,
  plugins
})


// 设置主题
changeTheme(store.state.settings.theme)

let player = new Player();
player = new Proxy(player, {
  set(target, prop, val) {
    target[prop] = val;
    if (prop === '_howler') return true;
    target._saveSelfToLocalStorage();
    return true;
  },
});
store.state.player = player;

if(store.state.data.loginStatus){
  checkLogin()
}

// 检查登录状态
async function checkLogin(){
  let {data} = await checkLoginStatus()
  if(data.account){
    // 登录 获取用户信息
    store.dispatch('getUserPlaylist')
    store.dispatch('getLikedSongList')
  }else{
    // 未登录 删除本地登录信息
    logoutInLocal()
  }
}

export default store