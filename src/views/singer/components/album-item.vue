<template>
  <div class="album-item" :style="style">
    <div
      class="album-cover"
      :style="{ backgroundImage: `url(${coverUrl})` }"
      @click="toAlbumDetail(album.id)"
    ></div>
    <div class="album-name">
      <span>{{ album.name }}</span>
    </div>
    <div class="album-publish-date" @click="toAlbumDetail(album.id)">
      {{ album.publishTime | formatDate }}
    </div>
  </div>
</template>

<script>
import { toAlbumDetail } from "@/utils/methods";
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
  }
  .album-name {
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
  .album-publish-date {
    font-size: 13px;
    line-height: 20px;
    color: var(--color-level4);
  }
}
</style>
