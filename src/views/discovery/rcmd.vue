<template>
	<div class="view-recommend">
		<template v-if="loading">
			<!-- 轮播图 -->
			<el-carousel :interval="4000" type="card" height="15vw">
				<el-carousel-item v-for="(item,index) in banners" :key="item.targetId || index+1" width="50%">
				<div class="banner-item" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
				</el-carousel-item>
			</el-carousel>

			<!-- 推荐歌单 -->
			<container>
				<template v-slot:left>
					<div class="container-title">
						<router-link to="playlist" tag="span">推荐歌单</router-link>
					</div>
				</template>
				<template v-slot:content>
					<playlist-item
					v-for="(playlist,index) in playlists"
					:playlistItem="playlist"
					:index="index"
					:num="5"
					:key="playlist.id">
					</playlist-item>
				</template>
			</container>

			<!-- 独家放送 -->
			<container>
				<template v-slot:left>
					<div class="container-title">
						<router-link to="/exclusive" tag="span">独家放送</router-link>
					</div>
				</template>
				<template v-slot:content>
					<exclusive-item 
					v-for="(item,index) in exclusives"
					:exclusiveItem="item"
					:num="3"
					:index="index"
					:key="item.id">
					</exclusive-item>
				</template>
			</container>

			<!-- 最新音乐 -->
			<container>
				<template v-slot:left>
					<div class="container-title">
						<router-link to="newest" tag="span">最新音乐</router-link>
					</div>
				</template>
				<template v-slot:content>
					<newest-song-item 
					v-for="(item,index) in newestSongs"
					:newestSongItem="item"
					:num="2"
					:index="index"
					:key="item.id">
					</newest-song-item>
				</template>
			</container>

			<!-- 推荐MV -->
			<container>
				<template v-slot:left>
					<div class="container-title">
						<router-link to="/video/mv" tag="span">推荐MV</router-link>
					</div>
				</template>
				<template v-slot:content>
					<mv-item
					v-for="(mv,index) in mvs"
					:mv="mv"
					:index="index"
					:key="mv.id">
					</mv-item>
				</template>
			</container>
		</template>

		<!-- <Loading :loading="loading"/>	 -->
	</div>
</template>

<script>
	import Container from '@/components/common/container'
	import PlaylistItem from '@/components/item/playlist-item'
	import ExclusiveItem from '@/components/item/exclusive-item'
	import NewestSongItem from '@/components/item/newest-song-item'
	import MvItem from '@/components/item/mv-item'
	// import Loading from '@/components/common/Loading'

	import {
		getRecommendBanner,
		getrecommendNewestSong
	} from '@/api/music.js'

	import {
		getRecommendPlaylist
	} from '@/api//playlist.js'
	import {
		getRecommendExclusive,
		getRecommendMV
	} from '@/api/video.js'

	
	import { getRecommendRadio } from '@/api/djradio.js'
	
	export default {
		name: 'Recommend',
		data() {
			return {
				banners: [],
				playlists: [],
				exclusives: [],
				newestSongs: [],
				mvs: [],
				radios: []
			}
		},
		components: {
			Container,
			PlaylistItem,
			ExclusiveItem,
			NewestSongItem,
			MvItem,
			// RadioItem2,
			// Loading
		},
		computed:{
			loading () {
				return true
				// return this.banners.length != 0 && this.playlists.length != 0 && this.exclusives.length != 0 && this.newestSongs.length != 0 && this.mvs.length != 0 && this.radios.length != 0
			}
		},
		created() {
			// 获取轮播图数据
			getRecommendBanner().then(res => {
				this.banners = res.banners
			})

			// 获取推荐歌单数据
			getRecommendPlaylist(10).then(res => {
				this.playlists = res.result
			})

			// 获取独家放送数据
			getRecommendExclusive().then(res => {
				this.exclusives = res.result
			})

			// 获取推荐最新歌曲
			getrecommendNewestSong().then(res => {
				this.newestSongs = res.result
			})

			// 获取推荐mv
			getRecommendMV().then(res => {
				this.mvs = res.result
			})
			
			// 获取推荐电台
			// getRecommendRadio().then(res => {
			// 	this.radios = res.data
			// })
		}
	}
</script>

<style lang="scss" scoped>
	.view-recommend{
		padding-top: 30px;
		.container-title {
			height: 50px;
			line-height: 50px;
			color: var(--color-level2);
			font-size: 18px;
			font-weight: bold;
			span {
				cursor: pointer;
				&:hover {
					color: var(--color-level1);
				}
			}
		}
	}
	
</style>
