<template>
  <div class="scroll" ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BetterScroll from '@better-scroll/core'
import MouseWhell from '@better-scroll/mouse-wheel'
import ScrollBar from '@better-scroll/scroll-bar'
BetterScroll.use(MouseWhell)
BetterScroll.use(ScrollBar)
export default {
  data () {
    return {
      defaultOptions: {
        mouseWheel: true,
        scrollY: true,
        scrollbar: true,
        probeType: 3
      }
    }
  },
  props:{
    options:{
      default: () => ({})
    }
  },
  computed: {},
  mounted(){
    this.scroller = new BetterScroll(this.$refs.scroll,Object.assign(this.defaultOptions, this.options))
    this.$emit('init', this.scroller)
  },
  methods: {
    getScroller() {
      return this.scroller
    },
    refresh() {
      this.scroller.refresh()
    }
  },
  filters: {},
  created () {}
}
</script>

<style lang="scss" scoped>
::v-deep.scroll{
  height: 100%;
  position: relative;
  overflow: hidden;
  border-right: 1px solid var(--color-level5);
  .bscroll-indicator{
    border: none!important;
    background-color: var(--scroll-bar-bg-color)!important;
  }
}
</style>
