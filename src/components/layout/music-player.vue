<template>
  <div class="app-footer">
    <vue-slider 
      v-model="value"
      :min="0"
      :max="360"
      :dotSize="5"
      :height="2"
      :interval="1"
      :duration="0"
      tooltip="none"
      :lazy="true"
      :drag-on-click="true"
    ></vue-slider>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
export default {
  mixins: [],
  components: {
    VueSlider
  },
  data () {
    return {
      value: 1,
      
    }
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
