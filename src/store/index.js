import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false
  },
  mutations: {      //修改state里面参数的值
    //this.$store.state.isCollapse
    //this.$store.commit('SET_ISCOLLAPSE',true)别的文件修改state里面参数的值
     //this.$store.state.isCOllapse别的文件调用state的参数
    SET_ISCOLLAPSE(state,value){
      state.isCollapse = !state.isCollapse;
    }
  },
  actions: {},
  modules: {},
  getters: {    //相当于computed
   
    isCollapse: () => !state.isCollapse
  }
});
