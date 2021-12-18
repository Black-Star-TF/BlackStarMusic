<template>
  <div class="playlist-drawer">
    <div class="playlist-drawer-header">
      <div class="title">当前播放</div>
      <div class="info">
        <span class="total">共{{ songList.length }}首</span>
        <span class="clear" @click="clearList()">清空列表</span>
        <span class="subscribe-all">
          <i class="iconfont icon-shoucang"></i>
          收藏全部
        </span>
      </div>
    </div>

    <div
      class="playlist-drawer-content"
      v-if="songList.length > 0"
      ref="content"
    >
      <div
        class="song-item"
        v-for="(song, index) in songList"
        :key="`${index}-${song.id}`"
        @dblclick="playSong(song.id)"
        :class="{ active: song.id == currentTrackId }"
        :id="`song-${song.id}`"
      >
        <div class="song-name">
          <div class="song-name-container">
            <span class="main-name">{{ song.name }}</span>
            <span class="alias-name" v-if="song.alia.length > 0">
              ({{ song.alia[0] }})</span
            >
          </div>
          <span
            class="song-tag-mv iconfont icon-shipin"
            v-if="song.mv !== 0"
            @click="playVideo(song.mv)"
          ></span>
        </div>

        <div class="song-artists">
          <span
            v-for="(artist, index) in song.ar"
            :key="`${index}-${artist.id}`"
          >
            <span class="artist-name" @click="toArtistDetail(artist.id)">{{
              artist.name
            }}</span>
            <span class="separator" v-if="index < song.ar.length - 1"> / </span>
          </span>
        </div>
        <div class="song-duration">{{ song.dt | formatDuration }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { toArtistDetail, playVideo } from "@/utils/methods";
import { formatDuration } from "@/utils/filters";
import { getSongsDetail } from "@/api/music.js";
export default {
  computed: {
    ...mapState(["player"]),
    currentTrackId() {
      return this.player.currentTrack.id;
    },
    songList(){
      return this.player.list
    }
  },
  methods: {
    ...mapMutations(["updateApp"]),
    toArtistDetail,
    playVideo,
    close() {
      this.updateApp({ key: "playlistDrawerVisible", value: false });
    },
    clearList() {
      this.player.clear();
    },
    playSong(id) {
      this.player.playTrack(id);
    },
    handleClose(value) {
      this.$emit("update:visible", value);
    },
  },
  filters: {
    formatDuration,
  },
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
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.playlist-drawer {
  position: absolute;
  width: var(--app-drawer-width);
  top: var(--app-header-height);
  bottom: var(--app-player-height);
  right: 0;
  background-color: var(--panel-box-bg-color);
  z-index: 100;
  box-shadow: -8px 0 10px -5px rgb(0 0 0 / 20%);
  .playlist-drawer-header {
    width: 360px;
    height: 70px;
    margin: 0 auto;
    margin-top: 20px;
    border-bottom: 1px solid var(--color-level5);
    box-sizing: border-box;
    .title {
      font-size: 20px;
      height: 30px;
      line-height: 30px;
      font-weight: bold;
      color: var(--color-level2);
    }
    .info {
      height: 30px;
      margin-top: 10px;
      .total {
        font-size: 13px;
        color: var(--color-level4);
      }
      .subscribe-all {
        float: right;
        font-size: 14px;
        color: var(--color-level2);
        margin-right: 20px;
        cursor: pointer;
        &:hover {
          color: var(--color-level1);
        }
      }
      .clear {
        float: right;
        font-size: 14px;
        color: var(--link-color);
        cursor: pointer;
        &:hover {
          color: var(--link-hover-color);
        }
      }
    }
  }
  .playlist-drawer-content {
    height: calc(100% - 90px);
    overflow: overlay;
    .song-item {
      display: flex;
      height: 30px;
      line-height: 30px;
      font-size: 13px;
      padding: 0 20px;
      box-sizing: border-box;
      &:nth-of-type(2n) {
        background-color: var(--drawer-stripe-color);
      }
      &:hover {
        background-color: var(--drawer-stripe-hover-color);
      }
      &:hover {
        .song-name {
          .song-name-container {
            color: var(--color-level1);
          }
        }
        .song-artists {
          color: var(--color-level1);
          .artist-name {
            &:hover {
              color: var(--color-level1);
            }
          }
        }
        .song-duration {
          color: var(--color-level1);
        }
      }
      &.active {
        .song-name {
          .song-name-container {
            color: var(--color-netease-red);
          }
        }
        .song-artists {
          color: var(--color-netease-red);
        }
      }
      .song-name {
        overflow: hidden;
        flex: 2;
        display: flex;
        box-sizing: border-box;
        margin-right: 10px;
        .song-name-container {
          @include ellipsis;
          color: var(--color-level2);
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
          &.song-tag-mv {
            cursor: pointer;
            font-size: 16px;
          }
        }
      }
      .song-artists {
        overflow: hidden;
        flex: 1;
        height: 100%;
        box-sizing: border-box;
        margin-right: 10px;
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
      .song-duration {
        overflow: hidden;
        width: 50px;
        height: 100%;
        color: var(--color-level4);
      }
    }
  }
}
</style>
