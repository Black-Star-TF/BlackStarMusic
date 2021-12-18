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
      <!-- 最佳匹配 -->

      <!-- 单曲 -->
      <template v-if="type === 1">
        <div class="songs-container">
          <multiple-match
            v-if="multipleMatchResult && pageNo === 1"
            :result="multipleMatchResult"
          ></multiple-match>
          <song-list-table
            v-if="results"
            :songList="results"
            :keyword="keyword"
            @play-song="handlePlay"
          ></song-list-table>
        </div>
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

      <pagination
        v-if="loaded"
        :total="total"
        :page-size="pageSize"
        :current-page.sync="pageNo"
        @current-change="handleCurrentPageChange"
      />

      <loading v-if="!loaded" />
    </div>
  </div>
</template>

<script>
import TabNav from "@/components/common/tab-nav";
import SongListTable from "@/components/table/song-list-table";
import MultipleMatch from "./components/multiple-match.vue";
import SingerItem from "./components/singer-item";
import AlbumItem from "./components/album-item";
import PlaylistItem from "./components/playlist-item";
import UserItem from "./components/user-item";
import RadioItem from "./components/radio-item";
import VideoItem from "./components/video-item";
import Loading from "@/components/common/loading";
import Pagination from "@/components/common/pagination";
import { getSearchResult, getMultiMatch } from "@/api/search.js";
import { getTrackFormatInfo } from "@/utils/methods";
import { mapState } from "vuex";
export default {
  components: {
    TabNav,
    MultipleMatch,
    SongListTable,
    SingerItem,
    AlbumItem,
    PlaylistItem,
    UserItem,
    RadioItem,
    VideoItem,
    Loading,
    Pagination,
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
      loaded: false,
      multipleMatchResult: null,
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
    handlePlay(index) {
      const track = getTrackFormatInfo(this.results[index], "song", {
        type: "search",
        info: {
          id: "#",
          name: "搜索页",
          keywords: this.keyword,
        },
      });
      this.player.playTrack(track);
    },
    handleCurrentPageChange() {
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
      this.loaded = true;
    },
    getSearchResultData() {
      this.results = null;
      this.loaded = false;
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
  created() {
    this.setNum(window.innerWidth);
    this.type = Number(this.$route.query.type);
    this.keyword = this.$route.query.keyword;
    if (this.type == 1) {
      this.pageSize = 100;
      // 获取多重匹配结果
      getMultiMatch({ keywords: this.keyword }).then(res => {
        const { artist = null, user = null, album = null } = res.result;
        if (!artist && !user && !album) {
          this.multipleMatchResult = null;
        } else {
          this.multipleMatchResult = { artist, user, album };
        }
      });
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
  .songs-container {
    padding: 0 30px;
  }

  .video-container {
    padding: 0 30px;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
