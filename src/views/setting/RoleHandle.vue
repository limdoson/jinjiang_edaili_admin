<template>
	<div class="role-handle">
		<div class="form-container">
			<el-form ref="form" label-width="180px">
				<el-form-item label='角色名称'>
					<el-input width='200'></el-input>
				</el-form-item>
				<el-form-item label="后台操作权限">
					<el-checkbox-group class="" v-model='operation_authority'>
						<el-checkbox :label='1'>添加管理员</el-checkbox>
						<el-checkbox :label='2'>货款结算</el-checkbox>
						<el-checkbox :label='3'>运费结算</el-checkbox>
						<el-checkbox :label='4'>商品上架/下架</el-checkbox>
						<el-checkbox :label='5'>添加供应商</el-checkbox>
						<el-checkbox :label='6'>添加/发放优惠券</el-checkbox>
						<el-checkbox :label='7'>用户身份转换</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label='后台访问权限'>
					<el-tree
						:data='jdt_options'
						show-checkbox
						node-key='id'
						ref="tree"></el-tree>
				</el-form-item>
				
				<el-form-item>
					<el-button type='info' size='small' icon='el-icon-back' @click='$router.back()'>返回</el-button>
					<el-button type='primary' size='small' icon='el-icon-upload2' @click='showData'>保存</el-button>
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
				jdt_options : [
					{
						label : '权限1',
						value : '/index',
						id : 1
					},{
						label : '权限2',
						value : '/index/jdt',
						id :2
					}
				],//权限数据
				operation_authority : [],
			}
		},
		created  () {
			
		},
		//mounted () {},
		methods : {
			/*
			 * jdtOptionsCheck
			 */
			jdtOptionsCheck (data) {
				console.log(data);
			},
			/*
			 * 
			 */
			showData () {
				console.log(this.$refs.tree.getCheckedNodes())
			}
		}
	}
</script>