<template>
    <div class="home">
      <Header />
      <el-container class="content">
        <Menu />
        <el-container class="cont">
          <Breadcump/>
          <el-main><router-view /></el-main>
          <el-footer><Footer /> </el-footer>
        </el-container>
      </el-container>
    </div>
  </template>
  
  <script>
  import Header from "../common/Header.vue";
  import Footer from "../common/Footer.vue";
  import Menu from "../common/Menu.vue";
  import Breadcump from '../common/Breadcump.vue';
  export default {
    name: "App",
    components: {
      Header,
      Menu,
      Footer,
      Breadcump,
    },
    data() {
        return {}
    },
    mounted() {
      console.log("Layout mouted")
    },
  };
  </script>
  
  <style lang="scss" >
  .home {
    background: rgb(151, 151, 1);
    width: 100%;
    height: 100%;
    .content {
      width: 100%;
      position: absolute;
      top: 60px;
      bottom: 0;
      .cont {
        flex-direction: column;
      }
    }
  }
  .el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  </style>