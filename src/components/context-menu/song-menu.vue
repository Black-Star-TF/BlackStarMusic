<template>
  <div class="song-menu">
    <div class="menu-item" @click="playSong">播放</div>
    <div class="menu-item" @click="toComment">查看评论</div>
    <div class="menu-item">下一首播放</div>
    <div class="menu-item">收藏</div>
    <div class="menu-item">分享</div>
    <div class="menu-item">下载</div>
  </div>
</template>

<script>
import { toResourceComment } from '@/utils/methods'
import RESOURCE_TYPE from "@/utils/resource-type";
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toResourceComment,
    playSong(){
      if(!this.data.list){
        this.$store.state.player.playTrack(this.data.song);
      }else{
        this.$store.state.player.playTrackFromPlaylist(this.data.index, this.data.list);
      }
    },
    toComment(){
      this.toResourceComment(this.data.song.id, RESOURCE_TYPE.SONG)
    }
  },
  mounted() {
    this.$emit("mounted");
  },
  watch: {
    data() {
      this.song = this.data;
    },
  },
};
</script>

<style lang="scss" scoped>
.song-menu {
  width: 165px;
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
