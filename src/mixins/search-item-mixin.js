import {getSearchResult} from '@/network/search.js'
import Loading from '@/components/common/Loading'
export default {
  components: {
    Loading
  },
  data(){
    return {
      results: [],
      keyword: '',
      currentPage: 1,
      totalPage: null,
    }
  },
  computed: {
    offset(){
      return (this.currentPage - 1) * this.limit
    },
    loading(){
      return this.results.length > 0
    }
  },
  methods: {
    // 翻页
    changeCurrentPage(pageNum) {
      this.currentPage = pageNum
      this.results = []
      this.getSearchResultData()
    },
    getSearchResultData(){
      // 请求数据
      getSearchResult(this.keyword,this.type.id,this.limit,this.offset).then(res => {
        // setData
        this.setSearchResultData(res.result)
        // send msg
        if(!this.totalPage){
          let count = this.getSearchResultCount(res.result)
          this.totalPage = Math.ceil(count / this.limit)
          let msg = `找到${count}个${this.type.name}`
          this.$emit('ok',msg)
        }
      })
    }
  },
  created () {
    this.keyword = this.$route.query.keyword
    this.getSearchResultData()
  },
  watch:{
    $route(){
      this.results = []
      this.keyword = this.$route.query.keyword
      this.getSearchResultData()
    }
  }
}