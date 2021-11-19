<template>
  <div class="newest-song2-item">
    <div class="index">{{index}}</div>
    <div class="cover">
      <div class="song-cover" :style="{backgroundImage: `url(${coverUrl})`}">
        <div class="icon-play">
          <span class="iconfont icon-bofang"></span>
        </div>
      </div>
    </div>
    <div class="name">
      <div class="song-name">
        <span>{{song.name}}</span>
        <span class="alia" v-if="song.alias.length > 0">({{song.alias[0]}})</span>
      </div>
      <span class="iconfont" v-if="false"></span>
      <span class="iconfont" v-if="false"></span>
      <span class="iconfont icon-shipin" v-if="song.mvid!=0" @click="playVideo(song.mvid)"></span>
    </div>
    <div class="artists">
      <span v-for="(artist,index) in song.album.artists" :key="artist.id">
        <span class="artist-name" @click.stop="toArtistDetail(artist.id)">{{artist.name}}</span>
        <span class="separator" v-if="index < song.album.artists.length-1"> / </span>
      </span>
    </div>
    <div class="album">
      <span class="song-album-name" @click.stop="toAlbumDetail(song.album.id)">{{song.album.name}}</span>
    </div>
    <div class="duration">
      <span class="song-duration">{{song.duration | formatDuration}}</span>
    </div>
  </div>
</template>

<script>
import { playMusic,playVideo,toArtistDetail,toAlbumDetail } from '@/utils/methods'
import { formatDuration } from '@/utils/filters'
import {size_1v1_small} from '@/utils/img-size.js'
export default {
  props:{
    song:{
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    coverUrl(){
      return `${this.song.album.picUrl}?param=${size_1v1_small}`
    }
  },
  methods: {
    playMusic,
    playVideo,
    toArtistDetail,
    toAlbumDetail,
  },
  filters: {
    formatDuration
  },
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.newest-song2-item{
  width: 100%;
  height: 80px;
  display: flex;
  line-height: 80px;
  font-size: 12px;
  border-radius: 5px;
  &:nth-of-type(2n+1){
    background-color: var(--table-stripe-color);
  }
  &:hover{
    background-color: var(--table-hover-color);
  }
  .index{
    width: 50px;
    height: 100%;
    color: var(--color-level5);
    text-align: center;
    overflow: hidden;
  }
  .cover{
    width: 60px;
    height: 100%;
    margin-right: 15px;
    overflow: hidden;
    .song-cover{
      margin: 10px 0;
      width: 60px;
      height: 60px;
      border-radius: 5px;
      background-repeat: no-repeat;
      background-size: cover;
      background-color: #aaa;
      cursor: pointer;
      position: relative;
      .icon-play{
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 12px;
        background-color: rgba($color: #fff, $alpha: .7);
        position: absolute;
        top: calc(50% - 12px);
        left: calc(50% - 12px);
        .iconfont{
          position: relative;
          left: 1px;
          font-size: 12px;
          color: var(--color-netease-red);
        }
      }
    }
  }
  .name{
    flex: 4;
    height: 100%;
    margin-right: 15px;
    display: flex;
    overflow: hidden;
    .song-name{
      @include ellipsis;
      color: var(--color-level2);
      .alia{
        color: var(--color-level4);
      }
    }
    .iconfont{
      color: var(--color-netease-red);
      display: inline-block;
      margin-left: 5px;
      &.song-tag-sq{
        font-size: 22px;
      }
      &.song-tag-mv{
        cursor: pointer;
        font-size: 16px;
      }
    }
  }
  .artists{
    flex: 4;
    height: 100%;
    margin-right: 15px;
    @include ellipsis;
    color: var(--color-level3);
    .artist-name{
      cursor: pointer;
      &:hover{
        color: var(--color-level2);
      }
    }
    .separator{
      color: var(--color-level4);
    }
  }
  .album{
    flex: 3;
    height: 100%;
    margin-right: 15px;
    @include ellipsis;
    color: var(--color-level3);
    .song-album-name{
      cursor: pointer;
      &:hover{
        color: var(--color-level2);
      }
    }
  }
  .duration{
    overflow: hidden;
    width: 80px;
    height: 100%;
    color: var(--color-level5);
  }
}
</style>
