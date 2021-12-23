<template>
  <div class="playlist-item" :style="style">
    <!-- 歌单封面 -->
    <div
      class="playlist-cover"
      @click.self="toPlaylistDetail(playlistItem.id)"
      :style="{ backgroundImage: `url(${coverUrl})` }"
      @contextmenu.prevent="showContextMenu"
    >
      <!-- 播放数量 -->
      <span class="play-count"
        ><span class="iconfont icon-pause"></span>
        {{ playlistItem.playCount | formatCount }}</span
      >
      <!-- 播放按钮 -->
      <div class="icon-play" @click="play">
        <span class="iconfont icon-bofang"></span>
      </div>
    </div>
    <!-- 歌单名称 -->
    <div class="playlist-name">
      <span @click="toPlaylistDetail(playlistItem.id)">{{
        playlistItem.name
      }}</span>
    </div>
  </div>
</template>

<script>
import {
  playPlaylist,
  toPlaylistDetail,
  openContextMenu,
} from "@/utils/methods";
import { formatCount } from "@/utils/filters";
import ItemPropsMixin from "@/mixins/item-props-mixin";
import { size_1v1_std } from "@/utils/img-size.js";
export default {
  mixins: [ItemPropsMixin],
  props: {
    playlistItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    coverUrl() {
      return `${this.playlistItem.picUrl ||
        this.playlistItem.coverImgUrl}?param=${size_1v1_std}`;
    },
  },
  methods: {
    play() {
      playPlaylist({ id: this.playlistItem.id, name: this.playlistItem.name });
    },
    toPlaylistDetail,
    openContextMenu,
    showContextMenu(e) {
      this.openContextMenu(e, "PlaylistMenu", { ...this.playlistItem });
    },
  },
  filters: {
    formatCount,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.playlist-item {
  margin-bottom: 30px;
  .playlist-cover {
    cursor: pointer;
    width: 100%;
    padding-bottom: 100%;
    @include background;
    border-radius: 5px;
    margin-bottom: 10px;
    position: relative;
    box-sizing: border-box;
    border: 0.5px solid var(--main-border-color);
    .play-count {
      position: absolute;
      top: 7px;
      right: 7px;
      font-size: 12px;
      line-height: 10px;
      color: #fff;
      .iconfont {
        font-size: 12px;
        line-height: 10px;
        color: #fff;
      }
    }
    .icon-play {
      opacity: 0;
      transition: opacity 0.2s linear;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 15px;
      background-color: rgba($color: #fff, $alpha: 0.5);
      position: absolute;
      right: 10px;
      bottom: 10px;
      .iconfont {
        position: relative;
        left: 1px;
        bottom: 1px;
        font-size: 12px;
        color: var(--color-netease-red);
      }
    }
    &:hover {
      .icon-play {
        opacity: 1;
      }
    }
  }
  .playlist-name {
    font-size: 14px;
    line-height: 20px;
    span {
      @include ellipsis-2-line;
      color: var(--color-level2);
      cursor: pointer;
      &:hover {
        color: var(--color-level1);
      }
    }
  }
}
</style>
