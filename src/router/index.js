import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [

  {
    path: "/",
    nmae: "Layout",
    redirect: "/home",
    meta: {
      name: "控制台"
    },
    component: () => import("../views/layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        meta: {
          name: "首页",
          icon: "home"
        },
        component: () => import("../views/home/index.vue"),
      }
    ]
  },
  {
    path: '/blog',
    name: 'Blog',
    meta: {
      name: '博客',
      icon: 'blog'
    },
    component: () => import("../views/layout/index.vue"),
    children: [
      {
        path: 'articleManage',
        component: () => import('@/views/blog/articleManage/index'),
        name: 'ArticleManage',
        meta: { name: '博客管理', icon: 'blogManage'}
      }, {
        path: 'classify',
        name: 'Classify',
        component: () => import('@/views/blog/classify/index'),
        meta: { name: '分类管理', icon: 'classify'}
      }, {
        path: 'writeBlog',
        name: 'WriteBlog',
        component: () => import('@/views/blog/writeBlog/index'),
        meta: {name: '写博客', icon: 'writeBlog'}
      },
    ]
  },
  // {
  //   path: "/",
  //   redirect: "login"
  // },
  {
    path: "/login",
    name: "Login",
    meta: {
      name: "登录"
    },
    hidden: true,
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      name: "注册"
    },
    hidden: true,
    component: () => import("../views/register/index.vue")
  },
  {
    path: "/repassword",
    name: "RePassword",
    meta: {
      name: "重置密码"
    },
    hidden: true,
    component: () => import("../views/rePassword/index.vue")
  },

];

const router = new VueRouter({
  routes,
});

export default router;
