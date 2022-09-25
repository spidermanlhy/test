import { reqCartList, reqDeleteCart, reqUpdateChecked } from "@/api";
import Vue from "vue";
// search仓库
// states：仓库存储数据的地方
const state = {
    cartList: []
};
// mutations：修改state的唯一手段
const mutations = {
    CARTLIST(state, cartList) {
        state.cartList = cartList
    }
};
// actions：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 获取购物车列表数据
    async cartList({ commit }, params = {}) {
        //
        let result = await reqCartList()

        if (result.code == 200) {
            commit("CARTLIST", result.data)
        }
    },
    // 删除购物车数据
    async deleteCart({ commit }, skuId) {
        //
        let result = await reqDeleteCart(skuId)
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    // 修改购物车某一产品的选中状态
    async updateChecked({ commit }, { skuId, isChecked }) {
        //
        let result = await reqUpdateChecked(skuId, isChecked)
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    // 删除全部勾选的产品
    deleteAllCart({ dispatch, getters }) {
        // context:小仓库，commit，getters,dispatch,state都有
        // 获取购物车中全部的产品（是个数组）
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch("deleteCart", item.skuId) : ''
            // 将每一次返回的promise添加到数组当中
            PromiseAll.push(promise);
        });
        return Promise.all(PromiseAll);
    },
    // 修改全部产品的状态
    updateAllChecked({ dispatch, state }, isChecked) {
        let PromiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch("updateChecked", { skuId: item.skuId, isChecked })
            PromiseAll.push(promise);
        });
        return Promise.all(PromiseAll);

    }
};
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    // 当前形参state，当前仓库中的state，并非大仓库中的那个state
    cartList(state) {
        return state.cartList[0] || {}
    },
    // 计算出来的购物车数据
    // cartInfoList(){

    // }
};
export default {
    state,
    mutations,
    actions,
    getters
}