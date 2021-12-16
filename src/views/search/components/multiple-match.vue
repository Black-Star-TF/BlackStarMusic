<template>
  <div class="multiple-match-container">
    <div class="title">最佳匹配</div>

    <!-- 歌手 -->
    <template v-if="result.artist">
      <div
        class="multiple-match-item artist"
        @click="toArtistDetail(result.artist[0].id)"
      >
        <img :src="result.artist[0].img1v1Url" class="cover" />
        <span
          >歌手：{{ result.artist[0].name }}
          <span class="alias" v-if="result.artist[0].alias.length > 0"
            >({{ result.artist[0].alias[0] }})</span
          ></span
        >
      </div>
    </template>
    <!-- 用户 -->
    <template v-if="result.user">
      <div
        class="multiple-match-item user"
        @click="toUserDetail(result.user[0].userId)"
      >
        <img :src="result.user[0].avatarUrl" class="cover" />
        <span>用户：{{ result.user[0].nickname }}</span>
      </div>
    </template>

    <!-- 专辑 -->
    <template v-if="result.album">
      <div
        class="multiple-match-item album"
        @click="toAlbumDetail(result.album[0].id)"
      >
        <img :src="result.album[0].picUrl" class="cover" />
        <span class="album-name">专辑：{{ result.album[0].name }}</span>
        <span class="album-artist-name">{{ result.album[0].artist.name }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import { toArtistDetail, toAlbumDetail } from "@/utils/methods";
export default {
  components: {},
  data() {
    return {};
  },
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
  computed: {},
  methods: {
    toArtistDetail,
    toAlbumDetail,
  },
  filters: {},
  created() {},
};
</script>

<style lang="scss" scoped>
.multiple-match-container {
  display: flex;
  flex-wrap: wrap;
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    margin-top: 15px;
    background-color: var(--color-level5);
  }
  .title {
    width: 100%;
    font-size: 13px;
    margin-bottom: 10px;
    color: var(--color-level3);
  }
  .multiple-match-item {
    height: 80px;
    width: 375px;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: var(--color-level2);
    &:nth-of-type(2n) {
      margin-right: 20px;
    }
    background-color: var(--table-stripe-color);
    &:hover {
      background-color: var(--table-hover-color);
    }
    .cover {
      width: 80px;
      height: 80px;
      margin-right: 10px;
    }
    &.artist {
      .alias {
        color: var(--color-level4);
      }
    }
    &.user {
    }
    &.album {
      .album-artist-name {
        color: var(--color-level4);
        margin-left: 10px;
      }
    }
  }
}
</style>
