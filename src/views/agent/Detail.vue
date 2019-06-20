<template>
	<div class="">
		<div class="form-container s-a" v-if='agent_info'>
			<el-form label-width="180px">
				<el-form-item label='用户编号:'>
					<el-input disabled :value='agent_info.user_id'></el-input>
				</el-form-item>
				<el-form-item label='真实姓名:'>
					<el-input  v-model='agent_info.realname'></el-input>
				</el-form-item>
				<el-form-item label='手机号码:'>
					<el-input  v-model='agent_info.tel'></el-input>
				</el-form-item>
				<el-form-item label='用户昵称:'>
					<el-input disabled :value='agent_info.nickname'></el-input>
				</el-form-item>
				<el-form-item label='注册时间:'>
					<el-input disabled :value='agent_info.add_time'></el-input>
				</el-form-item>
				<el-form-item label='推荐人'>
					<el-input disabled :value='agent_info.recommend'></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="info" icon='el-icon-back' size="small" @click='$router.back()'>返回</el-button>
					<el-button type="primary" size="small" @click='update'>保存修改</el-button>
				</el-form-item>
			</el-form>
			<el-form label-width="180px">
				<el-form-item label='代理等级:'>
					<el-input disabled :value='agent_info.level_name'></el-input>
				</el-form-item>
				<el-form-item label='进货折扣:'>
					<el-input disabled :value='agent_info.discount'></el-input>
				</el-form-item>
				<el-form-item label='累计进货额:'>
					<el-input disabled :value='agent_info.purchase_amount'></el-input>
				</el-form-item>
				<el-form-item label='总佣金'>
					<el-input disabled :value='agent_info.amount'></el-input>
				</el-form-item>
				<!-- <el-form-item label='累计获得分销佣金:'>
					<el-input readonly value='500'></el-input>
				</el-form-item> -->
				<el-form-item label='货款:'>
					<el-input readonly :value='agent_info.purchase_money'></el-input>
				</el-form-item>
				
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				agent_info : null
			}
		},
		created () {
			this.initData();
		},
		
		methods : {
			initData () {
				this.http.post('/v1/a_agent/getOne',{
					id : this.$route.params.id
				}).then( res => {
					this.agent_info = res.data;
				})
			},
			update () {
				this.http.post('/v1/a_agent/update',{
					id : this.$route.params.id,
					realname : this.agent_info.realname,
					tel : this.agent_info.tel
				}).then(res => {
					this.utils.msg(res.msg)
				})
			}
		},
		//mounted () {},
		// watch () {
		// 	a (n,o) {
		// 		
		// 	}
		// },
		// computed () {
		// 	a () {
		// 		return this.a
		// 	}
		// },
	}
</script>
