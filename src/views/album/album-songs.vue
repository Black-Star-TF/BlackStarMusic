<template>
  <div class="detail-song-list">
    <song-list-table :songList="songList" @play-song="handlePlay">
    </song-list-table>
  </div>
</template>

<script>
import SongListTable from "@/components/table/song-list-table";
export default {
  components: {
    SongListTable,
  },
  props: {
    songList: {
      required: true,
    },
  },
  methods: {
    handlePlay(index) {
      this.$emit("play", index);
    },
  },
};
</script>

<style lang="scss" scoped></style>
