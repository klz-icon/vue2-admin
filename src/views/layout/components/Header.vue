<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" v-on:click="toggleMenu">
      <svg-icon  :iconClass="foldMenu" :className="foldMenu" />
    </div>
    <div class="pull-right avatar">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-avatar :size="40">klz</el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import SvgIcon from "../../../icons/SvgIcon.vue";
export default {
  components: { SvgIcon },
  data() {
    return {
        foldMenu: 'fold-left'
    };
  },
  methods: {
      toggleMenu(){
          this.$store.commit('SET_ISCOLLAPSE')
         //  console.log("foldmenu:"+this.$store.state.isCollapse)
          if(this.$store.state.isCollapse){
              this.foldMenu = 'fold-right'
          }else{
              this.foldMenu = 'fold-left'
          }
      }
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#header-wrap {
  position: fixed;
  background-color: #438eb9;
  top: 0;
  left: $navMenu;
  right: 0;
  height: 60px;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  line-height: 60px;
}
// 折叠图表样式
.header-icon {
  padding: 0 20px;
}
// svg格式图标的大小，不知道为什么设置
  .svg-icon {
    font-size: 25px;
    width: 60px;
    cursor: pointer;
    align-items: center;
  }

//右侧头像
.avatar{
    padding: 10px 20px;
}

//根据isCollpase的值控制header的宽度
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: 64px;
  }
}
</style>