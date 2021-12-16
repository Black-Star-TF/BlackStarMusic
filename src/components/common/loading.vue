<template>
  <div class="loading-container">
    <div class="icon">
      <div
        class="box"
        v-for="i in this.count"
        :key="i"
        :style="{ transform: `rotate(${(i - 1) * (360 / count)}deg)` }"
        :class="getActiveClass(i)"
      ></div>
    </div>
    <div class="text">加载中...</div>
  </div>
</template>

<script>
export default {
  mixins: [],
  components: {},
  data() {
    return {
      count: 10,
      currentIndex: 1,
      timer: null,
    };
  },
  computed: {},
  methods: {
    getActiveClass(index) {
      if (index === this.currentIndex) {
        return "active1";
      }

      let prev = this.currentIndex === 1 ? this.count : this.currentIndex - 1;
      let next = this.currentIndex === this.count ? 1 : this.currentIndex + 1;
      let arr = [prev, next];
      return arr.includes(index) ? "active2" : "";
    },
  },
  filters: {},
  created() {
    this.timer = setInterval(() => {
      if (this.currentIndex == this.count) {
        this.currentIndex = 1;
      } else {
        this.currentIndex++;
      }
    }, 100);
  },
};
</script>

<style lang="scss" scoped>
@keyframes rotate {
  to {
    transform: rotate(0);
  }
  from {
    transform: rotate(360deg);
  }
}
.loading-container {
  width: 100px;
  height: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-content: center;
  .icon {
    width: 20px;
    height: 20px;
    position: relative;
    .box {
      width: 20px;
      height: 20px;
      position: absolute;
      &::after {
        content: "";
        display: block;
        width: 2px;
        height: 5px;
        background-color: #5b5b5b;
        margin: 0 auto;
        border-radius: 1px;
      }
      &.active1 {
        &::after {
          background-color: #f0f0f0;
        }
      }
      &.active2 {
        &::after {
          background-color: #aaa;
        }
      }
    }
  }
  .text {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    margin-left: 5px;
    color: var(--color-level3);
  }
}
</style>
