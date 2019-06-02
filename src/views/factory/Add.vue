<template>
	<div class="">
		<div class="form-container">
			<el-form label-width="180px">
				<el-form-item label="供应商名称">
					<el-input></el-input>
				</el-form-item>
				<el-form-item label="供应商姓名">
					<el-input></el-input>
				</el-form-item>
				<el-form-item label="供应商手机号码">
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
				<el-form-item label='供应商所在地区'>
					<el-cascader
						:options="options"
						v-model="selectedOptions">
					</el-cascader>
				</el-form-item>
				<el-form-item label='供应商详细地址'>
					<el-input></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small">保存</el-button>
					<el-alert
						title="添加供应商后，系统将自动为供应商生成一个代理商账户，供应商可凭借账号密码，登录代理商系统，自动生成的代理商级别为最低一级代理商。"
						type="warning"
						show-icon>
					</el-alert>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import cityData from '@cfg/country-data'
	export default {
		components: {},
		data () {
			return {
				options : cityData,
				selectedOptions : null
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
