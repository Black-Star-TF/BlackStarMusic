<template>
  <div class="singer-album-wrapper">
    <album-item
      v-for="(album, index) in albums"
      :key="album.id"
      :album="album"
      :index="index"
      :num="num"
    ></album-item>
  </div>
</template>

<script>
import AlbumItem from "./components/album-item.vue";
import { getSingerAlbums } from "@/api/singer.js";
export default {
  components: {
    AlbumItem,
  },
  data() {
    return {
      albums: [],
      pageSize: 20,
      pageNo: 1,
      hasMore: false,
      getMore: false,
      num: 4,
    };
  },
  props: {
    id: {
      required: true,
    },
  },
  computed: {
    offset() {
      return (this.pageNo - 1) * this.pageSize;
    },
  },
  methods: {
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
    handleWindowResize(e) {
      this.setNum(e.target.innerWidth);
    },
    setNum(width) {
      if (width <= 1200) {
        this.num = 5;
      } else {
        this.num = 6;
      }
    },
    async getData() {
      const { hotAlbums, more } = await getSingerAlbums({
        id: this.id,
        limit: this.pageSize,
        offset: this.offset,
      });
      this.albums = this.albums.concat(hotAlbums);
      this.hasMore = more;
      this.getMore = false;
    },
  },
  created() {
    this.setNum(window.innerWidth);
    this.getData();
  },
  mounted() {
    window.addEventListener("resize", this.handleWindowResize);
    this.$parent.$el.addEventListener("scroll", this.getMoreData);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
    this.$parent.$el.removeEventListener("scroll", this.getMoreData);
  },
};
</script>

<style lang="scss" scoped>
.singer-album-wrapper {
  padding: 0 30px;
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
</style>
