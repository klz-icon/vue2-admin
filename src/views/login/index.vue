<template>
  <div id="login">
    <el-card class="box-card" shadow="always">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>登录</span>
      </div>

      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-position="left"
        size="small"
        label-width="90px"
        class="login-form"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名:" prop="username">
          <div class="demo-input-suffix">
            <el-input
              ref="username"
              name="username"
              placeholder="邮箱"
              v-model="ruleForm.username"
            >
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </div>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码:" prop="password">
          <div class="demo-input-suffix">
            <el-input
              ref="password"
              name="password"
              placeholder="密码"
              v-model="ruleForm.password"
              :type="passwordType"
              :key="passwordType"
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </div>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item label="验证码:" prop="verifyCode">
          <div class="demo-input-suffix">
            <el-input
              ref="verifyCode"
              placeholder="验证码"
              name="verifyCode"
              v-model="ruleForm.verifyCode"
              class="verify-input"
            >
              <!-- <template slot="append" v-on:click="getVeCode()">{{ verifyCodeButton.text }}</template> -->
            </el-input>
            <el-button
              type="primary"
              class="verify-button"
              v-on:click="getVeCode()"
              size="mini"
              :disabled="verifyCodeButton.status"
              >{{ verifyCodeButton.text }}</el-button
            >
          </div>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-button
          type="primary"
          size="mini"
          class="login-button"
          :disabled="loginButtonStatus"
          >登录</el-button
        >
      </el-form>

      <el-divider></el-divider>

      <!-- 忘记密码和注册 -->
      <div class="clearfix">
        <el-link
          style="float: left"
          :underline="false"
          type="primary"
          class="link-left"
          >忘记密码</el-link
        >
        <el-link
          :underline="false"
          type="primary"
          class="link-right"
          @click="toRegister()"
          >注册</el-link
        >
      </div>
    </el-card>
  </div>
</template>

<script>
//引入接口和工具类
import { getverifyCode } from "@/api/login.js";
import {
  stripscript,
  validatePass,
  validateEmail,
  validateVCode,
} from "@/utils/validate";
export default {
  name: "Login",
  data() {
    //校验用户名
    const validateUsername = (rule, value, callback) => {
      if (value === null || value === "") {
        callback(new Error("请输入用户名!"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误!"));
      } else {
        callback();
      }
    };

    //校验密码
    const validatePassword = (rule, value, callback) => {
      let that = this;
      // 过滤后的数据
      that.ruleForm.password = stripscript(value);
      value = that.ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6至20位数字+字母"));
      } else {
        callback();
      }
    };

    //校验验证码
    const validateVerifyCode = (rule, value, callback) => {
      if (value === "" || value === null) {
        callback(new Error("请输入验证码!"));
      } else if (validateVCode(value)) {
        return callback(new Error("验证码格式有误!"));
      } else {
        callback();
      }
    };

    //声明数据
    return {
      ruleForm: {
        username: "410293095@qq.com",
        password: "wo123456789",
        verifyCode: "",
      },
      rules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        verifyCode: [
          { required: true, trigger: "blur", validator: validateVerifyCode },
        ],
      },
      // 验证码按钮
      verifyCodeButton: {
        status: false,
        text: "获取验证码",
      },
      passwordType: "password",
      //定时器
      timer: null,
      // 登录按钮
      loginButtonStatus: true,
    };
  },

  methods: {
    toRegister() {
      this.$router.push("/register");
    },

    //倒计时
    countDown(number) {
      let that = this;
      //60和0不见了,故意留BUG
      //setTimeout: clearTimeout(变量) 只执行一次
      //setInterval: clearInterval(变量)  不断执行，需要才会停止
      if (that.timer) {
        clearInterval(that.data.timer);
      }
      let time = number;
      that.timer = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(that.timer);
          that.verifyCodeButton.status = false;
          that.verifyCodeButton.text = "再次获取";
        } else {
          that.verifyCodeButton.text = `${time}秒`; // es5 '倒计时' + time + '秒'
          // that.code.text = '倒计时' + time + '秒'
        }
      }, 1000);
    },

    //清除表单
    resetFormData() {
      // this.$refs.ruleForm.resetFields();
    },

    //清楚倒计时
    clearCountDown() {
      //清除倒计时
      clearInterval(that.timer);
    },

    //获取验证码
    getVeCode() {
      let that = this;
      //进行提示
      if (that.ruleForm.username === "") {
        that.$message("用户名不为空!");
        return false;
      }
      // 获取验证码
      let requestData = {
        username: that.ruleForm.username,
        module: "login",
      };

      that.verifyCodeButton.status = true;
      that.verifyCodeButton.text = "发送中";
      // 延时多长时间
      getverifyCode(requestData)
        .then((response) => {
          let data = response.data;
          this.$message({
            message: data.message,
            type: "success",
          });
          // 调定时器，倒计时
          that.countDown(60);
        })
        .catch((error) => {
          that.verifyCodeButton.status = false;
          that.verifyCodeButton.text = "再次获取";
        });
    },
  },

  //销毁页面时
  unmounted() {
    clearInterval(this.timer);
  },
};
</script>

//element-ui的样式
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>

// 自定义样式
<style lang="scss" scoped>
#login {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.box-card {
  border: 1px solid #ccc;
}

.login-form {
  width: 75%;
  margin: auto;
  padding: 10px;
}

.verify-input {
  float: left;
  width: 55% !important;
  margin-right: 10px;
}

.verify-button {
  width: 40%;
  float: right;
}

.login-button {
  margin: 0px auto 10px auto;
}

.link-left {
  float: left;
  padding: 10px;
}

.link-right {
  float: right;
  padding: 10px;
}
</style>











/**
 let that = this;
      console.log(that.data.ruleForm)
      //进行提示
      if (that.data.ruleForm.username === "") {
        this.$message("用户名不为空!");
        return false;
      }
      //获取邮箱
      // let info = that.data.ruleForm.username;
            // 获取验证码
        let requestData = {
          username: that.data.ruleForm.username, 
          module: 'login'
        }
      //修改验证码的状态
      that.setData({
        code: {
          status: true,
          text: "发送中",
        },
      });
      // 延时多长时间
      getverifyCode(requestData)
        .then((response) => {
          let data = response.data;
          $message({
            message: data.message,
            type: "success",
          });
          // 调定时器，倒计时
          countDown(60);
        })
        .catch((error) => {
          that.setData({
            code: {
              status: false,
              text: "再次获取",
            },
          });
          console.log(error);
        });
 */