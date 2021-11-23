import { getUserProfile, getUserPlaylist } from '@/api/auth'
import { getLikedSongList } from '@/api/music'

export default {
  // 登录成功后进行的操作
  async getUserProfile(store){
    // 将登录状态修改为true
    store.commit('updateData', {key: 'loginStatus', value: true})
    // 获取用户信息
    let {profile} =  await getUserProfile()
    store.commit('updateData', {key: 'userProfile', value: profile})
    return true
  },
  async getUserPlaylist({state,commit}){
    // 获取用户歌单
    let {playlist} = await getUserPlaylist({
      uid: state.data.userProfile.userId,
      limit: 2000,
      timestamp: new Date().getTime(),
    })
    // 获取喜欢的歌单 TODO: 若用户没有歌单
    commit('updateData', {key: 'likedPlaylistId', value: playlist[0].id})
    // 创建的的歌单
    let playlistsCreatedByMe = []
    // 收藏的歌单
    let playlistsSubscribedByMe = []

    playlist.forEach(item => {
      item.subscribed ? playlistsSubscribedByMe.push(item) : playlistsCreatedByMe.push(item)
    })
    commit('updateData', {key: 'playlistsCreatedByMe', value: playlistsCreatedByMe})
    commit('updateData', {key: 'playlistsSubscribedByMe', value: playlistsSubscribedByMe})
  },
  async getLikedSongList({state,commit}){
    // 获取喜欢的歌曲列表 id
    // timestamp
    let res = await getLikedSongList({uid: state.data.userProfile.userId, timestamp: new Date().getTime()})
    commit('updateData', {key: 'likedSongList', value: res.ids})
  },
}