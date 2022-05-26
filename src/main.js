import Vue from 'vue'
import App from './App.vue'
import element, { Message, MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/index.less'
import store from './store'


import http from 'axios'

import router from '@/router'

import './api/mock'
Vue.use(element)

Vue.config.productionTip = false

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.prototype.$http = http

console.log(router);
router.beforeEach((to,from,next)=>{
    store.commit('GETTOKEN')
    const token = store.state.user.token
    if(!token && to.name !== 'login'){
      next({name:'login'})
    }else if(token && to.name==='login'){
      next({name:'home'})
    } else{
      next()
    }
})
 
new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    store.commit('ADDMENU',router)
  },
}).$mount('#app')
