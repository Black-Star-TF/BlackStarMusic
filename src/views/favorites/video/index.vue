<template>
  <div class="favorite-video-wrapper">
    <container>
      <template v-slot:left>
        <div class="title">
          收藏的视频 <span class="count">({{ count }})</span>
        </div>
      </template>
      <template v-slot:right></template>
      <template v-slot:content>
        <video-item
          v-for="(video, index) in videos"
          :key="video.vid"
          :video="video"
          :index="index"
        />
      </template>
    </container>
  </div>
</template>

<script>
import { getFavoritesVideo } from "@/api/auth";
import VideoItem from "@/views/search/components/video-item.vue";
import Container from "@/components/common/container";
export default {
  components: {
    VideoItem,
    Container,
  },
  data() {
    return {
      videos: [],
      count: 0,
      hasMore: false,
    };
  },
  computed: {},
  methods: {
    async getData() {
      const { data, hasMore, count } = await getFavoritesVideo();
      this.videos = this.videos.concat(data);
      this.hasMore = hasMore;
      this.count = count;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.favorite-video-wrapper {
  padding: 20px 30px;
  height: 100%;
  box-sizing: border-box;
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
