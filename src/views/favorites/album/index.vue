<template>
  <div class="favorite-album-wrapper">
    <container>
      <template v-slot:left>
        <div class="title">
          收藏的专辑 <span class="count">({{ count }})</span>
        </div>
      </template>
      <template v-slot:right></template>
      <template v-slot:content>
        <album-item 
          v-for="album in albums"
          :key="album.id"
          :album="album"
        />
      </template>
    </container>
  </div>
</template>

<script>
import { getFavoritesAlbum } from '@/api/auth'
import AlbumItem from './components/album-item.vue'
import Container from "@/components/common/container";
export default {
  components: {
    AlbumItem,
    Container,
    Container
  },
  data () {
    return {
      albums: [],
      pageSize: 20,
      pageNo: 1,
      hasMore: false,
      count: 0
    }
  },
  computed: {
    offset(){
      return (this.pageNo - 1) * this.pageSize
    }
  },
  methods: {
    async getData(){
      const { data, count, hasMore } = await getFavoritesAlbum({
        limit: this.pageSize,
        offset: this.offset
      })
      this.albums = this.albums.concat(data)
      this.hasMore = hasMore
      this.count = count
    }
  },
  filters: {},
  created () {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.favorite-album-wrapper{
  padding: 20px 30px;
  height: 100%;
  overflow: overlay;
  .title{
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
    font-size: 15px;
    color: var(--color-level2);
    font-weight: bold;
    .count{
      font-size: 12px;
      color: var(--color-level3);
      font-weight: normal;
    }
  }
}
</style>
