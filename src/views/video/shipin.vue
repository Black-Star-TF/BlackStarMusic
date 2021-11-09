<template>
  <div class="page-shipin">
    <container>
      <template v-slot:left>
        <div class="current-category-container">
          <span class="current-category" @click.stop="change()">{{currentCate.name}}</span>
          <div class="video-categories" v-if="showCate" @click.stop>
            <div class="video-all">
              <span :class="{'active': total.name == currentCate.name}" @click="changeCategory(total)">{{total.name}}</span>
            </div>
            <div class="category-container">
              <div class="category-item" v-for="cate in videoGroup" :key="cate.name">
                <span :class="{'active': cate.name == currentCate.name}" @click="changeCategory(cate)">
                {{cate.name}}
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:right>
        <div class="hot-tags-nav">
          <span
          class="tag"
          v-for="cate in videoCategory"
          :class="{'active': cate.name == currentCate.name}"
          @click="changeCategory(cate)"
          :key="cate.name">{{cate.name}}</span>
        </div>
      </template>

      <template v-slot:content>
        <video-item v-for="(video,index) in videoList" :key="video.vid" :num="4" :video="video" :index="index"></video-item>
      </template>
    </container>
    
  </div>
</template>

<script>
import Container from '@/components/common/container'
import VideoItem from '@/components/item/video-item'
import {getVideoCategory,getVideoGroup,getVideoList,getAllVideo} from '@/api/video.js'
export default {
  name: '',
  mixins: [],
  components: {
    Container,
    VideoItem
  },
  data () {
    return {
      videoList: [],
      videoGroup: [],
      videoCategory: [],
      currentCate: null,
      showCate: false,
      total: {
        id: 0,
        name: '全部视频'
      }
    }
  },
  computed: {},
  methods: {
    // 切换视频分类面板状态
    change(status = null) {
      if (status == null) {
        this.showCate = !this.showCate
      } else {
        this.showCate = status
      }
    },
    changeCategory(cate){
      this.currentCate = cate
      this.videoList = []
      if(cate.id == this.total.id){
        this.getAllVideoData()
      }else{
        this.getVideoListData(cate.id)
      }
      this.showCate = false
    },
    // 获取视频列表
    getVideoListData(id){
      getVideoList(id).then(res=>{
        this.videoList = res.datas.map(item => item.data)
      })
    },
    getAllVideoData(){
      getAllVideo().then(res=>{
        this.videoList = res.datas.map(item => item.data)
      })
    },
  },
  filters: {},
  created () {
    this.currentCate = this.total
    // 获取视频分类
    getVideoCategory().then(res=>{
      this.videoCategory = res.data
    })

    getVideoGroup().then(res=>{
      this.videoGroup = res.data
    })

    this.changeCategory(this.currentCate)
    // 添加关闭歌单分类窗口的事件
    const app = document.getElementById('app')
    app.addEventListener('click', () => {
      this.showCate = false
    })
  },
  beforeDestroy(){
    // 移除关闭歌单分类窗口的事件
    const app = document.getElementById('app')
    app.removeEventListener('click', () => {
      this.showCate = false
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.current-category-container{
  height: 70px;
  line-height: 70px;
  position: relative;
  .current-category {
    position: relative;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    text-align: center;
    width: 100px;
    color: var(--color-level2);
    font-size: 14px;
    border: 1px solid var(--color-level5);
    border-radius: 20px;
    vertical-align: middle;
    cursor: pointer;
    background-color: transparent;

    &:hover {
      background-color: var(--main-container-bg-color);
    }
  }
  .video-categories {
    width: 800px;
    z-index: 1000;
    background-color: var(--panel-box-bg-color);
    box-shadow: 0 0 5px 1px rgba($color: #000, $alpha: .1);
    border-radius: 5px;
    position: absolute;
    top: 65px;
    cursor: default;
    &::before {
      content: "";
      display: block;
      width: 0;
      height: 0;
      position: absolute;
      top: -20px;
      left: 40px;
      border: 10px solid transparent;
      border-bottom-color: var(--panel-box-bg-color);
    }
    .video-all {
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      box-sizing: border-box;
      border-bottom: 1px solid var(--main-border-color);
      >span {
        font-size: 14px;
        color: var(--color-level2);
        &:hover {
          color: var(--color-netease-red);
        }
        &.active {
          color: var(--color-netease-red);
        }
      }
    }
    .category-container {
      display: flex;
      flex-wrap: wrap;
      height: 400px;
      overflow-y: auto;
      padding: 0 10px;
      box-sizing: border-box;
      padding-top: 5px;
      // @include scroll-style;
      .category-item {
        width: calc(100% / 6);
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;
        font-size: 14px;
        >span {
          color: var(--color-level2);
          padding: 0 10px;
          cursor: pointer;
          display: inline-block;
          border-radius: 15px;
          &:hover {
            color: var(--color-netease-red);
          }
          &.active {
            color: var(--color-netease-red);
            background-color: var(--playlist-tag-active-bg-color);
          }
        }
      }
    }
  }
}

.hot-tags-nav {
  height: 70px;
  line-height: 70px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  >span.tag {
    display: inline-block;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    border-radius: 10px;
    padding: 0 8px;
    margin: 0 3px;
    cursor: pointer;
    color: var(--color-level3);
    &:hover {
      color: var(--color-level2);
    }
    &.active {
      color: var(--color-netease-red);
			background-color: var(--playlist-tag-active-bg-color);
    }
  }
}
</style>
