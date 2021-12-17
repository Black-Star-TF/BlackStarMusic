<template>
  <div class="search-drawer" @click.stop>
    <template v-if="hasKeywords">
      <!-- header -->
      <div class="search-suggest">
        <div class="header">
          <span class="title" @click="handleSearch()"
            >搜“<span class="keywords">{{ this.keywords }}</span
            >”相关的结果</span
          >
        </div>

        <!-- 单曲 -->
        <div
          class="search-suggest-group"
          v-if="searchSuggestions && searchSuggestions.songs"
        >
          <div class="group-name"><i class="iconfont icon-yinle"></i>单曲</div>
          <div
            class="song-item item"
            v-for="song in searchSuggestions.songs"
            :key="song.id"
          >
            <span class="song-name">
              <span v-html="markKeywords(song.name)"></span>
              <span class="alias" v-if="song.alias.length > 0">
                ({{ song.alias[0] }})</span
              >
            </span>
            -
            <span
              class="artist-name"
              v-for="artist in song.artists"
              :key="artist.id"
              v-html="markKeywords(artist.name)"
            ></span>
          </div>
        </div>
        <!-- 歌手 -->
        <div
          class="search-suggest-group"
          v-if="searchSuggestions && searchSuggestions.artists"
        >
          <div class="group-name"><i class="iconfont icon-icon"></i>歌手</div>
          <div
            class="artist-item item"
            v-for="artist in searchSuggestions.artists"
            :key="artist.id"
            @click="toArtistDetail(artist.id)"
          >
            <span class="artist-name" v-html="markKeywords(artist.name)"></span>
          </div>
        </div>
        <!-- 专辑 -->
        <div
          class="search-suggest-group"
          v-if="searchSuggestions && searchSuggestions.albums"
        >
          <div class="group-name">
            <i class="iconfont icon-zhuanji"></i>专辑
          </div>
          <div
            class="album-item item"
            v-for="album in searchSuggestions.albums"
            :key="album.id"
            @click="toAlbumDetail(album.id)"
          >
            <span class="album-name" v-html="markKeywords(album.name)"></span>
            <span> - </span>
            <span
              class="artist-name"
              v-html="markKeywords(album.artist.name)"
            ></span>
          </div>
        </div>
        <!-- 歌单 -->
        <div
          class="search-suggest-group"
          v-if="searchSuggestions && searchSuggestions.playlists"
        >
          <div class="group-name"><i class="iconfont icon-gedan"></i>歌单</div>
          <div
            class="playlist-item item"
            v-for="playlist in searchSuggestions.playlists"
            :key="playlist.id"
            @click="toPlaylistDetail(playlist.id)"
          >
            <span
              class="playlist-name"
              v-html="markKeywords(playlist.name)"
            ></span>
          </div>
        </div>
      </div>
    </template>
    <!-- 关键词为空 -->
    <template v-else>
      <!-- 搜索历史 -->
      <div class="search-record">
        <span class="title"
          >搜索历史
          <i class="delete iconfont icon-xiazai14" @click="clearRecords"></i
        ></span>
        <span class="show-all" v-if="!showAllRecords" @click="show"
          >查看全部</span
        >
      </div>
      <div
        class="record-container"
        :style="{ overflow: showAllRecords ? 'visible' : 'hidden' }"
      >
        <div
          class="record-item"
          v-for="(item, index) in records"
          :key="`${index}-${item}`"
          @click="handleSearch(item)"
        >
          {{ item
          }}<i
            class="delete iconfont icon-cuo"
            @click.stop="deleteRecord(item)"
          ></i>
        </div>
      </div>
      <!-- 热搜列表 -->
      <div class="hot-search-container">
        <div class="title">热搜榜</div>
        <div
          class="hot-search-item"
          v-for="(item, index) in hotSearchList"
          :key="index"
          @click="handleSearch(item.searchWord)"
        >
          <div class="hot-search-index" :class="{ hot: index <= 2 }">
            {{ index + 1 }}
          </div>
          <div class="hot-search-detail">
            <div class="hot-search-name">
              <span class="name">{{ item.searchWord }}</span>
              <img class="icon" v-if="item.iconUrl" :src="item.iconUrl" />
              <span class="score">{{ item.score }}</span>
            </div>
            <div class="hot-search-desc">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { getHotSearch, getSearchSuggestions } from "@/api/search";
import Container from "@/components/common/container";
import { mapMutations, mapState } from "vuex";
import {
  search,
  toAlbumDetail,
  toArtistDetail,
  toPlaylistDetail,
  debounce,
} from "@/utils/methods";
export default {
  components: {
    Container,
  },
  data() {
    return {
      showAllRecords: false,
      hotSearchList: [],
      searchSuggestions: null,
    };
  },
  props: {
    keywords: String,
  },
  computed: {
    ...mapState(["data"]),
    hasKeywords() {
      return !!this.keywords;
    },
    records() {
      return this.data.searchRecords;
    },
  },
  methods: {
    ...mapMutations(["updateData", "updateApp"]),
    search,
    toAlbumDetail,
    toArtistDetail,
    toPlaylistDetail,
    markKeywords(str) {
      let reg = new RegExp(this.keywords, "ig");
      return str.replace(reg, $ => `<span class="keywords">${$}</span>`);
    },
    handleSearch(keywords = this.keywords) {
      this.$emit("search", keywords);
    },
    show() {
      this.showAllRecords = true;
    },
    deleteRecord(keywords) {
      let arr = this.data.searchRecords.filter(item => item !== keywords);
      this.updateData({ key: "searchRecords", value: arr });
    },
    clearRecords() {
      this.updateData({ key: "searchRecords", value: [] });
    },
    close() {
      this.updateApp({ key: "searchDrawerVisible", value: false });
    },
    getHotSearchData() {
      getHotSearch().then(res => {
        this.hotSearchList = res.data;
      });
    },
    getSearchSuggestions() {
      getSearchSuggestions({ keywords: this.keywords }).then(res => {
        console.log(res);
        this.searchSuggestions = res.result;
      });
    },
    debouncedGetSuggestions: debounce("getSearchSuggestions", 500),
  },
  filters: {},
  mounted() {
    const header = document.getElementById("header");
    const main = document.getElementById("main");
    header.addEventListener("click", this.close);
    main.addEventListener("click", this.close);
  },
  beforeDestroy() {
    const header = document.getElementById("header");
    const main = document.getElementById("main");
    header.removeEventListener("click", this.close);
    main.removeEventListener("click", this.close);
  },
  created() {
    if (this.hasKeywords) {
      this.getSearchSuggestions();
    } else {
      this.getHotSearchData();
    }
  },
  watch: {
    keywords() {
      if (this.hasKeywords) {
        // this.debouncedGetSuggestions();
        this.getSearchSuggestions();
      } else {
        this.getHotSearchData();
      }
    },
    $route() {
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.search-drawer {
  position: absolute;
  width: var(--app-drawer-width);
  top: var(--app-header-height);
  bottom: var(--app-player-height);
  right: 0;
  background-color: var(--panel-box-bg-color);
  z-index: 100;
  box-shadow: -8px 0 10px -5px rgb(0 0 0 / 20%);
  box-sizing: border-box;
  overflow: overlay;
}
.search-record {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: var(--color-level3);
  padding: 0 20px;
  margin-top: 10px;
  .title {
    float: left;
    .delete {
      font-size: 14px;
      cursor: pointer;
      &:hover {
        color: var(--color-level2);
      }
    }
  }
  .show-all {
    font-size: 13px;
    float: right;
    cursor: pointer;
    &:hover {
      color: var(--color-level2);
    }
  }
}

.record-container {
  min-height: 70px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  padding: 0 20px;
  .record-item {
    color: var(--color-level2);
    font-size: 13px;
    height: 25px;
    line-height: 23px;
    padding: 0 15px;
    border-radius: 13px;
    border: 1px solid var(--color-level5);
    margin-right: 10px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    margin-top: 10px;
    .delete {
      position: absolute;
      top: 0;
      right: 0;
      display: none;
    }
    &:hover {
      background-color: var(--operation-btn-hover-bg-color);
      .delete {
        display: block;
      }
    }
  }
}

.hot-search-container {
  .title {
    font-size: 14px;
    line-height: 40px;
    color: var(--color-level4);
    padding: 0 20px;
  }
  .hot-search-item {
    height: 50px;
    display: flex;
    cursor: pointer;
    padding: 5px 0;
    &:hover {
      background-color: var(--table-hover-color);
    }
    .hot-search-index {
      width: 50px;
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      box-sizing: border-box;
      color: var(--color-level5);
      &.hot {
        color: var(--color-netease-red);
      }
    }
    .hot-search-detail {
      height: 50px;
      flex: 1;
      .hot-search-name {
        height: 25px;
        line-height: 25px;
        @include ellipsis;
        .name {
          font-size: 13px;
          font-weight: bold;
          color: var(--color-level1);
        }
        .icon {
          margin-left: 5px;
          height: 10px;
          vertical-align: middle;
        }
        .score {
          margin-left: 20px;
          font-size: 13px;
          color: var(--color-level5);
        }
      }
      .hot-search-desc {
        height: 25px;
        line-height: 25px;
        font-size: 13px;
        color: var(--color-level3);
        @include ellipsis;
      }
    }
  }
}

.search-suggest {
  margin-top: 5px;
  .header {
    height: 20px;
    line-height: 20px;
    font-size: 13px;
    padding-left: 10px;
    margin-bottom: 10px;
    .title {
      cursor: pointer;
      color: var(--color-level3);
      &:hover {
        color: var(--color-level2);
      }
    }
  }
  .search-suggest-group {
    .group-name {
      height: 25px;
      line-height: 25px;
      font-size: 14px;
      color: var(--color-level3);
      margin: 5px 0;
      padding-left: 10px;
      .iconfont {
        margin-right: 5px;
        font-size: 15px;
      }
    }
    .item {
      height: 30px;
      line-height: 30px;
      font-size: 13.5px;
      padding-left: 30px;
      cursor: pointer;
      color: var(--color-level2);
      &:hover {
        background-color: var(--table-hover-color);
      }
      .song-name {
        .alias {
          color: var(--color-level3);
        }
      }
      .artist-name {
        margin-right: 5px;
      }
    }
  }
}
</style>
