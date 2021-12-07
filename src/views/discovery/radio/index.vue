<template>
  <div class="radio-page">
    <page-box>
      <template v-if="loaded">
        <!-- 轮播图 -->
        <el-carousel :interval="4000" type="card" height="15vw">
          <el-carousel-item v-for="item in banner" width="50%" :key="item.id">
            <div
              class="banner-item"
              :style="{ backgroundImage: `url(${getBannerCover(item.pic)})` }"
            ></div>
          </el-carousel-item>
        </el-carousel>

        <!-- TODO: 电台分类 -->

        <!-- 付费精品 -->
        <container>
          <template v-slot:left>
            <div class="container-title">
              <router-link
                :to="{ path: '/radio', query: { name: '付费精品' } }"
                tag="span"
                class="link"
                >付费精品</router-link
              >
            </div>
          </template>
          <template v-slot:content>
            <paid-radio-item
              v-for="(radio, index) in paidRadios"
              :num="2"
              :radio="radio"
              :index="index"
              :margin="30"
              :key="radio.id"
            />
          </template>
        </container>

        <!-- 电台个性推荐 -->
        <container>
          <template v-slot:left>
            <div class="container-title">
              <span>电台个性推荐</span>
            </div>
          </template>
          <template v-slot:content>
            <free-radio-item
              v-for="(radio, index) in recommendRadio"
              :index="index"
              :num="6"
              :radio="radio"
              :key="radio.id"
            />
          </template>
        </container>

        <!-- 推荐电台列表 -->
        <container v-for="cate in recommendRadioCate" :key="cate.categoryId">
          <template v-slot:left>
            <div class="container-title">
              <router-link
                :to="{ path: '/radio', query: { category: cate.categoryName } }"
                tag="span"
                class="link"
                >{{ cate.categoryName }}</router-link
              >
            </div>
          </template>
          <template v-slot:content>
            <free-radio-item
              v-for="(radio, index) in cate.radios"
              :index="index"
              :num="6"
              :radio="radio"
              :key="radio.id"
            >
            </free-radio-item>
          </template>
        </container>
      </template>
    </page-box>
    <!-- <Loading :loading="loaded" /> -->
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Container from "@/components/common/container";
import FreeRadioItem from "./components/free-radio";
import PaidRadioItem from "./components/paid-radio";
import PageBox from "@/components/common/page-box";
// import Loading from '@/components/common/Loading'
import { size_banner } from "@/utils/img-size.js";
import {
  getRadioBanner,
  getPaidRadio,
  getRecommendRadio,
  getRecommendRadioCate,
  getRadioList,
} from "@/api/dj-radio.js";

export default {
  data() {
    return {
      banner: [],
      recommendRadio: [],
      recommendRadioCate: [],
      radioNum: 0,
      paidRadios: [],
      loaded: false,
    };
  },
  components: {
    Container,
    FreeRadioItem,
    PaidRadioItem,
    PageBox,
    // Loading
  },
  methods: {
    getBannerCover(url) {
      return `${url}?param=${size_banner}`;
    },
    async getData() {
      this.loaded = false;
      let res = await axios.all([
        getRadioBanner(),
        getPaidRadio({ limit: 4 }),
        getRecommendRadio(),
        getRecommendRadioCate(),
      ]);
      // 获取轮播图数据
      this.banner = res[0].data;
      // 获取付费精选电台
      this.paidRadios = res[1].data.list;
      // 获取电台个性推荐
      this.recommendRadio = res[2].data;
      // 获取电台推荐分类
      this.recommendRadioCate = res[3].data.slice(0, 6).map(item => ({
        categoryId: item.categoryId,
        categoryName: item.categoryName,
      }));
      let rList = await axios.all(
        this.recommendRadioCate.map(item =>
          getRadioList({ type: item.categoryId })
        )
      );
      for (let i = 0; i < this.recommendRadioCate.length; i++) {
        Vue.set(
          this.recommendRadioCate[i],
          "radios",
          rList[i].djRadios.slice(0, 6)
        );
      }
      this.loaded = true;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.radio-page {
  height: 100%;
  padding: 30px 0;
  box-sizing: border-box;
  overflow: overlay;
  .container-title {
    height: 50px;
    line-height: 50px;
    color: var(--color-level2);
    font-size: 18px;
    font-weight: bold;

    > span {
      cursor: default;

      &.link {
        cursor: pointer;

        &:hover {
          color: var(--color-level1);
        }
      }
    }
  }
}
</style>
