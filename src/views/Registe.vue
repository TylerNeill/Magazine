<template>
  <el-container>
    <el-header>
      <el-row class="top">
        <el-col :span="6" :push="2">
          <p>
            <img src="../img/logo.jpg" alt />
            博客园
          </p>
        </el-col>
        <el-col :span="6" :push="10" class="top_right">
          <i class="el-icon-s-home"></i>首页
          <i class="el-icon-user"></i>登录
          <i class="el-icon-user-solid"></i>注册
          <i class="el-icon-question"></i>帮助
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <div class="content">
        <h3>注册新用户</h3>
        <el-container class="content_all">
          <el-aside width="65%" class="content_left">
            <el-form ref="regForm" :model="user" label-width="100px" :rules="rules">
              <el-form-item label="邮箱" prop="mail">
                <el-input v-model="user.mail" placeholder="需要通过邮件激活账户"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="phone_number">
                <el-input v-model="user.phone_number" placeholder="激活账户需要手机短信验证">
                  <template slot="prepend">+86</template>
                </el-input>
              </el-form-item>
              <el-form-item label="登录名称" prop="account">
                <el-input v-model="user.account" placeholder="登录用户名，不少于4个字符"></el-input>
              </el-form-item>
              <el-form-item label="显示昵称" prop="show_account">
                <el-input v-model="user.show_account" placeholder="不少于两个字符"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="user.password"
                  placeholder="至少8位，必须包含字母、数字、特殊字符"
                  type="password"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPass">
                <el-input
                  v-model="user.confirmPass"
                  placeholder="请输入确认密码"
                  type="password"
                  show-password
                ></el-input>
              </el-form-item>

              <el-row class="registe_but">
                <el-button type="primary" @click="registe('user')">注 册</el-button>
              </el-row>
              <el-row class="agreement">
                <el-col>
                  *点击“注册”按钮，即表示您同意并愿意遵守
                  <a href>用户协议</a>。
                </el-col>
              </el-row>
            </el-form>
          </el-aside>

          <el-main class="content_right">
            <img src="../img/registersideimg.png" alt />
          </el-main>
        </el-container>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
const qs = require("querystring");
export default {
  data() {
    // 自定义校验函数
    const validatePassword = (rule, value, callback) => {
      // console.log(value, this.$refs)
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.user.confirmPass !== "") {
          // 触发confirmPass字段的验证
          this.$refs.regForm.validateField("confirmPass");
        }
        callback();
      }
    };

    const validateConfirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.user.password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };
    return {
      user: {
        mail: "",
        phone_number: "",
        account: "",
        show_account: "",
        password: "",
        confirmPass: ""
      },
      rules: {
        mail: [
          { required: true, message: "请输入您的邮箱", trigger: "blur" },
          {
            pattern: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
            message: "请输入正确邮箱格式",
            trigger: "blur"
          }
        ],
        phone_number: [
          { required: true, message: "请输入您的手机号码", trigger: "blur" },
          {
            pattern: /^[0-9]{11}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        account: [
          { required: true, message: "请输入您的登录名称", trigger: "blur" },
          { pattern: /^\w{4,}$/, message: "不少于4个字符", trigger: "blur" }
        ],
        show_account: [
          { required: true, message: "请输入您要显示的昵称", trigger: "blur" },
          { pattern: /^\w{2,}$/, message: "不少于2个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,}$/,
            message: "必须包含数字、英文字母、特殊符号且大于等于8位",
            trigger: "blur"
          },
          { validator: validatePassword, trigger: "blur" }
        ],
        confirmPass: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validateConfirmPass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    registe() {
      console.log(this.$refs);
      // 对整个表单进行校验
      this.$refs.regForm.validate(valid => {
        console.log(valid);
        if (valid) {
          alert("数据合法");
          console.log(this.user, 1111);
          axios({
            url: "api/user/registe",
            method: "post",
            data:qs.stringify({ //转成字符串
              username: this.user.account,
              password: this.user.password,
              email: this.user.mail,
              tel: this.user.phone_number,
              nickname: this.user.show_account,
            })
          })
            .then(resp => {
              console.log(resp.data);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
}
.el-header {
  background: #283e5c;
  color: #fff;
  line-height: 60px;
}
.el-header img {
  width: 35px;
}
.el-header p {
  font-size: 30px;
}
.top_right i {
  margin-left: 20px;
}
.registe_but {
  text-align: center;
}
.registe_but button {
  width: 100px;
  height: 40px;
}
.agreement {
  text-align: center;
  margin-top: 20px;
}
.content {
  position: absolute;
  left: 25%;
  top: 30%;
  width: 850px;
}
.content_right {
  width: 240px;
  height: 260px;
  border-left: 1px solid #eaeaea;
  margin-top: 20px;
}
.content_right img {
  width: 230px;
  height: 250px;
  padding-left: 20px;
}

h3 {
  font-weight: 500;
  border-bottom: 1px solid #eaeaea;
}
.content_left {
  margin-right: 40px;
}
.content_all {
  margin-top: 30px;
}
.el-input {
  margin-bottom: 10px;
}
</style>