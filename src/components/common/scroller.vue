<template>
  <div class="scroll" ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BetterScroll from "@better-scroll/core";
import MouseWheel from "@better-scroll/mouse-wheel";
import ScrollBar from "@better-scroll/scroll-bar";
import Slide from '@better-scroll/slide'
BetterScroll.use(MouseWheel);
BetterScroll.use(ScrollBar);
BetterScroll.use(Slide);
export default {
  data() {
    return {
      defaultOptions: {
        scrollX: false,
        scrollY: false,
        disableMouse: true,
        bounce: false,
        probeType: 3,
      },
    };
  },
  props: {
    options: {
      default: () => ({}),
    },
  },
  computed: {},
  mounted() {
    this.scroller = new BetterScroll(
      this.$refs.scroll,
      Object.assign(this.defaultOptions, this.options)
    );
    this.scroller.on("mousewheelStart", () => {
      this.$emit("mousewheelStart");
    });
    this.scroller.on("mousewheelEnd", () => {
      this.$emit("mousewheelEnd");
    });
    
    this.scroller.refresh();
    this.$emit("init", this.scroller);
  },
  methods: {
    getScroller() {
      return this.scroller;
    },
    refresh() {
      this.scroller.refresh();
    },
  },
  filters: {},
  created() {},
};
</script>

<style lang="scss" scoped>
::v-deep.scroll {
  position: relative;
  overflow: hidden;
}
</style>
