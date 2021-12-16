<template>
  <div class="page-mv">
    <div class="page-box">
      <container>
        <template v-slot:left>
          <div class="container-title">
            <router-link
              :to="{
                path: '/total-mv',
                query: { area: currentNewMVType, order: '最新' },
              }"
              tag="span"
              >最新MV</router-link
            >
          </div>
        </template>
        <template v-slot:right>
          <div class="newest-mv-nav">
            <span
              class="nav-item"
              v-for="item in type"
              :key="item"
              @click="changeNewMVType(item)"
              :class="{ active: item === currentNewMVType }"
            >
              {{ item }}
            </span>
          </div>
        </template>
        <template v-slot:content>
          <mv-item
            v-for="(mv, index) in newMVList"
            :mv="mv"
            :num="4"
            :index="index"
            :key="mv.id || index"
          />
        </template>
      </container>

      <container>
        <template v-slot:left>
          <div class="container-title">
            <router-link
              :to="{ path: '/total-mv', query: { order: '最热' } }"
              tag="span"
              >热播MV</router-link
            >
          </div>
        </template>
        <template v-slot:content>
          <mv-item
            v-for="(mv, index) in hotMVList"
            :mv="mv"
            :num="4"
            :index="index"
            :key="mv.id"
          />
        </template>
      </container>

      <container>
        <template v-slot:left>
          <div class="container-title">
            <router-link
              :to="{
                path: '/total-mv',
                query: { type: '网易出品', order: '最新' },
              }"
              tag="span"
              >网易出品</router-link
            >
          </div>
        </template>
        <template v-slot:content>
          <exclusive-item
            v-for="(mv, index) in exclusiveMVList"
            :exclusiveItem="mv"
            :num="4"
            :index="index"
            :key="mv.id"
          />
        </template>
      </container>

      <container>
        <template v-slot:left>
          <div class="container-title">
            <router-link to="/mv-toplist" tag="span">MV排行榜</router-link>
          </div>
        </template>
        <template v-slot:right>
          <div class="toplist-mv-nav">
            <span
              class="nav-item"
              v-for="item in type"
              :key="item"
              @click="changeMVToplistType(item)"
              :class="{ active: item === currentMVToplistType }"
            >
              {{ item }}
            </span>
          </div>
        </template>
        <template v-slot:content>
          <mv-chart-item
            v-for="(mv, index) in mvToplist"
            :key="mv.id || index"
            :num="2"
            :index="index"
            :mvItem="mv"
          />
        </template>
      </container>
    </div>
  </div>
</template>

<script>
import Container from "@/components/common/container";
import MvItem from "./components/mv-item";
import ExclusiveItem from "./components/exclusive-item";
import MvChartItem from "@/components/item/mv-chart-item";
import {
  getNewestMV,
  getAllMV,
  getExclusiveVideo,
  getMVToplist,
} from "@/api/video.js";
export default {
  components: {
    Container,
    MvItem,
    ExclusiveItem,
    MvChartItem,
  },
  data() {
    return {
      newMVList: [],
      exclusiveMVList: [],
      hotMVList: [],
      mvToplist: [],
      currentNewMVType: "内地",
      currentMVToplistType: "内地",
      type: ["内地", "港台", "欧美", "日本", "韩国"],
    };
  },
  computed: {},
  methods: {
    getNewestMVData() {
      getNewestMV(8, this.currentNewMVType).then(res => {
        this.newMVList = res.data;
      });
    },
    getMVToplistData() {
      getMVToplist(10, this.currentMVToplistType).then(res => {
        this.mvToplist = res.data;
      });
    },
    changeNewMVType(type) {
      this.currentNewMVType = type;
      this.getNewestMVData();
    },
    changeMVToplistType(type) {
      this.currentMVToplistType = type;
      this.getMVToplistData();
    },
  },
  created() {
    this.getNewestMVData();
    getExclusiveVideo(8).then(res => {
      this.exclusiveMVList = res.data;
    });

    getAllMV({ limit: 8, type: "最热" }).then(res => {
      this.hotMVList = res.data;
    });

    this.getMVToplistData();
  },
};
</script>

<style lang="scss" scoped>
.page-mv {
  height: 100%;
  overflow: overlay;
  .container-title {
    height: 50px;
    line-height: 50px;
    color: var(--color-level2);
    font-size: 18px;
    font-weight: bold;
    > span {
      cursor: pointer;
      &:hover {
        color: var(--color-level1);
      }
    }
  }

  .newest-mv-nav,
  .toplist-mv-nav {
    text-align: right;
    height: 50px;
    font-size: 14px;
    color: var(--color-level3);
    .nav-item {
      display: inline-block;
      line-height: 20px;
      margin: 15px 10px;
      cursor: pointer;
      &:hover {
        color: var(--color-level2);
      }
      &.active {
        color: var(--color-netease-red);
      }
    }
  }
}
</style>
