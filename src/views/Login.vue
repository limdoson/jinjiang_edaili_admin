<template>
	<div class="login c-c">
		<div class="container ">
			<div class="input-item f-s">
				<el-input type='text' v-model='user_name' placeholder='请输入登录用户名'></el-input>
			</div>
			<div class="input-item f-s">
				<el-input type='password' v-model='password' placeholder='请输入登录密码'></el-input>
				
			</div>
			<div class="input-item f-s">
				<el-input type='text' placeholder='请输入验证码' v-model='code' maxlength='4'></el-input>
				<span class="code" @click='resetCode'>{{code_created}}</span>
			</div>
			<div class="c-c">
				<el-button type='primary' @click='loginHandle'>登录</el-button>
			</div>
			
		</div>
	</div>
</template>
<script>
	import Code from '../utils/code.js';
	export default {
		components : {},
		data () {
			return {
				user_name : null,
				password : null,
				code : null,
				code_created : null
			}
		},
		created  () {
			this.code_created = Code.createCode();
		},
		//mounted () {},
		methods : {
			loginHandle () {
				if (!this.user_name) {
					this.utils.msg('登录用户名不能为空');
					return;
				}
				if (!this.user_name) {
					this.utils.msg('登录密码不能为空');
					return;
				}
				let code_result = Code.checkCode(this.code);
				if (!code_result) {
					this.utils.msg('验证码错误');
					return;
				}
				
			},
			resetCode () {
				Code.createCode();
				this.code_created = Code.createCode();
			}
		}
	}
</script>