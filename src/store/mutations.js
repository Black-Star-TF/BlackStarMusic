export default {
  // 更新应用配置
  updateSettings(state,{key,value}){
    state.settings[key] = value
  },
  // 更新应用数据
  updateData(state,{key,value}){
    state.data[key] = value
  },
  // 更新运行变量
  updateApp(state, {key,value}){
    state.app[key] = value
  }
}