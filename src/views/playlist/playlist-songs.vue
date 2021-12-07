<template>
  <div class="detail-song-list">
    <song-list-table
      v-if="loaded"
      :songList="songList"
      @play-song="handlePlaySong"
    >
    </song-list-table>
    <!-- <Loading :loading="loading"></Loading> -->
  </div>
</template>

<script>
  import { getPlaylistSongs } from '@/api/playlist.js'
  import SongListTable from '@/components/table/song-list-table'
  import { mapState } from 'vuex'
  // import Loading from '@/components/common/Loading'
  export default {
    components: {
      SongListTable,
      // Loading
    },
    data(){
      return {
        songList: null
      }
    },
    props:{
      id: {
        required: true
      }
    },
    computed: {
      ...mapState(['player']),
      loaded(){
        return this.songList
      }
    },
    methods:{
      handlePlaySong(trackId){
        this.player.playTrack(trackId, this.songList.map(song => song.id))
      },
      async getData(){
        const { songs } = await getPlaylistSongs({ id: this.id, limit: 5000})
        this.songList = songs
      }
    },
    created(){
      this.getData()
    }
  }
</script>

<style lang="scss" scoped>

</style>
