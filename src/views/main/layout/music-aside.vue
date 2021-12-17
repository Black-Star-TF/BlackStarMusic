<template>
  <div class="app-aside">
    <!-- 用户 -->
    <div class="user">
      <template v-if="loginStatus">
        <!-- 登录后显示 -->
        <div
          class="avatar"
          :style="{ backgroundImage: `url(${userProfile.avatarUrl})` }"
        ></div>
        <span class="username">{{ userProfile.nickname }}</span>
      </template>
      <template v-else>
        <!-- 未登录时显示 -->
        <div class="avatar" @click="handleLogin">
          <span class="iconfont icon-icon"></span>
        </div>
        <span class="weidenglu" @click="handleLogin">未登录</span>
      </template>
    </div>

    <div class="nav-wrapper">
      <!-- 菜单 -->
      <div
        class="nav-item"
        v-for="item in commonNavList"
        :key="item.path"
        @click="linkTo(item.path)"
        :class="{ active: isRouterActive(item.path) }"
      >
        <i class="iconfont" :class="item.icon"></i>{{ item.name }}
      </div>
      <!-- 我的音乐 -->
      <div class="group-name">我的音乐</div>
      <template v-for="item in myMusicNavList">
        <div
          v-if="!item.needLogin || data.loginStatus"
          class="nav-item"
          :key="item.path"
          @click="linkTo(item.path)"
          :class="{ active: isRouterActive(item.path) }"
        >
          <i class="iconfont" :class="item.icon"></i>{{ item.name }}
        </div>
      </template>
      <!-- 创建的歌单 -->
      <div class="group-name" @click="showCreated = !showCreated">
        <span class="iconfont icon-shouqi1" v-if="!showCreated"></span>
        <span class="iconfont icon-sanjiao1" v-else></span>
        创建的歌单
      </div>
      <div v-show="showCreated">
        <div
          class="nav-item"
          v-for="(playlist, index) in playlistsCreatedByMe"
          :key="playlist.id"
          @click="toPlaylistDetail(playlist.id)"
          :class="{ active: isRouterActive('/playlist', playlist.id) }"
        >
          <i class="iconfont icon-xihuan-kon" v-if="index == 0"></i>
          <i class="iconfont icon-gedan" v-else></i>
          {{ index == 0 ? "我喜欢的音乐" : playlist.name }}
        </div>
      </div>
      <!-- 收藏的歌单 -->
      <div class="group-name" @click="showSubscribed = !showSubscribed">
        <span class="iconfont icon-shouqi1" v-if="!showSubscribed"></span>
        <span class="iconfont icon-sanjiao1" v-else></span>
        收藏的歌单
      </div>
      <div v-show="showSubscribed">
        <div
          v-for="playlist in playlistsSubscribedByMe"
          :key="playlist.id"
          class="nav-item"
          @click="toPlaylistDetail(playlist.id)"
          :class="{ active: isRouterActive('/playlist', playlist.id) }"
        >
          <i class="iconfont icon-gedan"></i>{{ playlist.name }}
        </div>
      </div>
    </div>
    <!-- 登录页面 -->
    <login-dialog ref="loginDialog"></login-dialog>
  </div>
</template>

<script>
import { toPlaylistDetail } from "@/utils/methods";
import LoginDialog from "@/components/login/login-dialog";
import { mapState } from "vuex";
export default {
  components: {
    LoginDialog,
  },
  data() {
    return {
      showCreated: false,
      showSubscribed: false,
      commonNavList: [
        {
          path: "/discovery",
          name: "发现音乐",
          icon: "icon-wangyiyunyinleclick",
        },
        {
          path: "/private-fm",
          name: "私人FM",
          icon: "icon-Sharingwuxianlanyagongxiang10",
        },
        {
          path: "/shipin",
          name: "视频",
          icon: "icon-video",
        },
        {
          path: "/friend",
          name: "朋友",
          icon: "icon-friend",
        },
      ],
      myMusicNavList: [
        {
          path: "/download",
          name: "下载管理",
          icon: "icon-xiazai",
        },
        {
          path: "/recent",
          name: "最近播放",
          icon: "icon-bendi-zuijinbofang",
        },
        {
          path: "/cloud",
          name: "我的音乐云盘",
          icon: "icon-yun",
          needLogin: true,
        },
        {
          path: "/my-radio",
          name: "我的电台",
          icon: "icon-dianziyinyuan",
          needLogin: true,
        },
        {
          path: "/favorites",
          name: "我的收藏",
          icon: "icon-xingbiao",
          needLogin: true,
        },
      ],
    };
  },
  computed: {
    ...mapState(["data"]),
    loginStatus() {
      return this.data.loginStatus;
    },
    userProfile() {
      return this.data.userProfile;
    },
    playlistsCreatedByMe() {
      return this.data.playlistsCreatedByMe;
    },
    playlistsSubscribedByMe() {
      return this.data.playlistsSubscribedByMe;
    },
  },
  methods: {
    toPlaylistDetail,
    isRouterActive(path, id) {
      let isActive = this.$route.fullPath.startsWith(path);
      if (id) {
        isActive = isActive && this.$route.query.id == id;
      }
      return isActive;
    },
    linkTo(path) {
      this.$router.push(path);
    },
    handleLogin() {
      this.$refs.loginDialog.visible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.app-aside {
  width: var(--app-aside-width);
  background-color: var(--aside-bg-color);
  overflow: hidden;
  .nav-wrapper {
    height: calc(100% - 60px);
    overflow: hidden;
    padding-right: 10px;
    // 鼠标移入时，显示滚动条，鼠标移出时隐藏滚动条
    &:hover {
      overflow: overlay;
    }
  }
  .user {
    height: 60px;
    line-height: 60px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    .avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
      @include background;
      background-color: var(--avatar-bg-color);
      .iconfont {
        font-size: 40px;
        color: var(--avatar-color);
      }
    }
    .weidenglu {
      font-size: 14px;
      color: var(--color-level2);
    }
    .username {
      color: var(--color-level2);
    }
  }
  .nav-item {
    height: 36px;
    line-height: 36px;
    padding-left: 20px;
    font-size: 13.5px;
    color: var(--color-level2);
    cursor: pointer;
    @include ellipsis;
    &:hover {
      background-color: var(--aside-active-link-bg-color);
    }
    &.active {
      background-color: var(--aside-active-link-bg-color);
      color: var(--color-netease-red);
    }
    .iconfont {
      margin-right: 10px;
    }
  }
  .group-name {
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
    font-size: 13px;
    padding-left: 20px;
    color: var(--color-level4);
    &:hover {
      .iconfont {
        color: var(--color-level3);
      }
    }
    .iconfont {
      font-size: 12px;
    }
  }
}
</style>
