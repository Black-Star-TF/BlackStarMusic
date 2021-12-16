<template>
  <div class="detail-song-list">
    <song-list-table v-if="loaded" :songList="songList" @play-song="handlePlay">
    </song-list-table>
  </div>
</template>

<script>
import SongListTable from "@/components/table/song-list-table";
import { mapState } from "vuex";
export default {
  components: {
    SongListTable,
  },
  props: {
    songList: {
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
    handlePlay(trackId) {
      this.player.playTrackFromPlaylist(
        trackId,
        this.songList.map(song => song.id)
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
