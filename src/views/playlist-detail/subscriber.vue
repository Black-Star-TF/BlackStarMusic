<template>
  <div class="detail-subscribers">
    <subscriber-item v-for="(item,index) in subscribers" :key="item.userId" :index="index" :subscriber="item" :num="3"></subscriber-item>
  </div>
</template>

<script>
  import {getPlaylistSubscribers} from '@/api/playlist.js'
  import SubscriberItem from '@/components/item/subscriber-item'
  export default {
    components: {
      SubscriberItem
    },
    data () {
      return {
        id: null,
        subscribers: [],
        hasMore: true,
        limit: 30
      }
    },
    computed: {
      
    },
    methods: {},
    created () {
      this.id = this.$route.params.id
      getPlaylistSubscribers(this.id,this.limit).then(res => {
        this.subscribers = res.subscribers
        this.hasMore = res.more
      })
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
</style>
