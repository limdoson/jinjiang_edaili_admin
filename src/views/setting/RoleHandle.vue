<template>
	<div class="role-handle">
		<div class="form-container">
			<el-form ref="form" label-width="80px">
				<el-form-item label='角色名称'>
					<el-input width='200'></el-input>
				</el-form-item>
				<el-form-item label='角色权限'>
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