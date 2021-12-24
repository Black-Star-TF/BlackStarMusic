<template>
  <div class="simi-playlist-item" @click="toPlaylistDetail(playlist.id)">
    <img :src="coverUrl" class="playlist-cover" />
    <div class="playlist-info">
      <div class="playlist-name">{{ playlist.name }}</div>
      <div class="play-count">
        <span class="iconfont icon-pause"></span
        >{{ playlist.playCount | formatCount }}
      </div>
    </div>
  </div>
</template>

<script>
import { toPlaylistDetail } from "@/utils/methods";
import { formatCount } from "@/utils/filters";
import { size_1v1_small } from "@/utils/img-size.js";
export default {
  props: {
    playlist: {
      type: Object,
      required: true,
    },
  },
  computed: {
    coverUrl() {
      return `${this.playlist.coverImgUrl}?param=${size_1v1_small}`;
    },
  },
  methods: {
    toPlaylistDetail,
  },
  filters: {
    formatCount,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.simi-playlist-item {
  height: 60px;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  border-radius: 5px;
  &:hover {
    background-color: var(--table-hover-color);
  }
  .playlist-cover {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    display: inline-block;
    background-color: #fff;
    margin-right: 10px;
  }
  .playlist-info {
    flex: 1;
    height: 50px;
    .playlist-name {
      font-size: 14px;
      height: 25px;
      line-height: 25px;
      @include ellipsis;
      color: var(--color-level2);
    }

    .play-count {
      font-size: 13px;
      @include ellipsis;
      color: var(--color-level4);
      .iconfont {
        font-size: 12px;
        margin-right: 5px;
      }
    }
  }
}
</style>
