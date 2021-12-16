<template>
  <div class="search-playlist-item" @click="toPlaylistDetail(playlist.id)">
    <!-- 歌单分娩
     -->
    <div
      class="search-playlist-cover"
      :style="{ backgroundImage: `url(${coverUrl})` }"
    ></div>
    <!-- 歌单名 -->
    <div class="search-playlist-name">
      <span class="name" v-html="markKeywords(playlist.name)"></span>
    </div>
    <!-- 歌单中歌曲数量 -->
    <div class="search-playlist-song-count">{{ playlist.trackCount }}首</div>
    <!-- 歌单作者 -->
    <div class="search-playlist-creator">
      by
      <span
        class="creator"
        @click.stop="toUserDetail(playlist.creator.userId)"
        v-html="markKeywords(playlist.creator.nickname)"
      ></span>
    </div>
  </div>
</template>

<script>
import { markKeywords, toPlaylistDetail, toUserDetail } from "@/utils/methods";
import { size_1v1_small } from "@/utils/img-size.js";
export default {
  props: {
    playlist: {
      type: Object,
      required: true,
    },
    keyword: {
      type: String,
      required: true,
    },
  },
  computed: {
    coverUrl() {
      return `${this.playlist.coverImgUrl}?param=${size_1v1_small}`;
    },
  },
  methods: {
    markKeywords,
    toPlaylistDetail,
    toUserDetail,
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.search-playlist-item {
  width: 100%;
  height: 80px;
  padding: 10px 30px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  &:nth-of-type(2n) {
    background-color: var(--table-stripe-color);
  }
  &:hover {
    background-color: var(--table-hover-color);
  }
  div {
    height: 60px;
    line-height: 60px;
    margin-left: 20px;
    @include ellipsis;
  }
  .search-playlist-cover {
    width: 60px;
    height: 60px;
    @include background;
    margin: 0;
    border-radius: 5px;
  }

  .search-playlist-name {
    flex: 6;
    font-size: 14px;
    color: var(--color-level2);
    .name {
      &:hover {
        color: var(--color-level1);
      }
      .keyword {
        color: var(--color-keyword);
      }
    }
  }
  .search-playlist-song-count {
    flex: 2;
    font-size: 12px;
    color: var(--color-level4);
  }

  .search-playlist-creator {
    flex: 2;
    font-size: 12px;
    color: var(--color-level5);
    .creator {
      color: var(--color-level4);
      &:hover {
        color: var(--color-level3);
      }
    }
  }
}
</style>
