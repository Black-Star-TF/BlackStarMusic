<template>
	 <div class="exclusive-item" :style="style">
		 <!-- 独家放送封面 -->
			<div class="exclusive-cover" @click="playVideo(exclusiveItem.id)" :style="{'backgroundImage':`url(${cover})`}" v-if="!loading">
				<!-- 播放图标 -->
				<div class="icon-play">
					<span class="iconfont icon-pause"></span>
				</div>
			</div>
			<!-- 独家放送名称 -->
			<div class="exclusive-name" v-if="!loading" @click="playVideo(exclusiveItem.id)">{{exclusiveItem.name}}</div>
	 </div>
</template>

<script>
  import { playVideo } from '@/utils/methods'
	import ItemPropsMixin from '@/mixins/item-props-mixin'
	export default {
		mixins: [ItemPropsMixin],
		props: {
			exclusiveItem:{
				required: true
			}
		},
		computed: {
			loading(){
				return typeof this.exclusiveItem == 'undefined'
			},
			cover(){
				return this.exclusiveItem.sPicUrl || this.exclusiveItem.cover
			}
		},
    methods:{
      playVideo
    }
	}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.exclusive-item{
  margin-bottom: 20px;
  .exclusive-cover{
    cursor: pointer;
    width: 100%;
    padding-bottom: 56%;
    @include background;
    position: relative;
    border-radius: 10px;
    margin-bottom: 10px;
    position: relative;
    .icon-play{
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 10px;
      position: absolute;
      top: 10px;
      left: 10px;
      background-color: rgba($color: #000, $alpha: .3);
      box-shadow: 0 0 1px 1px #fff;
      .iconfont{
        line-height: 20px;
        position: relative;
        left: 1px;
        bottom: 1px;
        font-size: 12px;
        color: #fff;
      }
    }
  }
  .exclusive-name{
    font-size: 14px;
    line-height: 20px;
    color: var(--color-level2);
    cursor: pointer;
    &:hover{
      color: var(--color-level1);
    }
    //todo 两行文字 超出使用省略号
  }
}

</style>
