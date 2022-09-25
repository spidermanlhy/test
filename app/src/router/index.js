// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes'
import store from '@/store'
// 使用插件
Vue.use(VueRouter);

// 配置路由
let originPush = VueRouter.prototype.push;

// 重写push|replace
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        // call|apply区别
        // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{ },()=>{ })
    }
}

let router = new VueRouter({
    // 配置路由
    routes,
    scrollBehavior (to, from, savedPosition) {
        return {y:0}
      }
    })
    // 全局守卫，前置守卫（在路由跳转前）
    router.beforeEach(async(to,from,next)=>{
        // next();
        // 用户登录了才会有登录
        let token = store.state.user.token;
        let name = store.state.user.userInfo.name;
        // 如果用户登录了
        if(token){
            // 用户已经登录了就不能再去login了
            if(to.path=='/login'){
                next('/')
                console.log('111');
            }else{
                // 登录了但去的不是login【home，search，shopcart】
                // 可以解决在其他页面刷新是用户信息丢失的问题！！！
                // 如果用户名已有
                if(name){
                    next();
                }else{
                    // 没有用户信息，派发action让仓库存储用户信息再跳转
                    try {
                        // 获取用户信息成功
                        await store.dispatch("userInfo");
                        next();
                    } catch (error) {
                        // token失效了
                        // 清除token
                        await store.dispatch("logout");
                        next('/login');
                    }
                }

            }
        }
        else{
            // 未登录:不能去交易相关，不能去支付相关【pay|paysuccess】，不能去个人中心
            
            let toPath = to.path;
            if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
                next('/login?redirect='+toPath);
            }else{
            // 去的不是上面这些路由就放行
              next();  
            }
            
        }
    })
export default router;