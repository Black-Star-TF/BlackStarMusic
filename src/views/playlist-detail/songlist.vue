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
  import {getSongsDetail} from '@/api/music.js'
  import {mapState} from 'vuex'
  // import Loading from '@/components/common/Loading'
  export default {
    mixins: [],
    components: {
      SongListTable,
      // Loading
    },
    data () {
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
      loading(){
        return !!this.songList
      }
    },
    methods:{
      hanldlePlaySong(trackId){
        this.player.playSongOfPlaylist(this.trackIds,trackId)
      },
      init(){
        let ids = this.trackIds.join(',')
        getSongsDetail(ids).then(res => {
          this.songList = res.songs
        })
      }
    },
    created () {
      this.init()
    }
  }
</script>

<style lang="scss" scoped>

</style>
