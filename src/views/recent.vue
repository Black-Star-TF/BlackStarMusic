<template>
  <div class="view-recent">
    <page-header>
      <div class="page-name">最近播放</div>
    </page-header>
  </div>
</template>

<script>
import PageHeader from '@/components/common/page-header'
export default {
  mixins: [],
  components: {
    PageHeader
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
.page-name{
  height: 100%;
  line-height: inherit;
  font-size: 15px;
  font-weight: bold;
  color: var(--color-level2);
  padding-left: 25px;
}
</style>
