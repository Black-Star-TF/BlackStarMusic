<template>
  <div
    class="slider-container"
    ref="slider"
    @mouseover="pause()"
    @mouseout="play()"
  >
    <!-- 轮播图组件 -->
    <div class="slider-main">
      <div
        class="slider-item"
        v-for="(url, index) in list"
        :key="index"
        :style="{ backgroundImage: `url(${url})` }"
      ></div>
      <!-- 切换按钮 -->
      <div class="slider-btn left" @click="prev()">
        <span class="iconfont icon-changyong_fanhui"></span>
      </div>
      <div class="slider-btn right" @click="next()">
        <span class="iconfont icon-changyong_gengduo"></span>
      </div>
    </div>

    <!-- 导航图标 -->
    <div class="slider-dot">
      <div
        class="slider-dot-item"
        v-for="(item, index) in sliderItemList"
        :key="index"
        @mouseover="switchTo(index)"
        :class="{ active: currentIndex === index }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nextIndex: 0, // 下一张显示图片的编号
      prevIndex: 0, // 上一张显示图片的编号
      currentIndex: 0, // 当前显示图片的编号
      timer: null, // 定时器
      sliderItemList: [], // 定义存放图片节点的数组
    };
  },
  props: {
    list: {
      type: Array,
      required: true,
    },
    // 是否自动播放
    autoPlay: {
      type: Boolean,
      default: true,
    },
    // 轮播速度
    speed: {
      default: 2,
    },
  },
  methods: {
    switchTo(index) {
      // 切换当前显示的图片
      this.currentIndex = index;
      this.action();
    },
    // 定义轮播图的主要行为
    action() {
      // 根据当前显示图片的设置上一张和下一张图片
      this.prevIndex =
        this.currentIndex != 0
          ? this.currentIndex - 1
          : this.sliderItemList.length - 1;
      this.nextIndex =
        this.currentIndex != this.sliderItemList.length - 1
          ? this.currentIndex + 1
          : 0;

      // 清空所有导航图标的附加class
      for (let item of this.sliderItemList) {
        item.classList.remove("active");
        item.classList.remove("next");
        item.classList.remove("prev");
      }

      // 为图片对应的导航图标添加相应的class
      this.sliderItemList[this.currentIndex].classList.add("active");
      this.sliderItemList[this.prevIndex].classList.add("prev");
      this.sliderItemList[this.nextIndex].classList.add("next");
    },

    next() {
      // 切换下一张图片
      this.currentIndex = ++this.currentIndex % this.sliderItemList.length;
      this.action();
    },
    prev() {
      // 切换上一张图片
      this.currentIndex =
        this.currentIndex != 0
          ? this.currentIndex - 1
          : this.sliderItemList.length - 1;
      this.action();
    },

    // 定义播放轮播图的操作
    play() {
      // 在开始播放前,先清空定时器,防止定时器叠加
      this.pause();
      if (this.autoPlay) {
        this.timer = setInterval(() => {
          this.next();
        }, parseInt(this.speed) * 1000);
      }
    },
    pause() {
      //暂停轮播图
      clearInterval(this.timer);
    },
  },
  mounted() {
    // 获取所有图片节点
    this.sliderItemList = this.$refs.slider.querySelectorAll(
      ".slider-main .slider-item"
    );
    this.action();

    // 开始播放
    this.play();
  },
};
</script>

<style lang="scss" scoped>
.slider-container {
  width: 100%;
  position: relative;
  height: 240px;
  /* 轮播图图片区域样式 */
  .slider-main {
    position: relative;
    height: 200px;
    width: 100%;
    left: 0;
    top: 0;
    background-size: inherit;
    /* 切换按钮样式 */
    .slider-btn {
      position: absolute;
      width: 25px;
      height: 25px;
      line-height: 21px;
      border-radius: 50%;
      top: 50%;
      margin-top: -12px;
      z-index: 30;
      background-color: rgba(0, 0, 0, 0.4);
      display: none;
      text-align: center;
      &.left {
        left: 10px;
      }
      &.right {
        right: 10px;
      }
      .iconfont {
        font-size: 12px;
      }
    }
    &:hover {
      .slider-btn {
        display: block;
      }
    }
    .slider-item {
      width: 430px;
      height: 160px;
      display: block;
      position: absolute;
      top: calc(50% - 80px);
      left: calc(50% - 215px);
      transition: 400ms all ease-in-out;
      z-index: 1;
      border-radius: 10px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      &.active {
        width: 540px;
        height: 200px;
        top: calc(50% - 100px);
        left: calc(50% - 270px);
        z-index: 25;
      }
      &.next {
        left: calc(100% - 430px);
        right: 0;
        z-index: 18;
      }
      &.prev {
        left: 0;
        z-index: 17;
      }
      &.next::after, &.prev::after{
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0, .1);
      }
    }
  }
}

/* 轮播图导航图标样式 */
.slider-dot {
  height: 20px;
  position: absolute;
  display: flex;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  .slider-dot-item {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    flex: 1;
    margin: 0 5px;
    background-color: var(--color-level5);
    &.active {
      background-color: red;
    }
  }
}
</style>
