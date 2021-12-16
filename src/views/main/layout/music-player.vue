<template>
  <div class="app-footer" id="player">
    <!-- 播放进度条 -->
    <div class="progress-slider-container">
      <vue-slider
        class="progress-slider"
        v-model="value"
        :min="0"
        :max="player.currentTrackDuration"
        :dotSize="5"
        :height="2"
        :interval="1"
        :duration="0"
        tooltip="none"
        @drag-start="handleDragStart()"
        @drag-end="handleDragEnd()"
        :drag-on-click="true"
        :silent="true"
      >
      </vue-slider>
    </div>

    <div class="controls">
      <div class="song-info">
        <template v-if="currentSong.id">
          <div
            class="song-avatar"
            :style="{ backgroundImage: `url(${coverUrl})` }"
          >
            <div class="mask" @click="showSongDetail">
              <span
                class="iconfont icon-zhankai"
                v-if="!app.songDetailVisible"
              ></span>
              <span class="iconfont icon-shouqi" v-else></span>
            </div>
          </div>
          <div class="info">
            <div class="song-name">
              <span class="name"
                >{{ currentSong.name
                }}<span class="alias" v-if="currentSong.alia.length > 0"
                  >({{ currentSong.alia[0] }})</span
                ></span
              >
              <span class="artists"
                >-
                <span
                  v-for="(artist, index) in currentSong.ar"
                  :key="artist.id"
                >
                  <span
                    class="artist-name"
                    @click="toArtistDetail(artist.id)"
                    >{{ artist.name }}</span
                  >
                  <span
                    class="separator"
                    v-if="index < currentSong.ar.length - 1"
                  >
                    /
                  </span>
                </span>
              </span>
            </div>
            <div class="song-duration">
              {{ value | formatTrackTime }} /
              {{ player.currentTrackDuration | formatTrackTime }}
            </div>
          </div>
        </template>
      </div>
      <div class="play-controls">
        <span class="control-item liked" @click="like" v-if="isLiked">
          <span class="iconfont icon-xihuan-shi"></span>
        </span>
        <span class="control-item like" @click="like" v-else>
          <span class="iconfont icon-xihuan-kon"></span>
        </span>
        <span class="control-item prev" @click="player.playPrevTrack()">
          <span class="iconfont icon-prev"></span>
        </span>
        <span class="control-item play" @click="togglePlayStatus">
          <span class="iconfont icon-zanting" v-if="player.playing"></span>
          <span class="iconfont icon-bofang" v-else></span>
        </span>
        <span class="control-item next">
          <span
            class="iconfont icon-next"
            @click="player.playNextTrack()"
          ></span>
        </span>
        <span class="control-item share">
          <span class="iconfont icon-fenxiang1"></span>
        </span>
      </div>
      <div class="play-settings">
        <el-tooltip
          class="item"
          effect="dark"
          content="顺序播放"
          placement="top"
        >
          <span
            class="setting-item play-mode iconfont icon-shunxubofang"
          ></span>
        </el-tooltip>
        <span
          class="setting-item current-playlist iconfont icon-bofangliebiao"
          title="播放列表"
          @click="showPlaylist"
          :class="{ active: app.playlistDrawerVisible }"
        ></span>

        <span
          class="setting-item sound iconfont"
          @click="handleMute"
          :class="volumeIcon"
        >
          <div class="volume-control" @click.stop>
            <vue-slider
              class="volume-slider"
              v-model="player.volume"
              :min="0"
              :max="1"
              :width="6"
              :dotSize="10"
              :height="80"
              :interval="0.01"
              :duration="0"
              :drag-on-click="true"
              :silent="true"
              tooltip="none"
              direction="btt"
            >
            </vue-slider>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { toArtistDetail } from "@/utils/methods";
import { mapState, mapMutations } from "vuex";
import VueSlider from "vue-slider-component";
import { size_1v1_small } from "@/utils/img-size.js";
export default {
  mixins: [],
  components: {
    VueSlider,
  },
  data() {
    return {
      value: 0.00001,
      onDrag: false,
      playing: false,
      liked: false,
      volume: 1,
      isShowPlaylist: false,
    };
  },
  computed: {
    ...mapState(["player", "app"]),
    coverUrl() {
      return `${this.currentSong.al &&
        this.currentSong.al.picUrl}?param=${size_1v1_small}`;
    },
    currentSong() {
      return this.player.currentTrack;
    },
    isLiked() {
      return this.$store.state.data.likedSongList.includes(this.currentSong.id);
    },
    volumeIcon() {
      let icon = this.player.volume > 0 ? "icon-yinliang" : "icon-jingyin";
      return [icon];
    },
  },
  methods: {
    ...mapMutations(["updateApp"]),
    showSongDetail() {
      this.updateApp({
        key: "songDetailVisible",
        value: !this.app.songDetailVisible,
      });
    },
    toArtistDetail,
    showPlaylist() {
      this.updateApp({
        key: "playlistDrawerVisible",
        value: !this.app.playlistDrawerVisible,
      });
    },
    like() {
      this.liked = !this.liked;
    },
    togglePlayStatus() {
      this.player.togglePlayStatus();
    },
    handleDragStart() {
      this.onDrag = true;
    },
    handleDragEnd() {
      this.onDrag = false;
      this.player.progress = this.value;
    },
    handleMute() {
      this.player.mute();
    },
  },
  filters: {
    formatTrackTime(value) {
      if (value == 0) {
        return `0:00`;
      }
      if (!value) return "";
      let min = ~~((value / 60) % 60);
      if (min < 10) {
        min = "0" + min;
      }
      let sec = (~~(value % 60)).toString().padStart(2, "0");
      return `${min}:${sec}`;
    },
  },
  watch: {
    "player.progress": {
      handler(val) {
        if (!this.onDrag) {
          this.value = this.player.progress;
        }
      },
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.app-footer {
  height: var(--app-player-height);
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  box-sizing: border-box;
  background-color: var(--footer-bg-color);
  z-index: 102;
  border-top: 2px solid var(--footer-bd-color);
  .progress-slider-container {
    position: absolute;
    width: 100%;
    height: 2px;
  }
  .controls {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .song-info {
      width: 340px;
      height: 40px;
      margin-left: 10px;
      .song-avatar {
        width: 40px;
        height: 40px;
        border-radius: 5px;
        @include background;
        float: left;
        margin-right: 10px;
        cursor: pointer;
        overflow: hidden;
        &:hover {
          .mask {
            display: block;
          }
        }
        .mask {
          display: none;
          width: 100%;
          height: 100%;
          line-height: 40px;
          background-color: rgba($color: #000000, $alpha: 0.6);
          text-align: center;
          span {
            color: #fff;
          }
        }
      }
      .info {
        float: left;
        width: 290px;
        height: 40px;
        .song-name {
          font-size: 14px;
          line-height: 20px;
          .name {
            display: inline-block;
            max-width: 150px;
            @include ellipsis;
            margin-right: 20px;
            cursor: pointer;
            color: var(--color-level2);
          }
          .artists {
            display: inline-block;
            max-width: 120px;
            @include ellipsis;
            cursor: pointer;
            color: var(--color-level4);
            .artist-name {
              color: var(--color-level3);
              &:hover {
                color: var(--color-level2);
              }
            }
          }
        }
        .song-duration {
          line-height: 20px;
          max-width: 120px;
          @include ellipsis;
          font-size: 13px;
          color: var(--color-level4);
        }
      }
    }

    .play-controls {
      width: 240px;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 40px;
      .control-item {
        text-align: center;
        cursor: pointer;
        color: var(--color-netease-red);
        &.play {
          line-height: 40px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: #fff;
          background-color: var(--color-netease-red);
          .iconfont {
            position: relative;
            left: 1px;
          }
        }
        &.share,
        &.like {
          color: var(--color-level2);
        }
      }
    }

    .play-settings {
      margin-right: 10px;
      width: 340px;
      height: 40px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: relative;
      .setting-item {
        margin-right: 20px;
        font-size: 20px;
        color: var(--color-level2);
        position: relative;
        display: inline-block;
        &:hover {
          .volume-control {
            display: flex;
          }
        }
        &.current-playlist {
          &.active {
            color: var(--color-netease-red);
          }
        }
        .volume-control {
          position: absolute;
          display: none;
          z-index: 10000;
          bottom: 32px;
          left: calc(50% - 15px);
          width: 30px;
          height: 100px;
          justify-content: center;
          align-items: center;
          background-color: var(--panel-box-bg-color);
          box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
          border-radius: 3px;
          &:before {
            display: block;
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-top-color: var(--panel-box-bg-color);
            bottom: -12px;
            left: calc(50% - 6px);
          }
          ::v-deep .volume-slider {
            padding: 0;
            .vue-slider-rail {
              background-color: var(--search-bg-color);
              border-radius: 2.5px;
              .vue-slider-process {
                border-radius: 2.5px;
                background-color: var(--color-netease-red);
              }
              .vue-slider-dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: var(--color-netease-red);
              }
            }
          }
        }
      }
    }
  }
}

::v-deep .progress-slider {
  margin-top: -5px;
  margin-bottom: -5px;
  // overflow: hidden;
  // box-sizing: border-box;
  .vue-slider-rail {
    .vue-slider-process {
      background-color: var(--color-netease-red);
    }
    &:hover,
    &:active {
      .vue-slider-dot-handle {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        position: absolute;
        top: calc(50% - 5px);
        left: calc(50% - 5px);
        background-color: var(--color-netease-red);
      }
    }
  }
}
</style>
