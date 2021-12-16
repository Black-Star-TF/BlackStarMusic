<template>
  <div class="mv-item" :style="style">
    <div
      class="mv-cover"
      @click="playVideo(mv.id)"
      :style="{ backgroundImage: `url(${coverUrl})` }"
    >
      <!-- 播放量 -->
      <span class="mv-playcount"
        ><span class="iconfont icon-pause"></span>
        {{ mv.playCount | formatCount }}</span
      >
    </div>
    <div class="mv-name" @click="playVideo(mv.id)">
      <span>{{ mv.name }}</span>
    </div>
  </div>
</template>

<script>
import { playVideo } from "@/utils/methods";
import { formatCount } from "@/utils/filters";
import ItemPropsMixin from "@/mixins/item-props-mixin";
import { size_video_std } from "@/utils/img-size.js";
export default {
  mixins: [ItemPropsMixin],
  props: {
    mv: {
      type: Object,
      required: true,
    },
  },
  computed: {
    coverUrl() {
      return `${this.mv.imgurl}?param=${size_video_std}`;
    },
  },
  methods: {
    playVideo,
  },
  filters: {
    formatCount,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.mv-item {
  cursor: default;
  margin-bottom: 20px;
  div {
    height: 20px;
    width: 100%;
    line-height: 20px;
    @include ellipsis;
  }
  .mv-cover {
    width: 100%;
    height: 0;
    padding-bottom: 56%;
    @include background;
    cursor: pointer;
    margin-bottom: 5px;
    position: relative;
    border-radius: 5px;
    .mv-playcount {
      position: absolute;
      line-height: 10px;
      font-size: 12px;
      top: 7px;
      right: 7px;
      color: #fff;
      .iconfont {
        font-size: 12px;
        color: #fff;
      }
    }
  }

  .mv-name {
    color: var(--color-level2);
    font-size: 14px;
    span {
      cursor: pointer;
      &:hover {
        color: var(--color-level1);
      }
    }
  }

  .mv-artists {
    color: var(--color-level4);
    font-size: 12px;
    .artist-item {
      .name {
        cursor: pointer;
        &:hover {
          color: var(--color-level3);
        }
      }
      .separator {
        display: inline-block;
        margin: 0 5px;
      }
    }
  }
}
</style>
