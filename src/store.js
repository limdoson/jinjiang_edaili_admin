import Vue from 'vue'
import Vuex from 'vuex'
import VuexAlong from 'vuex-along'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        admin_info : null,//登录者用户信息
    },
    mutations : {
		//初始化登陆者用户信息
		initAdminInfo (state,payload){
			state.admin_info = payload;
		}
	},
    actions : {
		
	},
	plugins : [VuexAlong]
})
