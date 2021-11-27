<template>
  <div class="user-detail-wrapper" v-if="user">
    <div class="header-wrapper">
      <div class="user-avatar" :style="{'backgroundImage': `url(${coverUrl})`}"></div>
      <div class="user-info">
        <div class="name">{{user.profile.nickname}}</div>
        <div class="operation">
          <div class="left">
            <span class="identify" v-if="user.identify">
              <img class="identify-icon" :src="user.identify.imageUrl">
              {{user.identify.imageDesc}}
            </span>
            <span class="level">Lv{{user.level}}</span>
            <span class="gender man iconfont icon-228yonghu_xingbienan" v-if="user.profile.gender===1"></span>
            <span class="gender woman iconfont icon-girl" v-else></span>
          </div>
          <div class="right">
            <div class="operation-item" v-if="user.profile.artistId"><span class="iconfont icon-maikefeng"></span> 歌手页</div>
            <div class="operation-item"><span class="iconfont icon-duanxin"></span> 发私信</div>
            <div class="operation-item focus"><span class="iconfont icon-jia"></span> 关注</div>
          </div>
        </div>
        <div class="data-info">
          <div class="item event">
            <div class="count">{{user.profile.eventCount}}</div>
            <div class="name">动态</div>
          </div>
          <div class="separator"></div>
          <div class="item subscribed">
            <div class="count">{{user.profile.allSubscribedCount}}</div>
            <div class="name">关注</div>
          </div>
          <div class="separator"></div>
          <div class="item followed">
            <div class="count">{{user.profile.followeds}}</div>
            <div class="name">粉丝</div>
          </div>
        </div>
        <div class="social-media-account">
          社交网络: <span class="content"></span>
        </div>
        <div class="user-desc">
          个人介绍: <span class="content">{{signature}}</span>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="type">
        <!-- 电台 -->
        <container v-if="userRadios.length>0">
          <template v-slot:left>
            <div class="title">
              Ta创建的电台 <span class="count">({{userRadios.length}})</span>
            </div>
          </template>
          <template v-slot:content>
              <radio-item v-for="radio in userRadios" :key="radio.id" :radio="radio"/>
            </template>
        </container>
      </div>

      <div class="type">
        <!-- 创建的歌单 -->
        <container v-if="createdPlaylist.length>0">
          <template v-slot:left>
            <div class="title">
              歌单 <span class="count">({{createdPlaylist.length}})</span>
            </div>
          </template>
          <template v-slot:content>
            <playlist-item
              v-for="(playlist, index) in createdPlaylist"
              :playlistItem="playlist"
              :index="index"
              :num="6"
              :key="playlist.id"
            />
          </template>
        </container>
      </div>
      <div class="type">
        <!-- 收藏的歌单 -->
        <container v-if="subscribedplaylist.length>0">
          <template v-slot:left>
            <div class="title">
              收藏 <span class="count">({{subscribedplaylist.length}})</span>
            </div>
          </template>
          <template v-slot:content>
            <playlist-item
              v-for="(playlist, index) in subscribedplaylist"
              :playlistItem="playlist"
              :index="index"
              :num="6"
              :key="playlist.id"
            />
          </template>
        </container>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getUserDetail, getUserPlaylist, getUserRadio } from '@/api/user'
import PlaylistItem from './components/playlist-item.vue'
import RadioItem from './components/radio-item.vue'
import Container from "@/components/common/container";
import { size_1v1_std } from '@/utils/img-size.js'
export default {
  components: {
    Container,
    PlaylistItem,
    RadioItem
  },
  data () {
    return {
      userId: null,
      user: null,
      createdPlaylist: [],
      subscribedplaylist: [],
      userRadios: []
    }
  },
  computed: {
    coverUrl(){
      return `${this.user.profile.avatarUrl}?param=${size_1v1_std}`
    },
    signature(){
      return this.user.profile.signature || '暂无介绍'
    }
  },
  methods: {
    async getData(){
      const res = await axios.all([
        getUserDetail({ uid: this.userId }),
        getUserPlaylist({ uid: this.userId }),
        getUserRadio({ uid: this.userId })
      ])
      this.user = res[0]
      res[1].playlist.forEach(item => {
        item.creator.userId === this.user.profile.userId ? this.createdPlaylist.push(item) : this.subscribedplaylist.push(item)
      })
      this.userRadios = res[2].djRadios
    }
  },
  filters: {},
  created () {
    this.userId = this.$route.query.userId
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.user-detail-wrapper{
  width: 100%;
  height: 100%;
  padding: 10px 0;
  box-sizing: border-box;
  overflow: overlay;
  .header-wrapper{
    height: 200px;
    padding: 0 30px;
    display: flex;
    .user-avatar{
      width: 200px;
      height: 200px;
      border-radius: 50%;
      box-sizing: border-box;
      border: 1px solid var(--main-border-color);
      @include background;
      margin-right: 30px;
    }
    .user-info{
      flex: 1;
      .name{
        line-height: 30px;
        font-size: 24px;
        color: var(--color-level2);
      }
      .operation{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 10px;
        margin-bottom: 20px;
        border-bottom: 1px solid var(--main-border-color);
        .left{
          span{
            display: inline-block;
            margin-right: 10px;
            font-size: 12px;
            height: 16px;
            line-height: 16px;
            border-radius: 8px;
            &.identify{
              background-color: #f9e5e2;
              padding-right: 7px;
              color: var(--color-netease-red);
              .identify-icon{
                width: 16px;
                height: 16px;
                vertical-align: top;
              }
            }
            &.level{
              padding: 0 7px;
              background-color: #f0efef;
            }
            &.gender{
              width: 16px;
              text-align: center;
              &.man{
                color: #4f8eb9;
                background-color: #d2f2fe;
              }
              &.woman{
                color: #d95e8d;
                background-color: #f9d0e7;
              }

            }
          }
        }
        .right{
          .operation-item{
            display: inline-block;
            padding: 0 15px;
            height: 30px;
            line-height: 30px;
            color: var(--color-level2);
            border-radius: 16px;
            border: 1px solid var(--color-level5);
            cursor: pointer;
            font-size: 14px;
            &.focus{
              .iconfont{
                color: var(--color-netease-red);
              }
            }
            &:hover{
              background-color: var(--color-level5);
            }
            &:not(:last-child){
              margin-right: 10px;
            }
          }
        }
      }
      .data-info{
        height: 40px;
        margin-bottom: 10px;
        .separator{
          float: left;
          width: 1px;
          height: 100%;
          background-color: var(--main-border-color);
          margin: 0 30px;
        }
        .item{
          float: left;
          height: 40px;
          cursor: pointer;
          text-align: center;
          &:hover{
            .count{
              color: var(--color-level1);
            }
            .name{
              color: var(--color-level2);
            }
          }
          .count{
            width: 100%;
            height: 20px;
            line-height: 20px;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5px;
            color: var(--color-level2);
          }
          .name{
            width: 100%;
            height: 15px;
            line-height: 15px;
            font-size: 13px;
            color: var(--color-level3);
          }
        }
      }
      .social-media-account{
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        color: var(--color-level2);
        .content{
          color: var(--color-level3);
        }
      }
      .user-desc{
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        color: var(--color-level2);
        .content{
          color: var(--color-level3);
        }
      }
    }
  }
  .content-wrapper{
    padding: 0 30px;
    margin-top: 30px;
    .type{
      margin-top: 30px;
      .title{
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        color: var(--color-level2);
        font-weight: bold;
        .count{
          font-size: 12px;
          color: var(--color-level3);
          font-weight: normal;
        }
      }
    }
  }
  
}

</style>
