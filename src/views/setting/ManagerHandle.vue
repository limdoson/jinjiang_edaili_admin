<template>
	<div class="manager-handle">
		<div class="form-container">
			<el-form  label-width="80px" :rules="rules" :model="form_data" ref="ruleForm">
				<el-form-item label='登录账号' prop='account'>
					<el-input placeholder='请输入登录账号' v-model="form_data.account"></el-input>
				</el-form-item>
				<el-form-item label='登录密码' prop='password'>
					<el-input placeholder='请输入登录密码' v-model="form_data.password"></el-input>
				</el-form-item>
				<el-form-item label='真实姓名' prop='realName' >
					<el-input placeholder='请输入账号使用者真实姓名' v-model="form_data.realName"></el-input>
				</el-form-item>
				<el-form-item label='联系电话'  prop='tel'>
					<el-input placeholder='请输入账号使用者联系电话' v-model="form_data.tel"></el-input>
				</el-form-item>
				<el-form-item label='角色组'  prop='power'>
					<el-select placeholder="请选择账号所属角色组" v-model="form_data.power">
						<el-option label='角色1' value='1'></el-option>
						<el-option label='角色2' value='2'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type='info' size='small' icon='el-icon-back' @click='$router.back()'>返回</el-button>
					<el-button type='primary' size='small' icon='el-icon-upload2' @click="save('ruleForm')">保存</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import  validator  from '@u/validator'
	export default {
		components : {},
		data () {
			return {
				form_data : {
					account : null,
					password :null,
					realName :null,
					tel : null,
					power : null
				},
				rules : {//表单验证
					account : [validator.checkRequired],
					password : this.$route.params.id ? null : [validator.checkRequired,{validator : validator.checkPwd}],
					realName : [validator.checkRequired,{validator : validator.checkName}],
					tel : [validator.checkRequired,{validator :validator.checkMobile}],
					power : [validator.checkRequired]
				}
			}
		},
		created  () {
			this.initData();
		},
		//mounted () {},
		methods : {
			initData () {
				if (this.$route.params.id) {
					
				}
			},
			save (form_name) {
				this.$refs[form_name].validate( valid => {
					if (valid) {//验证通过
						//根据是否有id来区分是新建操作还是编辑操作
						if (this.$route.params.id) {//编辑
							this.update()
						} else {//新建
							this.created()
						}
					} else {
						return false;
					}
				})
			},
			created () {
				this.http.post('/v1/a_admin/add',{
					account : this.form_data.account,
					realName : this.form_data.realName,
					password : this.form_data.password,
					tel : this.form_data.tel,
					power :this.form_data.power
				}).then(res => {
					this.utils.msg(res.data.msg);
					// this.reset();
				})
			},
			update () {
				this.http.post('/v1/a_admin/upd',{
					account : this.form_data.account,
					realName : this.form_data.realName,
					password : this.form_data.password,
					tel : this.form_data.tel,
					power :this.form_data.power
				}).then(res => {
					this.utils.msg(res.data.msg);
					// this.reset();
				})
			},
			reset () {
				this.form_data = {
					account : null,
					password :null,
					realName :null,
					tel : null,
					power : null
				}
			}
		}
	}
</script>