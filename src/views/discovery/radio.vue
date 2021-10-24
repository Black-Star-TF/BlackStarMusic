<template>
	<div class="radio-page">
		<template v-if="loading">
			<!-- 轮播图 -->
			<el-carousel :interval="4000" type="card" height="15vw">
				<el-carousel-item v-for="item in banner" width="50%" :key="item.id">
					<div class="banner-item" :style="{backgroundImage: `url(${item.pic})`}"></div>
				</el-carousel-item>
			</el-carousel>

			<!-- TODO 电台分类列表 -->

			<!-- 付费精品 -->
			<container>
				<template v-slot:left>
					<div class="container-title">
						<router-link :to="{path: '/radio', query: {name: '付费精品'}}" tag="span" class="link">付费精品</router-link>
					</div>
				</template>
				<template v-slot:content>
					<radio-item2
					v-for="(radio,index) in paidRadios"
					:num="2"
					:radio="radio"
					:index="index"
					:margin="30"
					:key="radio.id">
					</radio-item2 >
				</template>
			</container>

			<!-- 电台个性推荐 -->
			<container>
				<template v-slot:left>
					<div class="container-title">
						<span>电台个性推荐</span>
					</div>
				</template>
				<template v-slot:content>
					<radio-item1 
					v-for="(radio,index) in recommendRadio" 
					:index="index" 
					:num="6"
					:radio="radio" 
					:key="radio.id"></radio-item1>
				</template>
			</container>

			<!-- 推荐电台列表 -->
			<container v-for="cate in recommendRadioCate" :key="cate.categoryId">
				<template v-slot:left>
					<div class="container-title">
						<router-link :to="{ path: '/radio', query:{category:cate.categoryName} }" tag="span" class="link">{{cate.categoryName}}</router-link>
					</div>
				</template>
				<template v-slot:content>
					<radio-item1
					v-for="(radio,index) in cate.radios"
					:index="index" 
					:num="6"
					:radio="radio" 
					:key="radio.id">
					</radio-item1>
				</template>
			</container>
			
		</template>

		<!-- <Loading :loading="loading" /> -->
	</div>
</template>

<script>
	import Vue from 'vue'
	import Container from '@/components/common/container'
	import RadioItem1 from '@/components/item/radio1-item'
	import RadioItem2 from '@/components/item/radio2-item'
	// import Loading from '@/components/common/Loading'
	
	import {
		getRadioBanner,
		getPaidRadio,
		getRecommendRadio,
		getRecommendRadioCate,
		getRadioList
	} from '@/api/djradio.js'

	export default {
		data() {
			return {
				banner: [],
				recommendRadio: [],
				recommendRadioCate: [],
				radioNum: 0,
				paidRadios: []
			}
		},
		components: {
			Container,
			RadioItem1,
			RadioItem2,
			// Loading
		},
		computed: {
			loading(){
				return true
				// return this.banner.length > 0 && this.recommendRadio.length > 0 && this.recommendRadioCate.length === this.radioNum && this.paidRadios.length > 0
			}
		},
		methods:{
			
		},
		created() {

			// 获取轮播图数据
			getRadioBanner().then(res => {
				this.banner = res.data
			})

			// 获取付费精选电台
			getPaidRadio(4).then(res => {
				this.paidRadios = res.data.list
			})

			// 获取电台个性推荐
			getRecommendRadio().then(res => {
				this.recommendRadio = res.data
			})

			// 获取电台推荐分类
			getRecommendRadioCate().then(res => {
				let list = res.data.slice(0,6)
				for (const item of list) {
					// 只保存结果中的id和name字段
					this.recommendRadioCate.push({
						categoryId: item.categoryId,
						categoryName: item.categoryName
					})
				}
				// 获取电台分类的推荐电台
				for (const item of this.recommendRadioCate) {
					getRadioList(item.categoryId).then(res => {
						Vue.set(item,'radios',res.djRadios.slice(0,6))
						this.radioNum++
					})
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
.radio-page{
  padding-top: 25px;
  .container-title {
		height: 50px;
		line-height: 50px;
		color: var(--color-level2);
		font-size: 18px;
		font-weight: bold;

		>span {
			cursor: default;

			&.link {
				cursor: pointer;

				&:hover {
					color: var(--color-level1);
				}
			}
		}
	}
}
	
</style>
