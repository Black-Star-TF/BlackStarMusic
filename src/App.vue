<template>
  <div id="app">
    <!-- header -->
    <music-header
      :keywords.sync="keywords"
      @search="handleSearch"
    ></music-header>
    <router-view />

    <!-- 歌曲详情 -->
    <transition name="move">
      <song-detail
        v-if="app.songDetailVisible"
        :songId="currentSong.id"
      ></song-detail>
    </transition>

    <transition name="drawer">
      <playlist-drawer v-if="app.playlistDrawerVisible"></playlist-drawer>
    </transition>

    <transition name="drawer">
      <message-drawer v-if="app.messageDrawerVisible"></message-drawer>
    </transition>

    <transition name="drawer">
      <search-drawer
        v-if="app.searchDrawerVisible"
        :keywords.sync="keywords"
        @search="handleSearch"
      ></search-drawer>
    </transition>

    <context-menu v-if="app.contextMenuVisible"></context-menu>

    <!-- 播放列表 -->
  </div>
</template>

<script>
import MusicHeader from "@/views/main/layout/music-header.vue";
import SongDetail from "@/views/main/drawer/song-detail.vue";
import PlaylistDrawer from "@/views/main/drawer/playlist-drawer";
import MessageDrawer from "@/views/main/drawer/message-drawer";
import SearchDrawer from "@/views/main/drawer/search-drawer";
import ContextMenu from '@/components/common/context-menu'
import { mapState, mapMutations } from "vuex";
import { search } from "@/utils/methods";
export default {
  name: "App",
  components: {
    MusicHeader,
    SongDetail,
    PlaylistDrawer,
    MessageDrawer,
    SearchDrawer,
    ContextMenu
  },
  data() {
    return {
      songDetailVisible: false,
      keywords: "",
    };
  },
  computed: {
    ...mapState(["player", "app", "data"]),
    currentSong() {
      return this.player.currentTrack;
    },
  },
  methods: {
    ...mapMutations(["updateApp", "updateData"]),
    search,
    handleInput(keywords) {
      this.keywords = keywords;
    },
    handleSearch(keywords) {
      this.keywords = keywords;
      const temp = this.data.searchRecords.filter(
        item => item !== this.keywords
      );
      this.updateData({
        key: "searchRecords",
        value: [this.keywords, ...temp],
      });
      // 关闭搜索提示框
      this.updateApp({ key: "searchDrawerVisible", value: false });
      this.search(this.keywords);
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  min-width: var(--min-width);
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  cursor: default;
  // 禁止文字被鼠标选中
  -webkit-user-select: none;
  user-select: none;
}

.move-enter,
.move-leave-to {
  top: calc(100vh - var(--app-player-height));
}

.move-enter-active,
.move-leave-active {
  transition: top 0.4s ease-in-out;
}

.move-enter-to,
.move-leave {
  top: var(--app-header-height);
}

.drawer-enter,
.drawer-leave-to {
  right: calc(var(--app-drawer-width) * -1);
}

.drawer-enter-active,
.drawer-leave-active {
  transition: right 0.1s ease-in-out;
}

.drawer-enter-to,
.drawer-leave {
  right: 0;
}
</style>
