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

    <div class="nav-wrapper">
      <!-- 菜单 -->
      <router-link class="nav-item" to="/discovery" tag="div" active-class="active">
        <i class="iconfont icon-wangyiyunyinleclick"></i>发现音乐
      </router-link>
      <router-link class="nav-item" to="/private-fm" tag="div" active-class="active">
        <i class="iconfont icon-Sharingwuxianlanyagongxiang10"></i>私人FM
      </router-link>
      <router-link class="nav-item" to="/shipin" tag="div" active-class="active">
        <i class="iconfont icon-video"></i>视频
      </router-link>
      <router-link class="nav-item" to="/friend" tag="div" active-class="active">
        <i class="iconfont icon-friend"></i>朋友
      </router-link>
    <!-- 我的音乐 -->
      <div class="group-name">我的音乐</div>
      <router-link class="nav-item" to="/download" tag="div" active-class="active">
        <i class="iconfont icon-xiazai"></i>下载管理
      </router-link>
      <router-link class="nav-item" to="/recent" tag="div" active-class="active">
        <i class="iconfont icon-bendi-zuijinbofang" ></i>最近播放
      </router-link>
      <router-link class="nav-item" to="/clound" tag="div" active-class="active" v-if="data.loginStatus">
        <i class="iconfont icon-yun"></i>我的音乐云盘
      </router-link>
      <router-link class="nav-item" to="/my-radio" tag="div" active-class="active" v-if="data.loginStatus">
        <i class="iconfont icon-dianziyinyuan"></i>我的电台
      </router-link>
      <router-link class="nav-item" to="/favorites" tag="div" active-class="active" v-if="data.loginStatus">
        <i class="iconfont icon-xingbiao"></i>我的收藏
      </router-link>
      <!-- 创建的歌单 -->
      <div class="group-name" @click="showCreated = !showCreated">
        <span class="iconfont icon-shouqi1" v-if="!showCreated"></span>
        <span class="iconfont icon-sanjiao1" v-else></span>
        创建的歌单
      </div>
      <div v-show="showCreated">
        <router-link 
          v-for="(playlist,index) in playlistsCreatedByMe"
          :key="playlist.id"
          class="nav-item" 
          :to="{path: '/playlist', query: { id: playlist.id } }" 
          tag="div"
          :class="{'active': isRouterActive(playlist.id)}"
        >
          <i class="iconfont icon-xihuan-kon" v-if="index == 0"></i>
          <i class="iconfont icon-gedan" v-else></i>
          {{index == 0 ? '我喜欢的音乐' :playlist.name}}
        </router-link>
      </div>
      <!-- 收藏的歌单 -->
      <div class="group-name" @click="showSubscribed = !showSubscribed">
        <span class="iconfont icon-shouqi1" v-if="!showSubscribed"></span>
        <span class="iconfont icon-sanjiao1" v-else></span>
        收藏的歌单
      </div>
      <div v-show="showSubscribed">
        <router-link 
          v-for="playlist in playlistsSubscribedByMe"
          :key="playlist.id"
          class="nav-item" 
          :to="{path: '/playlist', query: { id: playlist.id } }" 
          tag="div" 
          :class="{'active': isRouterActive(playlist.id)}"
        >
          <i class="iconfont icon-gedan"></i>{{playlist.name}}
        </router-link>
      </div>
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
  overflow: hidden;
  
  .nav-wrapper{
    height: calc(100% - 60px);
    overflow: hidden;
    padding-right: 10px;
    // 鼠标移入时，显示滚动条，鼠标移出时隐藏滚动条
    // &::-webkit-scrollbar{
    //   opacity: 0;
    // }
    // &:hover::-webkit-scrollbar{
    //   opacity: 1;
    // }
    &:hover{
      overflow: overlay;
    }
  }
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
    &:hover{
      .iconfont{
        color: var(--color-level3);
      }
    }
    .iconfont{
      font-size: 12px;
    }
  }
}
</style>
