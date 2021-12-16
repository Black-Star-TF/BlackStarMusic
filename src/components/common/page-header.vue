<template>
  <div class="page-header" v-show="show">
    <slot></slot>
  </div>
</template>

<script>
export default {
  computed: {
    show() {
      return !this.$store.state.app.songDetailVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
.page-header {
  position: absolute;
  left: 0;
  right: 300px;
  background-color: var(--header-bg-color);
  height: var(--app-header-height);
  line-height: var(--app-header-height);
  top: calc(-1 * var(--app-header-height));
}
</style>
