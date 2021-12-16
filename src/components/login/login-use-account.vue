<template>
  <div class="login-use-acount">
    <!-- 跳转二维码登录 -->
    <div class="qr-code-img" @click="chageLoginType">
      <img src="~@/assets/img/qrCode.jpg" />
      <div class="mask"></div>
    </div>

    <!-- 登录表单 -->
    <div class="form">
      <div class="input-contaier">
        <div class="top">
          <div class="select">
            <span class="icon iconfont icon-shouji"></span>
            <span class="value">+86</span>
            <span class="icon iconfont icon-sanjiao1 sanjiao"></span>
          </div>
          <div class="phone">
            <input
              class="input-phone"
              placeholder="请输入手机号"
              type="text"
              v-model="formData.phone"
            />
          </div>
        </div>
        <div class="bottom">
          <span class="icon iconfont icon-mima password"></span>
          <input
            class="input-password"
            placeholder="请输入密码"
            type="password"
            v-model="formData.password"
          />
          <span class="reset">重置密码</span>
        </div>
      </div>
      <div class="validate-text">{{ validateText }}</div>
      <div class="btn-login" @click="handleLogin">登录</div>
      <div class="zhuce">
        <span>注册</span>
      </div>
      <div class="more-login-type">
        <span class="iconfont icon-weixin"></span>
        <span class="iconfont icon-QQ"></span>
        <span class="iconfont icon-weibo"></span>
        <span class="iconfont icon-wangyi"></span>
      </div>

      <div class="tiaokuan">
        <input type="checkbox" v-model="isAgree" />
        同意
        <a
          href="https://st.music.163.com/official-terms/service"
          target="_blank"
          >《服务条款》</a
        >
        <a
          href="https://st.music.163.com/official-terms/privacy"
          target="_blank"
          >《隐私政策》</a
        >
        <a
          href="https://st.music.163.com/official-terms/children"
          target="_blank"
          >《儿童隐私政策》</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "md5";
export default {
  mixins: [],
  components: {},
  data() {
    return {
      formData: {
        countrycode: 86,
        phone: "",
        password: "",
      },
      isAgree: false,
      validateText: "",
      codeList: [
        {
          name: "中国",
          label: "+86",
          value: 86,
        },
      ],
    };
  },
  computed: {},
  methods: {
    chageLoginType() {
      this.$emit("change-login-type");
    },
    handleLogin() {
      // 表单校验
      const reg = /^1[3-9]\d{9}$/;
      if (this.formData.phone === "") {
        this.validateText = "请输入11位手机号";
      } else if (this.formData.password === "") {
        this.validateText = "请输入密码";
      } else if (!reg.test(this.formData.phone)) {
        console.log(reg.test(this.formData.phone));
        this.validateText = "请输入11位手机号";
      } else {
        this.validateText = "";
        let form = {
          phone: this.formData.phone,
          md5_password: md5(this.formData.password),
          countrycode: this.formData.countrycode,
        };
        this.$emit("login-with-phone", form);
      }
    },
  },
  filters: {},
  created() {},
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixins.scss";
.login-use-acount {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  .qr-code-img {
    width: 50px;
    height: 50px;
    padding: 10px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
    .mask {
      position: absolute;
      top: 0;
      height: 0;
      width: 0;
      border: 30px solid rgba(0, 0, 0, 0.07);
      border-left-color: #fff;
      border-bottom-color: #fff;
    }
  }

  .form {
    width: 290px;
    height: 310px;
    margin: 0 auto;
    margin-top: 180px;
    .input-contaier {
      width: 100%;
      height: 80px;
      border: 1px solid #ccc;
      border-radius: 5px;
      .top {
        line-height: 40px;
        height: 40px;
        display: flex;
        .select {
          cursor: pointer;
          width: 85px;
          height: 100%;
          display: table-cell;
          border-right: 1px solid #ccc;
          .icon {
            width: 30px;
            display: inline-block;
            text-align: center;
            font-size: 18px;
            vertical-align: top;
            &.sanjiao {
              width: 25px;
              font-size: 12px;
              color: #888;
            }
          }
          .value {
            width: 30px;
            display: inline-block;
            border: none;
            font-size: 12px;
            text-align: center;
            vertical-align: top;
          }
        }
        .phone {
          width: calc(100% - 86px);
          height: 100%;
          .input-phone {
            height: 40px;
            width: calc(100% - 10px);
            border: none;
            outline: none;
            vertical-align: top;
            margin-left: 5px;
            &::-webkit-input-placeholder {
              color: #ccc;
            }
          }
        }
      }
      .bottom {
        height: 40px;
        line-height: 40px;
        border-top: 1px solid #ccc;
        .icon {
          width: 30px;
          display: inline-block;
          text-align: center;
          font-size: 18px;
          vertical-align: top;
        }
        .input-password {
          width: calc(100% - 110px);
          height: 39px;
          border: none;
          outline: none;
          vertical-align: top;
          position: relative;
          &::-webkit-input-placeholder {
            color: #ccc;
          }
        }
        .reset {
          width: 80px;
          display: inline-block;
          text-align: center;
          font-size: 13px;
          color: #999;
          vertical-align: top;
          cursor: pointer;
        }
      }
    }

    .validate-text {
      height: 40px;
      line-height: 40px;
      text-align: right;
      color: var(--color-netease-red);
    }
    .btn-login {
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #eee;
      text-align: center;
      border-radius: 5px;
      background-color: #c2473a;
      cursor: pointer;
      &:hover {
        color: #fff;
        background-color: #b53e31;
      }
    }
    .zhuce {
      margin-top: 5px;
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #555;
      text-align: center;
      span {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    .more-login-type {
      width: 100%;
      height: 40px;
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
      .iconfont {
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 50px;
        border: 1px solid #ccc;
        color: #666;
        font-size: 25px;
        cursor: pointer;
        &:hover {
          background-color: #f5f5f5;
        }
      }
    }
    .tiaokuan {
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: #ccc;
      margin-top: 35px;
      input {
        position: relative;
        top: 3px;
        &:checked {
          background: var(--color-netease-red);
        }
      }
      a {
        color: var(--link-color);
        text-decoration: none;
      }
    }
  }
}
</style>
