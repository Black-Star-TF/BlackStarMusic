<template>
  <div class="detail-song-list">
    <song-list-table
      v-if="loaded"
      :songList="songList"
      @play-song="handlePlaySong"
      @showContextMenu="handleShowContextMenu"
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
import { getTrackFormatInfo, openContextMenu } from "@/utils/methods";
import RESOURCE_TYPE from "@/utils/resource-type";
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
    list(){
      return this.songList.map(song => getTrackFormatInfo(song, RESOURCE_TYPE.SONG , {
        type: 'playlist',
        info: {
          id: this.playlist.id,
          name: this.playlist.name
        }
      }));
    }
  },
  methods: {
    openContextMenu,
    handlePlaySong(index) {
      this.player.playTrackFromPlaylist(index, this.list);
    },
    handleShowContextMenu({index, e}){
      this.openContextMenu(e, 'songMenu', { index, list: this.list, song: this.songList[index]})
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
