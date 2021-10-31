<template>
  <div class="discovery">
    <page-header>
      <cate-nav :navList="navList"></cate-nav>
    </page-header>
    <!-- 导航栏 -->
    
    <div class="discovery-content">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import CateNav from '@/components/common/cate-nav'
import PageHeader from '@/components/common/page-header'
export default {
  components: {
    CateNav,
    PageHeader
  },
  data () {
    return {
      navList: [
        { path: '/discovery/rcmd', name: '个性推荐'},
        { path: '/discovery/playlist', name: '歌单'},
        { path: '/discovery/djradio', name: '主播电台'},
        { path: '/discovery/chart', name: '排行榜'},
        { path: '/discovery/singer', name: '歌手'},
        { path: '/discovery/newest', name: '最新音乐'},
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.discovery{
  height: 100%;
  .discovery-content{
    height: 100%;
    padding: 0 7%;
    overflow: overlay;
  }
}
</style>
