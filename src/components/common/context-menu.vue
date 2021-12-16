<template>
  <div
    class="context-menu"
    ref="menu"
    @click.stop
    :style="style"
    v-if="visible"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 0,
      height: 0,
    };
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    top: {
      type: Number,
      default: 0,
    },
    left: {
      type: Number,
      default: 0,
    },
    offsetRight: {
      type: Number,
      default: 0,
    },
    offsetBottom: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    style() {
      const doc = document.documentElement;
      let top = this.top;
      let left = this.left;
      if (this.left + this.width >= doc.offsetWidth) {
        left = this.left - this.width;
      }
      if (this.top + this.height >= doc.offsetHeight - this.offsetBottom) {
        top = this.top - this.height;
      }
      return {
        top: `${top}px`,
        left: `${left}px`,
      };
    },
  },
  methods: {
    close() {
      this.$emit("update:visible", false);
    },
    disableScroll(e) {
      e.preventDefault();
    },
  },
  filters: {},
  created() {},
  watch: {
    visible(val) {
      if (val) {
        window.addEventListener("mousewheel", this.disableScroll, {
          passive: false,
        });
        window.addEventListener("click", this.close);
        this.$nextTick(() => {
          this.width = this.$refs.menu.offsetWidth;
          this.height = this.$refs.menu.offsetHeight;
        });
      } else {
        window.removeEventListener("mousewheel", this.disableScroll);
        window.removeEventListener("click", this.close);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.context-menu {
  z-index: 500;
  position: fixed;
}
</style>
