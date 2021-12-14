<template>
  <div class="view-recommend">
    <page-box>
      <template v-if="loaded">
        <!-- 轮播图 -->
        <slider :list="banners"></slider>
        <!-- 推荐歌单 -->
        <container>
          <template v-slot:left>
            <div class="container-title">
              <router-link to="playlist" tag="span">推荐歌单</router-link>
            </div>
          </template>
          <template v-slot:content>
            <playlist-item
              v-for="(playlist, index) in playlists"
              :playlistItem="playlist"
              :index="index"
              :num="5"
              :key="playlist.id"
            />
          </template>
        </container>

        <!-- 独家放送 -->
        <container>
          <template v-slot:left>
            <div class="container-title">
              <router-link to="/exclusive" tag="span">独家放送</router-link>
            </div>
          </template>
          <template v-slot:content>
            <exclusive-item
              v-for="(item, index) in exclusives"
              :exclusiveItem="item"
              :num="3"
              :index="index"
              :key="item.id"
            />
          </template>
        </container>

        <!-- 最新音乐 -->
        <container>
          <template v-slot:left>
            <div class="container-title">
              <router-link to="newest" tag="span">最新音乐</router-link>
            </div>
          </template>
          <template v-slot:content>
            <newest-song-item
              v-for="(item, index) in newestSongs"
              :newestSongItem="item"
              :num="2"
              :index="index"
              :key="item.id"
            />
          </template>
        </container>

        <!-- 推荐MV -->
        <container>
          <template v-slot:left>
            <div class="container-title">
              <router-link to="/shipin/mv" tag="span">推荐MV</router-link>
            </div>
          </template>
          <template v-slot:content>
            <mv-item
              v-for="(mv, index) in mvs"
              :mv="mv"
              :index="index"
              :key="mv.id"
            />
          </template>
        </container>
      </template>
      <loading v-else />
    </page-box>
  </div>
</template>

<script>
import Container from "@/components/common/container";
import PlaylistItem from "../playlist/components/playlist";
import ExclusiveItem from "@/views/shipin/mv/components/exclusive-item.vue";
import NewestSongItem from "./components/newest-song";
import MvItem from "@/views/shipin/mv/components/mv-item";
import PageBox from "@/components/common/page-box";
import Slider from "@/components/common/slider";
import Loading from "@/components/common/loading";
import axios from "axios";
import { getRecommendBanner, getrecommendNewestSong } from "@/api/music.js";
import { getRecommendPlaylist } from "@/api/playlist.js";
import { getRecommendExclusive, getRecommendMV } from "@/api/video.js";
import { size_banner } from "@/utils/img-size.js";

export default {
  data() {
    return {
      banners: [],
      playlists: [],
      exclusives: [],
      newestSongs: [],
      mvs: [],
      radios: [],
      loaded: false,
    };
  },
  components: {
    Slider,
    Container,
    PlaylistItem,
    ExclusiveItem,
    NewestSongItem,
    MvItem,
    PageBox,
    Loading,
  },
  methods: {
    getBannerCover(url) {
      return `${url}?param=${size_banner}`;
    },
    async getData() {
      this.loaded = false;
      let res = await axios.all([
        getRecommendBanner(),
        getRecommendPlaylist({ limit: 10 }),
        getRecommendExclusive(),
        getrecommendNewestSong(),
        getRecommendMV(),
      ]);
      // 获取轮播图数据
      this.banners = res[0].banners.map(item => item.imageUrl);
      // 获取推荐歌单数据
      this.playlists = res[1].result;
      // 获取独家放送数据
      this.exclusives = res[2].result;
      // 获取推荐最新歌曲
      this.newestSongs = res[3].result;
      // 获取推荐mv
      this.mvs = res[4].result;
      this.loaded = true;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.view-recommend {
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
    span {
      cursor: pointer;
      &:hover {
        color: var(--color-level1);
      }
    }
  }
}
</style>
