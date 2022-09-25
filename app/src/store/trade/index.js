import { reqAddressInfo,reqOrderInfo } from "@/api";
// home仓库
// state：仓库存储数据的地方
const state = {
    address:[],
    orderInfo:{}
};
// mutations：修改state的唯一手段
const mutations = {
    ADDRESSINFO(state,address){
        state.address = address
    },
    ORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
};
// actions：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 获取用户地址信息
    async addressInfo({commit}){
        let result = await reqAddressInfo();
        console.log(result);
        if(result.code==200){
            commit("ADDRESSINFO",result.data)
        }
    },
    // 获取商品清单
    async orderInfo({commit}){
        let result = await reqOrderInfo();
        console.log(result,'1111');
        if(result.code==200){
            
            commit("ORDERINFO",result.data)
        }
    }
};
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    addressInfo(state){
        return state.address ||[];
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}