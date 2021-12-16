<template>
  <div class="view-song-detail">
    <div class="main">
      <div class="main-container" v-if="song">
        <div class="left">
          <div class="player-bar-container">
            <img
              src="~@/assets/img/play-controler.png"
              class="play-controler"
              :class="{ playing: player.playing }"
            />
          </div>
          <div class="disc-outer" :class="{ paused: !player.playing }">
            <div class="disc">
              <img :src="song.al.picUrl" class="song-cover" />
            </div>
          </div>
          <div class="song-operation"></div>
        </div>
        <div class="right">
          <div class="song-name">{{ song.name }}</div>
          <div class="song-info">
            专辑：<span @click="toAlbumDetail(song.al.id)">{{
              song.al.name
            }}</span>
            歌手：<span>{{ song.ar[0].name }}</span>
          </div>
          <scroller
            v-if="lyric"
            class="lyric-wrapper"
            :options="lyricScrollOptions"
            @init="handleScrollerInit"
            ref="scroller"
            @mousewheelStart="handleScrollStart"
            @mousewheelEnd="handleScrollEnd"
          >
            <div class="lyric-content">
              <div
                class="lyric-item"
                v-for="(item, index) in lyric"
                :key="index"
                ref="lyric"
                :class="getActiveClass(index)"
              >
                <p v-for="(item, index) in item.content" :key="index">
                  {{ item }}
                </p>
              </div>
            </div>
          </scroller>
        </div>
      </div>
      <div class="about" v-if="loaded">
        <div class="comment">
          <div class="title">听友评论</div>
          <!-- 评论 -->
          <comment :type="type" :id="songId"></comment>
        </div>
        <div class="more">
          <div class="title" v-if="simiPlaylists.length > 0">
            包含这首歌的歌单
          </div>
          <simi-playlist-item
            v-for="playlist in simiPlaylists"
            :key="playlist.id"
            :playlist="playlist"
          ></simi-playlist-item>
          <br />
          <div class="title" v-if="simiSongList.length > 0">相似歌曲</div>
          <simi-song-item
            v-for="song in simiSongList"
            :key="song.id"
            :song="song"
          ></simi-song-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getSimiPlaylists,
  getSongsDetail,
  getSongLyric,
  getSimiSongs,
} from "@/api/music";
import { toAlbumDetail, toArtistDetail } from "@/utils/methods";
import { parseLyrics } from "@/utils/lyric";
import SimiPlaylistItem from "@/components/item/simi-playlist-item";
import SimiSongItem from "@/components/item/simi-song-item";
import Scroller from "@/components/common/scroller";
import Comment from "@/views/resource-comment/components/comment.vue";
import RESOURCE_TYPE from "@/utils/resource-type";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    Comment,
    SimiPlaylistItem,
    Scroller,
    SimiSongItem,
  },
  data() {
    return {
      type: RESOURCE_TYPE.SONG,
      song: null,
      simiPlaylists: [],
      simiSongList: [],
      lyric: null,
      scroller: null,
      autoScroll: true,
      lyricScrollOptions: {
        scrollY: true,
        scrollbar: true,
        mouseWheel: true,
        scrollerBar: {
          fadeOutTime: 500,
        },
      },
    };
  },
  props: {
    songId: {
      required: true,
    },
  },
  computed: {
    ...mapState(["player"]),
    loaded() {
      return this.song;
    },
    activeIndex() {
      if (this.lyric) {
        return this.lyric.findIndex((l, i) => {
          let next = this.lyric[i + 1];
          return (
            this.player.progress >= l.time &&
            (!next || this.player.progress < next.time)
          );
        });
      }
      return -1;
    },
  },
  methods: {
    ...mapMutations(["updateApp"]),
    toAlbumDetail,
    toArtistDetail,
    handleScrollStart() {
      this.autoScroll = false;
    },
    handleScrollEnd() {
      setTimeout(() => {
        this.autoScroll = true;
        if (this.player.playing) {
          this.scroller.refresh();
          this.scrollToActiveLyric();
        }
      }, 500);
    },
    scrollToActiveLyric() {
      const { lyric } = this.$refs;
      if (this.scroller) {
        try {
          this.scroller.scrollToElement(lyric[this.activeIndex], 200, 0, true);
        } catch (err) {}
      }
    },
    getActiveClass(index) {
      return this.activeIndex == index ? "active" : "";
    },
    handleScrollerInit(scroller) {
      this.scroller = scroller;
      this.scroller.refresh();
      this.scrollToActiveLyric();
    },
    async init() {
      this.lyric = null;
      this.song = null;
      this.simiPlaylists = [];
      this.scroller = null;
      // 获取歌曲详情
      const { songs } = await getSongsDetail({ ids: this.songId });
      this.song = songs[0];
      // 获取歌词
      this.lyric = parseLyrics(await getSongLyric({ id: this.songId }));
      // TODO: 歌曲无歌词时

      // 获取相似歌单
      const { playlists } = await getSimiPlaylists({ id: this.songId });
      this.simiPlaylists = playlists;
      // 获取相似歌曲
      const { songs: songList } = await getSimiSongs({ id: this.songId });
      this.simiSongList = songList;
    },
  },
  created() {
    this.init();
  },
  watch: {
    songId() {
      this.init();
    },
    activeIndex(oldVal, newVal) {
      if (
        oldVal !== newVal &&
        this.lyric &&
        this.activeIndex !== -1 &&
        this.autoScroll
      ) {
        if (this.scroller) {
          this.scroller.refresh();
          this.scrollToActiveLyric();
        }
      }
    },
    $route() {
      this.updateApp({
        key: "songDetailVisible",
        value: false,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}
.view-song-detail {
  position: absolute;
  top: var(--app-header-height);
  right: 0;
  left: 0;
  bottom: var(--app-player-height);
  background-color: var(--main-bg-color);
  z-index: 100;
  overflow: overlay;
  .main {
    width: var(--min-width);
    margin: 0 auto;
    min-height: 100%;
    .main-container {
      width: 100%;
      height: 500px;
      display: flex;
      .left {
        width: 350px;
        margin-right: 80px;
        .player-bar-container {
          height: 30px;
          margin-bottom: 50px;
          position: relative;
          .play-controler {
            height: 180px;
            position: relative;
            z-index: 20;
            left: calc(50% - 15px);
            transform-origin: 16px 16px;
            transform: rotate(-45deg);
            transition: transform 0.2s linear;
            &.playing {
              transform: rotate(-5deg);
            }
          }
        }
        .disc-outer {
          background-color: var(--disc-outer-bg-color);
          width: 330px;
          height: 330px;
          margin: 0 auto;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: rotate 25s linear infinite;
          &.paused {
            animation-play-state: paused;
          }
          .disc {
            width: 310px;
            height: 310px;
            border-radius: 50%;
            background: url(~@/assets/img/cd-wrapper.png);
            background-repeat: no-repeat;
            background-size: cover;
            justify-content: center;
            align-items: center;
            display: flex;
            .song-cover {
              width: 220px;
              height: 220px;
              border-radius: 50%;
            }
          }
        }
      }
      .right {
        flex: 1;
        height: 100%;
        .song-name {
          height: 40px;
          font-size: 20px;
          line-height: 40px;
          margin-top: 30px;
          color: var(--color-level2);
        }
        .song-info {
          overflow: hidden;
          font-size: 13px;
          height: 20px;
          line-height: 20px;
          color: var(--color-level2);
          span {
            color: var(--link-color);
            cursor: pointer;
            margin-right: 10px;
            &:hover {
              color: var(--link-hover-color);
            }
          }
        }

        .lyric-wrapper {
          margin-top: 20px;
          height: 390px;
          overflow: hidden;
          color: var(--color-level3);
          position: relative;
          border-right: 1px solid var(--color-level5);
          mask-image: linear-gradient(
            180deg,
            hsla(0, 0%, 100%, 0) 0,
            hsla(0, 0%, 100%, 0.6) 15%,
            #fff 25%,
            #fff 75%,
            hsla(0, 0%, 100%, 0.6) 85%,
            hsla(0, 0%, 100%, 0)
          );
          ::v-deep .bscroll-indicator {
            border: none !important;
            background-color: var(--scroll-bar-bg-color) !important;
          }
          .lyric-content {
            font-size: 15px;
            line-height: 30px;
            .lyric-item {
              margin-top: 10px;
              &.active {
                color: var(--color-level1);
                font-size: 17px;
              }
            }
            &::before {
              content: "";
              display: block;
              height: 50px;
            }
            &::after {
              content: "";
              display: block;
              height: 150px;
            }
          }
        }
      }
    }

    .about {
      width: 100%;
      display: flex;
      margin-top: 30px;
      .title {
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        font-weight: bold;
        color: var(--color-level2);
      }
      .comment {
        width: 650px;
        margin-right: 40px;
        .comment-part {
          margin: 30px 0;
          h3 {
            font-size: 16px;
            color: var(--color-level2);
          }
          .more-hot-comment {
            margin: 30px 0;
            height: 30px;
            line-height: 30px;
            display: flex;
            justify-content: center;
            .btn {
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
                background-color: var(--color-level5);
              }
            }
          }
        }
      }
      .more {
        flex: 1;
      }
    }
  }
}

.el-pagination {
  display: flex;
  justify-content: center;
}
</style>
