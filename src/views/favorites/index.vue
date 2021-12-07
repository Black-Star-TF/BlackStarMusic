<template>
  <div class="favorites-wrapper">
    <page-header>
      <cate-nav :navList="navList"></cate-nav>
    </page-header>
    <!-- 导航栏 -->

    <div class="favorites-content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import CateNav from "@/components/common/cate-nav";
import PageHeader from "@/components/common/page-header";
export default {
  components: {
    CateNav,
    PageHeader
  },
  data () {
    return {
      navList: [
        { path: "/favorites/album", name: "专辑" },
        { path: "/favorites/singer", name: "歌手" },
        { path: "/favorites/video", name: "视频" },
        { path: "/favorites/column", name: "专栏" },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.favorites-wrapper {
  height: 100%;
  .favorites-content {
    height: 100%;
  }
}
</style>
