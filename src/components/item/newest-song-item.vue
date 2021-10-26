<template>
	 <div class="newest-song-item" @dblclick="playMusic(newestSongItem.id)" :style="style">
		 <!-- 歌曲封面 -->
			<div class="newest-song-cover" @click.stop="playMusic(newestSongItem.id)" :style="{'backgroundImage':`url(${newestSongItem.picUrl})`}">
				<!-- 播放图标 -->
				<div class="icon-play">
					<span class="iconfont icon-bofang"></span>
				</div>
			</div>
			<!-- 歌曲序号 -->
			<div class="newest-song-index">{{(index+1) | formatIndex}}</div>
			<!-- 歌曲信息 -->
			<div  class="newest-song-info">
				<div class="newest-song-name text">{{newestSongItem.song.name}}<span class="alias" v-if="newestSongItem.song.alias.length > 0">（{{newestSongItem.song.alias[0]}})</span></div>
				<div class="newest-song-artists text">
					<span class="newest-song-artist" v-for="(artist,index) in newestSongItem.song.artists" :key="artist.id">
						<span class="artist-name" @click="toArtistDetail(artist.id)">{{artist.name}}</span>
						<span class="separator" v-if="index < newestSongItem.song.artists.length - 1">/</span>
					</span>
				</div>
			</div>
	 </div>
</template>

<script>
  import { playMusic,toArtistDetail } from '@/utils/methods'
	import ItemPropsMixin from '@/mixins/item-props-mixin'
	export default {
		mixins: [ItemPropsMixin],
		props: {
			newestSongItem:{
				required: true
			}
		},
		computed: {
			loading(){
				return typeof this.newestSongItem == 'undefined'
			},
		},
    methods:{
      playMusic,
      toArtistDetail
    },
		filters:{
			formatIndex(index){
				return index < 10 ? '0' + index : index
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.newest-song-item{
  height: 80px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  align-items: center;
  cursor: default;
  border-bottom: .5px solid var(--main-border-color);
  &:nth-of-type(2n+1){
      margin-left: -10px;
  }
  &:hover{
    background-color: var(--main-container-bg-color);
  }
  
  .newest-song-cover{
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin-left: 10px;
    @include background;
    position: relative;
    .icon-play{
      text-align: center;
      position: absolute;
      width: 24px;
      height: 24px;
      border-radius: 12px;
      background-color: rgba($color: #fff, $alpha: .7);
      top: calc(50% - 12px);
      left: calc(50% - 12px);
      .iconfont{
        line-height: 24px;
        font-size: 12px;
        color: var(--color-netease-red);
        position: relative;
        left: 2px;
      }
    }
  }
  
  .newest-song-index{
    width: 40px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    color: var(--color-level5);
  }
  
  .newest-song-info{
    width: calc(100% - 110px);
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    >div.text{
      width: 100%;
      height: 20px;
      line-height: 20px;
      margin: 2px 0;
      @include ellipsis;
      &.newest-song-name{
        font-size: 14px;
        color: var(--color-level2);
        .alias{
          color: var(--color-level4);
        }
      }
      &.newest-song-artists{
        font-size: 12px;
        .newest-song-artist{
          color: var(--color-level3);
          .artist-name{
            cursor: pointer;
            &:hover{
              color: var(--color-level2);
            }
          }
          .separator{
            display: inline-block;
            margin: 0 3px;
          }
        }
      }
    }
  }
}
</style>
