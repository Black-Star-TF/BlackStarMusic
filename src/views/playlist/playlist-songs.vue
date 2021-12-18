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
import { getTrackFormatInfo } from "@/utils/methods";
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
    playlist: {
      type: Object,
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
    handlePlaySong(index) {
      const list = this.songList.map(song => getTrackFormatInfo(song, 'song', {
        type: 'playlist',
        info: {
          id: this.playlist.id,
          name: this.playlist.name
        }
      }));
      this.player.playTrackFromPlaylist(index, list);
    },
    async getData() {
      const { songs } = await getPlaylistSongs({ id: this.playlist.id, limit: 5000 });
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
