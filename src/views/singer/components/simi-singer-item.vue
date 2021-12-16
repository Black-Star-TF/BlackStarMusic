<template>
  <div class="simi-singer-item" :style="style">
    <!-- cover -->
    <div
      class="simi-singer-cover"
      @click="toArtistDetail(singer.id)"
      :style="{ backgroundImage: `url(${coverUrl})` }"
    ></div>
    <!-- name -->
    <div class="simi-singer-name">
      <span @click="toArtistDetail(singer.id)">{{ singer.name }}</span>
    </div>
  </div>
</template>

<script>
import { toUserDetail, toArtistDetail } from "@/utils/methods";
import ItemPropsMixin from "@/mixins/item-props-mixin";
import { size_1v1_std } from "@/utils/img-size.js";
export default {
  mixins: [ItemPropsMixin],
  props: {
    singer: {
      type: Object,
      required: true,
    },
  },
  computed: {
    coverUrl() {
      return `${this.singer.img1v1Url}?param=${size_1v1_std}`;
    },
  },
  methods: {
    toUserDetail,
    toArtistDetail,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.simi-singer-item {
  margin-bottom: 20px;
  .simi-singer-cover {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    @include background;
    margin-bottom: 10px;
    border-radius: 5px;
    cursor: pointer;
    border: 0.5px solid var(--main-border-color);
  }
  .simi-singer-name {
    line-height: 20px;
    font-size: 12px;
    @include ellipsis;
    span {
      color: var(--color-level2);
      cursor: pointer;
      &:hover {
        color: var(--color-level1);
      }
    }
  }
}
</style>
