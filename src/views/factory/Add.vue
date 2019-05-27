<template>
	<div class="">
		<div class="form-container">
			<el-form label-width="180px">
				<el-form-item label="厂商名称">
					<el-input></el-input>
				</el-form-item>
				<el-form-item label="厂商联系人姓名">
					<el-input></el-input>
				</el-form-item>
				<el-form-item label="厂商联系人电话">
					<el-input></el-input>
					<el-alert
						title="该手机号码将作为厂商后台登录账号。"
						type="warning"
						show-icon>
					</el-alert>
				</el-form-item>
				<el-form-item label="无偿供货金额">
					<el-input></el-input>
					<el-alert
						title="请与厂商协商好后填写无偿供货金额数据。"
						type="warning"
						show-icon>
					</el-alert>
				</el-form-item>
				<el-form-item label="账号登录密码">
					<el-input></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small">保存</el-button>
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
