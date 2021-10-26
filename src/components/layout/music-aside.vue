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
    <div class="group-name">我的音乐</div>
    <router-link class="nav-item" to="/download" tag="div" active-class="active">
      <i class="iconfont icon-xiazai" icon-friend></i>下载管理
    </router-link>
    <router-link class="nav-item" to="/recent" tag="div" active-class="active">
      <i class="iconfont icon-bendi-zuijinbofang" icon-friend></i>最近播放
    </router-link>
    <!-- 创建的歌单 -->
    <div class="group-name">创建的歌单</div>
    <!-- 收藏的歌单 -->
    <div class="group-name">收藏的歌单</div>
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
  .group-name{
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
    font-size: 13px;
    padding-left: 20px;
    color: var(--color-level4);
  }
}
</style>
