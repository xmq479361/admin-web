<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageNo"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
    };
  },
  props: {
    loader: {
      type: Function,
      default: function () {
        return {};
      }, //默认做的事情
    },
  },
  created() {
    this.getPageData();
  },
  methods: {
    getPageData() {
      if (this.loader) {
        console.log("getPageData: ", this.pageNo, this.pageSize);
        this.loader(this.pageNo, this.pageSize)
          .then((res) => {
            console.log(res.data);
            this.total = res.data.total;
            let tableData = res.data.datas;
            let offset = (this.pageNo - 1) * this.pageSize;
            tableData.forEach((item, index) => {
              item.sex_text = item.sex == 1 ? "男" : "女";
              item.index = offset + index + 1;
            });
            this.$parent.tableData = tableData;
          })
          .catch((err) => {
            console.err(err);
          });
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getPageData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.getPageData();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>