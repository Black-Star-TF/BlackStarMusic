<template>
  <div class="playlist-drawer">
    <div class="playlist-drawer-header">
      <div class="title">当前播放</div>
      <div class="info">
        <span class="total">共{{ trackList.length }}首</span>
        <span class="clear" @click="clearList()">清空列表</span>
        <span class="subscribe-all">
          <i class="iconfont icon-shoucang"></i>
          收藏全部
        </span>
      </div>
    </div>

    <div
      class="playlist-drawer-content"
      v-if="trackList.length > 0"
      ref="content"
    >
      <div
        class="track-item"
        v-for="(track, index) in trackList"
        :key="`${index}-${track.id}`"
        @dblclick="playTrack(track)"
        :class="{ active: track.id == currentTrackId }"
        :id="`track-${track.id}`"
      >
        <div class="track-name">
          <div class="track-name-container">
            <span class="main-name">{{ track.name }}</span>
            <span class="alias-name" v-if="track.alia.length > 0">
              ({{ track.alia[0] }})</span
            >
          </div>
          <span
            class="track-tag-mv iconfont icon-shipin"
            v-if="track.mv !== 0"
            @click="playVideo(track.mv)"
          ></span>
        </div>

        <div class="track-artists">
          <template v-if="track.type === RESOURCE_TYPE.SONG">
            <span
              v-for="(artist, index) in track.ar"
              :key="`${index}-${artist.id}`"
            >
              <span class="artist-name" @click="toArtistDetail(artist.id)">{{
                artist.name
              }}</span>
              <span class="separator" v-if="index < track.ar.length - 1">
                /
              </span>
            </span>
          </template>
          <template v-else>
            <span class="artist-name" @click="toRadioDetail(track.ar[0].id)">{{
              track.ar[0].name
            }}</span>
          </template>
        </div>
        <div class="track-duration">{{ track.dt | formatDuration }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { toArtistDetail, toRadioDetail, playVideo } from "@/utils/methods";
import { formatDuration } from "@/utils/filters";
import RESOURCE_TYPE from "@/utils/resource-type";
export default {
  data(){
    return {
      RESOURCE_TYPE
    }
  },
  computed: {
    ...mapState(["player"]),
    currentTrackId() {
      return this.player.currentTrack.id;
    },
    trackList() {
      return this.player.list;
    },
  },
  methods: {
    ...mapMutations(["updateApp"]),
    toArtistDetail,
    playVideo,
    toRadioDetail,
    close() {
      this.updateApp({ key: "playlistDrawerVisible", value: false });
    },
    clearList() {
      this.player.clear();
    },
    playTrack(track) {
      this.player.playTrack(track);
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
    .track-item {
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
        .track-name {
          .track-name-container {
            color: var(--color-level1);
          }
        }
        .track-artists {
          color: var(--color-level1);
          .artist-name {
            &:hover {
              color: var(--color-level1);
            }
          }
        }
        .track-duration {
          color: var(--color-level1);
        }
      }
      &.active {
        .track-name {
          .track-name-container {
            color: var(--color-netease-red);
          }
        }
        .track-artists {
          color: var(--color-netease-red);
        }
      }
      .track-name {
        overflow: hidden;
        flex: 2;
        display: flex;
        box-sizing: border-box;
        margin-right: 10px;
        .track-name-container {
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
          &.track-tag-sq {
            font-size: 22px;
          }
          &.track-tag-mv {
            cursor: pointer;
            font-size: 16px;
          }
        }
      }
      .track-artists {
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
      .track-duration {
        overflow: hidden;
        width: 50px;
        height: 100%;
        color: var(--color-level4);
      }
    }
  }
}
</style>
