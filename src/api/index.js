import axios from "axios";

import config from "@/config";

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev:config.baseUrl.pro

class HttpRequest {
    constructor(){
        this.baseUrl = baseUrl
    }

    getInsideConfig(){
        const config = {
            baseUrl: this.baseUrl,
            Header:{}
        }
        return config
    }
   
    interceptors(instance){ 
        // 请求拦截器
        instance.interceptors.request.use((config)=>{
            return config
        },(error)=>{
            return  Promise.reject(error)
        })
         // 相应拦截器
        instance.interceptors.response.use((response)=>{
            return response
        },(error)=>{
            return Promise.reject(error)
        })
    }

    request(options){
        const instance = axios.create()
        options = {...this.getInsideConfig(),...options}
        this.interceptors(instance)
        return instance(options)
    }
    
}

export default new HttpRequest(baseUrl)