<template>
  <div class="detail-subscribers">
    <div class="subscribers-wrapper">
      <subscriber-item
        v-for="(item, index) in subscribers"
        :key="item.userId"
        :index="index"
        :subscriber="item"
        :num="3"
      />
    </div>

    <pagination
      v-if="loaded"
      :total="total"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getPlaylistSubscribers } from "@/api/playlist.js";
import SubscriberItem from "./components/subscriber-item";
import Pagination from "@/components/common/pagination";
export default {
  components: {
    SubscriberItem,
    Pagination,
  },
  data() {
    return {
      subscribers: [],
      total: 0,
      pageSize: 45,
      currentPage: 1,
    };
  },
  props: {
    id: {
      required: true,
    },
  },
  computed: {
    offset() {
      return (this.currentPage - 1) * this.pageSize;
    },
    loaded() {
      return this.subscribers.length > 0;
    },
  },
  methods: {
    handleCurrentChange() {
      this.getData();
    },
    async getData() {
      this.subscribers = [];
      let { subscribers, total } = await getPlaylistSubscribers({
        id: this.id,
        limit: this.pageSize,
        offset: this.offset,
      });
      this.subscribers = subscribers;
      this.total = total;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.detail-subscribers {
  padding: 10px 30px 0;
  box-sizing: border-box;
  .subscribers-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
