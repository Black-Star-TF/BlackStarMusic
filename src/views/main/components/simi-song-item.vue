<template>
  <div class="simi-song-item" @click="playSong">
    <div class="song-cover" :style="{ backgroundImage: `url(${coverUrl})` }">
      <!-- 播放图标 -->
      <div class="icon-play">
        <span class="iconfont icon-bofang"></span>
      </div>
    </div>
    <div class="song-info">
      <div class="song-name">{{ song.name }}</div>
      <div class="song-artist">
        {{ song.artists[0].name }}
      </div>
    </div>
  </div>
</template>

<script>
import { size_1v1_small } from "@/utils/img-size.js";
export default {
  props: {
    song: {
      required: true,
      type: Object,
    },
  },
  computed: {
    coverUrl() {
      return `${this.song.album.blurPicUrl}?param=${size_1v1_small}`;
    },
  },
  methods: {
    playSong() {
      this.$store.state.player.playTrack(this.song.id, true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.simi-song-item {
  height: 60px;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  border-radius: 5px;
  &:hover {
    background-color: var(--table-hover-color);
  }
  .song-cover {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    margin-right: 10px;
    @include background;
    position: relative;
    .icon-play {
      text-align: center;
      position: absolute;
      width: 24px;
      height: 24px;
      border-radius: 12px;
      background-color: rgba($color: #fff, $alpha: 0.7);
      top: calc(50% - 12px);
      left: calc(50% - 12px);
      .iconfont {
        line-height: 24px;
        font-size: 12px;
        color: var(--color-netease-red);
        position: relative;
        left: 2px;
      }
    }
  }
  .song-info {
    flex: 1;
    height: 50px;
    .song-name {
      font-size: 14px;
      height: 25px;
      line-height: 25px;
      @include ellipsis;
      color: var(--color-level2);
    }
    .song-artist {
      font-size: 13px;
      @include ellipsis;
      color: var(--color-level4);
    }
  }
}
</style>
