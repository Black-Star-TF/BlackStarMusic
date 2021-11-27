<template>
  <div class="radio-detail"  v-if="radio">
    <div class="radio-detail-header">
      <div class="radio-cover" :style="{'backgroundImage': `url(${radioCoverUrl})`}"></div>
      <div class="radio-info">
        <div class="radio-name">
          <div class="type">电台</div>
          <div class="name">{{radio.name}}</div>
        </div>
        <div class="radio-creator">
          <span class="creator-cover" @click="toUserDetail(radio.dj.userId)" :style="{'backgroundImage': `url(${djCoverUrl})`}">
            <span class="identityIcon" :style="{'backgroundImage': `url(${identityIconUrl})`}"></span>
          </span>
          <span class="creator-name" @click="toUserDetail(radio.dj.userId)">{{radio.dj.nickname}}</span>
        </div>
        <div class="radio-operation">
          <span class="play-all operation-item">
            <span class="play" @click="playAll()">
              <span class="iconfont icon-bofang"></span>播放全部
            </span>
            <span class="add" @click="addToPlayList()">
              <span class="iconfont icon-jia"></span>
            </span>
          </span>
          <span class="subscribe operation-item"><span class="iconfont icon-xingbiao"></span>  收藏({{radio.subCount | formatCount}})</span>
          <span class="share operation-item"><span class="iconfont icon-fenxiang"></span> 分享({{radio.shareCount | formatCount}})</span>
        </div>

        <div class="radio-desc">
          <span class="category">{{radio.category}}</span>{{radio.desc}}
        </div>
      </div>
    </div>

    <div class="radio-detail-nav">
      <tab-nav>
        <template v-slot:left>
          <div 
            v-for="item in modeList"
            :key="item.name"
            :class="{'active': mode == item.name}" 
            @click="mode = item.name"
          >
            {{item.label}}
            <span class="count" v-if="item.name == 'programs'">({{radio.programCount | formatCount}})</span>
            <span class="count" v-if="item.name == 'subscribers'">({{radio.subCount | formatCount}})</span>
          </div>
        </template>
      </tab-nav>
    </div>

    <div class="radio-detail-content">
      <radio-programs v-if="mode == 'programs'" :rid="rid"></radio-programs>
      <radio-subscribers v-if="mode == 'subscribers'" :rid="rid"></radio-subscribers>
    </div>
  </div>
</template>

<script>
import TabNav from '@/components/common/tab-nav'
import RadioPrograms from './radio-programs.vue'
import RadioSubscribers from './radio-subscribers.vue'
import { getRadioDetail } from '@/api/dj-radio.js'
import { formatCount } from '@/utils/filters'
import {size_1v1_std, size_1v1_small} from '@/utils/img-size.js'
import RESOURCE_TYPE from '@/utils/resource-type'
export default {
  components: {
    TabNav,
    RadioPrograms,
    RadioSubscribers
  },
  data () {
    return {
      rid: null,
      radio: null,
      type: RESOURCE_TYPE.RADIO,
      mode: 'programs',
      modeList:[
        { name: 'programs', label: '节目' },
        { name: 'subscribers', label: '订阅者'}
      ]
    }
  },
  computed: {
    radioCoverUrl(){
      return `${this.radio.picUrl}?param=${size_1v1_std}`
    },
    djCoverUrl(){
      return `${this.radio.dj.avatarUrl}?param=${size_1v1_small}`
    },
    identityIconUrl(){
      return `${this.radio.dj.avatarDetail.identityIconUrl}`
    }
  },
  methods: {
    playAll(){

    },
    addToPlayList(){

    },
    async getDetail(){
      const { data } = await getRadioDetail({ rid: this.rid })
      this.radio = data
    }
  },
  filters: {
    formatCount
  },
  created () {
    this.rid = this.$route.query.rid
    this.getDetail()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.radio-detail{
  width: 100%;
  height: 100%;
  padding-bottom: 30px;
  box-sizing: border-box;
  overflow: overlay;
  .radio-detail-header{
    width: 100%;
    padding: 0 30px;
    padding-top: 10px;
    box-sizing: border-box;
    @include clearfix;
    .radio-cover{
      float: left;
      width: 200px;
      height: 200px;
      @include background;
      border-radius: 5px;
      margin-right: 30px;
      border: 1px solid var(--main-border-color);
      box-sizing: border-box;
    }
    .radio-info{
      float: left;
      width: calc(100% - 230px);
      .radio-name{
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
      .radio-creator{
        height: 35px;
        line-height: 35px;
        font-size: 13px;
        margin: 10px 0;
        .creator-cover{
          float: left;
          width: 25px;
          height: 25px;
          margin: 5px 0;
          border-radius: 50%;
          @include background;
          cursor: pointer;
          position: relative;
          .identityIcon{
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            @include background;
            right: -2px;
            bottom: 0;
          }
        }
        .creator-name{
          cursor: pointer;
          color: var(--link-color);
          margin: 0 10px;
          &:hover{
            color: var(--link-hover-color);
          }
        }
      }
      .radio-operation{
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
      .radio-desc{
        font-size: 13px;
        line-height: 30px;
        margin-top: 20px;
        color: var(--color-level2);
        .category{
          display: inline-block;
          font-size: 12px;
          padding: 0 2px;
          height: 15px;
          line-height: 15px;
          border: 1px solid var(--color-netease-red);
          color: var(--color-netease-red);
          border-radius: 2px;
          margin-right: 5px;
          cursor: pointer;
        }
      }
    }
  }
  .radio-detail-nav{
    padding: 0 30px;
    margin-top: 20px;
    .count{
      font-size: 12px;
    }
  }
  .radio-detail-content{
    margin-top: 1px;
  }
}
</style>
