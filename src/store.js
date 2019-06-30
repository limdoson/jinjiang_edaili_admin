import Vue from 'vue'
import Vuex from 'vuex'
import VuexAlong from 'vuex-along'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        admin_info : null,//登录者用户信息
		transaction_pwd :true ,//是否已设置过充值密码
    },
    mutations : {
		//初始化登陆者用户信息
		initAdminInfo (state,payload){
			state.admin_info = payload;
		},
		//修改交易密码状态的方法
		changeTratPwd (state,payload) {
			state.transaction_pwd = payload;
		},
		//重置state
		resetState (state) {
			state.admin_info = null;
			state.transaction_pwd = false;
		}
	},
    actions : {
		
	},
	plugins : [VuexAlong]
})
