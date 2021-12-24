<template>
  <div class="view-track-detail">
    <div class="main" v-if="loaded">
      <div class="main-container" >
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
              <img :src="coverUrl" class="track-cover" />
            </div>
          </div>
          <!-- 操作 -->
          <div class="track-operation"></div>
        </div>
        <div class="right">
          <!-- 歌词或电台节目简介 -->
          <song-info v-if="isSong" :song="data" @router-change="handleClose"></song-info>
          <program-info v-else :program="data" @router-change="handleClose"></program-info>
        </div>
      </div>
      <div class="about">
        <!-- 评论 -->
        <div class="comment">
          <div class="title">听友评论</div>
          <comment :type="type" :id="currentTrack.id" @router-change="handleClose"></comment>
        </div>
        <!-- 相关歌曲及歌单 -->
        <relative-music v-if="isSong" :id="currentTrack.id" @router-change="handleClose"></relative-music>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongsDetail } from "@/api/music";
import { getRadioProgramDetail } from "@/api/dj-radio";
import Comment from "@/views/resource-comment/components/comment.vue";
import RelativeMusic from "../components/relative-music";
import RESOURCE_TYPE from "@/utils/resource-type";
import { mapState, mapMutations } from "vuex";
import SongInfo from "../components/song-info";
import ProgramInfo from '../components/program-info'
import { size_1v1_std } from "@/utils/img-size.js";
export default {
  components: {
    Comment,
    SongInfo,
    ProgramInfo,
    RelativeMusic,
  },
  data() {
    return {
      data: null,
    };
  },
  computed: {
    ...mapState(["player"]),
    currentTrack() {
      return this.player.currentTrack;
    },
    coverUrl() {
      return `${
        this.isSong ? this.data.al.picUrl : this.data.coverUrl
      }?param=${size_1v1_std}`;
    },
    loaded() {
      return this.data;
    },
    type() {
      return this.currentTrack.type;
    },
    isSong() {
      return this.type === RESOURCE_TYPE.SONG;
    },
    trackId() {},
  },
  methods: {
    ...mapMutations(["updateApp"]),
    handleClose(){
      this.updateApp({
        key: "songDetailVisible",
        value: false,
      });
    },
    async init() {
      if (this.type === RESOURCE_TYPE.SONG) {
        // 获取歌曲详情
        const { songs } = await getSongsDetail({ ids: this.currentTrack.id });
        this.data = songs[0];
      }
      if (this.type === RESOURCE_TYPE.RADIO) {
        const { program } = await getRadioProgramDetail({
          id: this.currentTrack.id,
        });
        this.data = program;
      }
    },
  },
  created() {
    this.init();
  },
  watch: {
    currentTrack() {
      this.data = null;
      this.$nextTick(()=>{
        this.init();
      })
    },
    // $route() {
    //   this.updateApp({
    //     key: "songDetailVisible",
    //     value: false,
    //   });
    // },
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
.view-track-detail {
  position: absolute;
  top: var(--app-header-height);
  right: 0;
  left: 0;
  bottom: var(--app-player-height);
  background-color: var(--main-bg-color);
  z-index: 90;
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
            .track-cover {
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
      }
      .more {
        flex: 1;
      }
    }
  }
}
</style>
