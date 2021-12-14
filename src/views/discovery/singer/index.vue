<template>
  <div class="view-singer" ref="singerPage">
    <page-box>
      <!-- 导航 -->
      <group-nav
        :group="singerCate"
        :currentCate="currentCate"
        @cate-change="changeCate"
      ></group-nav>
      <!-- 歌手列表 -->
      <container>
        <template v-slot:content>
          <singer-item
            v-for="(singer, index) in singerList"
            :singer="singer"
            :num="6"
            :index="index"
            :key="singer.id"
          />
        </template>
      </container>
      <loading v-if="!loaded"/>
    </page-box>
  </div>
</template>

<script>
import Container from "@/components/common/container";
import GroupNav from "@/components/common/group-nav";
import SingerItem from "./components/singer";
import PageBox from "@/components/common/page-box";
import Loading from "@/components/common/loading";
import { getSingerList } from "@/api/singer.js";
export default {
  name: "Singer",
  data() {
    return {
      singerList: [],
      pageSize: 24,
      pageNo: 1,
      hasMore: true,
      getMore: false,
      loaded: false,
      currentCate: {
        area: "-1",
        type: "-1",
        initial: "-1",
      },
      singerCate: {
        area: {
          name: "语种",
          list: [
            { id: "-1", name: "全部" },
            { id: "7", name: "华语" },
            { id: "96", name: "欧美" },
            { id: "8", name: "日本" },
            { id: "16", name: "韩国" },
            { id: "0", name: "其他" },
          ],
        },
        type: {
          name: "分类",
          list: [
            { id: "-1", name: "全部" },
            { id: "1", name: "男歌手" },
            { id: "2", name: "女歌手" },
            { id: "3", name: "乐队组合" },
          ],
        },
        initial: {
          name: "筛选",
          list: [
            { id: "-1", name: "热门" },
            { id: "a", name: "A" },
            { id: "b", name: "B" },
            { id: "c", name: "C" },
            { id: "d", name: "D" },
            { id: "e", name: "E" },
            { id: "f", name: "F" },
            { id: "g", name: "G" },
            { id: "h", name: "H" },
            { id: "i", name: "I" },
            { id: "j", name: "J" },
            { id: "k", name: "K" },
            { id: "l", name: "L" },
            { id: "m", name: "M" },
            { id: "n", name: "N" },
            { id: "o", name: "O" },
            { id: "p", name: "P" },
            { id: "q", name: "Q" },
            { id: "r", name: "R" },
            { id: "s", name: "S" },
            { id: "t", name: "T" },
            { id: "u", name: "U" },
            { id: "v", name: "V" },
            { id: "w", name: "W" },
            { id: "x", name: "X" },
            { id: "y", name: "Y" },
            { id: "z", name: "Z" },
            { id: "0", name: "#" },
          ],
        },
      },
    };
  },
  components: {
    Container,
    GroupNav,
    SingerItem,
    PageBox,
    Loading
  },
  methods: {
    changeCate({ key, id }) {
      this.currentCate[key] = id;
      this.singerList = [];
      this.pageNum = 1;
      this.getData();
    },
    // 请求歌手列表
    async getData() {
      this.loaded = false
      let { type, area, initial } = this.currentCate;
      let { artists, more } = await getSingerList({
        type,
        area,
        initial,
        limit: this.pageSize,
        offset: this.offset,
      });
      this.singerList = this.singerList.concat(artists);
      this.hasMore = more;
      this.loaded = true
      this.$nextTick(() => {
        this.getMore = false;
      });
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
  computed: {
    // loaded() {
    //   return this.singerList.length > 0;
    // },
    offset() {
      return (this.pageNo - 1) * this.pageSize;
    },
  },
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
.view-singer {
  height: 100%;
  padding: 10px 0;
  box-sizing: border-box;
  overflow: overlay;
}
</style>
