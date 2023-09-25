<template>
  <div class="menu">
    <el-aside width="240px">
      <el-menu
        router
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#2578b5"
        text-color="#fff"
        active-text-color="#ffd04b">
        <template v-for="(menu, index) in menus">
          <el-submenu :index="index + ''" :key="index" v-if="!menu.hidden">
            <template slot="title">
              <i :class="menu.iconClass"></i>
              <span>{{ menu.name }}</span>
            </template>
            <el-menu-item-group
              v-for="(child, index) in menu.children"
              v-bind:key="index"
            >
              <el-menu-item :index="child.path">
                <i :class="child.iconClass"></i>{{ child.name }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
// import router from "@/router";
import { mapState } from 'vuex'

export default {
  computed: mapState({
    menus: (state)=>state.menus,
  }),
  data() {
    return {
    //   router,
      // menus: [],
    };
  },
  created() {
    // this.menus = [...this.$router.options.routes];
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.menu {
  height: 100%;
  .el-aside {
    height: 100%;
    .el-menu {
      height: 100%;
      .fa {
        margin-right: 19px;
      }
    }
  }
}
</style>