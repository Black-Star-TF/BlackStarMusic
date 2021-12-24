<template>
  <div class="relative-music-wrapper">
    <div class="title" v-if="simiPlaylists.length > 0">
      包含这首歌的歌单
    </div>
    <simi-playlist-item
      v-for="playlist in simiPlaylists"
      :key="playlist.id"
      :playlist="playlist"
    ></simi-playlist-item>
    <br />
    <div class="title" v-if="simiSongList.length > 0">相似歌曲</div>
    <simi-song-item
      v-for="song in simiSongList"
      :key="song.id"
      :song="song"
    ></simi-song-item>
  </div>
</template>

<script>
import { getSimiPlaylists, getSimiSongs } from "@/api/music";
import SimiPlaylistItem from "./simi-playlist-item";
import SimiSongItem from "./simi-song-item";
export default {
  components: {
    SimiPlaylistItem,
    SimiSongItem,
  },
  props: {
    id: {
      required: true,
    },
  },
  data() {
    return {
      simiPlaylists: [],
      simiSongList: [],
    };
  },
  computed: {},
  methods: {
    async getData() {
      // 获取相似歌单
      const { playlists } = await getSimiPlaylists({
        id: this.id,
      });
      this.simiPlaylists = playlists;
      // 获取相似歌曲
      const { songs: songList } = await getSimiSongs({
        id: this.id,
      });
      this.simiSongList = songList;
    },
  },
  filters: {},
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.relative-music-wrapper {
  flex: 1;
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    font-weight: bold;
    color: var(--color-level2);
  }
}
</style>
