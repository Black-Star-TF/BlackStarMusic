<template>
  <div class="detail-comment">
    <!-- 评论输入框 -->
    <comment-input-area></comment-input-area>
    <!-- 热门评论 -->
    <div class="hot-comment comment-part" v-if="hotComments.length > 0">
      <h3>精彩评论</h3>
      <comment-item v-for="comment in hotComments" :key="comment.commentId" :comment="comment"></comment-item>
      <div class="more-hot-comment">
        <span v-if="moreHot" class="btn" @click="toHotComment(id,type)">更多精彩评论</span>
      </div>
    </div>

    <!-- 最新评论 -->
    <div class="new-comment comment-part" v-if="loaded">
      <h3>最新评论</h3>
      <comment-item v-for="comment in comments" :key="comment.commentId" :comment="comment"></comment-item>
      <el-pagination 
        v-if="loaded" 
        background 
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page.sync="pageNo" 
        @current-change="getComments" 
      />
    </div>
  </div>
</template>

<script>
  import { getPlaylistComments } from '@/api/playlist'
  import { getAlbumComments } from '@/api/album'
  import { getVideoComments, getMVComments } from '@/api/video'
  import { getSongComments } from '@/api/music'
  import { toHotComment } from '@/utils/methods'
  import CommentItem from './comment-item.vue'
  import CommentInputArea from './comment-input-area.vue'
  import RESOURCE_TYPE from '@/utils/resource-type'
  export default {
    components: {
      CommentItem,
      CommentInputArea
    },
    data () {
      return {
        hotComments: [],
        comments: [],
        pageSize: 20,
        pageNo: 1,
        total: 0,
        moreHot: false
      }
    },
    props:{
      type:{
        type: Number,
        required: true
      },
      id: {
        required: true
      }
    },
    computed: {
      offset(){
        return (this.pageNo - 1) * this.pageSize
      },
      loaded(){
        return this.comments.length > 0
      },
      getCommentFunc(){
        switch(this.type){
          case RESOURCE_TYPE.SONG:
            return getSongComments
          case RESOURCE_TYPE.MV: //  MV
            return getMVComments
          case RESOURCE_TYPE.PLAYLIST: // 歌单
            return getPlaylistComments
          case RESOURCE_TYPE.ALBUM: // 专辑
            return getAlbumComments
          case RESOURCE_TYPE.VIDEO: //视频
            return getVideoComments
        }
      }
    },
    methods: {
      toHotComment,
      async getComments(){
        this.comments = []
        const {hotComments,comments,total,moreHot} = await this.getCommentFunc({
          id: this.id,
          limit: this.pageSize,
          offset: this.offset
        })
        this.hotComments = hotComments || []
        this.comments = comments
        this.total = total
        this.moreHot = moreHot
      }
    },
    created () {
      this.getComments()
    }
  }
</script>

<style lang="scss" scoped>
.detail-comment{
  .comment-part{
    margin: 30px 0;
    h3{
      font-size: 16px;
      color: var(--color-level2);
    }
    .more-hot-comment{
      margin: 30px 0;
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: center;
      .btn{
        display: inline-block;
        padding: 0 15px;
        height: 30px;
        line-height: 30px;
        color: var(--color-level2);
        border-radius: 16px;
        border: 1px solid var(--color-level5);
        cursor: pointer;
        margin-right: 10px;
        font-size: 14px;
        &:hover{
          background-color: var(--color-level5);
        }
      }
    }
  }
}
.el-pagination {
  display: flex;
  justify-content: center;
}
</style>
