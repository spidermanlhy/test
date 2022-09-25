import { reqSearchInfo } from "@/api";
import Vue from "vue";
// search仓库
// states：仓库存储数据的地方
const state ={
    searchList:{}
};
// mutations：修改state的唯一手段
const mutations = {
    SEARCHLIST(state,searchList){
        state,state.searchList = searchList
    }
};
// actions：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
   async searchList({commit},params={}){
    // 当前这个reqSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
    // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqSearchInfo(params)
        if(result.code==200){
            commit("SEARCHLIST",result.data)
        }
    }
};
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    // 当前形参state，当前仓库中的state，并非大仓库中的那个state
    goodsList(state){
        return state.searchList.goodsList||{}
    },
    trademarkList(state){
        return state.searchList.trademarkList||{}
    },
    attrsList(state){
        return state.searchList.attrsList||{}
    },
};
export default {
    state,
    mutations,
    actions,
    getters
}