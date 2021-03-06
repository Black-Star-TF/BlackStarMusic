<template>
  <div class="song-list-table">
    <div class="table-header">
      <div class="header column index"></div>
      <div class="header column song-operation"></div>
      <div class="header column song-name">音乐标题</div>
      <div class="header column song-artists">歌手</div>
      <div class="header column song-album">专辑</div>
      <div class="header column song-duration">时长</div>
    </div>
    <div
      class="table-row"
      v-for="(song, index) in songList"
      :key="`${index}-${song.id}`"
      @dblclick="playSong(song, index)"
      @contextmenu.prevent="showContextMenu(index, $event)"
      :class="getActiveClass(index)"
      @click="setActive(index)"
    >
      <div class="row column index">
        <span
          v-if="song.id == currentTrackId"
          class="iconfont icon-yinliang"
        ></span>
        <span v-else>{{ formatIndex(index + 1) }}</span>
      </div>
      <div class="row column song-operation">
        <span
          class="song-operation-item iconfont liked icon-xihuan-shi"
          v-if="isLiked(song.id)"
          @click="handleLikeSong(song.id, false)"
        >
        </span>
        <span
          class="song-operation-item iconfont icon-xihuan-kon"
          v-else
          @click="handleLikeSong(song.id, true)"
        >
        </span>
        <span class="song-operation-item iconfont icon-xiazai"></span>
      </div>
      <div class="row column song-name">
        <div class="song-name-content">
          <span
            class="main-name"
            v-if="keyword"
            v-html="markKeywords(song.name)"
          ></span>
          <span
            class="main-name"
            :class="{ active: song.id == currentTrackId }"
            v-else
            >{{ song.name }}</span
          >
          <span class="alias-name" v-if="song.alia.length > 0">
            ({{ song.alia[0] }})</span
          >
        </div>
        <span class="song-tag-sq iconfont icon-sq" v-if="false"></span>
        <span
          class="song-tag-vip iconfont icon-pc_vip"
          v-if="song.fee === 1"
        ></span>
        <span
          class="song-tag-mv iconfont icon-shipin"
          v-if="song.mv !== 0"
          @click="playVideo(song.mv)"
        ></span>
      </div>
      <div class="row column song-artists">
        <span class="song-artists-content">
          <span
            class="artist"
            v-for="(artist, index) in song.ar"
            :key="`${index}-${artist.id}`"
          >
            <span
              class="artist-name"
              v-if="keyword"
              @click="toArtistDetail(artist.id)"
              v-html="markKeywords(artist.name)"
            ></span>
            <span
              class="artist-name"
              v-else
              @click="toArtistDetail(artist.id)"
              >{{ artist.name }}</span
            >
            <span class="separator" v-if="index < song.ar.length - 1"> / </span>
          </span>
        </span>
      </div>
      <div class="row column song-album">
        <span
          class="song-album-name"
          v-if="keyword"
          @click="toAlbumDetail(song.al.id)"
          v-html="markKeywords(song.al.name)"
        ></span>
        <span
          class="song-album-name"
          v-else
          @click="toAlbumDetail(song.al.id)"
          >{{ song.al.name }}</span
        >
      </div>
      <div class="row column song-duration">
        <span>{{ song.dt | formatDuration }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { likeSong } from "@/api/music";
import {
  toAlbumDetail,
  toArtistDetail,
  markKeywords,
  playVideo,
  openContextMenu,
} from "@/utils/methods";
import { formatDuration } from "@/utils/filters";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      contextMenuTop: 0,
      contextMenuLeft: 0,
      contextMenuVisible: false,
      activeIndex: -1,
      currentSong: null,
    };
  },
  props: {
    songList: {
      type: Array,
      required: true,
    },
    keyword: {
      type: String,
    },
    pageNum: {
      type: Number,
    },
    limit: {
      type: Number,
    },
  },
  computed: {
    likedSongList() {
      return this.$store.state.data.likedSongList;
    },
    currentTrackId() {
      return this.$store.state.player.currentTrack.id;
    },
  },
  methods: {
    playVideo,
    toAlbumDetail,
    toArtistDetail,
    markKeywords,
    ...mapMutations(["updateApp"]),
    async handleLikeSong(id, like) {
      if (!this.$store.state.data.loginStatus) {
        this.$message.error("请先登录");
      }
      await likeSong({ id, like });
      // 重新获取喜欢的音乐
      await this.$store.dispatch("getLikedSongList");
      if (like) {
        this.$message.success("收藏成功");
      } else {
        this.$message.success("取消收藏");
      }
    },
    setActive(index) {
      this.activeIndex = index;
    },
    getActiveClass(index) {
      return this.activeIndex == index ? "active" : "";
    },
    formatIndex(index) {
      if (this.pageNum && this.limit) {
        let num = (this.pageNum - 1) * this.limit + index;
        return num > 9 ? num : "0" + num;
      } else {
        return index > 9 ? index : "0" + index;
      }
    },
    isLiked(id) {
      return this.likedSongList.includes(id);
    },
    playSong(song, index) {
      // TODO: 当开通vip时可以播放
      if (song.fee === 1) return;
      this.$emit("play-song", index);
    },
    showContextMenu(index, e) {
      this.$emit('showContextMenu', {index, e})
    },
  },
  filters: {
    formatDuration,
  },
};
</script>

<style lang="scss">
@import "~@/styles/mixins.scss";
.song-list-table {
  .table-header {
    height: 40px;
    line-height: 40px;
    display: flex;
    font-size: 13px;
    color: var(--color-level4);
    padding: 0 30px;
  }
  .table-row {
    height: 40px;
    line-height: 40px;
    padding: 0 30px;
    display: flex;
    font-size: 13px;
    &:nth-of-type(2n + 1) {
      background-color: var(--table-stripe-color);
    }
    &:hover {
      background-color: var(--table-hover-color);
    }
    &.active {
      background-color: var(--table-hover-color);
    }
    .song-operation {
      display: flex;
      justify-content: space-between;
      .song-operation-item {
        color: var(--color-level3);
        cursor: pointer;
        &:hover {
          color: var(--color-level2);
        }
        &.liked {
          color: var(--color-netease-red);
        }
      }
    }
    .index {
      color: var(--color-level5);
      .iconfont {
        color: var(--color-netease-red);
      }
    }
    .song-name {
      display: flex;
      .song-name-content {
        @include ellipsis;
        color: var(--color-level2);
        .main-name {
          &:hover {
            color: var(--color-level1);
          }
          &.active {
            color: var(--color-netease-red);
          }
        }
        .alias-name {
          color: var(--color-level4);
        }
      }
      .iconfont {
        color: var(--color-netease-red);
        display: inline-block;
        margin-left: 5px;
        &.song-tag-sq {
          font-size: 22px;
        }
        &.icon-pc_vip {
          font-size: 18px;
        }
        &.song-tag-mv {
          cursor: pointer;
          font-size: 16px;
        }
      }
    }

    .song-artists {
      @include ellipsis;
      color: var(--color-level3);
      .artist-name {
        cursor: pointer;
        &:hover {
          color: var(--color-level2);
        }
      }
      .separator {
        color: var(--color-level4);
      }
    }

    .song-album {
      @include ellipsis;
      color: var(--color-level3);
      .song-album-name {
        cursor: pointer;
        &:hover {
          color: var(--color-level2);
        }
      }
    }
    .song-duration {
      color: var(--color-level4);
    }
  }

  .column {
    overflow: hidden;
    margin-right: 15px;
    &:nth-last-of-type(1) {
      margin-right: 0;
    }
  }

  .index {
    width: 30px;
  }
  .song-operation {
    width: 40px;
  }
  .song-name {
    flex: 5;
  }
  .song-artists {
    flex: 2;
  }
  .song-album {
    flex: 3;
  }
  .song-duration {
    width: 50px;
  }
}
</style>
