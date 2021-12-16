<template>
  <div class="album-item" @click="toAlbumDetail(album.id)">
    <div
      class="album-cover"
      :style="{ backgroundImage: `url(${coverUrl})` }"
    ></div>
    <div class="album-name">
      <span class="name">{{ album.name }}</span>
    </div>
    <div class="album-singer">
      <span class="name" @click.stop="toArtistDetail(album.artists[0].id)">{{
        album.artists[0].name
      }}</span>
    </div>
    <div class="song-count">{{ album.size }}首</div>
  </div>
</template>

<script>
import { toAlbumDetail, toArtistDetail } from "@/utils/methods";
import { size_1v1_small } from "@/utils/img-size.js";
export default {
  props: {
    album: {
      type: Object,
      required: true,
    },
  },
  computed: {
    coverUrl() {
      return `${this.album.picUrl}?param=${size_1v1_small}`;
    },
  },
  methods: {
    toAlbumDetail,
    toArtistDetail,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.album-item {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  line-height: 20px;
  margin: 0 -30px;
  padding: 0 30px;
  &:nth-of-type(2n + 1) {
    background-color: var(--table-stripe-color);
  }
  &:hover {
    background-color: var(--table-hover-color);
  }
  .album-cover {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-right: 10px;
    @include background;
    cursor: pointer;
  }
  .album-name {
    flex: 5;
    font-size: 14px;
    margin-right: 10px;
    @include ellipsis;
    color: var(--color-level2);
    .name {
      cursor: pointer;
      &:hover {
        color: var(--color-level1);
      }
    }
  }
  .album-singer {
    flex: 3;
    font-size: 13px;
    margin-right: 10px;
    @include ellipsis;
    color: var(--color-level4);
    .name {
      cursor: pointer;
      &:hover {
        color: var(--color-level3);
      }
    }
  }
  .song-count {
    flex: 1;
    font-size: 13px;
    @include ellipsis;
    color: var(--color-level4);
  }
}
</style>
