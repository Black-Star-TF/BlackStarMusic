<template>
  <!-- 导航栏 -->
  <div class="cate-nav">
    <router-link
    v-for="item in navList"
    :key="item.path"
    :to="item.path"
    class="cate-nav-item"
    active-class="active"
    tag="span">
      {{item.name}}
    </router-link>
  </div>
</template>

<script>
export default {
  props:{
    navList:{
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.cate-nav{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 30px;
  .cate-nav-item{
    height: 30px;
    line-height: 30px;
    display: inline-block;
    margin-right: 30px;
    font-size: 14px;
    cursor: pointer;
    color: var(--header-color-level3);
    &:hover{
      color: var(--header-color-level2);
      font-weight: bold;
    }
    &.active{
      color: var(--header-color-level1);
      font-weight: bold;
    }
    &:nth-last-child(1){
      margin-right: 0;
    }
  }
}
</style>
