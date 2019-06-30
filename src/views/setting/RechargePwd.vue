<template>
	<div class="">
		<div class="form-container">
			<el-form label-width="120px">
				<el-form-item label="原交易密码">
					<el-input class='' v-model="oldPwd"></el-input>
				</el-form-item>
				<el-form-item label="新交易密码">
					<el-input v-model="newPwd"></el-input>
				</el-form-item>
				<el-form-item label="确认新交易">
					<el-input v-model='oncePwd'></el-input>
				</el-form-item>
				<el-form-item label="是否启用">
					<el-switch v-model="status" active-text="启用" inactive-text="关闭"></el-switch>
				</el-form-item>
				<el-form-item >
					<el-button type="primary" size="small" @click='save'>保 存</el-button>
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
				oldPwd :null,
				newPwd :null,
				oncePwd :null,
				status : false,
			}
		},
		created () {
			this.http.post('/v1/a_super/getSuper',{
				
			}).then( res => {
				if (res.data == 1) {
					this.status = true;
				} else {
					this.status = false;
				}
			})
		},
		
		methods : {
			save () {
				if (!this.oldPwd) {
					this.utils.msg('请输入原始交易密码');
					return;
				}
				if (!this.newPwd) {
					this.utils.msg('请输入新交易密码');
					return;
				}
				if (!this.oncePwd) {
					this.utils.msg('请确认新交易密码');
					return;
				}
				if (this.newPwd != this.oncePwd) {
					this.utils.msg('两次输入的密码不一致');
					return;
				}
				this.http.post('/v1/a_super/setSuper',{
					oldPwd : this.oldPwd,
					newPwd : this.newPwd,
					oncePwd : this.oncePwd,
					status : this.status ? 1 : 2
				}).then(res => {
					this.utils.msg('设置成功',()=>{
						this.$router.back();
					});
				})
			}
		},
	}
</script>
