<template>
  <div class="radio-page">
    <div class="page-box">
      <template v-if="loaded">
        <!-- 轮播图 -->
        <slider :list="banners"></slider>
        <!-- TODO: 电台分类 -->
        <radio-category :radioCateList="radioCateList"></radio-category>
        <!-- 付费精品 -->
        <container>
          <template v-slot:left>
            <div class="container-title">
              <span class="link">付费精品</span>
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
              <span class="link" @click="toRadioCategory(cate)">{{
                cate.categoryName
              }}</span>
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
      <loading v-else />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Slider from "@/components/common/slider";
import Container from "@/components/common/container";
import FreeRadioItem from "./components/free-radio";
import PaidRadioItem from "./components/paid-radio";
import Loading from "@/components/common/loading";
import RadioCategory from "./components/radio-category.vue";
import { size_banner } from "@/utils/img-size.js";
import {
  getRadioBanner,
  getPaidRadio,
  getRecommendRadio,
  getRecommendRadioCate,
  getRadioList,
  getRadioCateList,
} from "@/api/dj-radio.js";

export default {
  data() {
    return {
      banners: [],
      radioCateList: [],
      recommendRadio: [],
      recommendRadioCate: [],
      radioNum: 0,
      paidRadios: [],
      loaded: false,
      scroller: null,
      scrollOptions: {
        scrollX: true,
      },
    };
  },
  components: {
    Container,
    RadioCategory,
    FreeRadioItem,
    PaidRadioItem,
    Slider,
    Loading,
  },
  methods: {
    getBannerCover(url) {
      return `${url}?param=${size_banner}`;
    },
    toRadioCategory(cate) {
      this.$router.push({
        path: "/radio-category",
        query: { category: cate.categoryName, id: cate.categoryId },
      });
    },
    async getData() {
      this.loaded = false;
      let res = await axios.all([
        getRadioBanner(),
        getRadioCateList(),
        getPaidRadio({ limit: 4 }),
        getRecommendRadio(),
        getRecommendRadioCate(),
      ]);
      // 获取轮播图数据
      this.banners = res[0].data.map(item => item.pic);
      // 获取电台分类数据
      this.radioCateList = [
        res[1].categories.slice(0, 8),
        res[1].categories.slice(8, 16),
        res[1].categories.slice(16),
      ];
      this.radioCateList[2].length = 8;

      // 获取付费精选电台
      this.paidRadios = res[2].data.list;
      // 获取电台个性推荐
      this.recommendRadio = res[3].data;
      // 获取电台推荐分类
      this.recommendRadioCate = res[4].data.slice(0, 6).map(item => ({
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
