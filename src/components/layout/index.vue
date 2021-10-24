<template>
  <div class="layout">
    <!-- aside -->
    <music-aside></music-aside>
    <!-- player -->
    <music-player></music-player>
    <!-- main -->
    <div class="app-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import MusicPlayer from './music-player.vue' 
import MusicAside from './music-aside.vue' 
export default {
  components: {
    MusicPlayer,
    MusicAside
  }
}
</script>

<style lang="scss" scoped>
.layout{
  position: absolute;
  left: 0;
  right: 0;
  top: var(--app-header-height);
  bottom: 0;
}
.app-main{
  position: absolute;
  top: 0;
  bottom: var(--app-player-height);
  left: var(--app-aside-width);
  right: 0;
  overflow: auto;
  z-index: 100;
  box-sizing: border-box;
  // min-width: calc(var(--min-width) - var(--app-aside-width));
  background-color: var(--main-bg-color);
}
</style>
