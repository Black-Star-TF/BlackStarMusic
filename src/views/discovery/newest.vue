<template>
	<div class="newest-music">
		<!-- 路由导航 -->
		<div class="nav-container">
			<div 
				class="nav-item"
				v-for="group in groups" 
				:key="group.id" 
				@click="changeGroup(group)"
				:class="{'active': group.id == current.id}"
			>{{group.name}}</div>
		</div>

		<div class="newest-music-container">
			<newest-song v-if="current.id == 1"></newest-song>
		</div>
	</div>
</template>

<script>
	import NewestSong from './newest/newest-song.vue'
	export default {
		data() {
			return {
				current: {
					id: 1,
					name: '新歌速递'
				},
				groups: [
					{
						id: 1,
						name: '新歌速递'
					},
					{
						id: 2,
						name: '新碟上架'
					}
				]
			}
		},
		components: {
			NewestSong
		},
		methods: {
			changeGroup(group){
				this.current = group
			}
		},
		computed: {},
		created() {}
	}
</script>

<style lang="scss" scoped>
	.newest-music{
		height: 100%;
		padding: 30px 7%;
		box-sizing: border-box;
		overflow: overlay;
		.nav-container{
			width: 230px;
			height: 30px;
			
			margin: 0 auto;
			border-radius: 15px;
			box-sizing: border-box;
			border: 1px solid var(--color-level4);
			display: flex;
			.nav-item{
				width: 50%;
				height: 100%;
				line-height: 28px;
				text-align: center;
				font-size: 14px;
				border-radius: 15px;
				color: var(--color-level3);
				cursor: pointer;
				&:hover{
					background-color: var(--color-level5);
				}
				&.active{
					background-color: var(--color-level4);
					color: var(--color-level2);
				}
			}
		}
	}
</style>
