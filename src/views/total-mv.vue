<template>
  <div class="page-total-mv">
    <page-header>
      <div class="page-name">全部MV</div>
    </page-header>
    
		<group-nav :group="mvCate" :currentCate="currentCate" @cate-change="changeCate"></group-nav>
    <!-- mv列表 -->
		<container  v-if="loaded">
			<template v-slot:content>
				<mv-item
          v-for="(mv,index) in mvList"
          :mv="mv"
          :num="4"
          :index="index"
          :key="mv.id || index"
        />
			</template>
		</container>
		<!-- 没有获取到数据时的加载动画 -->
		<!-- <Loading :loading="loading"/> -->
		<!-- 获取更多数据时的加载动画 -->
		<!-- <Loading :loading="!getMore"/> -->
  </div>
</template>

<script>
	import Container from '@/components/common/container'
	import GroupNav from '@/components/common/group-nav'
  // import Loading from '@/components/common/Loading'
  import MvItem from '@/components/item/mv-item'
  import PageHeader from '@/components/common/page-header'
  import { getAllMV } from '@/api/video.js'
  export default {
    name: 'TotalMV',
    mixins: [],
    components: {
      GroupNav,
      // Loading,
      MvItem,
      Container,
      PageHeader
    },
    data () {
      return {
        mvList: [],
        pageSize: 20,
        pageNo: 1,
        getMore: false,
        hasMore: false,
        currentCate: {
          area: '全部',
          type: '全部',
          order:'上升最快'
        },
        mvCate: {
          area: {
            name: '地区',
            list: [
              {id: '全部', name: '全部'},
              {id: '内地', name: '内地'},
              {id: '港台', name: '港台'},
              {id: '欧美', name: '欧美'},
              {id: '日本', name: '日本'},
              {id: '韩国', name: '韩国'}
            ]
          },
          type: {
            name: '类型',
            list: [
              {id: '全部', name: '全部'},
              {id: '官方版', name: '官方版'},
              {id: '原声', name: '原声'},
              {id: '现场版', name: '现场版'},
              {id: '网易出品', name: '网易出品'}
            ]
          },
          order: {
            name: '排序',
            list: [
              {id: '上升最快', name: '上升最快'},
              {id: '最热', name: '最热'},
              {id: '最新', name: '最新'}
            ]
          }
        }
      }
    },
    computed: {
      offset(){
        return (this.pageNo - 1) * this.pageSize
      },
      loaded(){
        return this.mvList.length > 0
      }
    },
    methods: {
      changeCate({key,id}){
        this.currentCate[key] = id
        this.currentPage = 1
        this.mvList = []
        this.getAllMVData()
      },
      async getAllMVData(){
        const {data, hasMore} = await getAllMV({
          area: this.currentCate.area,
          type: this.currentCate.type,
          limit: this.pageSize,
          offset: this.offset,
          order: this.currentCate.order
        })
        this.mvList = this.mvList.concat(data)
        this.hasMore = hasMore
        this.getMore = false
      },
      getMoreData(e){
        let {scrollTop, offsetHeight, scrollHeight} = e.target
				// 判断是否滚动到底部
        if(!this.hasMore || this.getMore || scrollHeight - offsetHeight - scrollTop > 5) return
        this.pageNo++;
        this.getMore = true
        this.getAllMVData();
			}
    },
    created () {
      let query = this.$route.query
      Object.keys(query).forEach(key => {
        this.currentCate[key] = query[key]
      })
      this.getAllMVData()
    },
    mounted(){
			// 鼠标滚动到底部，获取更多数据
			this.$el.addEventListener('scroll', this.getMoreData)
		},
		beforeDestroy(){ 
			// 移除事件
			this.$el.removeEventListener('scroll', this.getMoreData)
		}
  }
</script>

<style lang="scss" scoped>
  .page-total-mv{
    height: 100%;
    box-sizing: border-box;
    padding: 15px 5vw;
    padding-top: 10px;
    overflow: overlay;
    @media screen and (max-width: 1100px) {
      padding: 30px 50px;
    }
    .page-name{
      height: 100%;
      line-height: inherit;
      font-size: 15px;
      font-weight: bold;
      color: var(--color-level2);
      padding-left: 25px;
    }
  }
</style>
