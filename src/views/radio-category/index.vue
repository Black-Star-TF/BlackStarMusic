<template>
  <div class="view-radio-category">
    <developing/>
  </div>
</template>

<script>
import Developing from '@/components/common/developing'
export default {
  components: {
    Developing
  },
  data () {
    return {
      title: '',
      id: null
    }
  },
  computed: {},
  methods: {},
  filters: {},
  created () {
    const { id, name } = this.$route.query
    this.title = name
    this.id = id
  }
}
</script>

<style lang="scss" scoped>
.view-radio-category{
  height: 100%;
  padding: 30px 0;
  box-sizing: border-box;
  overflow: overlay;
}
</style>
