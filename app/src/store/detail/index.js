import { reqGoodsInfo } from "@/api";
import { reqAddOrderUpdateShopCart } from "@/api"
// 封装游客身份模块uuid--->生成一个随机字符串且不能改变
import {getUUID} from '@/utils/uuid_token'
// home仓库
// state：仓库存储数据的地方
const state = {
    goodInfo: {},
    // 游客临时身份
    uuid_token:getUUID()
};
// mutations：修改state的唯一手段
const mutations = {
    GOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
};
// actions：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 通过API
    async goodInfo({ commit }, skuId) {
        // {commit}是解构赋值,对于context.commit
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit('GOODINFO', result.data)

        }
    },
    async addOrderUpdateShopCart({ commit }, { skuId, skuNum }) {
        // {commit}是解构赋值,对于context.commit
        // 加入购物车以后，前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其他数据，只是返回code==200，代表这次操作成功
        // 因为服务器没有返回其他数据,所以仓库不需要存储数据
        let result = await reqAddOrderUpdateShopCart(skuId, skuNum);
        console.log(result);
    }

};
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    categoryView(state) {
        // 比如：state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
        // 当前计算出来的categoryView属性值至少是一个空对象，假的报错就不会有了
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        // 比如：state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
        // 当前计算出来的categoryView属性值至少是一个空对象，假的报错就不会有了
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}