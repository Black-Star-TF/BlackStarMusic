<template>
  <div class="singer-item" @click="toArtistDetail(singer.id)">
    <div
      class="singer-avatar"
      :style="{ backgroundImage: `url(${coverUrl})` }"
    ></div>
    <div class="singer-name">
      <span class="name">{{ singer.name }}</span>
    </div>
    <div class="singer-album-count">专辑: {{ singer.albumSize }}</div>
    <div class="singer-mv-count">MV: {{ singer.mvSize }}</div>
  </div>
</template>

<script>
import { toArtistDetail } from "@/utils/methods";
import { size_1v1_small } from "@/utils/img-size.js";
export default {
  props: {
    singer: {
      type: Object,
      required: true,
    },
  },
  computed: {
    coverUrl() {
      return `${this.singer.picUrl}?param=${size_1v1_small}`;
    },
  },
  methods: {
    toArtistDetail,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.singer-item {
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
  .singer-avatar {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-right: 10px;
    @include background;
    cursor: pointer;
  }
  .singer-name {
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
  .singer-album-count {
    flex: 2;
    font-size: 13px;
    margin-right: 10px;
    @include ellipsis;
    color: var(--color-level4);
  }
  .singer-mv-count {
    flex: 1;
    font-size: 13px;
    @include ellipsis;
    color: var(--color-level4);
  }
}
</style>
