<template>
	<div class="wx-menu-sub">
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe
			ref="multipleTable">
			<el-table-column  label='菜单名称'>
				<template slot-scope='scope'>
					<el-input v-model='scope.row.name'></el-input>
				</template>
			</el-table-column>
			<el-table-column  label='菜单链接'>
				<template slot-scope='scope'>
					<el-input v-model='scope.row.uri'></el-input>
				</template>
			</el-table-column>
			<el-table-column  label='排序'>
				<template slot-scope='scope'>
					<el-input v-model='scope.row.sort'></el-input>
				</template>
			</el-table-column>
			<el-table-column fixed='right' label='操作' width='200'>
				<template slot-scope="scope">
					<el-button type='text' size='small' @click='deleteItem(scope.row)'>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div>
			<el-button  type='info' size='small' icon='el-icon-back' @click='$router.back()'>返回</el-button>
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
						id : 1,
						name : '菜单名称',
						uri : 'http://flag.xmwxxx.com',
						sort : 0
					}
				]
			}
		},
		created  () {
			
		},
		//mounted () {},
		methods : {
			
		}
	}
</script>