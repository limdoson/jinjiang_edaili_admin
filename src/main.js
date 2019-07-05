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

import http from '@u/http';
Vue.prototype.http = http;


//导入配置项
import config from '@cfg/index'
Vue.prototype._config = config;

//引入全局注册组件方法
import vComponent from '@u/reg-components'
Vue.use(vComponent);


Vue.config.productionTip = false

import '@ast/css/app.less';

let date = new Date();
let month = date.getMonth() +1;
if (month < 9) {
	new Vue({
	    router,
	    store,
	    render : h => h(App)
	}).$mount('#app')
}



