<template>
  <div class="app-aside">
    <!-- 用户 -->
    <div class="user">未登录</div>
    <!-- 菜单 -->
    <router-link class="nav-item" to="/discovery" tag="div" active-class="active">
      <i class="iconfont icon-wangyiyunyinleclick"></i>发现音乐
    </router-link>
    <router-link class="nav-item" to="/privatefm" tag="div" active-class="active">
      <i class="iconfont icon-Sharingwuxianlanyagongxiang10"></i>私人FM
    </router-link>
    <router-link class="nav-item" to="/video" tag="div" active-class="active">
      <i class="iconfont icon-video"></i>视频
    </router-link>
    <router-link class="nav-item" to="/firend" tag="div" active-class="active">
      <i class="iconfont icon-friend" icon-friend></i>朋友
    </router-link>
    <!-- 我的音乐 -->
    <!-- 创建的歌单 -->
    <!-- 收藏的歌单 -->
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
.app-aside{
  position: absolute;
  top: 0;
  bottom: var(--app-player-height);
  left: 0;
  width: var(--app-aside-width);
  background-color: var(--aside-bg-color);
  z-index: 101;
  .user{
    height: 60px;
    line-height: 60px;
  }
  .nav-item{
    height: 36px;
    line-height: 36px;
    padding-left: 20px;
    font-size: 13.5px;
    color: var(--color-level2);
    cursor: pointer;
    &:hover{
      background-color: var(--aside-active-link-bg-color);
    }
    &.active{
      background-color: var(--aside-active-link-bg-color);
      color: var(--color-netease-red);
    }
    .iconfont{
      margin-right: 10px;
    }
  }
}
</style>
