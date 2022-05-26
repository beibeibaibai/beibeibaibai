// import router from '@/router';
import Cookie from 'js-cookie';
const  actions = {

}

const mutations = {
    COLLAPSEVALUE(state){
        state.isCollapse = !state.isCollapse
    },
    SELECTMENU(state,val){
        // 如果第一次点击的不是home
        if(val.name !== 'home'){
            state.currentMenu = val
            const result =  state.tabsList.findIndex(item =>item.name === val.name)
            if(result === -1){
                state.tabsList.push(val)
            }
        }else{
            state.currentMenu = null
        }
    },
    CLOSETAG(state,val){
        const result = state.tabsList.findIndex(item =>item.name === val.name)
        state.tabsList.splice(result,1)
    },
    SETMENU(state,val){
        state.menu = val
        Cookie.set('menu',JSON.stringify(val))
    },
    CLEARMENU(state, val){
        state.menu = []
        Cookie.remove('menu')
    },
    ADDMENU(state, router){
        if(!Cookie.get('menu')){
            return 
        }
        const menu = JSON.parse(Cookie.get('menu'))
        state.menu = menu
        const menuArray = []
        menu.forEach(item => {
            if(item.children){
                item.children = item.children.map(item =>{
                    item.component = () =>import(`../../pages/${item.url}`)
                    return item
                })
                menuArray.push(...item.children)
            }else{
                item.component = () =>import(`../../pages/${item.url}`)
                menuArray.push(item)
            }
        });
        // 路由动态添加
        menuArray.forEach(item =>{
            router.addRoute('Main', item)
        })
    }

}

const state = {
    isCollapse:false,
    tabsList:[
        {
            path:'/',
            name:'home',
            label:'首页',
            icon:'home'
        },
    ],
    currentMenu: null,
    menu:[]
}
export default {
    actions,
    mutations,
    state
}