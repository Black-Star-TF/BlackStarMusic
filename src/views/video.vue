<template>
  <div class="view-video">
    <!-- 导航栏 -->
		<page-header>
      <cate-nav :navList="navList"></cate-nav>
    </page-header>
		
		<!-- 内容区 -->
		<div class="video-content">
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
          { path: '/video/shipin', name: '视频'},
          { path: '/video/mv', name: 'MV'}
        ]
      }
    }
}
</script>

<style lang="scss" scoped>
  .view-video{
		height: 100%;
    overflow: overlay;
		.video-content{
			height: calc(100% - 50px);
			box-sizing: border-box;
			padding: 0 5vw;
			@media screen and (max-width: 1100px) {
				padding: 0 50px;
			}
		}
	}
</style>

