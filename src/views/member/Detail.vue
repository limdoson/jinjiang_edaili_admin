<template>
	<div class="">
		<div class="form-container s-a" v-if="user_info">
			<el-form label-width="180px">
				<el-form-item label='用户编号:'>
					<el-input disabled v-model='user_info.id'></el-input>
				</el-form-item>
				<el-form-item label='真实姓名:'>
					<el-input  v-model='user_info.realname'></el-input>
				</el-form-item>
				<el-form-item label='手机号码:'>
					<el-input  v-model='user_info.tel'></el-input>
				</el-form-item>
				<el-form-item label='用户昵称:'>
					<el-input disabled v-model='user_info.nickname'></el-input>
				</el-form-item>
				<el-form-item label='注册时间:'>
					<el-input disabled v-model='user_info.add_time'></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="info" icon='el-icon-back' size="small" @click='$router.back()'>返回</el-button>
					<el-button type="primary" size="small" @click='update'>保存修改</el-button>
				</el-form-item>
			</el-form>
			<el-form label-width="180px">
				<el-form-item label='用户身份:'>
					<el-input disabled :value="user_info.type == 1 ? '普通用户' : '分销商'"></el-input>
				</el-form-item>
				<el-form-item label='消费金额:'>
					<el-input disabled v-model='user_info.pay_money'></el-input>
				</el-form-item>
				<el-form-item label='团队人数:'>
					<el-input disabled  v-model='user_info.team_num'></el-input>
				</el-form-item>
				<el-form-item label='账户余额:'>
					<el-input disabled  v-model='user_info.balance'></el-input>
				</el-form-item>
				<el-form-item label='累计获得佣金:'>
					<el-input disabled v-model='user_info.commission'></el-input>
				</el-form-item>
				<!-- <el-form-item label='待提现佣金:'>
					<el-input readonly value='20'></el-input>
				</el-form-item> -->
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				user_info : null,
			}
		},
		created () {
			this.initData();
		},
		
		methods : {
			initData(){
				this.http.post('/v1/a_user/getOne',{
					id : this.$route.params.id
				}).then(res => {
					this.user_info = res.data;
				})
			},
			update () {
				this.http.post('/v1/a_user/update',{
					id : this.$route.params.id,
					realname : this.user_info.realname,
					tel : this.user_info.tel
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
