import Vue from 'vue'
import Vuex from 'vuex'
import VuexAlong from 'vuex-along'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        config : {
            
        }
    },
    mutations : {},
    actions : {},
	plugins : [VuexAlong]
})
