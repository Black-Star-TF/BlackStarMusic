<template>
  <div class="view-newest-song">
    <container :left="16" :right="8">
      <template v-slot:left>
        <div class="tag-container">
          <span
            class="tag"
            :class="{ active: item.id == currentType }"
            v-for="item in type"
            @click="handleChange(item.id)"
            :key="item.id"
          >
            {{ item.name }}</span
          >
        </div>
      </template>
      <template v-slot:right>
        <div class="opration-container">
          <div class="opration-item play-all" @click="playAll">播放全部</div>
          <div class="opration-item collect-all" @click="likeAll">收藏全部</div>
        </div>
      </template>
      <template v-slot:content v-if="loaded">
        <!-- 新歌列表 -->
        <div style="width: 100%;margin-top:10px;">
          <newest-song-item
            v-for="(song, index) in songList"
            :index="index + 1"
            :key="song.id"
            :song="song"
          ></newest-song-item>
        </div>
      </template>
    </container>
    <div class="loading-wrapper">
      <loading v-if="!loaded" />
    </div>
  </div>
</template>

<script>
import Container from "@/components/common/container";
// import NewSongTable from '@/components/table/new-song-table'
import { getTopNewSong } from "@/api/music.js";
import NewestSongItem from "./components/newest-song-item.vue";
import Loading from "@/components/common/loading";
export default {
  name: "NewestSong",
  data() {
    return {
      songList: [],
      currentType: "0",
      type: [
        { id: "0", name: "全部" },
        { id: "7", name: "华语" },
        { id: "96", name: "欧美" },
        { id: "8", name: "日本" },
        { id: "16", name: "韩国" },
      ],
    };
  },
  components: {
    Container,
    // NewSongTable,
    NewestSongItem,
    Loading,
  },
  methods: {
    handleChange(type) {
      this.currentType = type;
      this.getData();
    },
    async getData() {
      this.songList = [];
      let res = await getTopNewSong(this.currentType);
      this.songList = res.data;
    },
    playAll() {
      console.log("播放全部");
    },
    likeAll() {
      console.log("收藏全部");
    },
  },
  computed: {
    loaded() {
      return this.songList.length > 0;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.view-newest-song {
  margin-top: 30px;
  .tag-container {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    > span.tag {
      display: inline-block;
      margin: 0 10px;
      color: var(--color-level3);
      cursor: pointer;
      &:hover {
        color: var(--color-level2);
      }
      &.active {
        font-weight: bold;
        color: var(--color-level1);
      }
    }
  }
  .opration-container {
    height: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 15px;
    .opration-item {
      font-size: 13px;
      height: 24px;
      line-height: 22px;
      padding: 0 15px;
      box-sizing: border-box;
      border-radius: 12px;
      margin: 0 5px;
      cursor: pointer;
      &.play-all {
        background-color: #e65d4c;
        color: #fff;
      }
      &.collect-all {
        color: #666;
        border: 1px solid #444;
        &:hover {
          background-color: rgba($color: #fff, $alpha: 0.1);
        }
      }
    }
  }
}

.loading-wrapper{
	margin-top: 30px;
}
</style>
