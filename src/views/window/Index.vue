<template>
	<div class="">
		<el-row class="search-header">
			<el-col :span='2'>
				<el-button type="primary" size="small" @click="$router.push('window-add')">添加广告橱窗</el-button>
			</el-col>
		</el-row>
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}">
			<el-table-column prop="id" label="ID"></el-table-column>
			<el-table-column prop="title" label="广告橱窗名称"></el-table-column>
			<el-table-column prop="type" label="橱窗类型"></el-table-column>
			<el-table-column prop="time" label="添加时间"></el-table-column>
			<el-table-column prop="sort" label="排序">
				<template slot-scope='scope'>
					<el-input class="mini-input" v-model='scope.row.sort'></el-input>
				</template>
			</el-table-column>
			<el-table-column  label="是否显示">
				<template slot-scope='scope'>
					<el-switch v-model="scope.row.is_show" active-text="显示" inactive-text="隐藏"></el-switch>
				</template>
			</el-table-column>
			<el-table-column prop="" label="操作">
				<template slot-scope='scope'>
					<el-button type="text" size="small">编辑</el-button>
					<el-button type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				list : [
					{
						id :1,
						title : '名称1',
						type : '类型',
						sort :1,
						is_show : true,
						time : '2018-08-08'
					}
				]
			}
		},
		created () {
			
		},
		
		methods : {
			
		},
		//mounted () {},
		// watch () {
		// 	a (n,o) {
		// 		
		// 	}
		// },
		// computed () {
		// 	a () {
		// 		return this.a
		// 	}
		// },
	}
</script>
