<template>
  <div class="app-header">
    <div class="left-nav">
      <span class="iconfont icon-changyong_fanhui" title="后退" @click="$router.go(-1)"></span>
      <span class="iconfont icon-changyong_gengduo" title="前进" @click="$router.go(1)"></span>
    </div>
    <div class="right-operation">
      <!-- 搜索框 -->
      <el-input class="input" text="text" prefix-icon="el-icon-search" clearable v-model="queryKeyword" @keyup.enter.native="search"></el-input>
      <!-- 设置 -->
      <span class="settings iconfont icon-shezhi" @click="toSettings" :class="{'router-active': routerActive}"></span>
      <!-- 消息 -->
      <span class="iconfont icon-duanxin"></span>
      <!-- 主题 -->
      <el-popover
        placement="bottom"
        width="150"
        popper-class="pifu-popover"
        trigger="hover">
        <div class="pifu-selector">
          <div class="pifu-item light" @click="changeTheme('light')">
            <span class="color">
              <i class="iconfont" :class="setIcon('light')"></i>
            </span>
            <span class="name">浅色</span>
          </div>
          <div class="pifu-item red" @click="changeTheme('red')">
            <span class="color">
              <i class="iconfont" :class="setIcon('red')"></i>
            </span>
            <span class="name">红色</span>
          </div>
          <div class="pifu-item dark" @click="changeTheme('dark')">
            <span class="color">
              <i class="iconfont" :class="setIcon('dark')"></i>
            </span>
            <span class="name">深色</span>
          </div>
        </div>
        <span slot="reference" class="iconfont icon-pifu" ></span>
      </el-popover>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {changeTheme} from '@/utils/common'
export default {
  data(){
    return {
      queryKeyword: ''
    }
  },
  computed: {
    ...mapState(['settings']),
    theme(){
      return this.$store.state.settings.theme
    },
    routerActive(){
      return this.$route.path == '/settings'
    }
  },
  methods: {
    changeTheme(value){
      this.$store.commit('updateSettings',{key: 'theme', value })
      changeTheme(value)
    },
    setIcon(theme){
      return theme == this.theme ? 'icon-wancheng' : ''
    },
    search(){
      if(this.queryKeyword !== ''){
        this.$router.push({
          path: '/search',
          query: {
            keyword: this.queryKeyword,
            type: this.$route.query.type || 1
          }
        })
      }
    },
    toSettings(){
      this.$router.push('/settings')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header{
  height: var(--app-header-height);
  top: 0;
  left: 0;
  width: 100%;
  background: var(--header-bg-color);
  z-index: 100;
  position: absolute;
  // 毛玻璃效果
  // backdrop-filter: saturate(180%) blur(20px);
  color: var(--header-color-level3);
  display: flex;
  justify-content: space-between;
  line-height: var(--app-header-height);
  .left-nav{
    height: 100%;
    line-height: 100%;
    width: var(--app-aside-width);
    line-height: inherit;
    background-color: var(--header-left-bg-color);
    text-align: right;
    .iconfont{
      display: inline-block;
      margin-right: 20px;
      font-size: 14px;
      cursor: pointer;
      color: var(--header-nav-color);
      font-weight: 100;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 50%;
      &:hover{
        background-color: var(--color-level5);
      }
      &::before{
        position: relative;
        left: -2px;
      }
    }
  }
  .right-operation{
    height: 100%;
    width: 300px;
    line-height: inherit;
    .iconfont{
      margin: 0 10px;
      font-size: 20px;
    }
    .settings{
      &.router-active{
        color: var(--color-netease-red)
      }
    }
    .input{
      width: 150px;
      top: -2px;
      margin-right: 20px;
      color: var(--search-text-color);
      ::v-deep.el-input__inner{
        color: var(--search-text-color);
        height: 26px;
        border-radius: 13px;
        background: var(--search-bg-color);
        border: none;
      }
    }
  }
}

.pifu-selector{
  height: 60px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--panel-box-bg-color);
  border-radius: 5px;
  .pifu-item{
    width: 30px;
    text-align: center;
    &.light{
      .color{
        background-color: #eee;
        color: var(--color-netease-red);
      }
    }
    &.red{
      .color{
        background-color: var(--color-netease-red);
        color: #fff;
      }
    }
    &.dark{
      .color{
        background-color: #000;
        color: #fff;
      }
    }
    span{
      display: inline-block;
      width: 100%;
      &.color{
        width: 20px;
        height: 20px;
        margin: 0 5px;
        border-radius: 50%;
        vertical-align:middle;
      }
      &.name{
        font-size: 12px;
      }
    }
  }
}
</style>

<style lang="scss">
.pifu-popover.el-popper[x-placement^=bottom]{
  margin-top: calc(10px + (var(--app-header-height) - 40px) / 2);
  >div.popper__arrow{
    &::after{
      border-bottom-color: var(--panel-box-bg-color);
    }
  }
}
</style>
