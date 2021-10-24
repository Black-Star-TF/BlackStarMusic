<template>
  <div class="page-header">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.page-header{
  position: fixed;
  left: var(--app-aside-width);
  right: 300px;
  height: var(--app-header-height);
  line-height: var(--app-header-height);
  min-width: calc(var(--min-width) - var(--app-aside-width) - 300px);
  top: 0;
  z-index: 150;
}
</style>
