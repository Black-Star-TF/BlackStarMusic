<template>
  <el-table
  class="song-list-table"
  :data="songList"
  @row-dblclick="play"
  :default-sort = "{prop: 'name', order: 'descending'}">
    <!-- 排序 -->
    <el-table-column width="65" align="center">
      <template slot-scope="scope">
        <div class="song-index table-col">
          <span class="song-index-text">{{formatIndex(scope.$index+1)}}</span>
        </div>
      </template>
    </el-table-column>

    <!-- 操作 -->
    <el-table-column width="48">
      <template slot-scope="scope">
        <div class="song-operation table-col">
          <span class="song-operation-item" v-if="true"><span class="iconfont icon-xihuan"></span></span>
          <span class="song-operation-item" v-else><span class="iconfont liked icon-home_ico_like-"></span></span>
          <span class="song-operation-item"><span class="iconfont icon-xiazai"></span></span>
        </div>
        </template>
    </el-table-column>

    <!-- 歌名 -->
    <el-table-column label="音乐标题" min-width="2" sortable>
      <template slot-scope="scope">
        <div class="song-name table-col">
          <span v-if="keyword" v-html="markKeyword(scope.row.name)"></span>
          <span v-else>{{scope.row.name}}</span>
          <span class="song-name-alias" v-if="scope.row.alia.length > 0">({{scope.row.alia[0]}})</span>
        </div>
        <div class="song-lyric" v-if="scope.row.lyrics">
          <div v-if="keyword" v-html="markKeyword(scope.row.lyrics[0])"></div>
          <div v-for="(lyricRow,index) in lyric(scope.row)" :key="index">{{lyricRow}}</div>
        </div>
      </template>
    </el-table-column>

    <!-- 歌手 -->
    <el-table-column label="歌手" min-width="1">
      <template slot-scope="scope">
        <div class="table-col">
          <span class="song-artists">
            <span class="artist" v-for="(artist,index) in scope.row.ar" :key="artist.id">
              <span class="artist-name" v-if="keyword" @click="toArtistDetail(artist.id)" v-html="markKeyword(artist.name)"></span>
              <span class="artist-name" v-else @click="toArtistDetail(artist.id)">{{artist.name}}</span>
              <span class="separator" v-if="index < scope.row.ar.length -1"> / </span>
            </span>
          </span>
        </div>
        
      </template>
    </el-table-column>

    <!-- 专辑 -->
    <el-table-column label="专辑" min-width="1">
      <template slot-scope="scope">
        <div class="song-album table-col">
          <span class="song-album-name" v-if="keyword" @click="toAlbumDetail(scope.row.al.id)" v-html="markKeyword(scope.row.al.name)"></span>
          <span class="song-album-name" v-else @click="toAlbumDetail(scope.row.al.id)">{{scope.row.al.name}}</span>
        </div>
        <div class="lyric-operation" v-if="scope.row.lyrics">
          <span class="operation-item copy">复制歌词</span>
          <span class="operation-item unfold" v-if="scope.row.lyrics.length > 4" @click="showLyric(scope.row)">{{title(scope.row)}}</span>
        </div>
        <div class="lyric-operation bottom" v-if="scope.row.lyrics && scope.row.showAllLyric">
          <span class="operation-item copy">复制歌词</span>
          <span class="operation-item unfold" @click="showLyric(scope.row)">{{title(scope.row)}}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="时长" width="100">
      <template slot-scope="scope">
        <span class="song-duration">{{scope.row.dt | formatDuration}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { playMusic,toAlbumDetail,toArtistDetail,markKeyword } from '@/utils/methods'
  import { formatDuration } from '@/utils/filters'
  export default {
    props:{
      songList: {
        type: Array,
        required: true
      },
      keyword:{
        type: String
      },
      pageNum:{
        type: Number
      },
      limit:{
        type: Number
      }
    },
    methods: {
      playMusic,
      toAlbumDetail,
      toArtistDetail,
      markKeyword,
      title(song){
        if(!song.showAllLyric){
          return '展开歌词'
        }else{
          return '收起歌词'
        }
      },
      showLyric(song){
        song.showAllLyric = !song.showAllLyric
      },
      lyric(song){
        if(song.showAllLyric){
          return song.lyrics.slice(1)
        }else{
          return song.lyrics.slice(1,4)
        }
      },
      play(row){
        this.playMusic(row.id)
      },
      formatIndex(index){
        if(this.pageNum && this.limit){
          let num = (this.pageNum - 1) * this.limit + index
          return num > 9 ? num : '0' + num
        }else{
          return index > 9 ? index : '0' + index
        }
      },
    },
    filters:{
      formatDuration
    },
    created () {
      this.songList.forEach(song => {
        this.$set(song,'showAllLyric',false)
      })
    }
  }
</script>

<style lang="scss">

.song-list-table.el-table{
  background-color: var(--main-bg-color);
  .el-table__row{
    &:nth-of-type(2n+1){
      background-color: var(--table-stripe-color);
    }
    &:hover{
      background-color: var(--table-hover-color);
    }
  }
  th.el-table__cell{
    color: var(--color-level4);
    font-weight: normal;
  }
}
</style>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.song-list-table{
  font-size: 13px;
  margin-bottom: 30px;
}
.keyword{
  color: #91b7e2;
}
.table-col{
  height: 35px;
  line-height: 35px;
  padding-right: 10px;
  @include ellipsis;
}
.song-index{
  text-align: left;
  color: var(--color-level5);
  margin-left: 30px;
}
.song-duration{
  color: var(--color-level5);
}

.song-operation{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.song-operation-item{
  display: inline-block;
  .iconfont{
    line-height: 25px;
    font-size: 16px;
    color: var(--color-level4);
    cursor: pointer;
    &:hover{
      color: var(--color-level3);
    }
    &.liked{
      color: var(--color-netease-red);
    }
  }
}

.song-name{
  color: var(--color-level2);
  @include ellipsis;
  cursor: default;
  .song-name-alias{
    color: var(--color-level4);
  }
}
.song-lyric{
  margin-top: 10px;
  margin-bottom: 10px
}

.song-artists{
  @include ellipsis;
  .artist-name{
    cursor: pointer;
    color: var(--color-level3);
    &:hover{
      color: var(--color-level2);
    }
  }
}
.song-album{
  @include ellipsis;
  .song-album-name{
    cursor: pointer; 
    color: var(--color-level3);
    &:hover{
      color: var(--color-level2);
    }
  }
}

.lyric-operation{
  height: 24px;
  width: 100%;
  line-height: 24px;
  margin-top: 20px;
  
  &.bottom{
    position: absolute;
    bottom: 10px;
  }
  .operation-item{
    float: left;
    margin: 0 10px;
    padding: 0 10px;
    height: 24px;
    line-height: 22px;
    border-radius: 12px;
    box-sizing: border-box;
    border: 1px solid #666;
    &:hover{
      background-color: rgba($color: #fff, $alpha: .1);
    }
  }
}
</style>
