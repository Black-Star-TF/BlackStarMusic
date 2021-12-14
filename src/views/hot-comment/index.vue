<template>
  <div class="view-hot-comment">
    <page-header>
      <div class="page-name">精彩评论</div>
    </page-header>
    <comment-item 
      v-for="comment in hotComments" 
      :key="comment.commentId" 
      :comment="comment"
    />
    <loading v-if="!loaded || getMore"/>
  </div>
</template>

<script>
import PageHeader from '@/components/common/page-header'
import CommentItem from '@/views/resource-comment/components/comment-item.vue'
import Loading from "@/components/common/loading";
import { getHotComments } from '@/api/comment'
import { toHotComment } from '@/utils/methods'
export default {
  components: {
    PageHeader,
    CommentItem,
    Loading
  },
  data () { 
    return {
      id: null,
      type: null,
      limit: 20,
      pageNo: 1,
      hotComments: [],
      hasMore: false,
      getMore: false
    }
  },
  computed: {
    offset(){
      return (this.pageNo - 1) * this.limit
    },
    loaded(){
      return this.hotComments.length > 0
    }
  },
  methods: {
    toHotComment,
    async getData(){
      console.log(111);
      const {hotComments, hasMore} = await getHotComments({
        id: this.id,
        type: this.type,
        limit: this.limit,
        offset: this.offset
      })

      this.hotComments.push(...hotComments)
      this.hasMore = hasMore
      this.getMore = false
    },
    getMoreData(e){
        let {scrollTop, offsetHeight, scrollHeight} = e.target
				// 判断是否滚动到底部
        if(!this.hasMore || this.getMore || scrollHeight - offsetHeight - scrollTop > 5) return
        this.pageNo++;
        this.getMore = true
        this.getData();
			},
  },
  mounted(){
    this.$el.addEventListener('scroll', this.getMoreData)
  },
  beforeDestroy(){
    this.$el.removeEventListener('scroll', this.getMoreData)
  },
  created () {
    let {id, type} = this.$route.query
    this.id = id
    this.type = type
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.view-hot-comment{
  height: 100%;
  overflow: overlay;
  padding: 0 20px;
  box-sizing: border-box;
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
