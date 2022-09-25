import { reqCategoryList ,reqBannerList,reqFloorList} from "@/api";
// home仓库
// state：仓库存储数据的地方
const state ={
    categoryList:[],
    bannerList:[],
    floorList:[]
};
// mutations：修改state的唯一手段
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    BANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    FLOORLIST(state,floorList){
        state.floorList = floorList
    }
};
// actions：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // 通过API
    async categoryList({commit}){
        // {commit}是解构赋值,对于context.commit
        let result = await reqCategoryList();
        if(result.code==200){
            commit('CATEGORYLIST',result.data)

        }
    },
    async bannerList({commit}){
        let result = await reqBannerList();
        if(result.status==200){
            commit('BANNERLIST',result.data)
        }
    },
    async floorList({commit}){
        let result = await reqFloorList();
        console.log(result);
        if(result.status==200){
            commit('FLOORLIST',result.data)
        }
    }
};
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}