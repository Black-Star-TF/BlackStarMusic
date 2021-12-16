<template>
  <el-dialog
    :visible="visible"
    width="350px"
    append-to-body
    custom-class="login-dialog"
  >
    <!-- 关闭按钮 -->
    <span class="close iconfont icon-cuo" @click="handleClose"></span>
    <login-use-qr
      v-if="useQRCode"
      @change-login-type="changeLoginType"
      :qrUrl="qrUrl"
      :qrValid="qrValid"
      @refresh-qr="getQRKey"
    >
    </login-use-qr>
    <login-use-account
      v-else
      @change-login-type="changeLoginType"
      @login-with-phone="loginWithPhone"
    >
    </login-use-account>
  </el-dialog>
</template>

<script>
import QRCode from "qrcode";
import { mapActions } from "vuex";
import LoginUseQr from "./login-use-qr.vue";
import LoginUseAccount from "./login-use-account.vue";
import { getKey, getQR, checkQRStatus, loginWithPhone } from "@/api/auth";
import { setCookie } from "@/utils/auth.js";
export default {
  components: {
    LoginUseQr,
    LoginUseAccount,
  },
  data() {
    return {
      visible: false,
      useQRCode: true,
      qrUrl: "",
      qrKeyCheckInterval: null,
      qrValid: false,
    };
  },
  computed: {},
  methods: {
    ...mapActions(["getUserProfile", "getUserPlaylist", "getLikedSongList"]),
    loginWithPhone(data) {
      loginWithPhone(data).then(res => {
        if (res.code == 200) {
          this.loginSuccess(res);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    getTimestamp() {
      return new Date().getTime();
    },
    loginSuccess(data) {
      this.$message.success("登录成功");
      // 保存cookie
      setCookie(data.cookie);
      // 登录成功后，获取用户信息，获取歌单
      this.getUserProfile().then(() => {
        this.getLikedSongList();
        this.getUserPlaylist();
      });

      this.visible = false;
    },
    handleClose() {
      this.visible = false;
      this.useQRCode = true;
      clearInterval(this.qrKeyCheckInterval);
      this.qrKeyCheckInterval = null;
    },
    changeLoginType() {
      this.useQRCode = !this.useQRCode;
    },
    getQRKey() {
      getKey({ timestamp: this.getTimestamp() })
        .then(res => {
          let key = res.data.unikey;
          this.qrValid = true;
          this.checkQRStatus(key);
          this.getQRUrl(key);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getQRUrl(key) {
      getQR({ key, timestamp: this.getTimestamp() })
        .then(res => {
          this.getQRImg(res.data.qrurl);
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkQRStatus(key) {
      this.qrKeyCheckInterval = setInterval(() => {
        checkQRStatus({ key, timestamp: this.getTimestamp() })
          .then(res => {
            if (res.code == 800) {
              // console.log('二维码过期');
              clearInterval(this.qrKeyCheckInterval);
              this.qrKeyCheckInterval = null;
              this.qrValid = false;
            }
            if (res.code == 801) {
              // console.log('等待扫码');
            }
            if (res.code == 802) {
              // console.log('等待确认');
            }
            if (res.code == 803) {
              // console.log('登录成功');
              this.visible = false;
              clearInterval(this.qrKeyCheckInterval);
              this.qrKeyCheckInterval = null;
              // 获取用户信息
              res.code == 200;
              this.loginSuccess(res);
            }
          })
          .catch(err => {
            // console.log('二维码过期');
            clearInterval(this.qrKeyCheckInterval);
            this.qrKeyCheckInterval = null;
            this.qrValid = false;
          });
      }, 1000);
    },
    getQRImg(rqrurl) {
      QRCode.toDataURL(rqrurl, { width: 200, margin: 0 })
        .then(res => {
          this.qrUrl = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  filters: {},
  created() {},
  watch: {
    visible(val) {
      if (val) {
        // this.getQRKey()
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .login-dialog {
  border-radius: 10px;
  .el-dialog__header {
    display: none;
  }
  .el-dialog__body {
    height: 530px;
    padding: 0;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    .close {
      font-weight: bold;
      position: absolute;
      z-index: 50;
      top: 10px;
      left: 10px;
      cursor: pointer;
      color: #999;
    }
  }
}
</style>
