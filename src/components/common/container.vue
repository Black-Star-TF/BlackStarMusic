<template>
  <div class="comm-container">
    <el-row class="title">
      <el-col :span="left" class="left">
        <slot name="left"></slot>
      </el-col>
      <el-col :span="right" class="right">
        <slot name="right"></slot>
      </el-col>
    </el-row>
    <el-row class="content">
      <el-col :span="24">
        <slot name="content"></slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    left: {
      type: Number,
      default: 4,
    },
    right: {
      type: Number,
      default: 20,
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row.content {
  .el-col {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
</style>
