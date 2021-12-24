<template>
  <div class="song-info-cpn">
    <div class="song-name">{{ song.name }}</div>
    <div class="song-info">
      <div class="info-item">
        专辑：<span @click="toAlbumDetail(song.al.id)">{{ song.al.name }}</span>
      </div>
      <div class="info-item">
        歌手：<span @click="toArtistDetail(song.ar[0].id)">{{ song.ar[0].name }}</span>
      </div>
      <div class="info-item">
        来源：<span @click="toSource">{{source.info.name}}</span>
      </div>
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
</template>

<script>
import { getSongLyric } from "@/api/music";
import { parseLyrics } from "@/utils/lyric";
import { toAlbumDetail, toArtistDetail, toPlaylistDetail, search } from "@/utils/methods";
import Scroller from "@/components/common/scroller";
import { mapState } from "vuex";
export default {
  components: {
    Scroller,
  },
  data() {
    return {
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
    song: Object,
  },
  computed: {
    ...mapState(["player"]),
    source() {
      return this.player.currentTrack.source;
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
    }
  },
  methods: {
    toAlbumDetail,
    toArtistDetail,
    toPlaylistDetail,
    search,
    toSource(){
      console.log(this.source);
      if(this.source.type==="playlist"){
        this.toPlaylistDetail(this.source.info.id)
      }
      if(this.source.type==="search"){
        this.search(this.source.info.keywords)
      }
      if(this.source.type==="album"){
        this.toAlbumDetail(this.source.info.id)
      }
    },
    handleScrollStart() {
      this.autoScroll = false;
    },
    handleScrollEnd() {
      setTimeout(() => {
        this.autoScroll = true;
        if (this.player.playing && this.scroller) {
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
    async getLyrics() {
      // 获取歌词
      // TODO: 歌曲无歌词时
      this.lyric = parseLyrics(await getSongLyric({ id: this.song.id }));
    },
  },
  created() {
    this.lyric = null;
    this.scroller = null;
    this.getLyrics();
  },
  watch: {
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
  },
};
</script>

<style lang="scss" scoped>
.song-info-cpn {
  width: 100%;
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
    display: flex;
    .info-item {
      min-width: 100px;
      overflow: hidden;
      margin-right: 10px;
      &:last-of-type {
        margin-right: 0;
      }
      span {
        color: var(--link-color);
        cursor: pointer;

        &:hover {
          color: var(--link-hover-color);
        }
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
</style>
