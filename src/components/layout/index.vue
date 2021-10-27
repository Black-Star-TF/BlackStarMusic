<template>
  <div class="layout">
    <!-- aside -->
    <music-aside></music-aside>
    <!-- player -->
    <music-player></music-player>
    <!-- main -->
    <div class="app-main">
      <template v-if="!$route.meta.keepAlive">
        <router-view :key="getKey()"></router-view>
      </template>
      <template v-else>
        <keep-alive>
          <router-view :key="getKey()"></router-view>
        </keep-alive>
      </template>
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
  },
  methods:{
    getKey(){
      if(this.$route.meta.hasKey){
        return this.$route.fullPath + new Date()
      }else{
        return ''
      }
    }
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
  background-color: var(--main-bg-color);
}
</style>
