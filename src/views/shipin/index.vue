<template>
  <div class="view-shipin">
    <!-- 导航栏 -->
		<page-header>
      <cate-nav :navList="navList"></cate-nav>
    </page-header>
		
		<!-- 内容区 -->
		<div class="shipin-content">
			<router-view></router-view>
		</div>
  </div>
</template>

<script>
  import CateNav from '@/components/common/cate-nav'
  import PageHeader from '@/components/common/page-header'
  export default {
    components: {
      CateNav,
      PageHeader
    },
    data () {
      return {
        navList: [
          { path: '/shipin/video', name: '视频'},
          { path: '/shipin/mv', name: 'MV'}
        ]
      }
    }
}
</script>

<style lang="scss" scoped>
  .view-shipin{
		height: 100%;
		.shipin-content{
			height: calc(100% - 50px);
		}
	}
</style>

