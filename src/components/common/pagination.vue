<template>
  <div class="pagination-wrapper">
    <el-pagination
      layout="prev, pager, next"
      hide-on-single-page
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    total: Number,
    pageSize: Number,
    currentPage: Number,
  },
  methods: {
    handleCurrentChange(pageNo) {
      this.$emit("update:current-page", pageNo);
      this.$emit("current-change");
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
::v-deep.el-pagination {
  button.btn-next,
  button.btn-prev {
    background: none;
    min-width: 25px;
    height: 25px;
    border-radius: 3px;
    line-height: 25px;
    border: 1px solid var(--color-level5);
    padding: 0;
    color: var(--color-level2);
    margin: 0 3px;
    &:hover {
      background-color: var(--table-hover-color);
    }
    &:disabled {
      color: var(--color-level5);
      background: none;
    }
  }
  .el-pager {
    li.number,
    li.btn-quickprev,
    li.btn-quicknext {
      font-weight: 400;
      background: none;
      min-width: 25px;
      height: 25px;
      border-radius: 3px;
      line-height: 25px;
      padding: 0;
      border: 1px solid var(--color-level5);
      margin: 0 3px;
      text-align: center;
      color: var(--color-level2);
    }
    li.number {
      &:hover {
        background-color: var(--table-hover-color);
      }
      &.active {
        background-color: var(--color-netease-red);
        border: none;
        color: var(--color-level1);
      }
    }
  }
}
</style>
