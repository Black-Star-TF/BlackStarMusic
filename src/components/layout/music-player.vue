<template>
  <div class="app-footer">

  </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  components: {},
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
.app-footer{
  height: var(--app-player-height);
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  box-sizing: border-box;
  background-color: var(--footer-bg-color);
  z-index: 102;
  border-top: 2px solid var(--footer-bd-color);
}
</style>
