<template>
  <div class="menu">
    <el-aside width="240px">
      <el-menu
        router
        :default-active="currentMenu"
        class="el-menu-vertical-demo"
        background-color="#2578b5"
        text-color="#fff"
        active-text-color="#ffd04b">
        <template v-for="(menu, index) in sideBarMenu">
          <el-submenu :index="index + ''" :key="index" v-if="menu.children&&menu.children.length>0" >
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
          
          <el-menu-item :key="menu.name" :index="menu.name" @click="gotoRoute(menu.name)" v-else>
                <i class="iconfont" :class="menu.meta.icon"></i>
                <span slot="title">{{menu.meta.name}}</span>
            </el-menu-item>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState('permission', ['sideBarMenu', 'currentMenu'])
  },
    methods: {
        gotoRoute(name) {
            this.$router.push({ name })
        }
    }
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