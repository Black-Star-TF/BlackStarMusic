import {getPlaylistDetail} from '@/api/playlist'
export default {
  methods: {
    // 播放音乐
    playMusic(id){
      console.log('播放音乐', id);
      // this.$store.dispatch('app/playSong',id)
    },
    // 播放全部
    playAll(id){
      console.log('播放歌单全部歌曲', id);
      let list = []
      // getPlaylistDetail(id).then(res => {
      //   res.playlist.trackIds.forEach(item => {
      //     list.push(item.id)
      //   })
      //   this.$store.dispatch('app/playAll',list)
      // })
    },
    playRadio(id){
      console.log('播放电台',id);
    },
    toRadioDetail(id){
      console.log('跳转到电台详情页', id);
    },
    // 播放视频
    playVideo(id){
      console.log('播放视频', id);
      // this.$router.push({
      //   path: '/videodetail',
      //   query: {id}
      // })
    },
    // 跳转到歌单详情页
    toPlaylistDetail(id){
      // this.$router.push({
      //   path: '/playlistdetail',
      //   query: {id}
      // })
    },
    // 跳转到专辑详情页
    toAlbumDetail(id){
      console.log('跳转到专辑详情页', id);
    },
    // 跳转到歌手详情页
    toArtistDetail(id){
      console.log('跳转到歌手详情页', id);
    },
    // 跳转到用户详情页
    toUserDetail(id){
      console.log('跳转到用户详情页', id);
    },
    // 高亮显示关键词
    markKeyword(str){
      let reg = new RegExp(this.keyword,'ig')
      return str.replace(reg, ($)=> `<span class="keyword">${$}</span>`)
    },
  },
  filters:{
    formatDuration(duration){
      let seconds = Math.round(duration / 1000)
      let minutes = Math.floor(seconds / 60)
      seconds = seconds % 60
      minutes= minutes > 9 ? minutes : '0' + minutes
      seconds = seconds > 9 ? seconds : '0' + seconds
      return `${minutes}:${seconds}`
    },
    formatPlayCount(count){
      if(count >= 10000){
        return `${Math.ceil(count/10000)}万`
      }else{
        return count
      }
    },
    formatDate(time){
      let date = new Date(time)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`
    }
  }
}