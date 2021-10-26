<template>
	<div class="radio2-item" :style="style" @click="toRadioDetail(radio.id)">
		<!-- 封面 -->
		<div class="radio-cover" :style="{'backgroundImage': `url(${radio.picUrl})`}"></div>
		<div class="radio-info">
			<!-- 电台名 -->
			<div class="radio-info-item name"><span>{{radio.name}}</span></div>
			<!-- 信息 -->
			<div class="radio-info-item info">
				<div class="desc">{{radio.rcmdText}}</div>
				<div class="last-program"><span class="iconfont icon-pause"></span> {{radio.lastProgramName}}</div>
			</div>
			<!-- 电台收费 -->
			<div class="radio-info-item price">¥ {{ radio.originalPrice | formatPrice}}</div>
		</div>
	</div>
</template>

<script>
	import { toRadioDetail } from '@/utils/methods'
	import { formatPrice } from '@/utils/filters'
	import ItemPropsMixin from '@/mixins/item-props-mixin'
	export default {
		mixins: [ItemPropsMixin],
		props: {
			radio: {
				type: Object,
				required: true
			},
		},
		methods:{
			toRadioDetail
		},
		filters:{
			formatPrice
		}
	}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
	.radio2-item {
		padding: 10px 0;
		cursor: default;
		display: flex;
		justify-content: space-between;
		border-top: .5px solid var(--main-border-color);
		border-bottom: .5px solid var(--main-border-color);
		&:nth-of-type(1){
			border-bottom:none;
		}
		&:nth-of-type(2){
			border-bottom:none;
		}
		.radio-cover{
			width: 135px;
			height: 135px;
			border-radius: 5px;
			@include background;
			cursor: pointer;
		}
		.radio-info{
			width: calc(100% - 145px);
			height: 135px;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;
			.radio-info-item {
				height: 45px;
				width: 100%;
				&.name{
					line-height: 45px;
					font-weight: bold;
					font-size: 15px;
					color: var(--color-level2);
					span:hover{
						cursor: pointer;
						&:hover{
							color: var(--color-level1);
						}
					}
				}
				&.price{
					line-height: 45px;
					font-size: 15px;
					color: var(--color-netease-red);
				}
				&.info{
					font-size: 13px;
					color: var(--color-level4);
					div{
						line-height: 22px;
						@include ellipsis;
						.iconfont{
							font-size: 13px;
							line-height: 22px;
						}
					}
				}
			}
		}
	}
</style>
