<template>
  <div class="singer-item" @click="toArtistDetail(singer.id)">
    <!-- cover -->
    <div class="singer-cover" :style="{'backgroundImage': `url(${coverUrl})`}"></div>
    <!-- name -->
    <div class="singer-name"><span class="name" v-html="markKeywords(singer.name)"></span><span class="alias" v-if="singer.alias.length > 0">({{singer.alias[0]}})</span></div>
    <!-- user-icon -->
    <div class="user-icon">
      <span @click.stop="toUserDetail(singer.accountId)" class="iconfont icon-icon" v-if="singer.accountId"></span>
    </div>
  </div>
</template>

<script>
  import { toUserDetail,toArtistDetail,markKeywords } from '@/utils/methods'
  import {size_1v1_small} from '@/utils/img-size.js'
  export default {
    props:{
      singer: {
        type: Object,
        required: true
      },
      keyword:{
        type: String
      }
    },
    computed:{
      coverUrl(){
        return `${this.singer.img1v1Url}?param=${size_1v1_small}`
      }
    },
    methods:{
      markKeywords,
      toUserDetail,
      toArtistDetail
    }
  }
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
  .singer-item{
    padding: 10px 30px;
    box-sizing: border-box;
    height: 80px;
    cursor: pointer;
    display: flex;
    &:nth-of-type(2n){
      background-color: var(--table-stripe-color);
    }
    &:hover{
      background-color: var(--table-hover-color);
    }
    .singer-cover{
      width: 60px;
      height: 60px;
      @include background;
      border-radius: 5px;
      margin-right: 15px;
    }
    .singer-name{
      flex: 1;
      height: 60px;
      line-height: 60px;
      font-size: 14px;
      @include ellipsis;
      color: var(--color-level2);
      .alias{
        color: var(--color-level4);
      }
      .name{
        &:hover{
          color: var(--color-level1);
        }
      }
      
    }
    .user-icon{
      width: 30px;
      position: relative;
      .iconfont{
        width: 16px;
        height: 16px;
        position: absolute;
        top: calc(50% - 8px);
        left: calc(50% - 8px);
        border-radius: 50%;
        color: #fff;
        font-size: 14px;
        background-color: var(--color-netease-red);
        display: inline-block;
      }
    }
  }
</style>
