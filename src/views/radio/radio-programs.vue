<template>
  <div class="radio-programs-wrapper">
    <div class="top">
      <div class="total-count">共{{total}}期</div>
      <div class="order-type">
        <span>排序</span>
        <span class="iconfont icon-sort-desc desc" :class="{'active': !asc}" @click="orderChange(false)"></span>
        <span class="iconfont icon-sort-asc asc" :class="{'active': asc}" @click="orderChange(true)"></span>
      </div>
    </div>
    <program-item v-for="program in programs" :key="program.id" :program="program"></program-item>
    <el-pagination 
      v-if="loaded && total > pageSize" 
      background 
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page.sync="pageNo" 
      @current-change="changeCurrentPage" 
		/>
  </div>
</template>

<script>
import { getRadioPrograms } from '@/api/dj-radio.js'
import ProgramItem from './components/program-item.vue'
export default {
  components: {
    ProgramItem
  },
  props:{
    rid: {
      required: true
    }
  },
  data () {
    return {
      pageSize: 100,
      pageNo: 1,
      programs: [],
      total: 0,
      asc: true
    }
  },
  computed: {
    offset(){
      return (this.pageNo - 1) * this.pageSize
    },
    loaded(){
      return this.programs.length > 0
    }
  },
  methods: {
    changeCurrentPage(){
      this.getPrograms()
    },
    orderChange(type){
      if(this.asc !== type){
        this.asc = type
        this.pageNo = 1
        this.getPrograms()
      }
    },
    async getPrograms(){
      this.programs = []
      const { programs, count } = await getRadioPrograms({
        rid: this.rid,
        limit: this.pageSize,
        offset: this.offset,
        asc: this.asc
      })
      this.programs = programs
      this.total = count
    }
  },
  created () {
    this.getPrograms()
  }
}
</script>

<style lang="scss" scoped>
.radio-programs-wrapper{
  .top{
    width: 100%;
    height: 30px;
    padding: 0 30px;
    line-height: 30px;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    .total-count{
      height: 100%;
      font-size: 13px;
      color: var(--color-level3);
    }
    .order-type{
      height: 100%;
      font-size: 13px;
      color: var(--color-level4);
      display: flex;
      align-items: center;
      span{
        vertical-align: middle;
        &.iconfont{
          width: 25px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          background-color: var(--table-stripe-color);
          &.active{
            background-color: var(--table-hover-color);
            color: var(--color-level2);
          }
          &.desc{
            margin-right: 2px;
            margin-left: 5px;
            border-radius: 5px 0 0 5px;
          }
          &.asc{
            border-radius: 0 5px 5px 0;
          }
        }
      }
    }
  }
}

.el-pagination{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
