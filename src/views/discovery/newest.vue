<template>
	<div class="newest-music">
		<!-- 路由导航 -->
		<div class="nav-container">
			<router-link to="/discovery/newest/newsong" tag="div" class="nav-item">新歌速递</router-link>
			<router-link to="/discovery/newest/newalbum" tag="div" class="nav-item">新碟上架</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		components: {},
		methods: {},
		computed: {},
		created() {}
	}
</script>

<style lang="scss" scoped>
	.newest-music{
    padding-top: 25px;
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
				&.router-link-active{
					background-color: var(--color-level4);
					color: var(--color-level2);
				}
			}
		}
	}
</style>
