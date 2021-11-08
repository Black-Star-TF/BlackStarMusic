<template>
  <div class="app-aside">
    <!-- 用户 -->
    <div class="user">
      <template v-if="loginStatus">
        <!-- 登录后显示 -->
        <div class="avater" :style="{'backgroundImage': `url(${userProfile.avatarUrl})`}"  ></div>
        <span class="username">{{userProfile.nickname}}</span>
      </template>
      <template v-else>
        <!-- 未登录时显示 -->
        <div class="avater" @click="handleLogin">
          <span class="iconfont icon-icon"></span>
        </div>
        <span class="weidenglu" @click="handleLogin">未登录</span>
      </template>
    </div>
    <!-- 菜单 -->
    <router-link class="nav-item" to="/discovery" tag="div" active-class="active">
      <i class="iconfont icon-wangyiyunyinleclick"></i>发现音乐
    </router-link>
    <router-link class="nav-item" to="/privatefm" tag="div" active-class="active">
      <i class="iconfont icon-Sharingwuxianlanyagongxiang10"></i>私人FM
    </router-link>
    <router-link class="nav-item" to="/video" tag="div" active-class="active">
      <i class="iconfont icon-video"></i>视频
    </router-link>
    <router-link class="nav-item" to="/firend" tag="div" active-class="active">
      <i class="iconfont icon-friend" icon-friend></i>朋友
    </router-link>
    <!-- 我的音乐 -->
    <div class="group-name">我的音乐</div>
    <router-link class="nav-item" to="/download" tag="div" active-class="active">
      <i class="iconfont icon-xiazai" icon-friend></i>下载管理
    </router-link>
    <router-link class="nav-item" to="/recent" tag="div" active-class="active">
      <i class="iconfont icon-bendi-zuijinbofang" icon-friend></i>最近播放
    </router-link>
    <!-- 创建的歌单 -->
    <div class="group-name" @click="showCreated = !showCreated">创建的歌单</div>
    <div v-show="showCreated">
      <router-link 
        v-for="(playlist,index) in playlistsCreatedByMe"
        :key="playlist.id"
        class="nav-item" 
        :to="`/playlistdetail/${playlist.id}`" 
        tag="div"
        :class="{'active': isRouterActive(playlist.id)}"
      >
        <i class="iconfont icon-xihuan-kon" v-if="index == 0"></i>
        <i class="iconfont icon-gedan" v-else></i>
        {{index == 0 ? '我喜欢的音乐' :playlist.name}}
      </router-link>
    </div>
    <!-- 收藏的歌单 -->
    <div class="group-name" @click="showSubscribed = !showSubscribed">收藏的歌单</div>
    <div v-show="showSubscribed">
      <router-link 
        v-for="playlist in playlistsSubscribedByMe"
        :key="playlist.id"
        class="nav-item" 
        :to="`/playlistdetail/${playlist.id}`" 
        tag="div" 
        :class="{'active': isRouterActive(playlist.id)}"
      >
        <i class="iconfont icon-gedan"></i>{{playlist.name}}
      </router-link>
    </div>
    <!-- 登录页面 -->
    <login-dialog ref="loginDialog"></login-dialog>
  </div>
</template>

<script>
import LoginDialog from '@/components/login/login-dialog'
import {mapState} from 'vuex'
export default {
  components: {
    LoginDialog
  },
  data(){
    return {
      showCreated: false,
      showSubscribed: false
    }
  },
  computed: {
    ...mapState(['data']),
    loginStatus(){
      return this.data.loginStatus
    },
    userProfile(){
      return this.data.userProfile
    },
    playlistsCreatedByMe(){
      return this.data.playlistsCreatedByMe
    },
    playlistsSubscribedByMe(){
      return this.data.playlistsSubscribedByMe
    }
  },
  methods: {
    isRouterActive(id){
      return this.$route.fullPath.indexOf('/playlistdetail') !== -1 && this.$route.params.id == id
    },
    handleLogin(){
      this.$refs.loginDialog.visible = true
    }
  },
  created(){
    // console.log(this.data);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.app-aside{
  position: absolute;
  top: 0;
  bottom: var(--app-player-height);
  left: 0;
  width: var(--app-aside-width);
  background-color: var(--aside-bg-color);
  z-index: 100;
  overflow: overlay;
  .user{
    height: 60px;
    line-height: 60px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    .avater{
      cursor: pointer;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
      @include background;
      background-color: var(--avater-bg-color);
      .iconfont{
        font-size: 40px;
        color: var(--avater-color);
      }
    }
    .weidenglu{
      font-size: 14px;
      color: var(--color-level2);
    }
    .username{
      color: var(--color-level2);
    }
  }
  .nav-item{
    height: 36px;
    line-height: 36px;
    padding-left: 20px;
    font-size: 13.5px;
    color: var(--color-level2);
    cursor: pointer;
    @include ellipsis;
    &:hover{
      background-color: var(--aside-active-link-bg-color);
    }
    &.active{
      background-color: var(--aside-active-link-bg-color);
      color: var(--color-netease-red);
    }
    .iconfont{
      margin-right: 10px;
    }
  }
  .group-name{
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
    font-size: 13px;
    padding-left: 20px;
    color: var(--color-level4);
  }
}
</style>
