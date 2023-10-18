<template>
  <div class="header">
    <el-header>
      <div class="title">管理系统</div>
      <div class="name">{{ name }}</div>
    </el-header>
  </div>
</template>

<script>
import { getCache } from "@/utils/cache";
export default {
  data() {
    return {
      name: "",

    };
  },
  created() {
    // this.name = getCache("user/username");
  },
};
</script>

<style lang="scss" scoped>
.header {
  .el-header {
    background: #2578b5;
    color: #fff;
    display: flex;
    line-height: 60px;
    justify-content: space-between;
    .title {
      width: 200px;
      font-size: 24px;
    }
  }
}
</style>