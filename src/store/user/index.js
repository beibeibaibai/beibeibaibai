import Cookie from 'js-cookie'
const  actions = {
    
}


const mutations = {
    SETTOKEN(state,val){
        state.token = val
        Cookie.set('token', val)
    },
    CLEARTOKEN(state){
        state.token =''
        Cookie.remove('token')
    },
    GETTOKEN(state){
        state.token = state.token || Cookie.get('token')
    }
}

const  state = {
    token:''
}

export default {
    actions,
    mutations,
    state
}