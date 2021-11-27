<template>
  <div class="view-search">
    <div class="header">
      <div class="title">
        <span class="keyword">{{ keyword }}</span>
        <span class="result">{{ resultStr }}</span>
      </div>
      <tab-nav>
        <template v-slot:left>
          <div
            v-for="tab in tabList"
            :key="tab.id"
            :class="{ active: tab.id == type }"
            @click="changeType(tab.id)"
          >
            {{ tab.name }}
          </div>
        </template>
      </tab-nav>
    </div>
    <div class="container">
      <!-- 单曲 -->
      <template v-if="results && type == 1">
        <song-list-table
          :songList="results"
          :keyword="keyword"
          @play-song="handlePlay"
        ></song-list-table>
      </template>
      <!-- 歌手 -->
      <template v-if="results && type == 100">
        <singer-item
          v-for="singer in results"
          :key="singer.id"
          :singer="singer"
          :keyword="keyword"
        ></singer-item>
      </template>
      <!-- 专辑 -->
      <template v-if="results && type == 10">
        <album-item
          v-for="album in results"
          :key="album.id"
          :album="album"
          :keyword="keyword"
        ></album-item>
      </template>
      <!-- 视频 -->
      <template v-if="results && type == 1014">
        <div class="video-container">
          <video-item
            v-for="(video, index) in results"
            :key="video.vid"
            :num="num"
            :keyword="keyword"
            :video="video"
            :index="index"
          ></video-item>
        </div>
      </template>
      <!-- 歌单 -->
      <template v-if="results && type == 1000">
        <playlist-item
          v-for="playlist in results"
          :key="playlist.id"
          :playlist="playlist"
          :keyword="keyword"
        ></playlist-item>
      </template>
      <!-- 主播电台 -->
      <template v-if="results && type == 1009">
        <radio-item
          v-for="radio in results"
          :key="radio.id"
          :radio="radio"
          :keyword="keyword"
        ></radio-item>
      </template>
      <!-- 用户 -->
      <template v-if="results && type == 1002">
        <user-item
          v-for="user in results"
          :key="user.userId"
          :user="user"
          :keyword="keyword"
        ></user-item>
      </template>

      <el-pagination
        v-if="results"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page.sync="pageNo"
        @current-change="changeCurrentPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import TabNav from "@/components/common/tab-nav";
import SongListTable from "@/components/table/song-list-table";

import SingerItem from "./components/singer-item";
import AlbumItem from "./components/album-item";
import PlaylistItem from "./components/playlist-item";
import UserItem from "./components/user-item";
import RadioItem from "./components/radio-item";
import VideoItem from "./components/video-item";

import { getSearchResult } from "@/api/search.js";
import { mapState } from "vuex";
export default {
  components: {
    TabNav,
    SongListTable,
    SingerItem,
    AlbumItem,
    PlaylistItem,
    UserItem,
    RadioItem,
    VideoItem,
  },
  data() {
    return {
      num: 5,
      type: null,
      keyword: null,
      pageNo: 1,
      pageSize: 25,
      results: null,
      total: 0,
      resultStr: "",
      tabList: [
        { id: 1, name: "单曲" },
        { id: 100, name: "歌手" },
        { id: 10, name: "专辑" },
        { id: 1014, name: "视频" },
        { id: 1000, name: "歌单" },
        { id: 1009, name: "主播电台" },
        { id: 1002, name: "用户" },
      ],
    };
  },
  computed: {
    ...mapState(["player"]),
    offset() {
      return (this.pageNo - 1) * this.pageSize;
    },
  },
  methods: {
    handlePlay(trackId) {
      this.player.addTrackToPlayList(trackId, true);
    },
    changeCurrentPage() {
      this.getSearchResultData();
    },
    changeType(type) {
      this.$router.push({
        path: "/search",
        query: {
          keyword: this.keyword,
          type,
        },
      });
    },
    setResult(result) {
      switch (this.type) {
        case 1:
          this.results = result.songs;
          this.total = result.songCount || 0;
          this.resultStr = `找到${this.total}首单曲`;
          break;
        case 100:
          this.results = result.artists;
          this.total = result.artistCount || 0;
          this.resultStr = `找到${this.total}位歌手`;
          break;
        case 10:
          this.results = result.albums;
          this.total = result.albumCount || 0;
          this.resultStr = `找到${this.total}张专辑`;
          break;
        case 1014:
          this.results = result.videos;
          this.total = result.videoCount || 0;
          this.resultStr = `找到${this.total}个视频`;
          break;
        case 1000:
          this.results = result.playlists;
          this.total = result.playlistCount || 0;
          this.resultStr = `找到${this.total}个歌单`;
          break;
        case 1009:
          this.results = result.djRadios;
          this.total = result.djRadiosCount || 0;
          this.resultStr = `找到${this.total}个电台`;
          break;
        case 1002:
          this.results = result.userprofiles;
          this.total = result.userprofileCount || 0;
          this.resultStr = `找到${this.total}位用户`;
          break;
      }
    },
    getSearchResultData() {
      this.results = null;
      let params = {
        keywords: this.keyword,
        type: this.type,
        limit: this.pageSize,
        offset: this.offset,
      };
      getSearchResult(params).then(res => {
        this.setResult(res.result);
      });
    },
    handleWindowResize(e) {
      this.setNum(e.target.innerWidth);
    },
    setNum(width) {
      if (width <= 1200) {
        this.num = 4;
      } else {
        this.num = 5;
      }
    },
  },
  filters: {},
  created() {
    this.setNum(window.innerWidth);
    this.type = Number(this.$route.query.type);
    this.keyword = this.$route.query.keyword;
    if (this.type == 1) {
      this.pageSize = 100;
    }
    // 请求数据
    this.getSearchResultData();
  },
  mounted() {
    window.addEventListener("resize", this.handleWindowResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
  },
};
</script>

<style lang="scss" scoped>
.view-search {
  height: 100%;
  box-sizing: border-box;
  padding-top: 10px;
  .header {
    padding: 0 30px;
    height: 80px;
    .title {
      height: 40px;
      .keyword {
        font-size: 22px;
        color: var(--color-level2);
      }
      .result {
        font-size: 13px;
        color: var(--color-level4);
      }
    }
  }
  .container {
    height: calc(100% - 80px);
    overflow: auto;
  }

  .video-container {
    padding: 0 30px;
    display: flex;
    flex-wrap: wrap;
  }
}
.el-pagination {
  display: flex;
  justify-content: center;
}
</style>
