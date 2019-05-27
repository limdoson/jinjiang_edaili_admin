<template>
	<div class="wx-config">
		<div class="form-container">
			<el-form ref="form" label-width="130px">
				<el-form-item label='公众号名称'>
					<el-input></el-input>
				</el-form-item>
				<el-form-item label='公众号AppId'>
					<el-input></el-input>
				</el-form-item>
				<el-form-item label='AppSecret'>
					<el-input></el-input>
				</el-form-item>
				<el-form-item label='TOKEN'>
					<el-input></el-input>
				</el-form-item>
				<el-form-item label='微信支付商户号'>
					<el-input></el-input>
				</el-form-item>
				<el-form-item label='商户号秘钥'>
					<el-input></el-input>
				</el-form-item>
				<el-form-item label='公众号二维码'>
					<el-upload
						action="https://jsonplaceholder.typicode.com/posts/"
						:limit='1'>
						<el-button size='small' type='primary' icon='el-icon-upload'>点击上传</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label='公钥证书'>
					<el-upload
						action="https://jsonplaceholder.typicode.com/posts/"
						:limit='1'>
						<el-button size='small' type='primary' icon='el-icon-upload'>点击上传</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label='私钥证书'>
					<el-upload
						action="https://jsonplaceholder.typicode.com/posts/"
						:limit='1'>
						<el-button size='small' type='primary' icon='el-icon-upload'>点击上传</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item>
					<el-button type="primary"  size='small' icon='el-icon-upload2'>保存设置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	export default {
		components : {},
		data () {
			return {
				
			}
		},
		created  () {
			
		},
		//mounted () {},
		methods : {
			
		}
	}
</script>