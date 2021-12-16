<template>
  <div class="detail-song-list">
    <song-list-table
      v-if="loaded"
      :songList="songList"
      @play-song="handlePlaySong"
    >
    </song-list-table>
    <div class="loading-wrapper">
      <loading v-if="!loaded" />
    </div>
  </div>
</template>

<script>
import { getPlaylistSongs } from "@/api/playlist.js";
import SongListTable from "@/components/table/song-list-table";
import { mapState } from "vuex";
import Loading from "@/components/common/loading";
export default {
  components: {
    SongListTable,
    Loading,
  },
  data() {
    return {
      songList: null,
    };
  },
  props: {
    id: {
      required: true,
    },
  },
  computed: {
    ...mapState(["player"]),
    loaded() {
      return this.songList;
    },
  },
  methods: {
    handlePlaySong(trackId) {
      this.player.playTrackFromPlaylist(
        trackId,
        this.songList.map(song => song.id)
      );
    },
    async getData() {
      const { songs } = await getPlaylistSongs({ id: this.id, limit: 5000 });
      this.songList = songs;
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.loading-wrapper {
  margin-top: 30px;
}
</style>
