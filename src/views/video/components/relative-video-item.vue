<template>
  <div class="relative-video-item">
    <div class="video-cover" @click="playVideo(video.vid)" :style="{'backgroundImage': `url(${coverUrl})`}">
      <!-- 播放量 -->
				<span class="video-playcount"><span class="iconfont icon-pause"></span> {{video.playTime | formatCount}}</span>
				<!-- 时长 -->
				<span class="video-duration">{{video.durationms | formatDuration}}</span>
    </div>
    <div class="video-info">
      <div class="video-name" @click="playVideo(video.vid)"><span class="mv-icon" v-if="isMV">MV</span> {{video.title}}</div>
      <div class="video-creator">
        <template v-if="isMV">
          <span class="artist-item" v-for="(artist,index) in video.creator" :key="artist.userId">
            <span class="name" @click="toArtistDetail(artist.userId)"><span>{{artist.userName}}</span></span>
            <span class="separator" v-if="index < video.creator.length - 1">/</span>
          </span>
        </template>
        <template v-else>
          by 
				  <span class="creator" @click.stop="toUserDetail(video.creator[0].userId)">{{video.creator[0].userName}}</span>
			  </template>
      </div>
    </div>
  </div>
</template>

<script>
import {playVideo,toArtistDetail,toUserDetail} from '@/utils/methods'
import {formatDuration,formatCount} from '@/utils/filters'
import {size_video_small} from '@/utils/img-size.js'
export default {
  data () {
    return {}
  },
  props:{
    video:{
      type: Object,
      required: true
    }
  },
  computed: {
    coverUrl(){
      return `${this.video.coverUrl}?param=${size_video_small}`
    },
    isMV(){
      let reg = /^[0-9]+$/
      return reg.test(this.video.vid)
    },
  },
  methods: {
    playVideo,
    toArtistDetail,
    toUserDetail
  },
  filters: {
    formatDuration,
    formatCount
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.relative-video-item{
  width: 100%;
  display: flex;
  margin-bottom: 15px;
  .video-cover{
    width: 140px;
    height: 80px;
    margin-right: 15px;
    border-radius: 5px;
    box-sizing: border-box;
    cursor: pointer;
    @include background;
    position: relative;
    .video-playcount{
      position: absolute;
      line-height: 10px;
      font-size: 12px;
      color: #fff;
      top: 7px;
      right: 7px;
      .iconfont{
        font-size: 12px;
        color: #fff;
      }
    }
    .video-duration{
      position: absolute;
      line-height: 10px;
      font-size: 12px;
      color: #fff;
      bottom: 7px;
      right: 7px;
    }
  }
  .video-info{
    flex: 1;
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    overflow: hidden;
    .video-name{
      line-height: 18px;
      width: 100%;
      cursor: pointer;
      color: var(--color-level2);
      @include ellipsis-2-line;
      .mv-icon{
				display: inline-block;
				padding: 0 2px;
				height: 16px;
				line-height: 14px;
				font-size: 12px;
				color: var(--color-netease-red);
				box-sizing: border-box;
				border: 1px solid var(--color-netease-red);
				border-radius: 2px;
        transform: scale(.8);
			}
    }
    .video-creator{
      width: 100%;
      height: 20px;
      line-height: 20px;
      font-size: 13px;
      color: var(--color-level4);
      @include ellipsis;
      .artist-item{
        color: var(--color-level3);
        .name{
          cursor: pointer;
          &:hover{
            color: var(--color-level2);
          }
        }
      }
      .creator{
        cursor: pointer;
        color: var(--color-level3);
        &:hover{
            color: var(--color-level2);
          }
      }
    }
  }
}
</style>
