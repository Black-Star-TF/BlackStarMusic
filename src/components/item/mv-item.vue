<template>
	 <div class="video-item" :style="style">
		 <div class="video-cover" @click="playVideo(mv.id)" :style="{'backgroundImage':`url(${coverUrl})`}">
				<!-- 播放量 -->
				<span class="video-playcount"><span class="iconfont icon-pause"></span> {{mv.playCount | formatPlayCount}}</span>
			</div>
			<div class="video-name" @click="playVideo(mv.id)"><span>{{mv.name}}</span></div>
			<!-- 歌手 -->
			<div class="video-artists">
				<span class="artist-item" v-for="(artist,index) in mv.artists" :key="artist.id">
					<span class="name" @click="toArtistDetail(artist.id)">{{artist.name}}</span>
					<span class="separator" v-if="index < mv.artists.length - 1">/</span>
				</span>
			</div>
	 </div>
</template>

<script>
  import { playVideo,toArtistDetail } from '@/utils/methods'
  import { formatPlayCount } from '@/utils/filters'
	import ItemPropsMixin from '@/mixins/item-props-mixin'
  import {size_video_std} from '@/utils/img-size.js'
	export default {
		mixins: [ItemPropsMixin],
		props: {
			mv: {
				type: Object,
				required: true
			}
		},
		computed: {
			coverUrl(){
				return `${this.mv.picUrl || this.mv.cover}?param=${size_video_std}` 
			}
		},
    methods:{
      playVideo,
      toArtistDetail
    },
    filters:{
      formatPlayCount
    }
	}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.video-item{
  cursor: default;
  margin-bottom: 20px;
  div{
    height: 20px;
    width: 100%;
    line-height: 20px;
    @include ellipsis;
  }
  .video-cover{
    width: 100%;
    height: 0;
    padding-bottom: 56%;
    @include background;
    cursor: pointer;
    margin-bottom: 5px;
    position: relative;
    border-radius: 5px;
    .video-playcount{
      position: absolute;
      line-height: 10px;
      font-size: 12px;
      top: 7px;
      right: 7px;
      color: #fff;
      .iconfont{
        font-size: 12px;
        color: #fff;
      }
    }
  }
  
  .video-name{
    color: var(--color-level2);
    font-size: 14px;
    span{
      cursor: pointer;
      &:hover{
        color: var(--color-level1);
      }
    }
  }
  
  .video-artists{
    color: var(--color-level4);
    font-size: 12px;
    .artist-item{
      .name{
        cursor: pointer;
        &:hover{
          color: var(--color-level3);
        }
      }
      .separator{
        display: inline-block;
        margin: 0 5px;
      }
    }
  }
}
</style>
