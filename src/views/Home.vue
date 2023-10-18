<template>
  <div class="home">
    <h1>Home</h1>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
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