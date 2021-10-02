<template>
  <div id="navbar-wrap">

    <!-- 根据折叠图标修改logo的显示 -->
    <div class="logo">
      <img
        v-if="!isCollapse"
        class="logo-img"
        src="../../../assets/images/iBlog_24_white.png"
      />
      <img v-else class="logo-toggle-img" src="../../../assets/images/B.png" />
    </div>

    <!-- 通过路由遍历导航 -->
    <!-- transition组件时动画过渡组件 -->
    <transition mode="out-in">

      <el-menu
        default-active="1"
        background-color="transparent"
        active-text-color="#303133"
        :collapse="isCollapse"
        class="el-menu-vertical-demo"
        router
      >
        <!-- 遍历路由 -->
        <template v-for="item in routes">
          <!-- 只遍历未隐藏并且有子路由不为空的的路由 -->
          <template v-if="!item.hidden && item.children">


            <!-- 判断子路由是否为1-->
            <el-menu-item
              v-if="item.children.length === 1"
              :key="item.children.id"
              :index="item.children[0].path"
            >
              <!-- 显示子路由的名称 -->
              <!-- <svg-icon iconClass="home" className="home"/> -->
              <svg-icon
                :iconClass="item.children[0].meta.icon"
                :className="item.children[0].meta.icon"
              />
              <span slot="title"> {{ item.children[0].meta.name }}</span>
            </el-menu-item>

            <!-- 子路由不为1的路由 -->
            <el-submenu v-else :key="item.id" :index="item.path">
              <template slot="title">
                <svg-icon
                  :iconClass="item.meta.icon"
                  :className="item.meta.icon"
                />
                <span>{{ item.meta.name }}</span>
              </template>
              <template v-for="subItem in item.children">
                <el-menu-item
                  class="sub-item-border"
                  v-if="!subItem.hidden"
                  :key="subItem.id"
                  :index="item.path + '/' + subItem.path"
                >
                  <template slot="title">
                    <svg-icon
                      :iconClass="subItem.meta.icon"
                      :className="subItem.meta.icon"
                    />
                    <span class="slot"> {{ subItem.meta.name }}</span>
                  </template>
                </el-menu-item>
              </template>
            </el-submenu>

          </template>
        </template>
      </el-menu>


    </transition>


  </div>
</template>


<script>
import SvgIcon from "../../../icons/SvgIcon.vue";
export default {
  components: { SvgIcon },
  name: "Nav",
  data() {
    return {
      //路由参数
      routes: [],
    };
  },
  computed: {
    // 监控isCollapse属性的变化
    isCollapse: {
      get() {
        return this.$store.state.isCollapse;
      },
    },
  },
  created() {
    //获取路由赋给routes
    let that = this;
    that.routes = that.$router.options.routes;
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#navbar-wrap {
  position: fixed;
  top: 0;
  left: 0;
  // width: $navMenu;
  height: 100vh;
  // vh是基于屏幕算的50vh是半个屏幕
  background-color: #f9f9f9;
  border-right: 1px solid #ccc;
  @include webkit(transition, all 0.3s ease 0s);
}

.el-menu-vertical-demo {
  text-align: left;
}

.logo {
  text-align: center;
  // width: $navMenu;
  height: $layoutHeader;
  background-color: #438eb9;
}

// 未折叠时的logo样式
.logo-img {
  padding: 7px 50px;
}

// 折叠时的logo样式
.logo-toggle-img {
  width: 30px;
  padding: 15px;
  text-align: center;
}

// 不让子路由显示边框
.sub-item-border {
  border: none !important;
}


//根据isCollpase的值控制Nav的宽度和logo的宽度
.open {
  #nav-wrap {
    width: $navMenu;
  }
  .logo {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: 64px;
  }
  .logo {
    width: 64px;
  }
}


</style>