<template>
	<div class="group-nav">
		<div class="group-item" v-for="(cateItem,key) in group" :key="key">
			<div class="group-name">
				<span>{{cateItem.name}}：</span>
			</div>
			<div class="tags">
				<span
				v-for="(tag) in cateItem.list"
				:key="tag.id"
				:class="{'active': isActive(key,tag.id)}"
				@click="changeCate(key,tag.id)">
				{{tag.name}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'GroupNav',
		data() {
			return {}
		},
		props:{
			group: {
				type: Object,
				required: true
			},
			currentCate: {
				type: Object,
				required: true
			}
		},
		components: {},
		methods: {
			isActive(key,id){
				return this.currentCate[key] === id
			},
			changeCate(key,id){
				this.$emit('cate-change',{key,id})
			}
		},
		computed: {},
		created() {}
	}
</script>

<style lang="scss" scoped>
	.group-nav{
		margin-bottom: 20px;
		cursor: default;
		.group-item{
			display: flex;
			line-height: 20px;
			font-size: 13px;
			.group-name{
				color: var(--color-level2);
				width: 50px;
				>span{
					display: inline-block;
					margin: 10px 0;
				}
			}
			.tags{
				color: var(--color-level3);
				width: calc(100% - 50px);
				>span{
					text-align: center;
					width: 60px;
					display: inline-block;
					margin: 10px 10px;
					cursor: pointer;
					&:hover{
						color: var(--color-level2);
					}
					&.active{
						color: var(--color-netease-red);
						background-color: var(--playlist-tag-active-bg-color);
						border-radius: 10px;
					}
				}
			}
		}
	}
</style>
