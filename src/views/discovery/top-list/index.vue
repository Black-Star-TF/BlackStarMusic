<template>
  <div class="view-chart">
    <template v-if="loaded">
      <!-- 官方榜 -->
      <container>
        <template v-slot:left>
          <div class="container-title">
            <span>官方榜</span>
          </div>
        </template>
        <template v-slot:content>
          <official-list
            v-for="toplist in ofToplists"
            :toplist="toplist"
            :key="toplist.name"
          />
        </template>
      </container>

      <!-- 全球榜 -->
      <container>
        <template v-slot:left>
          <div class="container-title">
            <span>全球榜</span>
          </div>
        </template>
        <template v-slot:content>
          <global-list
            v-for="(toplist, index) in glToplists"
            :num="6"
            :toplist="toplist"
            :index="index"
            :key="toplist.id"
          />
        </template>
      </container>
    </template>
    <!-- <loading :loading="loading"/> -->
  </div>
</template>

<script>
import Container from "@/components/common/container";
import OfficialList from "./components/official-list";
import GlobalList from "./components/global-list";
// import Loading from '@/components/common/Loading'

import { getToplist } from "@/api/top-list.js";
export default {
  name: "Toplist",
  data() {
    return {
      ofToplists: [],
      glToplists: [],
      loaded: false,
    };
  },
  components: {
    Container,
    OfficialList,
    GlobalList,
    // Loading
  },
  methods: {
    async getData() {
      // 获取榜单数据
      let res = await getToplist();
      this.ofToplists = res.list.slice(0, 4);
      this.glToplists = res.list.slice(4);
      this.loaded = true;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.view-chart {
  height: 100%;
  padding: 0 7% 30px;
  box-sizing: border-box;
  overflow: overlay;
  .container-title {
    height: 50px;
    line-height: 50px;
    color: var(--color-level2);
    > span {
      cursor: default;
    }
  }
}
</style>
