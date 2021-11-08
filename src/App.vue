<template>
  <div id="app">
    <!-- header -->
    <music-header></music-header>
    <router-view/>
    <!-- 歌曲详情 -->
    <transition name="move">
      <song-detail v-if="app.songDetailVisible" :songId="currentSong.id"></song-detail>
    </transition>

    <!-- 播放列表 -->
  </div>
</template>

<script>
import MusicHeader from '@/components/layout/music-header.vue'
import MusicPlayer from '@/components/layout/music-player.vue'
import SongDetail from '@/views/song-detail.vue'
import {mapState} from 'vuex'
export default {
  name: 'App',
  components:{
    MusicHeader,
    MusicPlayer,
    SongDetail
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
  },
  methods:{
    getKey(){
      if(this.$route.meta.hasKey){
        return this.$route.fullPath + new Date()
      }else{
        return ''
      }
    }
  },
}
</script>

<style lang="scss" scoped>
#app{
  min-width: var(--min-width);
  width: 100vw;
  height: 100vh;
  position: relative;
  cursor: default;
  // 禁止文字被鼠标选中 
  moz-user-select: -moz-none; 
  -moz-user-select: none; 
  -o-user-select:none; 
  -khtml-user-select:none; 
  -webkit-user-select:none; 
  -ms-user-select:none; 
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

</style>
