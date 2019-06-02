<template>
	<div class="">
		<!-- 默认分享设置 -->
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<h1>默认分享设置</h1>
			</div>
			<div class="form-container">
				<el-form label-width="180px">
					<el-form-item label="分享标题">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="分享描述">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="分享图片">
						<el-input></el-input>
					</el-form-item>
				</el-form>
			</div>
			
		</el-card>
		<!-- 代理分享设置 -->
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<h1>邀请代理分享设置</h1>
			</div>
			<div class="form-container">
				<el-form label-width="180px">
					<el-form-item label="分享标题">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="分享描述">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="分享图片">
						<el-input></el-input>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
		<div class="text-center">
			<el-button type="primary" size="small">保存设置</el-button>
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
<style lang="less">
	.box-card {
		margin-bottom: 6px;
	}
</style>
