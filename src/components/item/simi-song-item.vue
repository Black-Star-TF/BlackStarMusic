<template>
  <div class="simi-song-item" @click="playSong">
    <img :src="coverUrl" class="song-cover" />
    <div class="song-info">
      <div class="song-name">{{ song.name }}</div>
      <div class="song-artist">
        {{ song.artists[0].name }}
      </div>
    </div>
  </div>
</template>

<script>
import { size_1v1_small } from "@/utils/img-size.js";
export default {
  props: {
    song: {
      required: true,
      type: Object,
    },
  },
  computed: {
    coverUrl() {
      return `${this.song.album.blurPicUrl}?param=${size_1v1_small}`;
    },
  },
  methods: {
    playSong() {
      this.$store.state.player.playTrack(this.song.id, true);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.simi-song-item {
  height: 60px;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  border-radius: 5px;
  &:hover {
    background-color: var(--table-hover-color);
  }
  .song-cover {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    display: inline-block;
    background-color: #fff;
    margin-right: 10px;
  }
  .song-info {
    flex: 1;
    height: 50px;
    .song-name {
      font-size: 14px;
      height: 25px;
      line-height: 25px;
      @include ellipsis;
      color: var(--color-level2);
    }
    .song-artist {
      font-size: 13px;
      @include ellipsis;
      color: var(--color-level4);
    }
  }
}
</style>
