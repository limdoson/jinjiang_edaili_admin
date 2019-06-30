<template>
	<div class="">
		<el-form label-width="120px" size="small">
			<el-form-item label="最小提现额">
				<el-input class='mini-input'></el-input>元
			</el-form-item>
			<el-form-item label="最大提现额">
				<el-input  class='mini-input'></el-input>元
			</el-form-item>
			<el-form-item label="手续费(百分比)">
				<el-input  class='mini-input'></el-input>%
			</el-form-item>
			<el-form-item label="账期">
				<el-input  class='mini-input'></el-input>天
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="small">保 存</el-button>
			</el-form-item>
		</el-form>
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
	}
</script>
