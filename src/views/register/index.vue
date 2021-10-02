<template>
  <div id="register">
    <el-card class="box-card" shadow="always">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>注册</span>
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
              placeholder="用户名"
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
              <i slot="prefix" class="el-input__icon el-icon-unlock"></i>
            </el-input>
          </div>
        </el-form-item>

        <!-- 确认密码 -->
        <el-form-item label="确认密码:" prop="checkPassword">
          <div class="demo-input-suffix">
            <el-input
              ref="checkPassword"
              name="checkPassword"
              placeholder="确认密码"
              v-model="ruleForm.checkPassword"
              :type="passwordType"
              :key="passwordType"
            >
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
          </div>
        </el-form-item>

        <!-- 邮箱 -->
        <el-form-item prop="email" label="邮箱">
          <el-input
            ref="email"
            name="email"
            placeholder="邮箱"
            v-model="ruleForm.email"
          ></el-input>
        </el-form-item>

        <!-- 手机号 -->
        <el-form-item label="手机号:" prop="tel">
          <el-input
            ref="tel"
            placeholder="手机号"
            name="tel"
            v-model="ruleForm.tel"
          >
          </el-input>
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

        <!-- 注册按钮 -->
        <el-button
          type="primary"
          size="mini"
          class="register-button"
          :disabled="registerButtonStatus"
          >注册</el-button
        >
      </el-form>

      <el-divider></el-divider>
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
          @click="toLogin()"
          >登录</el-link
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
  name: "Register",
  data() {
    //校验用户名
    const validateUsername = (rule, value, callback) => {
      if (value == null || value == "") {
        callback(new Error("用户名为空!"));
      } else {
        callback();
      }
    };
    //校验密码
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码太短!"));
      } else {
        if (this.ruleForm.checkPassword !== "") {
          this.$refs.loginRules.validateField("checkPassword");
        }
        callback();
      }
    };
    //校验确认密码
    const validteCheckPassword = (rule, value, callback) => {
      let that = this;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      }
      if (value !== that.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    //校验邮箱
    const validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱!"));
      } else if (validateEmail(value)) {
        callback(new Error("邮箱格式错误!"));
      } else {
        callback();
      }
    };
    //校验手机号
    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!this.isCellPhone(value)) {
        // 引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的手机号!"));
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
    return {
      ruleForm: {
        username: "",
        password: "",
        checkPassword: "",
        email: "",
        tel: "",
        verifyCode: "",
      },
      rules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        checkPassword: [
          { required: true, trigger: "blur", validator: validteCheckPassword },
        ],
        email: [{ required: true, trigger: "blur", validator: validateEmail }],
        tel: [{ required: true, trigger: "blur", validator: validatePhone }],
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
      registerButtonStatus: true,
    };
  },
  methods: {
    //返回登录页面
    toLogin() {
      this.$router.push("/login");
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
      if(that.ruleForm.email === ""){
                that.$message("邮箱不为空!");
        return false;
      }
      // 获取验证码
      let requestData = {
        username: that.ruleForm.email,
        module: "register",
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
#register {
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

.register-button {
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
