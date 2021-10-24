<template>
	 <div class="playlist-item" :style="style">
		 <!-- 歌单封面 -->
			<div
			class="playlist-cover"
			@click="toPlaylistDetail(playlistItem.id)"
			:style="{'backgroundImage':`url(${playlistItem.picUrl || playlistItem.coverImgUrl})`}">
				<!-- 播放数量 -->
				<span class="play-count"><span class="iconfont icon-pause"></span> {{playlistItem.playCount | formatPlayCount}}</span>
				<!-- 播放按钮 -->
				<div class="icon-play" @click.stop="playAll(playlistItem.id)">
					<span class="iconfont icon-bofang"></span>
				</div>
			</div>
			<!-- 歌单名称 -->
			<div class="playlist-name">
				<span @click="toPlaylistDetail(playlistItem.id)">{{playlistItem.name}}</span>
			</div>
	 </div>
</template>

<script>
	import CommonMixin from '@/mixins/common-mixin'
	import ItemPropsMixin from '@/mixins/item-props-mixin'
	export default {
		mixins: [CommonMixin,ItemPropsMixin],
		data() {
			return {}
		},
		props: {
			playlistItem:{
				type: Object,
				required: true
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.playlist-item{
	margin-bottom: 30px;
	.playlist-cover{
		cursor: pointer;
		width: 100%;
		padding-bottom: 100%;
		@include background;
		border-radius: 5px;
		margin-bottom: 10px;
		position: relative;
		border: .5px solid var(--main-border-color);
		.play-count{
			position: absolute;
			top: 7px;
			right: 7px;
			font-size: 12px;
			line-height: 10px;
			color: #fff;
			.iconfont{
				font-size: 12px;
				line-height: 10px;
				color: #fff;
			}
		}
		.icon-play{
			opacity: 0;
			transition: opacity .2s linear;
			width: 30px;
			height: 30px;
			line-height: 30px;
			text-align: center;
			border-radius: 15px;
			background-color: rgba($color: #fff, $alpha: .5);
			position: absolute;
			right: 10px;
			bottom: 10px;
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
	.playlist-name{
		font-size: 14px;
		line-height: 20px;
		//todo 两行文字，超出使用省略号
		span{
			color: var(--color-level2);
			cursor: pointer;
			&:hover{
				color: var(--color-level1);
			}
		}
		
	}
}
	
</style>
