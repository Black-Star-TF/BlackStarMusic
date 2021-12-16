<template>
  <div class="login-use-qr">
    <h1 class="title">扫码登录</h1>
    <div class="qr-container">
      <img class="qr" :src="qrUrl" />
      <div class="mask" v-if="!qrValid">
        <div class="tip">二维码已失效</div>
        <div class="btn" @click="refreshQR">点击刷新</div>
      </div>
    </div>

    <div class="tip">
      使用<a href="https://music.163.com/#/download" target="_blank"
        >网易云音乐APP</a
      >扫码登录
    </div>
    <div class="more" @click="changeLoginType">
      选择其他登录方式<span class="iconfont icon-dayu"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mixins: [],
  components: {},
  data() {
    return {};
  },
  props: {
    qrUrl: {
      type: String,
      require: true,
    },
    qrValid: {
      type: Boolean,
      require: true,
    },
  },
  computed: {},
  methods: {
    changeLoginType() {
      this.$emit("change-login-type");
    },
    refreshQR() {
      this.$emit("refresh-qr");
    },
  },
  filters: {},
  created() {},
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.login-use-qr {
  position: absolute;
  width: 200px;
  height: 300px;
  top: calc(50% - 180px);
  left: calc(50% - 100px);
  text-align: center;
  color: #000;
  .qr-container {
    width: 200px;
    height: 200px;
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;
    .qr {
      width: 100%;
      height: 100%;
    }
    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.75);
      div {
        width: 100%;
        line-height: 30px;
        text-align: center;
        color: #fff;
        margin: 0 auto;
        &.tip {
          font-size: 15px;
          margin-top: 60px;
        }
        &.btn {
          width: 80px;
          height: 30px;
          line-height: 30px;
          border-radius: 15px;
          cursor: pointer;
          font-size: 14px;
          margin-top: 10px;
          background-color: var(--color-netease-red);
        }
      }
    }
  }

  .tip {
    a {
      font-size: 14px;
      color: #3572bc;
      text-decoration: none;
    }
  }

  .more {
    margin-top: 50px;
    font-size: 13px;
    line-height: 20px;
    cursor: pointer;
    .iconfont {
      font-size: 12px;
      margin-left: 3px;
    }
  }
}
</style>
