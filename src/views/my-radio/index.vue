<template>
  <div class="my-radio-wrapper">
    <page-header>
      <div class="page-name">我的电台</div>
    </page-header>
    <developing/>
  </div>
</template>

<script>
import PageHeader from '@/components/common/page-header'
import Developing from '@/components/common/developing'
export default {
  components: {
    PageHeader,
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
.my-radio-wrapper{
  height: 100%;
  overflow: overlay;
  padding: 0 20px;
  box-sizing: border-box;
  .page-name{
    height: 100%;
    line-height: inherit;
    font-size: 15px;
    font-weight: bold;
    color: var(--color-level2);
    padding-left: 25px;
  }
}
</style>
