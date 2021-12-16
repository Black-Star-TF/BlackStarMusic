<template>
  <div class="message-drawer" @click.stop></div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "",
  mixins: [],
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    ...mapMutations(["updateApp"]),
    close() {
      this.updateApp({ key: "messageDrawerVisible", value: false });
    },
  },
  filters: {},
  created() {},
  mounted() {
    const app = document.getElementById("app");
    app.addEventListener("click", this.close);
  },
  beforeDestroy() {
    const app = document.getElementById("app");
    app.removeEventListener("click", this.close);
  },
};
</script>

<style lang="scss" scoped>
.message-drawer {
  position: absolute;
  width: var(--app-drawer-width);
  top: var(--app-header-height);
  bottom: var(--app-player-height);
  right: 0;
  background-color: var(--panel-box-bg-color);
  z-index: 200;
  box-shadow: -8px 0 10px -5px rgb(0 0 0 / 20%);
}
</style>
