import { getPlaylistDetail } from '@/api/playlist'
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
// 播放电台
export function playRadio(id){
  console.log('播放电台',id);
}
// 电台详情
export function toRadioDetail(rid){
  this.$router.push({ path: `/radio`, query: { rid } })
}
// 播放视频
export function playVideo(id){
  let reg = /^[0-9]+$/
  let path = reg.test(id) ? '/mv' : '/video'
  this.$router.push({ path, query: { id } })
}
// 跳转到歌单详情页
export function toPlaylistDetail(id){
  this.$router.push({ path: `/playlist`, query: { id } })
}
// 跳转到专辑详情页
export function toAlbumDetail(id){
  this.$router.push({ path: `/album`, query: { id } })
}
// 跳转到歌手详情页
export function toArtistDetail(id){
  this.$router.push({ path: `/singer`, query: { id } })
}
// 跳转到用户详情页
export function toUserDetail(userId){
  this.$router.push({ path: `/user`, query: { userId } })
}
// 高亮显示关键词
export function markKeywords(str){
  let reg = new RegExp(this.keyword,'ig')
  return str.replace(reg, ($)=> `<span class="keywords">${$}</span>`)
}
// 跳转到资源评论页
export function toResourceComment(id, type){
  this.$router.push({ path: '/resource-comment', query:{ id, type } })
}
// 跳转到热门评论页
export function toHotComment(id,type){
  this.$router.push({ path: '/hot-comment', query:{ id, type } })
}
// 搜索
export function search(keywords){
  this.$router.push({
    path: "/search",
    query: {
      keyword: keywords,
      type: this.$route.query.type || 1,
    },
  });
}

// 防抖函数
export function debounce(handler, delay) {
  let timer;
  return function () {
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      this[handler]()
    }, delay)
  }
}