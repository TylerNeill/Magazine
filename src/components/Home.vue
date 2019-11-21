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
          <el-col :span="1" :pull="4">
            <router-link to="/BlogsRedact">心随笔</router-link>
          </el-col>
          <el-col :span="1" :pull="4">联系</el-col>
          <el-col :span="1" :pull="4">管理</el-col>
          <el-col :span="4" :offset="10" class="span">
            <span>随笔-</span>
            <span>37</span>
            <span>文章-</span>
            <span>0</span>
            <span>评论-</span>
            <span>18</span>
          </el-col>
        </el-row>
        <!-- <el-row>
        </el-row> -->
      </el-header>
      <el-container>
        <el-aside width="1400px">
          <el-row>
            <el-col :span="12" v-for="(item,index) in show" :key="index">
              <h3>{{item.title}}</h3>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10" :offset="14">
              <el-pagination
                :page-size="10"
                layout="total, prev, pager, next"
                :total="40"
                background
              ></el-pagination>
            </el-col>
          </el-row>
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
      <el-footer>
        <el-row class="down">
          <el-col :span="10" :offset="9" >
            <span>
              <a href>关于博客</a>
            </span>
            <span>
              <a href>联系我们</a>
            </span>
            <span>
              <a href>沪ICP备09004260号</a>&acute;2004-2019
            </span>
            <span>
              <a href>博客园</a>
            </span>
            <span>Powered by ASP.NET Core on Linux</span>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapState(["loginUser"])
  },

  data() {
    return {
      show: []
    };
  },
  created() {
    axios({
      url: "/api/main/article/show",
      method: "get",
    })
      .then(res => {
        this.show = res.data.data.list;
        console.log(this.show);
        console.log(res.data)
        console.log(res.data.data)
      })
      .catch(err => {
        console.log(err);
      });
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
  color: skyblue;
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
.down{
  font-size: 14px;
}
</style>>
