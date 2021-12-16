<template>
  <div class="album-description">
    <div class="title">专辑介绍</div>
    <div class="content">{{ description }}</div>
  </div>
</template>

<script>
export default {
  name: "",
  mixins: [],
  components: {},
  props: {
    description: String,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  filters: {},
  created() {},
};
</script>

<style lang="scss" scoped>
.album-description {
  padding: 0 30px;
  .title {
    height: 20px;
    line-height: 20px;
    font-size: 15px;
    font-weight: bold;
    color: var(--color-level2);
    margin: 15px 0;
  }
  .content {
    font-size: 13.5px;
    line-height: 24px;
    white-space: pre-wrap;
    color: var(--color-level3);
  }
}
</style>
