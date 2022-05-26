<template>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <h3>{{isCollapse?'后台':'麻豆后台管理系统'}}</h3>
      <!-- 一级菜单 -->
      <el-menu-item @click="clickMenu(item)" v-for="item in noChild" :index="item.path + ''" :key="item.path">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>

      <!-- 1级菜单 -->
      <el-submenu v-for="item in hasChild" :index="item.id +''" :key="item.id">
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <!-- 二级菜单拿着一级菜单的遍历产物 -->
        <el-menu-item-group
          v-for="subItem in item.children"
          :key="subItem.path"
        >
          <el-menu-item @click="clickMenu(subItem)" :index="subItem.path + ''">{{ subItem.label }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: [],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
     
    },
    handleClose(key, keyPath) {
    
    },
    clickMenu(item){
      this.$router.push({
        name:item.name
      })
      this.$store.commit('SELECTMENU',item)
    }
  },
  computed: {
    noChild() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChild() {
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    },
    asyncMenu(){
      return  this.$store.state.tab.menu
    }
  },
};
</script>

<style  lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 36px;
  }
}
</style>