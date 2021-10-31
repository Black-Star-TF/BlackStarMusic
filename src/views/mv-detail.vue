<template>
  <div class="mv-detail-page">
    <div class="main">
      <div class="title">
        <span><i class="iconfont icon-changyong_fanhui"></i>MV详情</span>
      </div>
      <video :src="videoUrl" width="100%" class="audio" controls autoplay></video>
      <!-- 歌手 -->
      <div v-if="videoDetail && videoInfo">
        <div class="artist">
          <span @click="toArtistDetail(videoDetail.artistId)">{{videoDetail.artistName}}</span>
        </div>
        <div class="name">
          {{videoDetail.name}}
          <span v-if="videoDetail.desc" @click="changeDesc" :class="['iconfont',icon]"></span>
        </div>
        <div class="info">
          <span>发布：{{videoDetail.publishTime}}</span>
          <span>播放：{{videoDetail.playCount | formatPlayCount}}次</span>
        </div>
        <div class="desc" v-if="showDesc">
          {{videoDetail.desc}}
        </div>
        <div class="operation">
          <span class="operation-item"><span class="iconfont icon-dianzan"></span> 赞({{videoInfo.likedCount}})</span>
          <span class="operation-item"><span class="iconfont icon-shoucang"></span> 收藏({{videoDetail.subCount}})</span>
          <span class="operation-item"><span class="iconfont icon-fenxiang1"></span> 分享({{videoInfo.shareCount}})</span>
          <span class="jubao">举报</span>
        </div>
        <div class="comment-title">
          <span class="title">听友评论</span> <span class="count">(已有{{videoInfo.commentCount | formatPlayCount}}条评论)</span>
        </div>
        <comment-input-area></comment-input-area>
      </div>
      <div ref="anchor"></div>
      <div v-if="videoDetail && videoInfo && videoComments" >
        <!-- 热门评论 -->
        <div class="hot-comment comment-part" v-if="videoComments.hotComments && videoComments.hotComments.length > 0">
          <h3>精彩评论</h3>
          <comment-item v-for="comment in videoComments.hotComments" :key="comment.commentId" :comment="comment"></comment-item>
          <div class="more-hot-comment">
            <span v-if="videoComments.moreHot" class="btn">更多精彩评论</span>
          </div>
        </div>

        <!-- 最新评论 -->
        <div class="new-comment comment-part" v-if="videoComments.comments&&videoComments.comments.length > 0">
          <h3>最新评论</h3>
          <comment-item v-for="comment in videoComments.comments" :key="comment.commentId" :comment="comment"></comment-item>
          <el-pagination background layout="prev, pager, next" :total="videoComments.total"
            :current-page.sync="pageNo" :page-size="pageSize" @current-change="changeCurrentPage">
          </el-pagination>
        </div>
      </div>
      <div class="zhanwei"></div>
    </div>
    <div class="about">
      <div class="title">相关推荐</div>
      <!-- 推荐视频 -->
      <relative-video-item v-for="video in relativeVideoList" :key="video.vid" :video="video"></relative-video-item>
    </div>
  </div>
</template>

<script>
import { getMVUrl, getMVDetail, getRelativeVideo,getMVInfo,getMVComment} from '@/api/video'
import { toArtistDetail } from '@/utils/methods'
import { formatPlayCount } from '@/utils/filters'
import RelativeVideoItem from '@/components/item/relative-video-item'
import CommentItem from '@/components/item/comment-item.vue'
import CommentInputArea from '@/components/common/comment-input-area.vue'
export default {
  components: {
    RelativeVideoItem,
    CommentItem,
    CommentInputArea
  },
  data () {
    return {
      id: null,
      videoUrl: '',
      videoDetail: null,
      videoInfo: null,
      relativeVideoList: [],
      videoComments: null,
      pageNo: 1,
      pageSize: 20,
      showDesc: false
    }
  },
  computed: {
    offset(){
      return (this.pageNo - 1) * this.pageSize
    },
    icon(){
      return this.showDesc ? 'icon-sanjiao2' : 'icon-sanjiao1'
    }
  },
  methods: {
    toArtistDetail,
    changeDesc(){
      this.showDesc = !this.showDesc
    },
    changeCurrentPage(){
      this.videoComments = null
      this.getVideoComments()
    },
    getVideoComments(){
      // 获取 mv评论
      getMVComment(this.id, this.pageSize, this.offset).then(res=>{
        this.videoComments = res
      })
    },
    initData(){
      this.id = null,
      this.videoUrl = '',
      this.videoDetail = null,
      this.videoInfo = null,
      this.relativeVideoList = [],
      this.videoComments = null,
      this.pageNo = 1,
      this.pageSize = 20,
      this.showDesc = false
    },
    init(){
      this.initData()
      this.id = this.$route.params.id
      // 获取相关视频
      getRelativeVideo(this.id).then(res=>{
        this.relativeVideoList = res.data
      })
      // 获取mv url
      getMVUrl(this.id).then(res=>{
        this.videoUrl = res.data.url
      })

      // 获取mv详情
      getMVDetail(this.id).then(res=>{
        this.videoDetail = res.data
      })
      // 获取点赞、评论数
      getMVInfo(this.id).then(res=>{
        this.videoInfo = res
      })
      this.getVideoComments()
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm => {
      vm.$store.state.player.pause()
    })
  },
  filters: {
    formatPlayCount
  },
  created () {
    this.init()
  },
  watch:{
    $route(){
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.mv-detail-page{
  overflow: overlay;
  position: absolute;
  top: var(--app-header-height);
  left: 0;
  bottom: 0;
  z-index: 100;
  display: flex;
  width: 100%;
  background-color: var(--main-bg-color);
  justify-content: center;
  .title{
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-weight: bold;
    color: var(--color-level2);
    span{
      cursor: pointer;
    }
    .iconfont{
      margin-right: 5px;
    }
  }
  .main{
    width: 620px;
    margin-right: 30px;
    .audio{
      height: 350px;
      border-radius: 10px;
      background-color: #000;
    }
    .artist{
      height: 50px;
      line-height: 50px;
      color: var(--color-level3);
      span{
        cursor: pointer;
        &:hover{
          color: var(--color-level2);
        }
      }
    }
    .name{
      // height: 35px;
      line-height: 50px;
      font-size: 24px;
      font-weight: bold;
      color: var(--color-level2);
      
      .iconfont{
        position: relative;
        top: -2px;
        color: var(--color-level5);
      }
    }
    .info{
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: var(--color-level4);
      span{
        margin-right: 20px;
      }
    }
    .desc{
      line-height: 20px;
      font-size: 12px;
      color: var(--color-level2);
      margin: 10px 0;
    }
    .operation{
      margin: 20px 0;
      margin-bottom: 50px;
      position: relative;
      height: 30px;
      line-height: 30px;
      .operation-item{
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
      .jubao{
        font-size: 12px;
        color: var(--color-level4);
        position: absolute;
        right: 0;
        text-decoration: underline;
        cursor: pointer;
        &:hover{
          color: var(--color-level3);
        }
      }
    }
    .comment-title{
      margin: 15px 0;
      height: 20px;
      line-height: 20px;
      .title{
        line-height: 20px;
        font-size: 14px;
        color: var(--color-level2);
        &:hover{
          color: var(--color-level1);
        }
      }
      .count{
        line-height: 20px;
        font-size: 12.5px;
        color: var(--color-level3);
      }
    }
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
    .zhanwei{
      height: 30px;
    }
    

  }
  .about{
    width: calc(var(--min-width) - 650px);
  }
}

.el-pagination {
  display: flex;
  justify-content: center;
}
</style>
