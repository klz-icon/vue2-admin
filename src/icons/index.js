import Vue from 'vue';
import SvgIcon from './SvgIcon.vue';
Vue.component('svg-icon',SvgIcon)

//读取指定目录的所有文件,用来读取svg文件夹下存的图标
/**
第一个：目录
第二个：是否遍历子级目录
第三个：定义遍历文件规则
 */
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => {
    console.log(requireContext.keys().map(requireContext));
  return requireContext.keys().map(requireContext);
}
requireAll(req)
