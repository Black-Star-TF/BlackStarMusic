<template>
  <div class="context-menu" ref="menu" @click.stop="close" :style="style">
    <component
      v-bind:is="currentComponent"
      :data="app.contextMenuOptions.data"
      @mounted="handleCpnMounted"
    ></component>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {
    PlaylistMenu: () =>
      import("@/components/context-menu/playlist-menu"),
    SongMenu: () => import("@/components/context-menu/song-menu"),
  },
  data() {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      currentComponent: "",
    };
  },
  computed: {
    ...mapState(["app"]),
    style() {
      return {
        top: `${this.y}px`,
        left: `${this.x}px`,
      };
    },
  },
  methods: {
    close() {
      this.$store.commit("updateApp", {
        key: "contextMenuVisible",
        value: false,
      });
      this.$store.commit("updateApp", {
        key: "contextMenuOptions",
        value: {},
      });
    },
    disableScroll(e) {
      e.preventDefault();
    },
    handleCpnMounted() {
      this.width = this.$el.offsetWidth;
      this.height = this.$el.offsetHeight;
      const doc = document.documentElement;
      if (this.x + this.width > doc.offsetWidth - 30) {
        this.x = this.x - this.width;
      }
      if (this.y + this.height > doc.offsetHeight - 30) {
        this.y = this.y - this.height;
      }
    },
  },
  created() {
    const { x, y, cpnName } = this.app.contextMenuOptions;
    this.currentComponent = cpnName || '';
    this.x = x || 0;
    this.y = y || 0;
  },
  mounted() {
    window.addEventListener("mousewheel", this.disableScroll, {
      passive: false,
    });
    window.addEventListener("click", this.close);
  },
  beforeDestroy() {
    window.removeEventListener("mousewheel", this.disableScroll);
    window.removeEventListener("click", this.close);
  },
};
</script>

<style lang="scss" scoped>
.context-menu {
  z-index: 500;
  position: absolute;
  border-radius: 5px;
  overflow: hidden;
  border: .5px solid var(--context-menu-border-color);
  background-color: var(--context-menu-bg-color);
  backdrop-filter: saturate(180%) blur(20px);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
