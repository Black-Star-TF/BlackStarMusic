<template>
  <div class="similar-singer-wrapper">
    <simi-singer-item
      v-for="(singer, index) in simiSingers"
      :key="singer.id" 
      :singer="singer"
      :index="index"
      :num="5"
    />
  </div>
</template>

<script>
import { getSimiSingers } from '@/api/singer.js'
import SimiSingerItem from './components/simi-singer-item.vue'
export default {
  components: {
    SimiSingerItem
  },
  data () {
    return {
      simiSingers: []
    }
  },
  props:{
    id: {
      required: true
    }
  },
  methods: {
    async getData(){
      const { artists } = await getSimiSingers({ id: this.id })
      this.simiSingers = artists
      console.log(111);
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.similar-singer-wrapper{
  padding: 0 30px;
  padding-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
</style>
