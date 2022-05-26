import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../pages/Main'
import User from '../pages/User'
import Home from '../pages/Home'
import Mall from '../pages/mall'
import PageOne from '../pages/other/pageOne.vue'
import PageTwo from '../pages/other/pageTwo.vue'
import Login from '../pages/Login'
Vue.use(VueRouter)

// 重写push replace方法
// 先保存一份
let orginPush = VueRouter.prototype.push;
let orginReplace = VueRouter.prototype.replace;
// 声明式导航没有在过度点击下爆出 重复路由 
// 编程式导航会出来 重复报错 因为内部 返回的是一个promise 且有返回值
// 但是当你在传递参数后同时传递2个回调便可以解决  但是为了一劳永逸 决定重写 
// 其实还是用的原来的方法不过2次封装

// 第一个参数 告诉push方法你给哪里跳  传递那些参数
// 第二个参数  成功回调
// 第三个参数  失败回调

VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        orginPush.call(this, location, resolve, reject)
    }else{
        orginPush.call(this, location, ()=>{}, ()=>{})
    }
}


VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        orginReplace.call(this, location, resolve, reject)
    }else{
        orginReplace.call(this, location, ()=>{}, ()=>{})
    }
}



const routes = [
    {
        path:'/',
        name:'Main',
        component:Main,
        redirect:'/home',   //重定向
        children:[
            // {
            //     path:'/home',
            //     name:'home',
            //     component:Home
            // },
            // {
            //     path:'/user',
            //     name:'user',
            //     component:User
            // },
            // {
            //     path:'/mall',
            //     name:'mall',
            //     component:Mall
            // },
            // {
            //     path:'/page1',
            //     name:'page1',
            //     component:PageOne
            // },
            // {
            //     path:'/page2',
            //     name:'page2',
            //     component:PageTwo
            // }  
        ]
    },
    {
        path:'/login',
        name:'login',
        component:Login
    }
]

export default new VueRouter({
    routes,
})
