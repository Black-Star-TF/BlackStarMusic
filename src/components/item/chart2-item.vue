<template>
	 <div class="chart2-item" :style="style">
		<div
		class="toplist-cover"
		@click="toPlaylistDetail(toplist.id)"
		:style="{'backgroundImage': `url(${toplist.coverImgUrl})`}">
			<!-- 播放数量 -->
			<span class="play-count"><span class="iconfont icon-pause"></span> {{toplist.playCount | formatPlayCount}}</span>
			<!-- 播放按钮 -->
			<div class="icon-play" @click.stop="playAll(toplist.id)">
				<span class="iconfont icon-bofang"></span>
			</div>
		</div>
		<div class="toplist-name">
			<span @click="toPlaylistDetail(toplist.id)">{{toplist.name}}</span>
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
			toplist:{
				type: Object,
				required: true
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
	.chart2-item{
		margin-bottom: 20px;
		.toplist-cover{
			width: 100%;
			height: 0;
			padding-bottom: 100%;
			@include background;
			border-radius: 5px;
			margin-bottom: 10px;
			position: relative;
			cursor: pointer;
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
				width: 40px;
				height: 40px;
				line-height: 40px;
				text-align: center;
				border-radius: 20px;
				background-color: rgba($color: #fff, $alpha: .5);
				position: absolute;
				top: calc(50% - 20px);
				left: calc(50% - 20px);
				.iconfont{
					position: relative;
					left: 1px;
					font-size: 16px;
					color: var(--color-netease-red);
				}
			}
			&:hover{
				.icon-play{
					opacity: 1;
				}
			}
		}
		.toplist-name{
			line-height: 20px;
			font-size: 12px;
			span{
				cursor: pointer;
				color: var(--color-level2);
				&:hover{
					color: var(--color-level1);
				}
			}
		}
	}
	
</style>
