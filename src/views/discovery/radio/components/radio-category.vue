<template>
  <div class="radio-category-wrapper">
    <div class="prev">
      <span
        v-if="currentIndex !== 0"
        class="iconfont icon-shangyiye"
        @click="handlePrev"
      ></span>
    </div>
    <scroller
      class="radio-category-scroller-wrapper"
      :options="scrollOptions"
      @init="handleScrollerInit"
      ref="scroller"
    >
      <div class="radio-category-content" @mousewheel.prevent>
        <div class="group" v-for="(group, index) in radioCateList" :key="index">
          <template v-for="(item, index) in group">
            <div
              class="radio-category-item"
              v-if="item"
              :key="`${index}-${item.id}`"
              @click="toRadioCategory(item)"
            >
              <div class="cate-img">
                <img :src="item.pic56x56Url" />
              </div>
              <div class="cate-name">{{ item.name }}</div>
            </div>
            <div class="radio-category-item" :key="index" v-else></div>
          </template>
        </div>
      </div>
    </scroller>
    <div class="next">
      <span
        v-if="currentIndex !== radioCateList.length - 1"
        class="iconfont icon-xiayiye"
        @click="handleNext"
      ></span>
    </div>
  </div>
</template>

<script>
import Scroller from "@/components/common/scroller";
export default {
  components: {
    Scroller,
  },
  data() {
    return {
      currentIndex: 1,
      scroller: null,
      scrollOptions: {
        scrollX: true,
        momentum: false,
        mouseWheel: {
          speed: 50,
          invert: false,
          easeTime: 0,
          discreteTime: 1,
        },
        slide: {
          loop: false,
          autoplay: false,
          threshold: 100,
          speed: 1000,
          easing: {
            style: "cubic-bezier(.42,0,.58,1)",
          },
        },
      },
    };
  },
  props: {
    radioCateList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handlePrev() {
      this.scroller.prev();
    },
    handleNext() {
      this.scroller.next();
    },
    toRadioCategory(cate) {
      this.$router.push({
        path: "/radio-category",
        query: { category: cate.name, id: cate.id },
      });
    },
    handleScrollerInit(scroller) {
      this.scroller = scroller;
      this.currentIndex = this.scroller.getCurrentPage().pageX;
      this.scroller.on("scroll", () => {
        this.scroller.disable();
      });
      this.scroller.on("scrollEnd", () => {
        this.scroller.enable();
        this.currentIndex = this.scroller.getCurrentPage().pageX;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.radio-category-wrapper {
  width: 100%;
  height: 100px;
  display: flex;
  margin: 20px 0;
  .prev {
    width: 30px;
    height: 100%;
    top: 0;
    left: 0;
    text-align: left;
  }
  .next {
    width: 30px;
    height: 100%;
    top: 0;
    right: 0;
    text-align: right;
  }
  .prev,
  .next {
    line-height: 100px;
    .iconfont {
      font-size: 25px;
      cursor: pointer;
      font-weight: 100;
      color: var(--color-level1);
      &:hover {
        color: var(--color-level4);
      }
    }
  }
  .radio-category-scroller-wrapper {
    width: calc(100% - 60px);
    height: 100%;
    .radio-category-content {
      white-space: nowrap;
      height: 100%;
      .group {
        display: inline-flex;
        width: 100%;
        height: 100%;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: center;
        .radio-category-item {
          width: 50px;
          height: 80px;
          &:hover {
            .cate-img {
              background-color: rgba(196, 71, 57, 0.1);
            }
          }
          .cate-img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: rgba(196, 71, 57, 0.05);
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 30px;
              height: 30px;
            }
          }
          .cate-name {
            height: 20px;
            line-height: 20px;
            margin-top: 10px;
            font-size: 12.5px;
            text-align: center;
            color: var(--color-level3);
          }
        }
      }
    }
  }
}
</style>
