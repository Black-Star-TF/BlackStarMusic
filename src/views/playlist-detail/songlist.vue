<template>
  <div class="detail-song-list">
    <song-list-table
      v-if="loading"
      :songList="songList"
      @play-song="hanldlePlaySong"
    >
    </song-list-table>
    <!-- <Loading :loading="loading"></Loading> -->
  </div>
</template>

<script>
  import SongListTable from '@/components/table/song-list-table'
  import {mapState} from 'vuex'
  // import Loading from '@/components/common/Loading'
  export default {
    mixins: [],
    components: {
      SongListTable,
      // Loading
    },
    props:{
      songList: {
        type: Array,
        required: true
      }
    },
    computed: {
      ...mapState(['player']),
      loading(){
        return !!this.songList
      }
    },
    methods:{
      hanldlePlaySong(trackId){
        this.player.playTrack(trackId, this.songList.map(song=>song.id))
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
