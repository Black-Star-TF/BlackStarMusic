<template>
	<div class="chart1-item">
		<!-- 榜单封面 -->
		<div
		class="chart-cover"
		@click="toPlaylistDetail(toplist.id)"
		:style="{'backgroundImage': `url(${toplist.coverImgUrl})`}">
			<!-- <div class="box" :style="{'backgroundImage': `url(${cover})`}"></div> -->
			<!-- 播放按钮 -->
			<div class="icon-play" @click.stop="playAll(toplist.id)">
				<span class="iconfont icon-bofang"></span>
			</div>
			<span class="update-time">{{date}}更新</span>
		</div>
		<!-- 榜单前5 -->
		<div class="chart-abstract">
			<el-table
			v-loading="loading"
			:data="list"
			:show-header="false"
			height="100%"
			@row-dblclick="play"
			:cell-style="{'border': 'none','height': 'calc(100% / 5)'}">
				<!-- 排名 -->
				<el-table-column width="20">
					<template slot-scope="scope">
						<span class="ranking" :class="{'top3':scope.$index < 3}">{{scope.$index+1}}</span>
					</template>
				</el-table-column>
				<!-- 状态 -->
				<!-- 名称 -->
				<el-table-column>
					<template slot-scope="scope">
						<div class="item-name">
							<span class="name">{{scope.row.name}}</span>
							<span class="alia" v-if="scope.row.alia && scope.row.alia.length > 0">({{scope.row.alia[0]}})</span>
						</div>
					</template>
				</el-table-column>
				<!-- 歌手 -->
				<el-table-column align="right">
					<template slot-scope="scope"> 
						<div class="artists">
							<span v-for="(artist,index) in scope.row.ar" :key="artist.id">
								<span class="artist-name"  @click="toArtistDetail(artist.id)">{{artist.name }}</span>
								<span class="separator" v-if="index < scope.row.ar.length - 1"> / </span>
							</span>
						</div>
					</template>
				</el-table-column>
			</el-table>

			<!-- 查看更多 -->
			<div class="more">
				<span @click="getAll">查看全部</span>
			</div>
		</div>
	</div>
</template>
<script>
	import CommonMixin from '@/mixins/common-mixin'
	import { getPlaylistDetail} from '@/api/playlist.js'
	export default {
		mixins: [CommonMixin],
		data() {
			return {
				list: [],
				time: 0
			}
		},
		props:{
			toplist: {
				type: Object,
				required: true
			}
		},
		methods: {
			play(song){
				this.playMusic(song.id)
			},
			getAll(){
				this.toPlaylistDetail(this.toplist.id)
			}
		},
		computed: {
			loading(){
				return this.list.length <= 0
			},
			cover(){
				return this.toplist.coverImgUrl
			},
			bgurl(){
				if(this.list.length > 0){
					if(this.isArtTl){
						return this.list[0].img1v1Url
					}else{
						return this.list[0].al.picUrl
					}
				}else{
					return ''
				}
			},
			date(){
				let date = new Date(this.time)
				let month = date.getMonth() + 1
				let day = date.getDate()
				return `${month}月${day}日`
			}
		},
		created() {
			this.time = this.toplist.updateTime
			getPlaylistDetail(this.toplist.id).then(res => {
				this.list = res.playlist.tracks.slice(0,5)
			})
		}
	}
</script>

<style lang="scss">
@import "~@/styles/mixins.scss";
	.chart1-item{
		width: 100%;
		margin-bottom: 50px;
		display: flex;
		justify-content: space-between;
		cursor: default;
		.chart-cover{
			width: 170px;
			height: 170px;
			border-radius: 5px;
			@include background;
			overflow: hidden;
			border-radius: 5px;
			position: relative;
			cursor: pointer;
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
					color: #c3473a;
				}
			}
			&:hover{
				.icon-play{
					opacity: 1;
				}
			}
			.update-time{
				position: absolute;
				width: 100%;
				text-align: center;
				line-height: 30px;
				top: 60%;
				color: #fff;
				font-size: 12px;
			}
			.box{
				width: 100%;
				height: 100%;
				@include background;
				opacity: .8;
			}
		}
		.chart-abstract{
			width: calc(100% - 200px);
			height: 170px;
			.el-table{
				background: none;
				font-size: 12px;
				&::before{
					// table下边框
					display: none;
				}
				.el-table__body-wrapper{
					height: 100%;
					table{
						height: 100%;
						color: #fff;
						tbody{
							height: 100%;
							tr{
								background: none;
								td{
									height: 100%;
									padding: 0;
									background: none;
									&:first-child{
										border-radius: 4px 0 0 4px;
									}
									&:last-child{
										border-radius: 0 4px 4px 0;
									}
									.ranking{
										color: var(--color-level4);
										font-size: 13px;
										&.top3{
											color: var(--color-netease-red);
										}
									}
									.item-name{
										@include ellipsis;
										.name{
											color: var(--color-level2);
										}
										.alia{
											color: var(--color-level3);
										}
									}
									.artists{
										color: var(--color-level4);
										@include ellipsis;
										.artist-name{
											cursor: pointer;
											&:hover{
												color: var(--color-level3);
											}
										}
									}
								}
								&:nth-of-type(2n+1){
									background-color: var(--table-stripe-color);
								}
								&:hover{
									background-color: var(--table-hover-color);
									td{
										background: none;
									}
								}
							}
						}
					}
				}
			}
			.more{
				line-height: 30px;
				font-size: 12px;
				color: var(--color-level3);
				padding-left: 10px;
				span{
					cursor: pointer;
					&:hover{
						color: var(--color-level2);
					}
				}
			}
		}
	}
</style>
