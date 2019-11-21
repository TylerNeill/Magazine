<template>
  <div>
    <el-container>
      <el-header height="120px" class="top">
        <el-row class="ss">
          <el-col :span="4">
            <h2 v-if="loginUser">{{loginUser}}</h2>
            <p class="no">Nothing is Imposiibile</p>
          </el-col>
        </el-row>
        <el-row class="top_guide">
          <el-col :span="1" :pull="4">博客园</el-col>
          <el-col :span="1" :pull="4">
            <router-link to="/">首页</router-link>
          </el-col>
          <el-col :span="1" :pull="4">新随笔</el-col>
          <el-col :span="1" :pull="4">联系</el-col>
          <el-col :span="1" :pull="4">管理</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" :offset="20" class="span">
            <span>随笔-</span>
            <span>37</span>
            <span>文章-</span>
            <span>0</span>
            <span>评论-</span>
            <span>18</span>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="1400px">
          <el-form ref="regForm" :model="user" label-width="100px">
            <el-row>
              <!-- wangeditor -->
              <div class="content">
                <h3>添加博文</h3>
                <el-form-item label="信息标题" prop="title" style="margin-left: -30px;">
                  <el-input v-model="user.title" style=" width:600px;"></el-input>
                </el-form-item>
                <div ref="editor" style="text-align:left"></div>
                <el-button type="success" v-on:click="getContent">提交</el-button>
                <el-button type="success" v-on:click="reset">重置</el-button>
              </div>
            </el-row>
          </el-form>
        </el-aside>
        <el-main height class="calendar">
          <el-row>
            <el-col :span="12">
              <p class="p">公告</p>
              <p>
                <span>昵称:</span>
                <span></span>
              </p>
              <p>
                <span>圈龄:</span>
                <span></span>
              </p>
              <p>
                <span>粉丝:</span>
                <span></span>
              </p>
              <p>
                <span>关注:</span>
                <span></span>
              </p>
              <p>
                <a href>+关注</a>
              </p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24"></el-col>
          </el-row>
          <el-row>
            <el-col>
              <p class="p">常用链接</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <p class="p">最新随笔</p>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import E from "wangeditor";
import axios from "axios";
const qs = require("querystring");
import { mapState } from "vuex";
export default {
  name: "editor",
  computed: {
    ...mapState(["loginUser"])
  },
  data() {
    return {
      user: {
        editorContent: "",
        title: ""
      },
      rules: {
        title: [{ required: true, message: "内容不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {
    var editor = new E(this.$refs.editor);
    // editor.customConfig.onchange = (html) => {
    //   this.editorContent = html;
    // };
    editor.create();
    this.user.editorContent = editor.txt.html()
  },
  methods: {
    getContent() {
      console.log(this.user.title);
      this.$refs.regForm.validate(valid => {
        // console.log(valid);
        if (valid) {
          axios({
            url: "/api/main/article/add",
            method: "post",
            data: qs.stringify({
              //转成字符串
              title: this.user.title,
              content: this.user.editorContent
            })
          })
            .then(res => {
              alert("提交成功")
              console.log(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    reset() {
      this.user.title = "";
      this.user.editorContent = "";
    }
  }
};
</script>

<style scoped>
.top {
  background-color: #2175bc;
}
.p {
  border-bottom: 1px dotted #ccc;
  padding: 10px 0;
}
a {
  text-decoration: none;
}
.calendar {
  background: #f5f5f5;
}
.span span {
  color: #fff;
}
.top_guide {
  margin-top: -20px;
  color: #fff;
}
.no {
  padding-bottom: 10px;
}
.content h3 {
  font-size: 14px;
  border-bottom: 1px solid #000;
}
.content {
  margin-top: 60px;
}
</style>>
