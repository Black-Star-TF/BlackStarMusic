<template>
  <div class="detail-song-list">
    <song-list-table
      v-if="loaded"
      :songList="songList"
      @play-song="hanldlePlaySong"
    >
    </song-list-table>
    <!-- <Loading :loading="loading"></Loading> -->
  </div>
</template>

<script>
  import { getSongsDetail } from '@/api/music.js'
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
      trackIds: {
        type: Array,
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
      hanldlePlaySong(trackId){
        this.player.playTrack(trackId, this.trackIds)
      },
      async getData(){
        const { songs } = await getSongsDetail(this.trackIds.join(','))
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
