<template>
  <div class="radio-program-item">
    <div class="program-num">{{ program.serialNum }}</div>
    <div class="program-cover" :style="{ backgroundImage: `url(${coverUrl})` }">
      <div class="icon-play">
        <span class="iconfont icon-bofang"></span>
      </div>
    </div>
    <div class="program-name">{{ program.name }}</div>
    <div class="program-play-count">
      <span class="iconfont icon-pause"></span>
      {{ program.listenerCount | formatCount }}
    </div>
    <div class="program-liked-count">
      <span class="iconfont icon-dianzan"></span>
      {{ program.likedCount | formatCount }}
    </div>
    <div class="program-publish-data">
      {{ program.scheduledPublishTime | formatDate }}
    </div>
    <div class="program-duration">{{ program.duration | formatDuration }}</div>
  </div>
</template>

<script>
import { size_1v1_small } from "@/utils/img-size.js";
import { formatCount, formatDate, formatDuration } from "@/utils/filters";
export default {
  props: {
    program: {
      type: Object,
      required: true,
    },
  },
  computed: {
    coverUrl() {
      return `${this.program.coverUrl}?param=${size_1v1_small}`;
    },
  },
  methods: {},
  filters: {
    formatCount,
    formatDate,
    formatDuration,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.radio-program-item {
  width: 100%;
  height: 80px;
  display: flex;
  padding-left: 30px;
  box-sizing: border-box;
  align-items: center;
  font-size: 13px;
  line-height: 20px;
  &:nth-of-type(2n) {
    background-color: var(--table-stripe-color);
  }
  &:hover {
    background-color: var(--table-hover-color);
  }
  .program-num {
    width: 40px;
    margin-right: 5px;
    color: var(--color-level4);
  }
  .program-cover {
    width: 60px;
    height: 60px;
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
        position: relative;
        left: 2px;
        color: var(--color-netease-red);
      }
    }
  }
  .program-name {
    flex: 5;
    font-size: 14px;
    margin-right: 10px;
    @include ellipsis;
    color: var(--color-level4);
  }
  .program-play-count {
    flex: 1;
    margin-right: 10px;
    @include ellipsis;
    color: var(--color-level4);
    .iconfont {
      font-size: 12px;
      color: var(--color-level3);
    }
  }
  .program-liked-count {
    flex: 1;
    margin-right: 10px;
    @include ellipsis;
    color: var(--color-level4);
    .iconfont {
      color: var(--color-level3);
    }
  }
  .program-publish-data {
    flex: 1;
    margin-right: 10px;
    @include ellipsis;
    color: var(--color-level4);
    min-width: 80px;
  }
  .program-duration {
    flex: 1;
    margin-right: 10px;
    @include ellipsis;
    color: var(--color-level4);
  }
}
</style>
