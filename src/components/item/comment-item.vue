<template>
  <div class="comment-item">
    <div class="user-cover" :style="{'backgroundImage':  `url(${coverUrl})`}"></div>
    <div class="comment-content">
      <div class="comment">
        <span class="user" @click="toUserDetail(comment.user.userId)">{{comment.user.nickname}}：</span>
        <span class="content">{{comment.content}}</span>
      </div>
      
      <div class="comment replay" v-for="reply in comment.beReplied" :key="reply.beRepliedCommentId">
        <span class="user" @click="toUserDetail(reply.user.userId)">{{reply.user.nickname}}：</span>
        <span class="content">{{reply.content}}</span>
      </div> 

      <div class="comment-time">{{createTime}}</div>

      <div class="comment-operations">
        <span class="report">举报</span>
        <span class="iconfont icon-dianzan">{{comment.likedCount}}</span>
        <span class="iconfont icon-fenxiang1"></span>
        <span class="iconfont icon-pinglun"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { toUserDetail } from '@/utils/methods'
import {size_1v1_small} from '@/utils/img-size.js'
export default {
  props:{
    comment: {
      type: Object,
      required: true
    }
  },
  computed:{
    coverUrl(){
      return `${this.comment.user.avatarUrl}?param=${size_1v1_small}`
    },
    createTime(){
      let date = new Date(this.comment.time)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return `${year}年${month}月${day}日`
    }
  },
  methods: {
    toUserDetail
  },
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.comment-item{
  margin: 12px 0;
  box-sizing: border-box;
  display: flex;
  &:last-child{
    .comment-content{
      border: none;
    }
  }
  .user-cover{
    width: 35px;
    height: 35px;
    margin-right: 15px;
    margin-top: 8px;
    border-radius: 50%;
    @include background;
  }
  .comment-content{
    border-bottom: 1px solid var(--color-level5);
    
    font-size: 14px;
    width: calc(100% - 50px);
    position: relative;
    .comment{
      padding: 5px 0;
      line-height: 20px;
      box-sizing: border-box;
      .user{
        cursor: pointer;
        color: var(--link-color);
        &:hover{
          color: var(--link-hover-color);
        }
      }
      .content{
        color: var(--color-level2);
      }
      &.replay{
        line-height: 25px;
        padding-left: 10px;
        background-color: var(--table-hover-color);
        margin-bottom: 10px;
      }
    }

    .comment-time{
      font-size: 13px;
      color: var(--color-level5);
      margin-bottom: 20px;
    }

    .comment-operations{
      position: absolute;
      right: 0;
      bottom: 15px;
      span{
        display: inline-block;
        margin-left: 25px;
        color: var(--color-level4);
        font-size: 13px;
        cursor: pointer;
        &.report{
          visibility: hidden;
        }
        &:hover{
          color: var(--color-level3);
        }
      }
    }
  }

  &:hover{
    .comment-content{
      .comment-operations{
        span.report{
          visibility: visible;
        }
      }
    }
  }
} 
</style>
-+