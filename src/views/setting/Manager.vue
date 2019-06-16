<template>
	<div class="manager">
		<el-button 
			type='primary' 
			size='small' 
			icon='el-icon-circle-plus-outline'
			@click="$router.push('manager-handle')">添加管理员</el-button>
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe
			ref="multipleTable">
			<el-table-column prop='id' label='ID'></el-table-column>
			<el-table-column prop='acount' label='账号'></el-table-column>
			<el-table-column prop='role' label='角色'></el-table-column>
			<el-table-column prop='user_name' label='使用者姓名'></el-table-column>
			<el-table-column prop='tel' label='电话'></el-table-column>
			<el-table-column prop='time' label='创建时间'></el-table-column>
			<el-table-column prop='ip' label='最后登录IP'></el-table-column>
			<el-table-column fixed='right' label='操作' width='200'>
				<template slot-scope="scope">
					<el-button type='text' size='small' @click="$router.push('manager-handle/18')">编辑</el-button>
					<el-button type='text' size='small' @click='deleteItem(scope.row)'>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--分页-->
		<div class="pagination s-b">
			<span></span>
			<el-pagination
			  	background
			  	layout="prev, pager, next"
			  	:total="count">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	export default {
		components : {},
		data () {
			return {
				list : [
					{
						id :1,
						acount : 'admin',
						role : '超级管理员',
						user_name : '林杜森',
						tel : 15960209969,
						name : '测试组',
						time : '2019-01-02',
						ip : '127.0.0.1'
					}
				],
				count :1
			}
		},
		created  () {
			
		},
		//mounted () {},
		methods : {
			
		}
	}
</script>