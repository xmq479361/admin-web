<template>
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="index" label="序号" width="180"/>
        <el-table-column prop="name" label="姓名" width="100"/>
        <el-table-column prop="sex_text" label="性别" width="80"/>
        <el-table-column prop="phone" label="电话" width="140"/>
        <el-table-column prop="createTime" label="日期" width="180"/>
        <el-table-column prop="address" label="地址" width="180" />
        <el-table-column prop="email" label="邮箱地址" width="240" />
        <el-table-column prop="headPortrait" label="头像" />
      </el-table>
      <Page :loader="loader" />
    </div>
  </template>
  
  <script>
  import Page from "@/views/common/Page.vue";
  import { getSysUsers } from "@/api";
  export default {
    components: { Page },
    data() {
      return {
        tableData: [],
      };
    },
    methods: {
      loader(pageNo, pageSize) {
        return getSysUsers(pageNo, pageSize);
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  </style>