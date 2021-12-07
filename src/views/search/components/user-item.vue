<template>
  <div class="user-item" @click="toUserDetail(user.userId)">
    <!-- avatar -->
    <div class="user-avatar" :style="{'backgroundImage': `url(${coverUrl})`}">
      <div class="sign" v-if="user.avatarDetail" :style="{'backgroundImage': `url(${user.avatarDetail.identityIconUrl})`}"></div>
    </div>
    <!-- name -->
    <div class="user-name"><span class="name" v-html="markKeywords(user.nickname)"></span></div>
    <!-- description -->
    <div class="user-description">{{user.description || user.signature}}</div>
  </div>
</template>

<script>
	import { toUserDetail, markKeywords } from '@/utils/methods'
  import {size_1v1_small} from '@/utils/img-size.js'
  export default {
    props:{
      user: {
        type: Object,
        required: true
      },
      keyword: {
        type: String
      }
    },
    computed:{
      coverUrl(){
        return `${this.user.avatarUrl}?param=${size_1v1_small}`
      }
    },
    methods:{
      toUserDetail,
      markKeywords
    }
  }
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
  .user-item{
    width: 100%;
    height: 80px;
    padding: 10px 30px;
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    &:nth-of-type(2n){
      background-color: var(--table-stripe-color);
    }
    &:hover{
      background-color: var(--table-hover-color);
    }
    div{
      height: 60px;
      line-height: 60px;
      margin-left: 20px;
      @include ellipsis;
    }
    .user-avatar{
      width: 60px;
      height: 60px;
      margin: 0;
      overflow: visible;
      @include background;
      border-radius: 50%;
      position: relative;
      .sign{
        width: 20px;
        height: 20px;
        bottom: 0;
        border-radius: 50%;
        position: absolute;
        @include background;
        right: 0  ;
        background-color: var(--color-netease-red);
      }
    }

    .user-name{
      flex: 1;
      font-size: 14px;
      color: var(--color-level2);
      .name{
        &:hover{
          color: var(--color-level1);
        }
      }
    }

    .user-description{
      flex: 1;
      font-size: 13px;
      color: var(--color-level2);
      text-align: right;
    }
  }
</style>
