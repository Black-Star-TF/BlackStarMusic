<template>
	 <div class="radio1-item" :style="style">
		 <div class="radio-cover" @click="toRadioDetail(radio.id)" :style="{'backgroundImage':`url(${radio.picUrl})`}">
				<!-- 主播名 -->
				<div class="dj-name">{{radio.name}}</div>
			</div>
			<div class="radio-rcmd-text" @click="toRadioDetail(radio.id)">{{radio.rcmdtext}}</div>
	 </div>
</template>

<script>
	import { toRadioDetail } from '@/utils/methods'
	import ItemPropsMixin from '@/mixins/item-props-mixin'
	export default {
		mixins: [ItemPropsMixin],
		props: {
			radio:{
				required: true
			}
		},
		computed: {
			loading(){
				return typeof this.radio == 'undefined'
			}
		},
		methods:{
			toRadioDetail
		}
	}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
	.radio1-item{
		.radio-cover{
			width: 100%;
			padding-bottom: 100%;
			@include background;
			border-radius: 10px;
			position: relative;
			margin-bottom: 5px;
			cursor: pointer;
			overflow: hidden;
			border: 1px solid var(--main-border-color);
			.dj-name{
				position: absolute;
				width: 100%;
				height: 20px;
				line-height: 20px;
				font-size: 12px;
				padding-left: 7px;
				color: #fff;
				bottom: 0;
				background-color: rgba($color: #000000, $alpha: .3);
				@include ellipsis;
			}
		}
		.radio-rcmd-text{
			cursor: pointer;
			height: 40px;
			line-height: 20px;
			font-size: 14px;
			color: var(--color-level2);
			@include ellipsis-2-line;
			&:hover{
				color: var(--color-level1);
			}
		}
	}
</style>
