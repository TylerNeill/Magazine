<template>
  <div class="tally">
    <el-form ref="regForm" :model="user">
      <h2>博客园用户登录</h2>
      <div class="head">
        <el-avatar icon="el-icon-user-solid" :size="60"></el-avatar>
        <h4>代码改变世界</h4>
      </div>
      <br />

      <div class="log_input">
        <el-input placeholder="登录用户名" prop="account" v-model="user.account" clearable></el-input>
        <el-row>
          <el-col :span="6" :offset="18">
            <a href>忘记登录用户名</a>
          </el-col>
        </el-row>
        <br />
        <el-input
          placeholder="请输入密码"
          type="password"
          prop="password"
          v-model="user.password"
          show-password
        ></el-input>
        <el-row>
          <el-col :span="4" :offset="20">
            <a href>忘记密码</a>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-checkbox>记住我</el-checkbox>
          </el-col>
        </el-row>
        <el-row class="log">
          <el-button type="primary" @click="login('user')">登录</el-button>
        </el-row>
      </div>
      <br />
      <el-row class="registe">
        <el-col>
          没有账户，
          <router-link to="/reg">立即注册</router-link>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        account: "",
        password: ""
      },
      checked: false,
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入账号", trigger: "blur" }]
      }
    };
  },

  methods: {
    login() {
      if (this.user.account == "" || this.user.password == "") {
        alert("账号或密码不能为空");
        return;
      }

      // 分发action
      let pro = this.$store.dispatch("login", this.user);
      pro
        .then(result => {
          console.log(result);
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>


<style scoped>
body {
  margin: 0;
  padding: 0;
}
.tally {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 400px;
  height: 500px;
  margin-left: -200px;
  margin-top: -250px;
  background: #fff;
  border: 1px solid #eaeaea;
  padding: 20px 30px 20px 30px;
}
h2 {
  font-weight: 200;
  margin-top: 25px;
  text-align: center;
}
h4 {
  font-weight: 100;
  text-align: center;
}
.el-button {
  width: 80px;
  height: 35px;
}
.log {
  text-align: center;
}
.registe {
  margin-top: 30px;
  font-size: 13px;
}
.registe a {
  color: #76a7f5;
}
.log_input {
  font-size: 13px;
}
.log_input a {
  text-decoration: none;
  color: #76a7f5;
}
.el-avatar {
  background: #f3ba4c;
}
.head {
  text-align: center;
}
</style>