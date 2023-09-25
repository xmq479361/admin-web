<template>
  <div class="login-page">
    <!-- <el-row :gutter="20">
        <el-col :span="12" :offset="6"> </el-col>
      </el-row> -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>管理系统</span>
      </div>
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLogin('form')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
  
  <script>
import { FormItem, Input, Form, Card, Button } from "element-ui";
import { usernameRule, passwordRule } from "../utils/validator.js";
import { setCache } from "../utils/cache.js";
import { login } from "../api/index.js";
export default {
  components: [FormItem, Input, Form, Card, Button],
  data() {
    return {
      form: {
        username: "admin",
        password: "12345",
      },
      rules: {
        username: [
          { required: true, trigger: "blur", validator: usernameRule },
        ],
        password: [
          { required: true, trigger: "blur", validator: passwordRule },
        ],
      },
    };
  },
  methods: {
    submitLogin(form) {
      console.log(this.form);
      this.$refs[form].validate((valid) => {
        console.log("validate:: ", valid);
        if (!valid) {
          return;
        }
        login(this.form)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$store.commit("setLoginInfo", res.data);
              this.$message({ message: res.msg, type: "success" });
              this.$router.push("/home");
            } else {
              this.$message({ message: "登录失败", type: "warning" });
            }
          })
          .catch((err) => {
            console.log(err);
            this.$message({ message: "服务访问异常", type: "warning" });
          });
        // login(this.form, this. loginResHandler);
      });
    },
    // loginResHandler(res) {
    //     console.log(res);
    //     if (res.status === 200) {
    //         setCache("user/username", res.data.username);
    //         setCache("user/token", res.data.token);
    //         this.$message({ message: res.msg, type: "success" });
    //         this.$router.push("/home");
    //     } else {
    //     this.$message({ message: "登录失败", type: "warning" });
    //     }
    // },
    // login() {
    //   login(this.form)
    //     .then((res) => {
    //       console.log(res);
    //       if (res.status === 200) {
    //         setCache("user/username", res.data.username);
    //         setCache("user/token", res.data.token);
    //         this.$message({ message: res.msg, type: "success" });
    //         this.$router.push("/home");
    //       } else {
    //         this.$message({ message: "登录失败", type: "warning" });
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       this.$message({ message: "服务访问异常", type: "warning" });
    //     });
    // },
  },
};
</script>
  
  <style lang="scss" scoped>
.login-page {
  //   background: @primary-color;
  width: 100vw;
  height: 100vh;
  position: absolute;
  background: #409efe;
  .box-card {
    width: 40%;
    min-width: 200px;
    max-width: 400px;
    margin: 200px auto;
    .el-card .header {
      font-size: 35px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>