<template>
  <div class="mv-chart-item" :style="style">
    <!-- 排名 -->
    <div class="mv-item-index">
      <span>{{index+1}}</span>
    </div>
    <!-- 封面 -->
    <div class="mv-item-cover" :style="{'backgroundImage': `url(${coverUrl})`}" @click="playVideo(mvItem.id)">
      <!-- 热度 -->
      <!-- 播放按钮 -->
				<div class="icon-play">
					<span class="iconfont icon-bofang"></span>
				</div>
    </div>
    <!-- info -->
    <div class="mv-item-info">
      <div class="mv-item-name"  @click="playVideo(mvItem.id)">{{mvItem.name}}</div>
      <div class="mv-item-artists">
        <span v-for="(artist,index) in mvItem.artists" :key="artist.id">
          <span class="artist-name" @click="toArtistDetail(artist.id)">{{artist.name}}</span>
          <span class="separator" v-if="index < mvItem.artists.length - 1"> / </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import { toArtistDetail,playVideo } from '@/utils/methods'
  import ItemPropsMixin from '@/mixins/item-props-mixin'
  import {size_video_small} from '@/utils/img-size.js'
  export default {
    mixins: [ItemPropsMixin],
    props:{
      mvItem:{
        type: Object,
        required: true
      }
    },
    computed: {
      style(){
        return {
          'width': `calc((100% - ${this.num - 1} * 10px) / ${this.num})`,
          'marginRight': (this.index + 1) % this.num == 0 ? '0' : '10px',
          'borderRightStyle': (this.index + 1) % this.num == 0 ? 'none' : 'solid'
        }
      },
      coverUrl(){
        return `${this.mvItem.cover}?param=${size_video_small}`
      }
    },
    methods: {
      playVideo,
      toArtistDetail
    },
    filters: {},
    created () {},
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixins.scss";
  .mv-chart-item{
    height: 120px;
    padding: 10px 0;
    display: flex;
    box-sizing: border-box;
    cursor: default;
    border-right-width: .5px;
    border-right-color: var(--color-level5);
    .mv-item-index{
      width: 30px;
      height: 100%;
      line-height: 120px;
      font-size: 20px;
      color: var(--color-level5);
      text-align: center;
    }

    .mv-item-cover{
      width: 170px;
      margin-right: 20px;
      margin-left: 10px;
      height: 100%;
      @include background;
      position: relative;
      border-radius: 5px;
      cursor: pointer;
      .icon-play{
				opacity: 0;
				transition: opacity .4s linear;
				width: 30px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				border-radius: 15px;
				background-color: rgba($color: #fff, $alpha: .5);
				position: absolute;
        top: calc(50% - 15px);
        left: calc(50% - 15px);
				.iconfont{
					position: relative;
					left: 1px;
					bottom: 1px;
					font-size: 12px;
					color: var(--color-netease-red);
				}
			}
			&:hover{
				.icon-play{
					opacity: 1;
				}
			}
    }

    .mv-item-info{
      width: calc((100% - 230px) / 2);
      height: 100%;
      div{
        @include ellipsis;
        color: var(--color-level2);
        &.mv-item-name{
          cursor: pointer;
          font-size: 13px;
          line-height: 30px;
          margin-bottom: 10px;
          &:hover{
            color: var(--color-level1);
          }
        }
        &.mv-item-artists{
          font-size: 12px;
          line-height: 20px;
          .artist-name{
            cursor: pointer;
            &:hover{
              color: var(--color-level1);
            }
          }
        }
      }        
    }
  }
</style>
