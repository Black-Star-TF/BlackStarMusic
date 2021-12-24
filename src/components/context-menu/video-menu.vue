<template>
  <div class="video-menu">
    <div class="menu-item">查看评论</div>
    <div class="menu-item">播放</div>
    <div class="menu-item">收藏...</div>
    <div class="menu-item">分享...</div>
    <div class="menu-item">复制链接</div>
  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  components: {},
  data () {
    return {}
  },
  computed: {},
  methods: {},
  filters: {},
  created () {}
}
</script>

<style lang="scss" scoped>
.video-menu {
  width: 165px;
  padding: 5px;
  .menu-item {
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    color: var(--color-level1);
    border-radius: 5px;
    &:hover {
      color: #fff;
      background-color: var(--context-menu-hover-bg-color);
    }
  }
}
</style>
