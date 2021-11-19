<template>
	<div class="view-chart">
		<template v-if="loaded">
			<!-- 官方榜 -->
			<container>
				<template v-slot:left>
					<div class="container-title">
						<span>官方榜</span>
					</div>
				</template>
				<template v-slot:content>
					<chart1-item v-for="toplist in ofToplists" :toplist="toplist" :key="toplist.name"></chart1-item >
				</template>
			</container>
			
			<!-- 全球榜 -->
			<container>
				<template v-slot:left>
					<div class="container-title">
						<span>全球榜</span>
					</div>
				</template>
				<template v-slot:content>
					<chart2-item
						v-for="(toplist,index) in glToplists"
						:num="6"
						:toplist="toplist"
						:index="index"
						:key="toplist.id">
					</chart2-item>
				</template>
			</container>
		</template>
		<!-- <loading :loading="loading"/> -->
	</div>
</template>

<script>
	import Container from '@/components/common/container'
	import Chart1Item from '@/components/item/chart1-item'
	import Chart2Item from '@/components/item/chart2-item'
	// import Loading from '@/components/common/Loading'

	import { getToplist } from '@/api/chart.js'
	export default {
		name: 'Toplist',
		data() {
			return {
				ofToplists: [],
				glToplists: [],
				loaded: false
			}
		},
		components: {
			Container,
			Chart1Item,
			Chart2Item,
			// Loading
		},
		methods:{
			async getData(){
				// 获取榜单数据
				let res = await getToplist()
				this.ofToplists = res.list.slice(0,4)
				this.glToplists = res.list.slice(4)
				this.loaded = true
			}
		},
		created () {
			this.getData()
		}
	}
</script>

<style lang="scss" scoped>
.view-chart{
	height: 100%;
	padding: 0 7% 30px;
	box-sizing: border-box;
	overflow: overlay;
	.container-title{
		height: 50px;
		line-height: 50px;
		color: var(--color-level2);
		>span{
			cursor: default;
		}
	}
}
</style>
