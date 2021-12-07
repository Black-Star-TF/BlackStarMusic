<template>
  <div class="page-box">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 1300px) {
  .page-box {
    margin: 0 30px;
  }
}
@media screen and (min-width: 1300px) {
  .page-box {
    width: 1040px;
    margin: 0 auto;
  }
}
</style>
