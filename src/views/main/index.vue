<template>
  <div class="layout-wrapper">
    <div class="middle-wrapper">
      <!-- 侧边栏 -->
      <music-aside></music-aside>
      <!-- 主要内容区 -->
      <div class="main-wrapper" id="main">
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
    <!-- 播放器控件 -->
    <music-player></music-player>
  </div>
</template>

<script>
import MusicPlayer from "./layout/music-player.vue";
import MusicAside from "./layout/music-aside.vue";
export default {
  components: {
    MusicPlayer,
    MusicAside,
  },
  methods: {
    getKey() {
      if (this.$route.meta.hasKey) {
        return this.$route.fullPath;
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  height: calc(100% - var(--app-header-height));
  width: 100%;
  box-sizing: border-box;
}
.middle-wrapper {
  width: 100%;
  height: calc(100% - var(--app-player-height));
  box-sizing: border-box;
  display: flex;
  .main-wrapper {
    width: calc(100% - var(--app-aside-width));
    height: 100%;
    background-color: var(--main-bg-color);
    position: relative;
  }
}
</style>
