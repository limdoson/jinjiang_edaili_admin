import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

//引入工具类对象
import utils from '@u/index';
Vue.prototype.utils = utils;


Vue.config.productionTip = false

import '@ast/css/app.less';

new Vue({
    router,
    store,
    render : h => h(App)
}).$mount('#app')
