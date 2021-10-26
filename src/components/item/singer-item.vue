<template>
	 <div class="singer-item" :style="style">
		 <!-- cover -->
		 <div class="singer-cover" @click="toArtistDetail(singer.id)" :style="{'backgroundImage': `url(${singer.img1v1Url})`}"></div>
		 <!-- name -->
		 <div class="singer-name">
			<span @click="toArtistDetail(singer.id)">{{singer.name}}</span>
		</div>
	 </div>
</template>

<script>
  import { toUserDetail,toArtistDetail } from '@/utils/methods'
	import ItemPropsMixin from '@/mixins/item-props-mixin'
	export default {
		mixins: [ItemPropsMixin],
		props: {
			singer: {
				type: Object,
				required: true
			}
		},
    methods:{
      toUserDetail,
      toArtistDetail
    }
	}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.singer-item{
  margin-bottom: 20px;
  .singer-cover{
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    @include background;
    margin-bottom: 10px;
    border-radius: 5px;
    cursor: pointer;
    border: .5px solid var(--main-border-color);
  }
  .singer-name{
    line-height: 20px;
    font-size: 12px;
    @include ellipsis;
    span{
      color: var(--color-level2);
      cursor: pointer;
      &:hover{
        color: var(--color-level1);
      }
    }
  }
}
	
</style>
