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
import {getSongsDetail} from '@/api/music.js'
import SongListTable from '@/components/table/song-list-table'
import { mapState } from 'vuex'
// import Loading from '@/components/common/Loading'
export default {
  mixins: [],
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
      return this.trackIds.length > 0 && this.songList
    }
  },
  methods:{
    handlePlaySong(trackId){
      this.player.playTrack(trackId, this.trackIds)
    },
    async getData(){
      this.songList = null
      let { songs } = await getSongsDetail(this.trackIds.join(','))
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
