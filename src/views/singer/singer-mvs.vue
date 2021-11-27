<template>
  <div class="singer-mv-wrapper">
    <mv-item v-for="(mv, index) in mvs" :key="mv.id" :index="index" :mv="mv" :num="num"></mv-item>
  </div>
</template>

<script>
import { getAlbumMVs } from '@/api/singer.js'
import MvItem from './components/mv-item.vue'
export default {
  components: {
    MvItem
  },
  data(){
    return {
      mvs: [],
      pageSize: 20,
      pageNo: 1,
      hasMore: false,
      num: 4
    }
  },
  props:{
    id: {
      required: true
    }
  },
  computed:{
    offset(){
      return ( this.pageNo - 1 ) * this.pageSize
    }
  },
  methods: {
    getMoreData(e){
      let {scrollTop, offsetHeight, scrollHeight} = e.target
      // 判断是否滚动到底部
      if(!this.hasMore || this.getMore || scrollHeight - offsetHeight - scrollTop > 5) return
      this.pageNo++
      this.getMore = true
      this.getData();
    },
    handleWindowResize(e) {
      this.setNum(e.target.innerWidth);
    },
    setNum(width) {
      if (width <= 1200) {
        this.num = 4;
      } else {
        this.num = 5;
      }
    },
    async getData(){
      const { mvs, hasMore } = await getAlbumMVs({ id: this.id, limit: this.pageSize, offset: this.offset })
      this.mvs = this.mvs.concat(mvs)
      this.hasMore = hasMore
      this.getMore = false
    }
  },
  created () {
    this.setNum(window.innerWidth);
    this.getData()
  },
  mounted() {
    window.addEventListener("resize", this.handleWindowResize);
    this.$parent.$el.addEventListener('scroll', this.getMoreData)
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
    this.$parent.$el.removeEventListener('scroll', this.getMoreData)
  },
}
</script>

<style lang="scss" scoped>
.singer-mv-wrapper{
  padding: 0 30px;
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
</style>
