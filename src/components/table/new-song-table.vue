<template>
  <el-table
  class="newest-song-list-table"
  :data="songList"
  width="100%"
  :show-header="false"
  @row-dblclick="play"
  :cell-style="{'border': 'none','height': '80px'}">
    <!--排序 -->
    <el-table-column width="50" align="center">
      <template slot-scope="scope">
        <span class="song-index">{{scope.$index+1 | formatIndex}}</span>
      </template>
    </el-table-column>
    <!-- 封面 -->
    <el-table-column align="left" width="80">
      <template slot-scope="scope">
        <div
        class="song-cover"
        @click.stop="playMusic(scope.row.id)"
        :style="{'backgroundImage': `url(${scope.row.album.picUrl})`}">
          <!-- 播放按钮 -->
          <div class="icon-play">
            <span class="iconfont icon-bofang"></span>
          </div>
        </div>
      </template>
    </el-table-column>
    <!-- 歌名 -->
    <el-table-column align="left" min-width="4">
      <template slot-scope="scope">
        <div class="song-name">
          <span>{{scope.row.name}}</span>
          <span class="alia" v-if="scope.row.alias.length > 0">({{scope.row.alias[0]}})</span>
        </div>
        <span class="iconfont" v-if="false"></span>
        <span class="iconfont" v-if="false"></span>
        <span class="iconfont icon-shipin" v-if="scope.row.mvid!=0" @click="playVideo(scope.row.mvid)"></span>
      </template>
    </el-table-column>
    <!-- 歌手 -->
    <el-table-column align="left" min-width="3">
      <template slot-scope="scope">
        <div class="song-artists">
          <span class="artist" v-for="(artist,index) in scope.row.album.artists" :key="artist.id">
            <span class="artist-name" @click.stop="toArtistDetail(artist.id)">{{artist.name}}</span>
            <span class="separator" v-if="index < scope.row.album.artists.length-1"> / </span>
          </span>
        </div>
      </template>
    </el-table-column>
    <!-- 专辑名 -->
    <el-table-column align="left" min-width="3">
      <template slot-scope="scope">
        <div class="album-name">
          <span @click.stop="toAlbumDetail(scope.row.album.id)">{{scope.row.album.name}}</span>
        </div>
      </template>
    </el-table-column>
    <!-- 时长 -->
    <el-table-column align="center" width="80">
      <template slot-scope="scope">
        <span class="song-duration">{{scope.row.duration | formatDuration}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { playMusic,playVideo,toArtistDetail,toAlbumDetail } from '@/utils/methods'
	import { formatDuration } from '@/utils/filters'
  export default {
    props:{
      songList: {
        type: Array,
        required: true
      }
    },
    methods: {
      playMusic,
      playVideo,
      toArtistDetail,
      toAlbumDetail,
      play(row){
        this.playMusic(row.id)
      }
    },
    filters: {
      formatDuration,
      formatIndex(index){
        return index > 9 ? index : '0' + index
      }
    }
}
</script>

<style lang="scss" scoped>
  .el-table{
    background: none;
    font-size: 12px;
    margin-top: 10px;
    &::before{
      // table下边框
      display: none;
    }
    ::v-deep.el-table__body-wrapper{
      height: 100%;
      table{
        height: 100%;
        tbody{
          height: 100%;
          tr{
            background: none;
            cursor: default;
            td{
              height: 100%;
              padding: 0;
              background: none;
              &:first-child{
                border-radius: 4px 0 0 4px;
              }
              &:last-child{
                border-radius: 0 4px 4px 0;
              }
              .song-index,.song-duration{
                color: var(--color-level5);
              }
              .song-cover{
                margin: 10px 0;
                width: 60px;
                height: 60px;
                border-radius: 5px;
                background-repeat: no-repeat;
                background-size: cover;
                background-color: #aaa;
                cursor: pointer;
                position: relative;
                .icon-play{
                  width: 24px;
                  height: 24px;
                  line-height: 24px;
                  text-align: center;
                  border-radius: 12px;
                  background-color: rgba($color: #fff, $alpha: .7);
                  position: absolute;
                  top: calc(50% - 12px);
                  left: calc(50% - 12px);
                  .iconfont{
                    position: relative;
                    left: 1px;
                    font-size: 12px;
                    color: var(--color-netease-red);
                  }
                }
              }
              
              div{
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                &.song-name{
                  color: var(--color-level1);
                  display: inline-block;
                  max-width: calc(100% - 20px);
                  .alia{
                    color: var(--color-level4);
                  }
                }
                &.song-artists{
                  color: var(--color-level3);
                  .artist-name{
                    cursor: pointer;
                    &:hover{
                      color: var(--color-level2);
                    }
                  }
                }
                &.album-name{
                  color: var(--color-level3);
                  span{
                    cursor: pointer;
                    &:hover{
                      color: var(--color-level2);
                    }
                  }
                }
              }
              
              .iconfont{
                font-size: 16px;
                &.icon-shipin{
                  cursor: pointer;
                  color: var(--color-netease-red);
                  position: relative;
                  top: -5px;
                }
              }
            }

            &:nth-of-type(2n+1){
              background-color: var(--table-stripe-color);
            }
            &:hover{
              background-color: var(--table-hover-color);
              td{
                background: none;
              }
            }
          }
        }
      }
    }
  }

</style>
