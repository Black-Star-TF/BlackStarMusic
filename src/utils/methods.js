import {getPlaylistDetail} from '@/api/playlist'
import store from '@/store'


// 播放歌曲有关方法

// 播放音乐并替换播放列表
export function playMusic(id){
  console.log('播放音乐', id);

}
// 播放全部
export function playPlaylist(id){
  getPlaylistDetail(id).then(res => {
    let tracks = res.playlist.trackIds.map(track => {
      return track.id
    })
    this.$store.state.player.playTrack(tracks[0],tracks)
  })
}

export function playRadio(id){
  console.log('播放电台',id);
}
export function toRadioDetail(id){
  console.log('跳转到电台详情页', id);
}
// 播放视频
export function playVideo(id){
  let reg = /^[0-9]+$/
  let path = reg.test(id) ? '/mvdetail' : '/videodetail'
  this.$router.push(`${path}/${id}`)
}
// 跳转到歌单详情页
export function toPlaylistDetail(id){
  this.$router.push(`/playlistdetail/${id}`)
}
// 跳转到专辑详情页
export function toAlbumDetail(id){
  this.$router.push(`/albumdetail/${id}`)
}
// 跳转到歌手详情页
export function toArtistDetail(id){
  console.log('跳转到歌手详情页', id);
}
// 跳转到用户详情页
export function toUserDetail(id){
  console.log('跳转到用户详情页', id);
}
// 高亮显示关键词
export function markKeyword(str){
  let reg = new RegExp(this.keyword,'ig')
  return str.replace(reg, ($)=> `<span class="keyword">${$}</span>`)
}