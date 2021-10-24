import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import plugins from './plugins'

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
export default store