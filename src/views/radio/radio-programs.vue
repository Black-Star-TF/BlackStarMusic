<template>
  <div class="radio-programs-wrapper">
    <div class="top">
      <div class="total-count">共{{ total }}期</div>
      <div class="order-type">
        <span>排序</span>
        <span
          class="iconfont icon-sort-desc desc"
          :class="{ active: !asc }"
          @click="orderChange(false)"
        ></span>
        <span
          class="iconfont icon-sort-asc asc"
          :class="{ active: asc }"
          @click="orderChange(true)"
        ></span>
      </div>
    </div>
    <program-item
      v-for="(program, index) in programs"
      :key="program.id"
      :program="program"
      @playProgram="playProgram(index)"
    ></program-item>

    <pagination
      v-if="loaded"
      :total="total"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getRadioPrograms } from "@/api/dj-radio.js";
import ProgramItem from "./components/program-item.vue";
import Pagination from "@/components/common/pagination";
import { getTrackFormatInfo } from "@/utils/methods";
export default {
  components: {
    ProgramItem,
    Pagination,
  },
  props: {
    radio: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pageSize: 100,
      currentPage: 1,
      programs: [],
      total: 0,
      asc: true,
    };
  },
  computed: {
    offset() {
      return (this.currentPage - 1) * this.pageSize;
    },
    loaded() {
      return this.programs.length > 0;
    },
  },
  methods: {
    playProgram(index){
      console.log(index);
      const list = this.programs.map(program => getTrackFormatInfo(program, 'program', {
        type: 'radio',
        info: {
          id: this.radio.id,
          name: this.radio.name
        }
      }));
      this.$store.state.player.playTrackFromPlaylist(index, list);
    },
    handleCurrentChange() {
      this.getPrograms();
    },
    orderChange(type) {
      if (this.asc !== type) {
        this.asc = type;
        this.currentPage = 1;
        this.getPrograms();
      }
    },
    async getPrograms() {
      this.programs = [];
      const { programs, count } = await getRadioPrograms({
        rid: this.radio.id,
        limit: this.pageSize,
        offset: this.offset,
        asc: this.asc,
      });
      this.programs = programs;
      this.total = count;
    },
  },
  created() {
    this.getPrograms();
  },
};
</script>

<style lang="scss" scoped>
.radio-programs-wrapper {
  .top {
    width: 100%;
    height: 30px;
    padding: 0 30px;
    line-height: 30px;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    .total-count {
      height: 100%;
      font-size: 13px;
      color: var(--color-level3);
    }
    .order-type {
      height: 100%;
      font-size: 13px;
      color: var(--color-level4);
      display: flex;
      align-items: center;
      span {
        vertical-align: middle;
        &.iconfont {
          width: 25px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          background-color: var(--table-stripe-color);
          &.active {
            background-color: var(--table-hover-color);
            color: var(--color-level2);
          }
          &.desc {
            margin-right: 2px;
            margin-left: 5px;
            border-radius: 5px 0 0 5px;
          }
          &.asc {
            border-radius: 0 5px 5px 0;
          }
        }
      }
    }
  }
}
</style>
