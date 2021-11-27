<template>
  <div class="singer-detail-wrapper" v-if="singer">
    <div class="singer-detail-header">
      <div class="singer-avatar" :style="{'backgroundImage': `url(${singerCover})`}"></div>
      <div class="singer-info">
        <div class="singer-name">{{singer.artist.name}}</div>
        <div class="singer-operation">
          <span class="operation-item">
            <span class="iconfont icon-shoucang"></span> 收藏</span>
          <span class="operation-item" v-if="singer.user" @click="toUserDetail(singer.user.userId)">
            <span class="iconfont icon-icon"></span> 个人主页</span>
        </div>
        <div class="work-info">
          <span class="item">单曲数:<span class="count">{{singer.artist.musicSize}}</span></span>
          <span class="item">专辑数:<span class="count">{{singer.artist.albumSize}}</span></span>
          <span class="item">MV数:<span class="count">{{singer.artist.mvSize}}</span></span>
        </div>
      </div>
    </div>

    <div class="singer-detail-nav">
      <tab-nav>
        <template v-slot:left>
          <div 
            v-for="item in modeList"
            :key="item.name"
            :class="{'active': mode == item.name}" 
            @click="mode = item.name"
          >
            {{item.label}}
          </div>
        </template>
      </tab-nav>
    </div>

    <div class="singer-detail-content">
      <singer-albums v-if="mode === 'album'" :id="id"></singer-albums>
      <singer-mvs v-if="mode === 'mv'" :id="id"></singer-mvs>
      <singer-desc v-if="mode === 'desc'" :id="id"></singer-desc>
      <similar-singers v-if="mode === 'similar'" :id="id"></similar-singers>
    </div>
  </div>
</template>

<script>
import { toUserDetail } from '@/utils/methods'
import TabNav from '@/components/common/tab-nav'
import SingerAlbums from './singer-albums.vue'
import SingerMvs from './singer-mvs.vue'
import SingerDesc from './singer-desc.vue'
import SimilarSingers from './similar-singers.vue'
import { getSingerDetail } from '@/api/singer.js'
import { size_1v1_std } from '@/utils/img-size.js'
export default {
  components: {
    TabNav,
    SingerAlbums,
    SingerMvs,
    SingerDesc,
    SimilarSingers
  },
  data () {
    return {
      id: null,
      singer: null,
      mode: 'album',
      modeList:[
        { name: 'album', label: '专辑' },
        { name: 'mv', label: 'MV'},
        { name: 'desc', label: '歌手详情'},
        { name: 'similar', label: '相似歌手'}
      ]
    }
  },
  computed: {
    singerCover(){
      return `${this.singer.artist.cover}?param=${size_1v1_std}`
    }
  },
  methods: {
    toUserDetail,
    async getData(){
      this.singer = null
      this.id = this.$route.query.id
      const { data } = await getSingerDetail({ id: this.id})
      this.singer = data
    }
  },
  created () {
    this.getData()
  },
  watch:{
    $route(){
      this.getData()
      this.mode = 'album'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.singer-detail-wrapper{
  width: 100%;
  height: 100%;
  padding-bottom: 30px;
  box-sizing: border-box;
  overflow: overlay;
  .singer-detail-header{
    width: 100%;
    padding: 0 30px;
    padding-top: 10px;
    box-sizing: border-box;
    @include clearfix;
    .singer-avatar{
      float: left;
      width: 200px;
      height: 200px;
      @include background;
      border-radius: 5px;
      margin-right: 30px;
      border: 1px solid var(--main-border-color);
      box-sizing: border-box;
    }
    .singer-info{
      float: left;
      width: calc(100% - 230px);
      .singer-name{
        line-height: 30px;
        font-size: 22px;
        font-weight: bold;
        color: var(--color-level2);
      }
      .singer-operation{
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
      }
      .work-info{
        height: 25px;
        line-height: 25px;
        font-size: 13px;
        color: var(--color-level2);
        .item{
          margin-right: 20px;
        }
        .count{
          color: var(--color-level3);
        }
      }
    }
  }
  .singer-detail-nav{
    padding: 0 30px;
    margin-top: 20px;
    .count{
      font-size: 12px;
    }
  }
  .singer-detail-content{
    margin-top: 1px;
  }
}

</style>
