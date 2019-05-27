<template>
	<div class="role">
		<el-button 
			type='primary' 
			size='small' 
			icon='el-icon-circle-plus-outline'
			@click="$router.push('role-handle')">添加角色</el-button>
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe
			ref="multipleTable">
			<el-table-column prop='id' label='ID'></el-table-column>
			<el-table-column prop='name' label='角色名称'></el-table-column>
			<el-table-column prop='operator' label='添加人员'></el-table-column>
			<el-table-column prop='time' label='添加时间'></el-table-column>
			<el-table-column fixed='right' label='操作' width='200'>
				<template slot-scope="scope">
					<el-button type='text' size='small' @click="$router.push('role-handle/'+scope.row.id)">编辑</el-button>
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
						name : '测试组',
						time : '2019-01-02',
						operator : '超级管理员'
					}
				],
				count :1
			}
		},
		created  () {
			
		},
		//mounted () {},
		methods : {
			/*
			 * 删除角色
			 */
			deleteItem (item) {
				
			}
		}
	}
</script>