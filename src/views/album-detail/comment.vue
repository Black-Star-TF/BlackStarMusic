<template>
  <div class="detail-comment">
    <!-- 评论输入框 -->
    <comment-input-area></comment-input-area>
    <!-- 热门评论 -->
    <div class="hot-comment comment-part" v-if="hotComments.length > 0">
      <h3>精彩评论</h3>
      <comment-item v-for="comment in hotComments" :key="comment.commentId" :comment="comment"></comment-item>
    </div>

    <!-- 最新评论 -->
    <div class="new-comment comment-part" v-if="comments.length > 0">
      <h3>最新评论</h3>
      <comment-item v-for="comment in comments" :key="comment.commentId" :comment="comment"></comment-item>
    </div>
    
  </div>
</template>

<script>
  import { getAlbumComments } from '@/api/album'
  import CommentItem from '@/components/item/comment-item.vue'
  import CommentInputArea from '@/components/common/comment-input-area.vue'
  export default {
    components: {
      CommentItem,
      CommentInputArea
    },
    data () {
      return {
        topComments: [],
        hotComments: [],
        comments: [],
        pageSize: 20,
        pageNo: 1,
        total: 0
      }
    },
    computed: {
      offset(){
        return (this.pageNo - 1) * this.pageSize
      }
    },
    methods: {},
    created () {
      getAlbumComments(this.$route.params.id, this.pageSize, this.offset).then(res => {
        this.topComments = res.topComments
        this.hotComments = res.hotComments
        this.comments = res.comments
        this.total = res.total
      })
    }
  }
</script>

<style lang="scss" scoped>
.detail-comment{
  padding: 20px 30px;
  .comment-part{
    margin: 30px 0;
    h3{
      font-size: 16px;
      color: var(--color-level2);
    }
  }
}
</style>
