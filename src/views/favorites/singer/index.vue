<template>
  <div class="favorite-singer-wrapper">
    <container>
      <template v-slot:left>
        <div class="title">
          收藏的歌手 <span class="count">({{ count }})</span>
        </div>
      </template>
      <template v-slot:right></template>
      <template v-slot:content>
        <singer-item
          v-for="singer in singers"
          :key="singer.id"
          :singer="singer"
        />
      </template>
    </container>
  </div>
</template>

<script>
import { getFavoritesSinger } from "@/api/auth";
import SingerItem from "./components/singer-item.vue";
import Container from "@/components/common/container";
export default {
  components: {
    SingerItem,
    Container,
  },
  data() {
    return {
      singers: [],
      count: 0,
      hasMore: false,
    };
  },
  computed: {},
  methods: {
    async getData() {
      const { data, hasMore, count } = await getFavoritesSinger();
      this.singers = this.singers.concat(data);
      this.hasMore = hasMore;
      this.count = count;
    },
  },
  filters: {},
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.favorite-singer-wrapper {
  padding: 20px 30px;
  height: 100%;
  overflow: overlay;
  .title {
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
    font-size: 15px;
    color: var(--color-level2);
    font-weight: bold;
    .count {
      font-size: 12px;
      color: var(--color-level3);
      font-weight: normal;
    }
  }
}
</style>
