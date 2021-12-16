<template>
  <div class="view-privatefm">
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
    return {}
  },
  computed: {},
  methods: {},
  filters: {},
  created () {}
}
</script>

<style lang="scss" scoped>
.view-privatefm{
  height: 100%;
  padding: 30px 0;
  box-sizing: border-box;
  overflow: overlay;
}
</style>
