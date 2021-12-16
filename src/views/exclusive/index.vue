<template>
  <div class="exclusive-wrapper">
    <div class="page-box">
      <page-header>
        <div class="page-name">独家放送</div>
      </page-header>
      <container>
        <template v-slot:content>
          <exclusive-item
            v-for="(mv, index) in exclusiveVideos"
            :exclusiveItem="mv"
            :num="3"
            :index="index"
            :key="mv.id"
          />
        </template>
      </container>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/common/page-header";
import Container from "@/components/common/container";
import ExclusiveItem from "@/views/shipin/mv/components/exclusive-item.vue";
import { getExclusive } from "@/api/video";
export default {
  components: {
    PageHeader,
    Container,
    ExclusiveItem,
  },
  data() {
    return {
      exclusiveVideos: [],
      hasMore: false,
      getMore: false,
      pageSize: 30,
      pageNo: 1,
    };
  },
  computed: {
    offset() {
      return (this.pageNo - 1) * this.pageSize;
    },
  },
  methods: {
    async getData() {
      const { result, more } = await getExclusive({
        limit: this.pageSize,
        offset: this.offset,
      });
      this.exclusiveVideos = this.exclusiveVideos.concat(result);
      this.hasMore = more;
      this.getMore = false;
    },
    getMoreData(e) {
      let { scrollTop, offsetHeight, scrollHeight } = e.target;
      // 判断是否滚动到底部
      if (
        !this.hasMore ||
        this.getMore ||
        scrollHeight - offsetHeight - scrollTop > 5
      )
        return;
      this.pageNo++;
      this.getMore = true;
      this.getData();
    },
  },
  filters: {},
  created() {
    this.getData();
  },
  mounted() {
    // 鼠标滚动到底部，获取更多数据
    this.$el.addEventListener("scroll", this.getMoreData);
  },
  beforeDestroy() {
    // 移除事件
    this.$el.removeEventListener("scroll", this.getMoreData);
  },
};
</script>

<style lang="scss" scoped>
.exclusive-wrapper {
  height: 100%;
  box-sizing: border-box;
  overflow: overlay;
  padding-top: 30px;
  .page-name {
    height: 100%;
    line-height: inherit;
    font-size: 15px;
    font-weight: bold;
    color: var(--color-level2);
    padding-left: 25px;
  }
}
</style>
