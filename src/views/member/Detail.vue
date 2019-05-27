<template>
	<div class="">
		<div class="form-container s-a">
			<el-form label-width="180px">
				<el-form-item label='用户编号:'>
					<el-input readonly value='1'></el-input>
				</el-form-item>
				<el-form-item label='真实姓名:'>
					<el-input readonly value='林杜森'></el-input>
				</el-form-item>
				<el-form-item label='手机号码:'>
					<el-input readonly value='15960209969'></el-input>
				</el-form-item>
				<el-form-item label='用户昵称:'>
					<el-input readonly value='林'></el-input>
				</el-form-item>
				<el-form-item label='注册时间:'>
					<el-input readonly value='1920-08-01'></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="info" icon='el-icon-back' size="small" @click='$router.back()'>返回</el-button>
				</el-form-item>
			</el-form>
			<el-form label-width="180px">
				<el-form-item label='用户身份:'>
					<el-input readonly value='分销商'></el-input>
				</el-form-item>
				<el-form-item label='消费金额:'>
					<el-input readonly value='2000'></el-input>
				</el-form-item>
				<el-form-item label='团队人数:'>
					<el-input readonly value='100'></el-input>
				</el-form-item>
				<el-form-item label='账户余额:'>
					<el-input readonly value='600'></el-input>
				</el-form-item>
				<el-form-item label='累计获得佣金:'>
					<el-input readonly value='500'></el-input>
				</el-form-item>
				<el-form-item label='待提现佣金:'>
					<el-input readonly value='20'></el-input>
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
				
			}
		},
		created () {
			
		},
		
		methods : {
			
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
