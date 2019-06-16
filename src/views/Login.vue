<template>
	<div class="login c-c" @keyup.enter="loginHandle">
		<div class="container">
			<div class="input-item f-s">
				<el-input type='text' v-model='account' placeholder='请输入登录用户名'></el-input>
			</div>
			<div class="input-item f-s">
				<el-input type='password' v-model='password' placeholder='请输入登录密码'></el-input>
				
			</div>
			<div class="input-item f-s">
				<el-input type='text' placeholder='请输入验证码' v-model='code' maxlength='4'></el-input>
				<span class="code" @click='getCode'>{{code_created}}</span>
			</div>
			<div class="c-c">
				<el-button type='primary' @click='loginHandle'>登录</el-button>
			</div>
			
		</div>
	</div>
</template>
<script>
	export default {
		components : {},
		data () {
			return {
				account : null,
				password : null,
				code : null,
				code_created : null
			}
		},
		created  () {
			this.getCode()
		},
		//mounted () {},
		methods : {
			loginHandle () {
				if (!this.account) {
					this.utils.msg('登录用户名不能为空');
					return;
				}
				if (!this.password) {
					this.utils.msg('登录密码不能为空');
					return;
				}
				if (!this.code) {
					this.utils.msg('请输入验证码');
					return;
				}
				this.http.post('/v1/a_admin/login',{
					account : this.account,
					password :this.password,
					code : this.code
				}).then(res => {
					//登录成功，将等着账号数据存入store
					this.$store.commit('initAdminInfo',res.data);
					this.$router.push('/index')
				})
			},
			getCode(){
				this.http.post('/v1/a_admin/code',{
					
				},false).then(res => {
					this.code_created = res.data;
				})
			}
		}
	}
</script>