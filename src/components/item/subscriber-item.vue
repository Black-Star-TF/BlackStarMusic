<template>
  <div :style="style" class="subscriber-item">
    <div class="user-avatar" :style="{'backgroundImage': `url(${coverUrl})`}" @click="toUserDetail(subscriber.userId)"></div>
    <div class="user-info">
      <div class="user-name">
        <span class="name" @click="toUserDetail(subscriber.userId)">{{subscriber.nickname}}</span>
        <span class="gender gender-nan iconfont icon-228yonghu_xingbienan" v-if="subscriber.gender == 1"></span>
        <span class="gender gender-nv iconfont icon-girl" v-if="subscriber.gender == 2"></span>
      </div>
      <div class="user-signature" v-if="subscriber.signature !=''">{{subscriber.signature}}</div>
    </div>
  </div>
</template>

<script>
import { toUserDetail } from '@/utils/methods'
import ItemPropsMixin from '@/mixins/item-props-mixin'
import {size_1v1_std} from '@/utils/img-size.js'
export default {
  mixins: [ItemPropsMixin],
  props:{
    subscriber:{
      type: Object,
      required: true
    }
  },
  computed:{
    coverUrl(){
      return `${this.subscriber.avatarUrl}?param=${size_1v1_std}`
    }
  },
  methods:{
    toUserDetail
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.subscriber-item{
  height: 110px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .user-avatar{
    width: 90px;
    height: 90px;
    margin-right: 10px;
    border-radius: 50%;
    @include background;
    cursor: pointer;
  }
  .user-info{
    width: calc(100% - 100px);
    height: 60px;
    display: flex;
    align-items: center;
    color: var(--color-level2);
    font-size: 14px;
    flex-wrap: wrap;
    div{
      width: 100%;
      height: 30px;
      line-height: 30px;
      @include ellipsis;
      &.user-name{
        .name{
          cursor: pointer;
          &:hover{
            color: var(--color-level1);
          }
        }
        .gender{
          text-align: center;
          line-height: 18px;
          font-size: 14px;
          display: inline-block;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          margin-left: 5px;
        }
        .gender-nan{
          color: #4f8eb9;
          background-color: #d2f2fe;
        }
        .gender-nv{
          color: #d95e8d;
          background-color: #f9d0e7;
        }
      }
      &.user-signature{
        font-size: 12px;
        color: var(--color-level4);
      }
    }
  }
}
</style>
