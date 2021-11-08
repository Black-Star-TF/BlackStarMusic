<template>
  <div class="view-song-detail">
    <div class="main">
      <div class="main-container" v-if="song">
        <div class="left">
          <div class="player-bar-container">
            <img src="~@/assets/img/play-controler.png" class="play-controler" :class="{'playing': player.playing}">
          </div>
          <div class="disc-outer" :class="{'paused': !player.playing}">
            <div class="disc">
              <img :src="song.al.picUrl" class="song-cover">
            </div>
          </div>
          <div class="song-operation"></div>
        </div>
        <div class="right">
          <div class="song-name">{{song.name}}</div>
          <div class="song-info">
            专辑：<span @click="toAlbumDetail(song.al.id)">{{song.al.name}}</span>
            歌手：<span>{{song.ar[0].name}}</span>
          </div>
          <scroller
            v-if="lyric" 
            class="song-lyric" 
            :options="lyricScrollOptions" 
            @init="initScroller" 
            ref="scroller"
          >
            <div class="lyric-content">
              <!-- <div class="top"></div> -->
              <div
                class="lyric-item" 
                v-for="(item,index) in lyric" 
                :key="index"
                ref="lyric"
                :class="getActiveClass(index)"
              >
                <p v-for="(item,index) in item.content" :key="index">{{item}}</p>
              </div>
              <!-- <div class="botton"></div> -->
            </div>
          </scroller>
          
        </div>
      </div>
      <div class="about" v-if="loaded">
        <div class="comment">
          <div class="title">听友评论</div>
          <!-- 评论输入框 -->
          <comment-input-area></comment-input-area>
          <!-- 热门评论 -->
          <div class="hot-comment comment-part" v-if="songComments.hotComments&&songComments.hotComments.length > 0">
            <h3>精彩评论</h3>
            <comment-item v-for="comment in songComments.hotComments" :key="comment.commentId" :comment="comment"></comment-item>
            <div class="more-hot-comment">
              <span v-if="songComments.moreHot" class="btn">更多精彩评论</span>
            </div>
          </div>

          <!-- 最新评论 -->
          <div class="new-comment comment-part" v-if="songComments.comments.length > 0">
            <h3>最新评论</h3>
            <comment-item v-for="comment in songComments.comments" :key="comment.commentId" :comment="comment"></comment-item>
            <el-pagination
              v-if="songComments.total > pageSize"
              background
              layout="prev, pager, next"
              :total="songComments.total"
              :current-page.sync="pageNo"
              :page-size="pageSize"
              @current-change="changeCurrentPage">
            </el-pagination>
          </div>

        </div>
        <div class="more">
          <div class="title" v-if="simiPlaylists.length > 0">包含这首歌的歌单</div>
          <simi-playlist-item v-for="playlist in simiPlaylists" :key="playlist.id" :playlist="playlist"></simi-playlist-item>
          <br>
          <div class="title" v-if="simiSongList.length > 0">相似歌曲</div>
          <simi-song-item v-for="song in simiSongList" :key="song.id" :song="song"></simi-song-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getSongComments, getSimiPlaylists, getSongsDetail, getSongLyric, getSimiSongs} from '@/api/music'
import { toAlbumDetail, toArtistDetail } from '@/utils/methods'
import { parseLyrics} from '@/utils/lyric'
import CommentItem from '@/components/item/comment-item.vue'
import CommentInputArea from '@/components/common/comment-input-area.vue'
import SimiPlaylistItem from '@/components/item/simi-playlist-item'
import SimiSongItem from '@/components/item/simi-song-item'
import Scroller from '@/components/common/scroller'
import {mapState, mapMutations} from 'vuex'
export default {
  name: '',
  mixins: [],
  components: {
    CommentInputArea,
    CommentItem,
    SimiPlaylistItem,
    Scroller,
    SimiSongItem
  },
  data () {
    return {
      song: null,
      songComments: null,
      pageNo: 1,
      pageSize: 20,
      simiPlaylists: [],
      simiSongList: [],
      lyric: null,
      lyricScrollOptions: {
        disableTouch: true,
        bounce: false,
        scrollerBar:{
          fadeOutTime: 500,
        }
      }
    }
  },
  props:{
    songId: {
      required: true
    }
  },
  computed: {
    ...mapState(['player']),
    
    loaded(){
      return this.song && this.songComments
    },
    offset(){
      return (this.pageNo - 1) * this.pageSize
    },
    activeIndex(){
      if(this.lyric){
        return this.lyric.findIndex((l, i) => {
          let next = this.lyric[i + 1]
          return this.player.progress >= l.time && (!next || this.player.progress < next.time)
        })
      }
      return -1
    }
  },
  methods: {
    ...mapMutations(['updateApp']),
    toAlbumDetail,
    toArtistDetail,
    scrollToActiveLyric(){
      const {scroller, lyric} = this.$refs
      if(scroller){
        scroller.getScroller().scrollToElement(lyric[this.activeIndex],200,0, true)
        this.$nextTick(()=>{
          scroller.refresh()
        })
      }
    },
    getActiveClass(index){
      return this.activeIndex == index ? 'active' : ''
    },
    initScroller(scroller){
      this.scrollToActiveLyric()
    },
    changeCurrentPage(){
      this.getSongCommentsData()
    },
    getSongDetail(){

    },
    getSongCommentsData(){
      getSongComments(this.songId, this.pageSize, this.offset).then(res=>{
        this.songComments = res
      })
    },
    init(){
      this.lyric = null
      this.song = null
      this.songComments = null
      this.simiPlaylists = []
      // 获取歌曲详情
      getSongsDetail(this.songId).then(res=>{
        this.song = res.songs[0]
      })

      // 获取歌词
      getSongLyric(this.songId).then(res=>{
        // console.log(res);
        this.lyric = parseLyrics(res)
      })

      // 获取歌曲评论
      this.getSongCommentsData()

      // 获取相似歌单
      getSimiPlaylists(this.songId).then(res=>{
        this.simiPlaylists = res.playlists
      })

      // 获取相似歌曲
      getSimiSongs(this.songId).then(res=>{
        this.simiSongList = res.songs
      })
    }
  },
  filters: {},
  created () {
    this.init()
  },
  watch:{
    songId(){
      this.init()
    },
    activeIndex(oldVal, newVal){
      if(oldVal !== newVal && this.lyric){
        this.scrollToActiveLyric()
      }
    },
    $route(){
      this.updateApp({
        key: 'songDetailVisible',
        value: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes rotate{
  0% {
    transform: rotate(0);
  }
  100%{
    transform: rotate(1turn);
  }
}
.view-song-detail{
  position: absolute;
  top: var(--app-header-height);
  right: 0;
  left: 0;
  bottom: var(--app-player-height);
  background-color: var(--main-bg-color);
  z-index: 100;
  overflow: overlay;
  .main{
    width: var(--min-width);
    margin: 0 auto;
    min-height: 100%;
    .main-container{
      width: 100%;
      height: 500px;
      display: flex;
      .left{
        width: 350px;
        margin-right: 80px;
        .player-bar-container{
          height: 30px;
          margin-bottom: 50px;
          position: relative;
          .play-controler{
            height: 180px;
            position: relative;
            z-index: 20;
            left: calc(50% - 15px);
            transform-origin: 16px 16px;
            transform: rotate(-45deg);
            transition: transform .2s linear;
            &.playing{
              transform: rotate(-5deg);
            }
          }
        }
        .disc-outer{
          background-color: var(--disc-outer-bg-color);
          width: 330px;
          height: 330px;
          margin: 0 auto;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          animation: rotate 25s linear infinite;
          &.paused{
            animation-play-state: paused;
          }
          .disc{
            width: 310px;
            height: 310px;
            border-radius: 50%;
            background: url(~@/assets/img/cd-wrapper.png);
            background-repeat: no-repeat;
            background-size: cover;
            justify-content: center;
            align-items: center;
            display: flex;
            .song-cover{
              width: 220px;
              height: 220px;
              border-radius: 50%;
            }
          }
        }
      }
      .right {
        flex: 1;
        height: 100%;
        .song-name{
          height: 40px;
          font-size: 20px;
          line-height: 40px;
          margin-top: 30px;
          color: var(--color-level2);
        }
        .song-info{
          overflow: hidden;
          font-size: 13px;
          height: 20px;
          line-height: 20px;
          color: var(--color-level2);
          span{
            color: var(--link-color);
            cursor: pointer;
            margin-right: 10px;
            &:hover{
              color: var(--link-hover-color);
            }
          }
        }

        .song-lyric{
          margin-top: 20px;
          height: calc(100% - 110px);
          overflow: hidden;
          color: var(--color-level3);
          mask-image: linear-gradient(
            180deg,
            hsla(0, 0%, 100%, 0) 0,
            hsla(0, 0%, 100%, 0.6) 15%,
            #fff 25%,
            #fff 75%,
            hsla(0, 0%, 100%, 0.6) 85%,
            hsla(0, 0%, 100%, 0)
          );
          .lyric-content{
            font-size: 15px;
            line-height: 30px;
            .lyric-item{
              margin-top: 10px;
              &.active{
                color: var(--color-level1);
              }
            }
            .top{
              height: 40px;
            }
            .bottom{
              height: 200px;
            }
          }
        }
      }
    }

    .about{
      width: 100%;
      display: flex;
      margin-top: 30px;
      .title{
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        font-weight: bold;
        color: var(--color-level2);
      }
      .comment{
        width: 650px;
        margin-right: 40px;
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
      .more{
        flex: 1;
      }
    }
  }
}

.el-pagination {
  display: flex;
  justify-content: center;
}
</style>
