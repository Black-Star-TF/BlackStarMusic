<template>
  <div class="radio-subscribers-wrapper">
    <subscriber-item 
      v-for="(item,index) in subscribers" 
      :key="item.userId" 
      :index="index" 
      :subscriber="item" 
      :num="3"
    />
  </div>
</template>

<script>
  import { getRadioSubscribers } from '@/api/dj-radio.js'
  import SubscriberItem from '@/views/playlist/components/subscriber-item'
  export default {
    components: {
      SubscriberItem
    },
    data () {
      return {
        subscribers: [],
        pageSize: 21,
        time: -1,
        getMore: false,
        hasMore: false
      }
    },
    props: {
      rid: {
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
      getMoreData(e){
				let {scrollTop, offsetHeight, scrollHeight} = e.target
				// 判断是否滚动到底部
        if(!this.hasMore || this.getMore || scrollHeight - offsetHeight - scrollTop > 5) return
        this.getMore = true
        this.getData();
			},
      async getData(){
        let {subscribers, hasMore, time} = await getRadioSubscribers({
          id: this.rid,
          limit: this.pageSize,
          time: this.time
        })
        this.subscribers = this.subscribers.concat(subscribers)
        this.hasMore = hasMore
        this.time = time
        this.getMore = false
      }
    },
    created () {
      this.getData()
    },
    mounted(){
      this.$parent.$el.addEventListener('scroll', this.getMoreData)
    },
    beforeDestroy(){
      this.$parent.$el.removeEventListener('scroll', this.getMoreData)
    }
  }
</script>

<style lang="scss" scoped>
.radio-subscribers-wrapper{
  padding: 10px 30px 20px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}
</style>
