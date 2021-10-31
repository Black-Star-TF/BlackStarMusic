import { getUserProfile, getUserPlaylist } from '@/api/auth'
import { getLikedSongList, getSongsDetail, getSongUrl } from '@/api/music'

export default {
  // 登录成功后进行的操作
  getUserProfile(store){
    // 将登录状态修改为true
    store.commit('updateData', {key: 'loginStatus', value: true})
    // 获取用户信息
    return getUserProfile().then(res=>{
      store.commit('updateData', {key: 'userProfile', value: res.profile})
      return Promise.resolve()
    })
  },
  getUserPlaylist({state,commit}){
    // 获取用户歌单
    getUserPlaylist({
      uid: state.data.userProfile.userId,
      limit: 2000,
      timestamp: new Date().getTime(),
    }).then(res=>{
      // 获取喜欢的歌单
      commit('updateData', {key: 'likedPlaylistId', value: res.playlist[0].id})
      // 创建的的歌单
      let playlistsCreatedByMe = []
      // 收藏的歌单
      let playlistsSubscribedByMe = []
      for(let playlist of res.playlist){
        if(playlist.subscribed){
          playlistsSubscribedByMe.push(playlist)
        }else{
          playlistsCreatedByMe.push(playlist)
        }
      }
      commit('updateData', {key: 'playlistsCreatedByMe', value: playlistsCreatedByMe})
      commit('updateData', {key: 'playlistsSubscribedByMe', value: playlistsSubscribedByMe})
    })
  },
  getLikedSongList({state,commit}){
    // 获取喜欢的歌曲列表 id
    getLikedSongList(state.data.userProfile.userId).then(res=>{
      console.log(res);
      // res.ids  array
      commit('updateData', {key: 'likedSongList', value: res.ids})
    })
  },
  getSongDetail({commit}){

  }
}