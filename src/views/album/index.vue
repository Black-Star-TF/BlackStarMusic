<template>
  <div class="page-album-detail" v-if="album">
    <div class="album-detail-header" >
      <div class="album-cover" :style="{'backgroundImage': `url(${albumCoverUrl})`}"></div>
      <div class="album-info">
        <div class="album-name">
          <div class="type">专辑</div>
          <div class="name">{{album.name}}</div>
        </div>

        <div class="album-operation">
          <span class="play-all operation-item">
            <span class="play" @click="playAll()">
              <span class="iconfont icon-bofang"></span>播放全部
            </span>
            <span class="add" @click="addToPlaylist()">
              <span class="iconfont icon-jia"></span>
            </span>
          </span>
          <span class="subscribe operation-item"><span class="iconfont icon-shoucang"></span>  收藏({{album.info.likedCount | formatCount}})</span>
          <span class="share operation-item"><span class="iconfont icon-fenxiang"></span> 分享({{album.info.shareCount | formatCount}})</span>
          <span class="download-all operation-item"><span class="iconfont icon-xiazai"></span> 下载全部</span>
        </div>

        <div class="album-artist">
          <span class="label">歌手：</span>
          <span class="artist-name">{{album.artist.name}}</span>
        </div>
        <div class="album-publish-time">
          <span class="label">时间：</span>
          <span class="publish-time">{{album.publishTime | formatDate}}</span>
        </div>
      </div>
    </div>

    <div class="album-detail-nav">
      <tab-nav>
        <template v-slot:left>
          <div 
            v-for="item in modeList"
            :key="item.name"
            :class="{'active': mode == item.name}" 
            @click="mode = item.name"
          >
            {{item.label}}
            <span class="comment-count" v-if="item.name == 'comment'">({{album.info.commentCount | formatCount}})</span>
          </div>
        </template>
      </tab-nav>
    </div>

    <div class="album-detail-content">
      <album-songs v-if="mode == 'songlist'" :trackIds="trackIds"></album-songs>
      <album-comments v-if="mode == 'comment'" :id="id"></album-comments>
      <album-desc v-if="mode == 'description'" :description="album.description"></album-desc>
    </div>
  </div>
</template>

<script>
import TabNav from '@/components/common/tab-nav'
import { getAlbumDetail } from '@/api/album'
import { formatDate, formatCount } from '@/utils/filters'
import AlbumSongs from './album-songs.vue'
import AlbumComments from './album-comments.vue'
import AlbumDesc from './album-desc.vue'
import { size_1v1_std } from '@/utils/img-size.js'

export default {
  components: {
    TabNav,
    AlbumSongs,
    AlbumComments,
    AlbumDesc
  },
  data () {
    return {
      id: null,
      songList: [],
      trackIds: [],
      album: null,
      mode: 'songlist',
      modeList:[
        { name: 'songlist', label: '歌曲列表' },
        { name: 'comment', label: '评论'},
        { name: 'description', label: '专辑详情'}
      ]
    }
  },
  computed: {
    albumCoverUrl(){
      return `${this.album.blurPicUrl}?param=${size_1v1_std}`
    }
  },
  methods: {
    addToPlaylist(){
      this.$store.state.player.addTracksToPlaylist(this.trackIds)
      this.$message.success('添加成功')
    },
    playAll(){
      // 播放当前歌单
      if(this.trackIds.length > 0){
        this.$store.state.player.playTrack(this.trackIds[0],this.trackIds)
      }
    },
    init(){
      this.id = this.$route.query.id
      this.songList = []
      this.album = null
      this.trackIds = []
    },
    async getData(){
      this.init()
      let res = await getAlbumDetail({ id: this.id })
      this.album = res.album
      this.trackIds = res.songs.map(track => track.id)
    }
  },
  filters: {
    formatDate,
    formatCount
  },
  created () {
    this.getData()
  },
  watch:{
    $route(){
      this.getData()
      this.mode = 'songlist'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.page-album-detail{
  width: 100%;
  height: 100%;
  padding-bottom: 50px;
  box-sizing: border-box;
  @include scroll-style;
  .album-detail-header{
    width: 100%;
    padding: 0 30px;
    padding-top: 10px;
    box-sizing: border-box;
    @include clearfix;
    .album-cover{
      float: left;
      width: 200px;
      height: 200px;
      @include background;
      border-radius: 5px;
      margin-right: 30px;
      border: 1px solid var(--main-border-color);
      box-sizing: border-box;
    }
    .album-info{
      float: left;
      width: calc(100% - 230px);
      .album-name{
        line-height: 30px;
        font-size: 24px;
        color: var(--color-level2);
        display: flex;
        .type{
          margin-top: 5px;
          font-size: 14px;
          text-align: center;
          width: 40px;
          height: 20px;
          line-height: 18px;
          margin-right: 10px;
          box-sizing: border-box;
          border: 1px solid var(--color-netease-red);
          color: var(--color-netease-red);
          border-radius: 3px;
        }
        .name{
          flex: 1;
        }
      }

      .album-operation{
        margin: 11px 0;
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

        .play-all{
          border-color: var(--color-netease-red);
          color: #fff;
          padding: 0;
          background-color: var(--color-netease-red);
          &:hover{
            background-color: var(--color-netease-red);
          }
          .play{
            display: inline-block;
            padding: 0 10px;
            line-height: 30px;
            border-right: 1px solid rgba($color: #fff, $alpha: .3);
            .iconfont{
              display: inline-block;
              width: 25px;
              height: 25px;
              font-size: 12px;
              text-align: center;
              margin: 0 2px;
              transform: scale(.7);
              line-height: 25px;
              border-radius: 50%;
              border: 1px solid #fff;
              &::before{
                position: relative;
                left: 1px;
              }
            }
          }
          .add{
            display: inline-block;
            padding: 0 10px;
            line-height: 30px;
          }
        }
      }

      .album-artist{
        height: 25px;
        line-height: 25px;
        font-size: 13px;
        color: var(--color-level2);
        .artist-name{
          cursor: pointer;
          color: var(--link-color);
          &:hover{
            color: var(--link-hover-color);
          }
        }
      }

      .album-publish-time{
        height: 25px;
        line-height: 25px;
        font-size: 13px;
        color: var(--color-level2);
        .publish-time{
          color: var(--color-level3);
          margin-right: 5px;
        }
      }
    }
  }



  .album-detail-nav{
    padding: 0 30px;
    margin-top: 20px;
    .comment-count{
      font-size: 12px;
    }
  }
  .album-detail-content{
    margin-top: 1px;
  }
}



</style>
