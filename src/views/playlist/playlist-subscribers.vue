<template>
  <div class="detail-subscribers">
    <subscriber-item 
      v-for="(item,index) in subscribers" 
      :key="item.userId" 
      :index="index" 
      :subscriber="item" 
      :num="3"
    />
    <el-pagination 
      v-if="loaded"
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page.sync="pageNo" 
      @current-change="changeCurrentPage" 
		/>
  </div>
</template>

<script>
  import { getPlaylistSubscribers } from '@/api/playlist.js'
  import SubscriberItem from './components/subscriber-item'
  export default {
    components: {
      SubscriberItem
    },
    data () {
      return {
        subscribers: [],
        total: 0,
        pageSize: 45,
        pageNo: 1
      }
    },
    props: {
      id: {
        required: true
      }
    },
    computed: {
      offset(){
        return (this.pageNo - 1) * this.pageSize
      },
      loaded(){
        return this.subscribers.length > 0
      }
    },
    methods: {
      changeCurrentPage(){
        this.getData()
      },
      async getData(){
        this.subscribers = []
        let {subscribers, total} = await getPlaylistSubscribers({
          id: this.id,
          limit: this.pageSize,
          offset: this.offset
        })
        this.subscribers = subscribers
        this.total = total
      }
    },
    created () {
      this.getData()
    },
  }
</script>

<style lang="scss" scoped>
.detail-subscribers{
  padding: 10px 30px 20px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}

.el-pagination{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
