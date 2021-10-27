<template>
  <div class="detail-song-list">
    <song-list-table
    v-if="loading"
    :songList="songList">
    </song-list-table>
    <!-- <Loading :loading="loading"></Loading> -->
  </div>
</template>

<script>
  import SongListTable from '@/components/table/song-list-table'
  import {getSongsDetail} from '@/api/music.js'
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
      loading(){
        return !!this.songList
      }
    },
    methods:{
      init(){
        let ids = []
        this.trackIds.forEach(item => {
          ids.push(item.id)
        })
        ids = ids.join(',')
        getSongsDetail(ids).then(res => {
          this.songList = res.songs
        })
      }
    },
    created () {
      this.init()
    },
    // watch:{
    //   $route(to,from){
    //     console.log(111);
    //     this.songList = null
    //     this.init()
    //   }
    // }
  }
</script>

<style lang="scss" scoped>

</style>
