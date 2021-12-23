<template>
  <div class="playlist-menu">
    <div class="menu-item" @click="toPlaylistDetail(data.id)">查看歌单</div>
    <div class="menu-item" @click="play">播放</div>
    <div class="menu-item">下一首播放</div>
    <div class="menu-item">收藏</div>
    <div class="menu-item">分享...</div>
    <div class="menu-item">复制链接</div>
    <div class="menu-item">下载全部</div>
    <div class="menu-item">不感兴趣</div>
  </div>
</template>

<script>
import { toPlaylistDetail, playPlaylist } from "@/utils/methods";
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    playPlaylist,
    toPlaylistDetail,
    play() {
      this.playPlaylist({ id: this.data.id, name: this.data.name });
    },
  },
  mounted() {
    this.$emit("mounted");
  },
};
</script>

<style lang="scss" scoped>
.playlist-menu {
  width: 120px;
  padding: 5px;
  .menu-item {
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    color: var(--color-level1);
    border-radius: 5px;
    &:hover {
      color: #fff;
      background-color: var(--context-menu-hover-bg-color);
    }
  }
}
</style>
