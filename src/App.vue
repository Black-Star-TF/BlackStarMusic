<template>
  <div id="app">
    <!-- header -->
    <music-header></music-header>
    <router-view/>
    <!-- 歌曲详情 -->
    <transition name="move">
      <song-detail v-if="app.songDetailVisible" :songId="currentSong.id"></song-detail>
    </transition>

    <transition name="drawer">
      <playlist-drawer v-if="app.playlistDrawerVisible"></playlist-drawer>
    </transition>

    <transition name="drawer">
      <message-drawer v-if="app.messgeDrawerVisible"></message-drawer>
    </transition>

    <!-- 播放列表 -->
  </div>
</template>

<script>
import MusicHeader from '@/components/layout/music-header.vue'
import MusicPlayer from '@/components/layout/music-player.vue'
import SongDetail from '@/views/song-detail.vue'
import PlaylistDrawer from '@/components/drawer/playlist-drawer'
import MessageDrawer from '@/components/drawer/message-drawer'
import {mapState} from 'vuex'
export default {
  name: 'App',
  components:{
    MusicHeader,
    MusicPlayer,
    SongDetail,
    PlaylistDrawer,
    MessageDrawer
  },
  data(){
    return {
      songDetailVisible: false
    }
  },
  computed:{
    ...mapState(['player', 'app']),
    currentSong(){
      return this.player.currentTrack
    }
  }
}
</script>

<style lang="scss" scoped>
#app{
  min-width: var(--min-width);
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  cursor: default;
  // 禁止文字被鼠标选中 
  -webkit-user-select:none; 
  user-select:none;
}


.move-enter, .move-leave-to{
  top: calc(100vh - var(--app-player-height));
}

.move-enter-active,.move-leave-active{
  transition: top .4s ease-in-out;
}

.move-enter-to, .move-leave{
  top: var(--app-header-height);
}

.drawer-enter, .drawer-leave-to{
  // width: 0;
  // transform: translateX(var(--app-drawer-width))
  right: calc(var(--app-drawer-width) * -1);
}

.drawer-enter-active,.drawer-leave-active{
  transition: right .1s ease-in-out;
}

.drawer-enter-to, .drawer-leave{
  right: 0;
  // width: var(--app-drawer-width);
  // transform: translateX(0)
}

</style>
