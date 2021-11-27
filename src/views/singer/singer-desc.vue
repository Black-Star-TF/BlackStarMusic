<template>
  <div class="singer-desc-wrapper">
    <div class="info-item" v-for="item in desc" :key="item.title">
      <div class="info-name">{{item.title}}</div>
      <div class="info-content">
        <p class="paragraph" v-for="(p, index) in item.content" :key="index">{{p}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getSingerDesc } from '@/api/singer.js'
export default {
  data () {
    return {
      desc: []
    }
  },
  props:{
    id: {
      required: true
    }
  },
  methods: {
    async getData(){
      const { introduction, briefDesc } = await getSingerDesc({ id: this.id })
      let desc = introduction.map(item => {
        return {
          title: item.ti,
          content: item.txt.split('\n')
        }
      })
      this.desc = [
        {
          title: '简介',
          content: [briefDesc.trim()]
        },
        ...desc
      ]
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.singer-desc-wrapper{
  padding: 0 30px;
  padding-top: 10px;
  display: flex;
  flex-wrap: wrap;
  .info-item{
    .info-name{
      height: 40px;
      line-height: 40px;
      font-size: 14.5px;
      font-weight: bold;
      color: var(--color-level2);
    }
    .info-content{
      white-space: pre-wrap;
      font-size: 13px;
      line-height: 22px;
      color: var(--color-level4);
      p{
        margin-bottom: 20px;
      }
    }
  }
}
</style>
