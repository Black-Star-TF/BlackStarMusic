<template>
  <div class="radio-item-wrapper" @click="toRadioDetail(radio.id)">
    <div
      class="radio-cover"
      :style="{ backgroundImage: `url(${coverUrl})` }"
    ></div>
    <div class="radio-name">
      <div class="name">{{ radio.name }}</div>
      <span class="category">{{ radio.category }}</span>
    </div>
    <div class="program-count">节目{{ radio.programCount }}</div>
    <div class="subscriber-count">订阅{{ radio.subCount }}</div>
  </div>
</template>

<script>
import { toRadioDetail } from "@/utils/methods";
import { size_1v1_std } from "@/utils/img-size.js";
export default {
  components: {},
  data() {
    return {};
  },
  props: {
    radio: {
      type: Object,
      required: true,
    },
  },
  computed: {
    coverUrl() {
      return `${this.radio.intervenePicUrl}?param=${size_1v1_std}`;
    },
  },
  methods: {
    toRadioDetail,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.radio-item-wrapper {
  display: flex;
  height: 80px;
  align-items: center;
  line-height: 20px;
  width: 100%;
  margin: 0 -30px;
  padding: 0 30px;
  &:nth-of-type(2n + 1) {
    background-color: var(--table-stripe-color);
  }
  &:hover {
    background-color: var(--table-hover-color);
  }
  .radio-cover {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-right: 10px;
    @include background;
  }
  .radio-name {
    flex: 5;
    font-size: 14px;
    margin-right: 10px;
    // overflow: hidden;
    color: var(--color-level2);
    display: flex;
    line-height: 20px;
    .name {
      @include ellipsis;
    }
    .category {
      display: inline-block;
      font-size: 12px;
      padding: 0 2px;
      height: 15px;
      line-height: 15px;
      border: 1px solid var(--color-netease-red);
      color: var(--color-netease-red);
      border-radius: 2px;
      margin-right: 5px;
      cursor: pointer;
    }
  }
  .program-count {
    flex: 1;
    font-size: 13px;
    color: var(--color-level4);
  }
  .subscriber-count {
    flex: 1;
    font-size: 13px;
    color: var(--color-level4);
  }
}
</style>
