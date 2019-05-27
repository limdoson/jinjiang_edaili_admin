<template>
	<div class="manager-handle">
		<div class="form-container">
			<el-form ref="form" label-width="80px">
				<el-form-item label='登录账号'>
					<el-input placeholder='请输入登录账号'></el-input>
				</el-form-item>
				<el-form-item label='登录密码'>
					<el-input placeholder='请输入登录密码'></el-input>
				</el-form-item>
				<el-form-item label='真实姓名'>
					<el-input placeholder='请输入账号使用者真实姓名'></el-input>
				</el-form-item>
				<el-form-item label='联系电话'>
					<el-input placeholder='请输入账号使用者联系电话'></el-input>
				</el-form-item>
				<el-form-item label='角色组'>
					<el-select placeholder="请选择账号所属角色组">
						<el-option label='角色1' value='1'></el-option>
						<el-option label='角色2' value='2'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type='info' size='small' icon='el-icon-back' @click='$router.back()'>返回</el-button>
					<el-button type='primary' size='small' icon='el-icon-upload2' @click='save'>保存</el-button>
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
			save () {
				
			}
		}
	}
</script>