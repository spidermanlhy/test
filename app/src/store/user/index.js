import {  reqGetCode, reqUserRegister ,reqUserLogin,reqUserInfo,reqLogout} from "@/api";
import Vue from "vue";
// search仓库
// states：仓库存储数据的地方
const state = {
    code:'',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
};
// mutations：修改state的唯一手段
const mutations = {
    GETCODE(state,code){
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token = token
    },
    USERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(){
        state.token = '';
        state.userInfo = {};
        localStorage.removeItem("TOKEN")
    }
};
// actions：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 获取验证码
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        if(result.code==200){
            commit("GETCODE",result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('fail'))
        }
        console.log(result);
    },
    // 注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
    // 登录
    async userLogin({commit},data){
      let result =  await reqUserLogin(data)
    //   服务器下发token，用户唯一标识
    if(result.code==200){
        commit("USERLOGIN",result.data.token);
        localStorage.setItem("TOKEN",result.data.token)
        return 'ok'
    }else{
        return Promise.reject(new Error('fail'));
    }
      
    },
    // 获取用户信息
    async userInfo({commit}){
        let result = await reqUserInfo()
        if(result.code==200){
            commit("USERINFO",result.data)
            return 'ok'
        }
        else{
            return Promise.reject(new Error('fail'))
        }
    },
    // 退出登录
    async logout({commit}){
        let result = await reqLogout()
        if(result.code==200){
            commit("CLEAR")
            return 'ok';
        }else{
            return Promise.reject(new Error('fail'))
        }
        
    }
};
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    // 当前形参state，当前仓库中的state，并非大仓库中的那个state

};
export default {
    state,
    mutations,
    actions,
    getters
}