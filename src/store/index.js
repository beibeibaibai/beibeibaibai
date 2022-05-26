import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'//引入模块
import user from './user'


Vue.use(Vuex)
// 全局注入







// 暴露
export default new Vuex.Store({
   modules:{
        tab,
        user
   }
})