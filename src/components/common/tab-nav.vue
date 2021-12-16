<template>
  <div class="tab-nav">
    <div class="nav-container">
      <slot name="left"></slot>
    </div>
    <div class="right-operation">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.tab-nav {
  width: 100%;
  height: 30px;
  display: flex;
  flex-wrap: wrap;
  .nav-container {
    flex: 1;
    height: 100%;
    line-height: 30px;
    font-size: 14px;
    display: flex;
    div {
      cursor: pointer;
      color: var(--color-level2);
      margin: 0 15px;
      &:first-of-type {
        margin-left: 0;
      }
      &:last-of-type {
        margin-right: 0;
      }
      &:hover {
        color: var(--color-level1);
      }
      &.active {
        color: var(--color-netease-red);
        &::after {
          display: block;
          content: "";
          width: 100%;
          height: 2px;
          position: relative;
          top: -2px;
          background-color: var(--color-netease-red);
        }
      }
    }
  }
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--color-level5);
  }

  .right-operation {
    width: 150px;
    height: 100%;
    line-height: 30px;
  }
}
</style>
