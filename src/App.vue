<template>
  <div id="app">
    <!-- header -->
    <music-header></music-header>
    <router-view/>
  </div>
</template>

<script>
import MusicHeader from '@/components/layout/music-header.vue' 
import MusicPlayer from '@/components/layout/music-player.vue' 
export default {
  name: 'App',
  components:{
    MusicHeader,
    MusicPlayer
  }
}
</script>

<style lang="scss" scoped>
#app{
  overflow: auto;
  min-width: var(--min-width);
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>
