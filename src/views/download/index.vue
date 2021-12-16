<template>
  <div class="view-download">
    <page-header>
      <cate-nav :navList="navList"></cate-nav>
    </page-header>
    <!-- 导航栏 -->

    <div class="download-content">
      <developing />
      <!-- <keep-alive>
        <router-view/>
      </keep-alive> -->
    </div>
  </div>
</template>

<script>
import CateNav from "@/components/common/cate-nav";
import PageHeader from "@/components/common/page-header";
import Developing from "@/components/common/developing";
export default {
  components: {
    CateNav,
    PageHeader,
    Developing,
  },
  data() {
    return {
      navList: [
        { path: "/download/single", name: "已下载单曲" },
        { path: "/download/program", name: "已下载节目" },
        { path: "/download/downloading", name: "正在下载" },
      ],
    };
  },
  computed: {},
  methods: {},
  filters: {},
  created() {},
};
</script>

<style lang="scss" scoped></style>
