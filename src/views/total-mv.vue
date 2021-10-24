<template>
  <div class="page-total-mv" ref="totalMV">
    <page-header>
      <div class="page-name">全部MV</div>
    </page-header>
    
		<group-nav :group="mvCate" :currentCate="currentCate" @cate-change="changeCate"></group-nav>
    <!-- mv列表 -->
		<container  v-if="loading">
			<template v-slot:content>
				<mv-item
        v-for="(mv,index) in mvList"
        :mv="mv"
        :num="4"
        :index="index"
        :key="mv.id || index">
        </mv-item>
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
        limit: 20,
        currentPage: 1,
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
        return (this.currentPage - 1) * this.limit
      },
      loading(){
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
      getAllMVData(){
        getAllMV(this.limit,this.currentCate.type,this.currentCate.area,this.currentCate.order,this.offset).then(res => {
          this.mvList = this.mvList.concat(res.data)
          this.hasMore = res.hasMore
          this.getMore = false
        })
      },
      getMoreData(){
				let mainEle = this.$refs.totalMV
				let scrollTop = mainEle.scrollTop;
				let offsetHeight = mainEle.offsetHeight;
				let scrollHeight = mainEle.scrollHeight;
				// 判断是否滚动到底部
				if (scrollHeight - offsetHeight - scrollTop <= 1) {
					if(this.hasMore){
						this.currentPage ++;
						this.getMore = true
						this.getAllMVData();
					}
				}
			},
			throttle(){
				if (this.timer == null) {
					this.timer = setTimeout(()=>{
						this.getMoreData()
						this.timer = null;
					}, 2000);
				}
			}
    },
    filters: {},
    created () {
      let query = this.$route.query
      if(query){
        this.currentCate.area = query.area || this.currentCate.area
        this.currentCate.type = query.type || this.currentCate.type
        this.currentCate.order = query.order || this.currentCate.order
      }
      this.getAllMVData()
    },
    mounted(){
			// 鼠标滚动到底部，获取更多数据
			// 获取具有滚动条的元素
			let mainEle = this.$refs.totalMV
			// 获取滚动条属性
			mainEle.addEventListener('scroll', this.throttle)
		},
		beforeDestroy(){ 
			let mainEle = this.$refs.totalMV
			// 移除事件
			mainEle.removeEventListener('scroll', this.throttle)
		}
  }
</script>

<style lang="scss" scoped>
  .page-total-mv{
    height: 100%;
    box-sizing: border-box;
    padding: 15px 5vw;
    padding-top: 10px;
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
