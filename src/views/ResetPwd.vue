<template>
	<div class="login c-c" >
		<div class="container">
			<h1>修改登录密码</h1>
			<div class="input-item f-s">
				<el-input type='text' v-model='oldPwd' placeholder='请输入原密码'></el-input>
			</div>
			<div class="input-item f-s">
				<el-input type='text' v-model='newPwd' placeholder='请输入新密码'></el-input>
				
			</div>
			<div class="input-item f-s">
				<el-input type='text' placeholder='请再次确认信密码' v-model='oncePwd'></el-input>
			</div>
			<div class="c-c">
				<el-button type='primary' @click='confirm'>确认修改</el-button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		components : {},
		data () {
			return {
				oldPwd : null,
				newPwd : null,
				oncePwd : null
			}
		},
		created  () {
			console.log(this.$store.state)
		},
		//mounted () {},
		methods : {
			confirm () {
				if (!this.oldPwd) {
					this.utils.msg('请输入新密码');
					return;
				}
				if (!this.newPwd) {
					this.utils.msg('请输入新密码');
					return;
				}
				if (!this.oncePwd) {
					this.utils.msg('请再次确认新密码');
					return;
				}
				if (this.newPwd != this.oncePwd) {
					this.utils.msg('两次输入的密码不一致，请重新输入');
					return;
				}
				this.http.post('/v1/a_admin/updPwd',{
					id : this.$store.state.admin_info.id,
					oldPwd : this.oldPwd,
					newPwd : this.newPwd,
					oncePwd : this.oncePwd
				}).then( res =>{
					console.log(res)
				})
				
			},
		}
	}
</script>
<style scoped lang='less'>
	h1 {
		margin-bottom: 10px;
		text-align : center;
		font-size: 16px;
		color: #fff;
	}
</style>