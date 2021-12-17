<template>
  <div class="mv-detail-page">
    <div class="main">
      <div class="title">
        <span><i class="iconfont icon-shangyiye"></i>视频详情</span>
      </div>
      <video
        :src="videoUrl"
        width="100%"
        class="video"
        controls
        autoplay
      ></video>
      <!-- 歌手 -->
      <div v-if="videoDetail">
        <div class="artist">
          <span
            class="artist-cover"
            @click="toArtistDetail(videoDetail.creator.userId)"
            :style="{
              backgroundImage: `url(${videoDetail.creator.avatarUrl})`,
            }"
          ></span>
          <span
            class="artist-name"
            @click="toArtistDetail(videoDetail.creator.userId)"
            >{{ videoDetail.creator.nickname }}</span
          >
        </div>
        <div class="name">
          {{ videoDetail.title }}
          <span
            v-if="videoDetail.description"
            @click="changeDesc"
            :class="['iconfont', icon]"
          ></span>
        </div>
        <div class="info">
          <span>发布：{{ videoDetail.publishTime | formatDate }}</span>
          <span>播放：{{ videoDetail.playTime | formatCount }}次</span>
        </div>
        <div class="video-group">
          <span
            class="video-tag"
            v-for="tag in videoDetail.videoGroup"
            :key="tag.id"
            >{{ tag.name }}</span
          >
        </div>
        <div class="desc" v-if="showDesc">
          {{ videoDetail.description }}
        </div>
        <div class="operation">
          <span class="operation-item"
            ><span class="iconfont icon-dianzan"></span> 赞({{
              videoDetail.praisedCount
            }})</span
          >
          <span class="operation-item"
            ><span class="iconfont icon-shoucang"></span> 收藏({{
              videoDetail.subscribeCount
            }})</span
          >
          <span class="operation-item"
            ><span class="iconfont icon-fenxiang1"></span> 分享({{
              videoDetail.shareCount
            }})</span
          >
          <span class="jubao">举报</span>
        </div>
        <div class="comment-title">
          <span class="title">听友评论</span>
          <span class="count"
            >(已有{{ videoDetail.commentCount | formatCount }}条评论)</span
          >
        </div>
      </div>
      <!-- 评论 -->
      <comment :type="type" :id="id"></comment>
    </div>
    <div class="about">
      <div class="title">相关推荐</div>
      <!-- 推荐视频 -->
      <relative-video-item
        v-for="video in relativeVideoList"
        :key="video.vid"
        :video="video"
      ></relative-video-item>
    </div>
  </div>
</template>

<script>
import { getVideoUrl, getVideoDetail, getRelativeVideo } from "@/api/video";
import { toArtistDetail } from "@/utils/methods";
import { formatCount, formatDate } from "@/utils/filters";
import RelativeVideoItem from "./components/relative-video-item";
import Comment from "@/views/resource-comment/components/comment.vue";
import RESOURCE_TYPE from "@/utils/resource-type";
export default {
  components: {
    RelativeVideoItem,
    Comment,
  },
  data() {
    return {
      id: null,
      type: RESOURCE_TYPE.VIDEO,
      videoUrl: "",
      videoDetail: null,
      relativeVideoList: [],
      showDesc: false,
    };
  },
  computed: {
    icon() {
      return this.showDesc ? "icon-sanjiao2" : "icon-sanjiao1";
    },
  },
  methods: {
    toArtistDetail,
    changeDesc() {
      this.showDesc = !this.showDesc;
    },
    initData() {
      // 初始化data
      (this.id = null),
        (this.videoUrl = ""),
        (this.videoDetail = null),
        (this.relativeVideoList = []),
        (this.showDesc = false);
    },
    init() {
      this.initData();
      this.id = this.$route.query.id;
      // 获取相关视频
      getRelativeVideo(this.id).then(res => {
        this.relativeVideoList = res.data;
      });
      // 获取视频 url
      getVideoUrl(this.id).then(res => {
        this.videoUrl = res.urls[0].url;
      });

      // 获取视频详情
      getVideoDetail(this.id).then(res => {
        this.videoDetail = res.data;
      });
    },
  },
  filters: {
    formatCount,
    formatDate,
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.state.player.pause();
    });
  },
  created() {
    this.init();
  },
  watch: {
    $route() {
      this.init();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.mv-detail-page {
  overflow: overlay;
  position: absolute;
  top: var(--app-header-height);
  left: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  width: 100%;
  background-color: var(--main-bg-color);
  justify-content: center;
  .title {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-weight: bold;
    color: var(--color-level2);
    span {
      cursor: pointer;
    }
    .iconfont {
      margin-right: 5px;
    }
  }
  .main {
    width: 620px;
    margin-right: 30px;
    .video {
      height: 350px;
      border-radius: 10px;
      background-color: #000;
    }
    .artist {
      line-height: 50px;
      margin: 20px 0;
      .artist-cover {
        vertical-align: middle;
        display: inline-block;
        width: 50px;
        padding-bottom: 50px;
        border-radius: 100%;
        @include background;
        margin-right: 10px;
        cursor: pointer;
      }
      .artist-name {
        vertical-align: middle;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        display: inline-block;
        cursor: pointer;
        color: var(--color-level3);
        &:hover {
          color: var(--color-level2);
        }
      }
    }
    .name {
      line-height: 35px;
      font-size: 24px;
      font-weight: bold;
      color: var(--color-level2);
      .iconfont {
        position: relative;
        top: -2px;
        color: var(--color-level5);
      }
    }
    .info {
      margin-top: 10px;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: var(--color-level4);
      span {
        margin-right: 20px;
      }
    }
    .video-group {
      margin-top: 10px;
      .video-tag {
        display: inline-block;
        font-size: 12px;
        height: 20px;
        line-height: 20px;
        border-radius: 10px;
        background-color: var(--table-hover-color);
        color: var(--color-level3);
        padding: 0 5px;
        margin-right: 10px;
        cursor: pointer;
      }
    }
    .desc {
      line-height: 20px;
      font-size: 12px;
      color: var(--color-level2);
      margin: 10px 0;
    }
    .operation {
      margin: 20px 0;
      margin-bottom: 50px;
      position: relative;
      height: 30px;
      line-height: 30px;
      .operation-item {
        display: inline-block;
        padding: 0 15px;
        height: 30px;
        line-height: 30px;
        color: var(--color-level2);
        border-radius: 16px;
        border: 1px solid var(--color-level5);
        cursor: pointer;
        margin-right: 10px;
        font-size: 14px;
        &:hover {
          background-color: var(--operation-btn-hover-bg-color);
        }
      }
      .jubao {
        font-size: 12px;
        color: var(--color-level4);
        position: absolute;
        right: 0;
        text-decoration: underline;
        cursor: pointer;
        &:hover {
          color: var(--color-level3);
        }
      }
    }
    .comment-title {
      margin: 15px 0;
      height: 20px;
      line-height: 20px;
      .title {
        line-height: 20px;
        font-size: 14px;
        color: var(--color-level2);
        &:hover {
          color: var(--color-level1);
        }
      }
      .count {
        line-height: 20px;
        font-size: 12.5px;
        color: var(--color-level3);
      }
    }
  }
  .about {
    width: calc(var(--min-width) - 650px);
  }
}
</style>
