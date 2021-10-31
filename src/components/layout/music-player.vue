<template>
  <div class="app-footer">
    <!-- 播放进度条 -->
    <div class="slider-container">
      <vue-slider 
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
          <div class="song-avatar" :style="{'backgroundImage': `url(${currentSong.al&&currentSong.al.picUrl})`}"></div>
          <div class="info">
            <div class="song-name">
              <span class="name">{{currentSong.name}}<span class="alias" v-if="currentSong.alia.length > 0">({{currentSong.alia[0]}})</span></span>
              <span class="artists">- 
                <span v-for="(artist,index) in currentSong.ar" :key="artist.id">
                  <span class="artist-name" @click="toArtistDetail(artist.id)">{{artist.name}}</span>
                  <span class="separator" v-if="index < currentSong.ar.length - 1"> / </span>
                </span>
              </span>
            </div>
            <div class="song-duration">
              {{value  | formatTrackTime}} / {{player.currentTrackDuration | formatTrackTime}}
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
        <span class="control-item play" @click="player.playOrPause()" >
          <span class="iconfont icon-zanting" v-if="player.playing"></span>
          <span class="iconfont icon-bofang" v-else></span>
        </span>
        <span class="control-item next" @click="player.playNextTrack()">
          <span class="iconfont icon-next"></span>
        </span>
        <span class="control-item share">
          <span class="iconfont icon-fenxiang1"></span>
        </span>
      </div>
      <div class="play-settings">
        <!-- <span class="setting-item play-mode">
          <i class="iconfont"></i>
        </span>
        <span class="setting-item current-playlist">
          <i class="iconfont icon-bofangliebiao"></i>
        </span>
        <span class="setting-item sound">
          <i class="iconfont"></i>
        </span> -->
      </div>
    </div>


  </div>
</template>

<script>
import {mapState} from 'vuex'
import { formatDuration } from '@/utils/filters'
import VueSlider from 'vue-slider-component'
export default {
  mixins: [],
  components: {
    VueSlider
  },
  data () {
    return {
      value: 0.00001,
      onDrag: false,
      playing: false,
      liked: false
    }
  },
  computed: {
    ...mapState(['player']),
    currentSong(){
      return this.player.currentTrack
    },
  },
  methods: {
    like(){
      this.liked = !this.liked
    },
    play(){
      this.playing = !this.playing
    },
    handleDragStart(){
      this.onDrag = true
    },
    handleDragEnd(){
      this.onDrag = false
      this.player.progress = this.value
    },
    isLiked(id){
      return this.$store.state.data.likedSongList.includes(id)
    },
  },
  filters: {
    formatTrackTime(value) {
      if (!value) return '';
      let min = ~~((value / 60) % 60);
      let sec = (~~(value % 60)).toString().padStart(2, '0');
      return `${min}:${sec}`;
    },
  },
  watch:{
    'player.progress':{
      handler(val){
         if(!this.onDrag){
          this.value = this.player.progress
        }
      }
    }
  },
  created () {
    
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.app-footer{
  height: var(--app-player-height);
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  box-sizing: border-box;
  background-color: var(--footer-bg-color);
  z-index: 102;
  border-top: 2px solid var(--footer-bd-color);
  .slider-container{
    position: absolute;
    width: 100%;
    height: 2px;
  }
  .controls{
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .song-info{
      width: 340px;
      height: 40px;
      margin-left: 10px;
      .song-avatar{
        width: 40px;
        height: 40px;
        border-radius: 5px;
        @include background;
        float: left;
        margin-right: 10px;
        cursor: pointer;
      }
      .info{
        float: left;
        width: 290px;
        height: 40px;
        .song-name{
          font-size: 14px;
          line-height: 20px;
          .name{
            display: inline-block;
            max-width: 150px;
            @include ellipsis;
            margin-right: 20px;
            cursor: pointer;
            color: var(--color-level2);
          }
          .artists{
            display: inline-block;
            max-width: 120px;
            @include ellipsis;
            cursor: pointer;
            color: var(--color-level4);
            .artist-name{
              color: var(--color-level3);
              &:hover{
                color: var(--color-level2);
              }
            }
          }
        }
        .song-duration{
          line-height: 20px;
          max-width: 120px;
          @include ellipsis;
          font-size: 13px;
          color: var(--color-level4);
        }
      }
    }

    .play-controls{
      width: 240px;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 40px;
      .control-item{
        text-align: center;
        cursor: pointer;
        color: var(--color-netease-red);
        &.play{
          line-height: 40px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: #fff;
          background-color: var(--color-netease-red);
          .iconfont{
            position: relative;
            left: 1px;
          }
        }
        // &.liked{

        // }
        &.share, &.like{
          color: var(--color-level2);
        }
      }
    }

    .play-settings{
      margin-right: 10px;
      width: 340px;
      height: 40px;
    }
  }
}

::v-deep .vue-slider {
  margin-top: -5px;
  margin-bottom: -5px;
  .vue-slider-rail{
    .vue-slider-process{
      background-color: var(--color-netease-red);
    }
    &:hover,&:active{
      .vue-slider-dot-handle{
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
