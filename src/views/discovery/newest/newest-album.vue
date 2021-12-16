<template>
  <div class="view-newest-album">
    <container :left="16" :right="8">
      <template v-slot:left>
        <div class="tag-container">
          <span
            class="tag"
            :class="{ active: item.id == currentType }"
            v-for="item in type"
            @click="handleChange(item.id)"
            :key="item.id"
          >
            {{ item.name }}</span
          >
        </div>
      </template>
      <template v-slot:content>
        <album-item
          v-for="(album, index) in newestAlbumList"
          :key="album.id"
          :albumItem="album"
          :num="5"
          :index="index"
        ></album-item>
      </template>
    </container>
    <loading v-if="!loaded" />
  </div>
</template>

<script>
import { getNewAlbum } from "@/api/album";
import Container from "@/components/common/container";
import AlbumItem from "./components/newest-album-item.vue";
import Loading from "@/components/common/loading";
export default {
  components: {
    Container,
    AlbumItem,
    Loading,
  },
  data() {
    return {
      pageSize: 20,
      currentPage: 1,
      currentType: "ALL",
      newestAlbumList: [],
      loaded: false,
      hasMore: true,
      getMore: false,
      type: [
        { id: "ALL", name: "全部" },
        { id: "ZH", name: "华语" },
        { id: "EA", name: "欧美" },
        { id: "KR", name: "韩国" },
        { id: "JP", name: "日本" },
      ],
    };
  },
  computed: {
    offset() {
      return (this.currentPage - 1) * this.pageSize;
    },
  },
  methods: {
    handleChange(type) {
      this.currentType = type;
      this.currentPage = 1;
      this.newestAlbumList = [];
      this.getData();
    },
    async getData() {
      this.loaded = false;
      const { albums } = await getNewAlbum({
        limit: this.pageSize,
        offset: this.offset,
        area: this.currentType,
      });
      this.newestAlbumList = [...this.newestAlbumList, ...albums];
      this.loaded = true;
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
      this.currentPage++;
      this.getMore = true;
      this.getData();
    },
  },
  mounted() {
    // TODO: 鼠标滚动到底部，获取更多数据
    // this.$parent.$refs.page.addEventListener("scroll", this.getMoreData);
  },
  beforeDestroy() {
    // 移除事件
    // this.$parent.$refs.page.removeEventListener("scroll", this.getMoreData);
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.view-newest-album {
  margin-top: 30px;
  .tag-container {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    margin-bottom: 10px;
    > span.tag {
      display: inline-block;
      margin: 0 10px;
      color: var(--color-level3);
      cursor: pointer;
      &:hover {
        color: var(--color-level2);
      }
      &.active {
        font-weight: bold;
        color: var(--color-level1);
      }
    }
  }
}
</style>
