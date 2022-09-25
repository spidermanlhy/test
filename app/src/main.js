import Vue from 'vue'
import App from './App.vue'
// 定义全局组件：在入口文件注册一次之后，在任何组件当中都可以使用
// 三级联动组件——全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'

import { Button,MessageBox } from 'element-ui';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// 统一接受api文件夹里面全部请求函数
import * as API from '@/api'
// 引入插件
import VueLazyload from 'vue-lazyload'
import lcw from '@/assets/1.gif'

// 注册全局组件：第一个参数 组件名字  第二个参数 组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// Vue.component(Select.name, Select);
// Vue.use(ElementUI);
Vue.use(VueLazyload,{
  loading:lcw
})

import router from '@/router'
import store from '@/store'
Vue.config.productionTip = false
// 引入mockServe
import '@/mock/mockServe'
// 引入swiper样式
import "swiper/css/swiper.css";
new Vue({
  render: h => h(App),
  // 全局事件总线$bus的配置
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库：组件实例的身上会多一个属性$store属性
  store
}).$mount('#app')
