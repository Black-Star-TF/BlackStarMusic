<template>
	 <div class="video-item" :style="style">
		 <div class="video-cover" @click="playVideo(video.vid)" :style="{'backgroundImage':`url(${video.coverUrl})`}">
				<!-- 播放量 -->
				<span class="video-playcount"><span class="iconfont icon-pause"></span> {{video.playTime | formatPlayCount}}</span>
				<!-- 时长 -->
				<span class="video-duration">{{video.durationms | formatDuration}}</span>
			</div>
			<div class="video-name" @click="playVideo(video.vid)"><span class="mv-icon" v-if="isMV">MV</span> <span v-html="markKeyword(video.title)"></span></div>
			<!-- 歌手 -->
			<div class="video-artists" v-if="isMV">
				<span class="artist-item" v-for="(artist,index) in video.creator" :key="artist.userId">
					<span class="name" @click="toArtistDetail(artist.userId)"><span v-html="markKeyword(artist.userName)"></span></span>
					<span class="separator" v-if="index < video.creator.length - 1">/</span>
				</span>
			</div>
			<!-- 作者 -->
			<div class="video-creator" v-else>
				by 
				<span class="creator" @click.stop="toUserDetail(video.creator[0].userId)" v-html="markKeyword(video.creator[0].userName)"></span>
			</div>
	 </div>
</template>

<script>
	import { playVideo, toArtistDetail, markKeyword, toUserDetail} from '@/utils/methods'
	import { formatPlayCount, formatDuration } from '@/utils/filters'
	import ItemPropsMixin from '@/mixins/item-props-mixin'
	export default {
		mixins: [ItemPropsMixin],
		props: {
			video: {
				type: Object,
				required: true
			},
			keyword:{
				type: String
			}
		},
		computed: {
			isMV(){
				let reg = /^[0-9]+$/
				return reg.test(this.video.vid)
			}
		},
    methods:{
      playVideo,
      toArtistDetail,
      markKeyword,
      toUserDetail
    },
    filters:{
      formatPlayCount,
      formatDuration
    }
	}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
	.video-item{
		cursor: default;
		margin-bottom: 35px;
		div{
			height: 25px;
			width: 100%;
			line-height: 25px;
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
			border-radius: 10px;
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
		
		.video-name{
			color: var(--color-level2);
			font-size: 14px;
			cursor: pointer;
			&:hover{
				color: var(--color-level1);
			}
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
			}
		}
		
		.video-artists{
			color: var(--color-level3);
			font-size: 12px;
			.artist-item{
				.name{
					cursor: pointer;
					&:hover{
						color: var(--color-level3);
					}
					.keyword{
						color: var(--color-keyword);
					}
				}
				.separator{
					display: inline-block;
					margin: 0 5px;
				}
			}
		}

    .video-creator{
      color: var(--color-level3);
      font-size: 13px;
      .creator{
        cursor: pointer;
        &:hover{
          color: var(--color-level2);
        }
      }
    }
	}
</style>
