<template>
  <div class="program-info">
    <div class="program-name">{{ program.name }}</div>
    <div class="radio-subscribe">
      <div class="radio-name" @click="toRadioDetail(program.radio.id)">{{ program.radio.name }}</div>
      <div class="btn">
        <i class="iconfont icon-xingbiao"></i>
        订阅({{ program.radio.subCount | formatCount }})
      </div>
    </div>
    <div class="info">
      <div class="info-item">
        主播：<span class="link" @click="toUserDetail(program.dj.userId)">{{
          program.dj.nickname
        }}</span>
      </div>
      <div class="info-item">
        来源：<span class="link" @click="toRadioDetail(source.info.id)">{{ source.info.name }}</span>
      </div>
      <div class="info-item">
        创建时间：{{ program.createTime | formatDate }}
      </div>
      <div class="info-item">
        已播放：{{ program.listenerCount | formatCount }}
      </div>
    </div>
    <div class="program-desc">
      <span class="category">{{ program.categoryName }}</span>
      {{ program.description }}
    </div>
  </div>
</template>

<script>
import { toUserDetail, toRadioDetail } from "@/utils/methods";
import { formatCount, formatDate } from "@/utils/filters";
export default {
  props: {
    program: Object,
  },
  computed: {
    source() {
      return this.$store.state.player.currentTrack.source;
    },
  },
  methods: {
    toUserDetail,
    toRadioDetail,
  },
  filters: {
    formatCount,
    formatDate,
  },
};
</script>

<style lang="scss" scoped>
.program-info {
  width: 100%;
  height: 100%;
  .program-name {
    height: 40px;
    font-size: 20px;
    line-height: 40px;
    margin-top: 30px;
    color: var(--color-level2);
  }
  .radio-subscribe {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 0.5px solid var(--color-level5);
    .radio-name {
      font-size: 16px;
      color: var(--color-level2);
      cursor: pointer;
      &:hover {
        color: var(--color-level1);
      }
    }
    .btn {
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      padding: 0 15px;
      font-size: 13px;
      color: var(--color-level2);
      border: 1px solid var(--color-level5);
      &:hover {
        background-color: var(--operation-btn-hover-bg-color);
      }
      .iconfont {
        vertical-align: bottom;
      }
    }
  }
  .info {
    height: 70px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-evenly;
    .info-item {
      width: 270px;
      font-size: 12px;
      line-height: 20px;
      height: 20px;
      color: var(--color-level2);
      .link {
        cursor: pointer;
        color: var(--link-color);
        &:hover {
          color: var(--link-hover-color);
        }
      }
    }
  }
  .program-desc {
    width: 90%;
    height: calc(100% - 190px);
    border-right: 1px solid var(--color-level5);
    line-height: 25px;
    font-size: 14px;
    color: var(--color-level3);
    margin-top: 10px;
    overflow: overlay;
    padding-right: 20px;
    .category {
      display: inline-block;
      font-size: 12px;
      padding: 0 2px;
      height: 15px;
      line-height: 15px;
      border: 1px solid var(--color-netease-red);
      color: var(--color-netease-red);
      border-radius: 2px;
      margin-right: 5px;
      cursor: pointer;
    }
  }
}
</style>
