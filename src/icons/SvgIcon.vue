<template>
  <div>
    <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="iconName"></use>
    </svg>
  </div>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    iconClass: {
      type: String, //规定传入参数的类型
      default: "", //默认值
      //   default: () => [],  //默认值是对象的写法
      //   required: true, //必须传值进来
      //   validator: (value) => {       //校验
      //       return value >= 0;
      //   }
    },
    className: {
      type: String,
      default: "",
      //   required: true,
    },
  },
  data() {
    return {
      newIconClass: "",
      newClassName: "",
    };
  },
  computed: {
    iconName: {
      get() {
        return `#icon-${this.iconClass}`;       //${}是es6的语法
      },
    },
    svgClass: {
      get() {
        if (this.className) {
          return `svg-icon ${this.className}`;
        } else {
          return `svg-icon`;
        }
      },
    },
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.svg-icon {
  position: relative;
  width: 1em;
  height: 1em;
  float: left;
  margin-top: 18px;
  margin-right: 10px;
  font-size: 20px;
}
</style>
