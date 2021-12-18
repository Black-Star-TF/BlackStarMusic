<template>
  <div class="album-item" :style="style">
    <div
      class="album-cover"
      :style="{ backgroundImage: `url(${coverUrl})` }"
      @click.self="toAlbumDetail(album.id)"
    >
      <div class="icon-play" @click="playAlbum(album.id)">
        <span class="iconfont icon-bofang"></span>
      </div>
    </div>
    <div class="album-name">
      <span class="name">
        {{ album.name }}
        <span class="alias" v-if="album.alias.length > 0"
          >({{ album.alias[0] }})</span
        >
      </span>
    </div>
    <div class="album-publish-date" @click="toAlbumDetail(album.id)">
      {{ album.publishTime | formatDate }}
    </div>
  </div>
</template>

<script>
import { toAlbumDetail, playAlbum } from "@/utils/methods";
import { formatDate } from "@/utils/filters";
import ItemPropsMixin from "@/mixins/item-props-mixin";
import { size_1v1_std } from "@/utils/img-size.js";
export default {
  mixins: [ItemPropsMixin],
  props: {
    album: {
      type: Object,
      required: true,
    },
  },
  computed: {
    coverUrl() {
      return `${this.album.picUrl}?param=${size_1v1_std}`;
    },
  },
  methods: {
    playAlbum,
    toAlbumDetail,
  },
  filters: {
    formatDate,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.album-item {
  margin-bottom: 30px;
  .album-cover {
    cursor: pointer;
    width: 100%;
    padding-bottom: 100%;
    @include background;
    border-radius: 5px;
    margin-bottom: 10px;
    position: relative;
    box-sizing: border-box;
    border: 0.5px solid var(--main-border-color);
    .icon-play {
      opacity: 0;
      transition: opacity 0.2s linear;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      background-color: rgba($color: #fff, $alpha: 0.5);
      position: absolute;
      left: calc(50% - 20px);
      top: calc(50% - 20px);
      .iconfont {
        position: relative;
        left: 1px;
        bottom: 1px;
        font-size: 16px;
        color: var(--color-netease-red);
      }
    }
    &:hover {
      .icon-play {
        opacity: 1;
      }
    }
  }
  .album-name {
    font-size: 14px;
    line-height: 20px;
    @include ellipsis-2-line;
    color: var(--color-level2);
    .name {
      display: inline;
      cursor: pointer;
      .alias {
        color: var(--color-level5);
      }
      &:hover {
        color: var(--color-level1);
      }
    }
  }
  .album-publish-date {
    font-size: 12.5px;
    line-height: 20px;
    color: var(--color-level4);
  }
}
</style>
