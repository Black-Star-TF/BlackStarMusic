<template>
  <div class="comment-input">
    <el-input type="textarea" placeholder="输入评论或@朋友" resize="none" rows="3" v-model="text" show-word-limit></el-input>
    <div class="operation">
      <div class="left">
        <span class="iconfont icon-aite"></span>
        <span class="iconfont icon-jinghao"></span>
      </div>
      <el-button class="right" size="small">评论</el-button>
    </div>
  </div>
</template>

<script>
export default {
  mixins: [],
  components: {},
  data () {
    return {
      text: ''
    }
  },
  computed: {},
  methods: {},
  filters: {},
  created () {}
}
</script>

<style lang="scss" scoped>
.comment-input{
  box-sizing: border-box;
  ::v-deep.el-textarea{
    textarea{
      background-color: var(--panel-box-bg-color);
      border: 1px solid var(--color-level5);
      border-radius: 5px;
      font-size: 14px;
      color: var(--color-level2);
    }
  }
  .operation{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    height: 30px;
    .left{
      span{
        display: inline-block;
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        color: var(--color-level3);
        margin-right: 5px;
        cursor: pointer;
        &:hover{
          color: var(--color-level2);
        }
      }
    }
    .el-button{
      height: 30px;
      border-radius: 15px;
      background: none;
      border: 1px solid var(--color-level5);
      color: var(--color-level2);
      &:hover{
        background-color: var(--main-container-bg-color);
      }
    }
  }
}
</style>
