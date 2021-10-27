<template>
  <div class="radio-item" @click="toRadioDetail(radio.id)">
    <!-- 电台封面 -->
    <div class="radio-cover" :style="{'backgroundImage': `url(${radio.picUrl})`}"></div>
    <!-- 电台名 -->
    <div class="radio-name">
      <span class="name" v-html="markKeyword(radio.name)"></span>
    </div>
    <!-- 歌手 -->
    <div class="radio-creator">
      by 
      <span class="creator-name" @click.stop="toUserDetail(radio.dj.userId)" v-html="markKeyword(radio.dj.nickname)"></span>
    </div>
  </div>
</template>

<script>
	import { toRadioDetail, toUserDetail, markKeyword} from '@/utils/methods'
  export default {
    props: {
      radio: {
        type: Object,
        required: true
      },
      keyword: {
        type: String,
        required: true
      }
    },
    methods:{
      toRadioDetail,
      markKeyword,
      toUserDetail
    },
  }
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
  .radio-item{
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
    .radio-cover{
      width: 60px;
      height: 60px;
      border-radius: 5px;
      @include background;
      margin: 0;
    }
    .radio-name{
      flex: 1;
      font-size: 14px;
      color: var(--color-level2);
      .name{
        &:hover{
          color: var(--color-level1);
        }
      }
    }
    .radio-creator{
      flex: 1;
      font-size: 12px;
      color: var(--color-level5);
      .creator-name{
        color: var(--color-level4);
        &:hover{
          color: var(--color-level3);
        }
      }
    }
  }
</style>
