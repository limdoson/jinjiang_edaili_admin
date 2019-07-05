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
			<el-table-column prop="name" label="广告橱窗名称">
				<template slot-scope='scope'>
					<el-input  v-model='scope.row.name' @change='changeItem(scope.row)'></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="type" label="橱窗类型">
				<template slot-scope='scope'>
					<span v-if='scope.row.type == 1'>单图橱窗</span>
					<span v-if='scope.row.type == 2'>多图多列橱窗</span>
					<span v-if='scope.row.type == 3'>三图橱窗</span>
					<span v-if='scope.row.type == 4'>多图可滚动橱窗</span>
				</template>
			</el-table-column>
			<!-- <el-table-column prop="time" label="添加时间"></el-table-column> -->
			<el-table-column prop="sort" label="排序">
				<template slot-scope='scope'>
					<el-input class="mini-input" v-model='scope.row.sort' @change='changeItem(scope.row)'></el-input>
				</template>
			</el-table-column>
			<!-- <el-table-column  label="是否显示">
				<template slot-scope='scope'>
					<el-switch v-model="scope.row.is_show" active-text="显示" inactive-text="隐藏"></el-switch>
				</template>
			</el-table-column> -->
			<el-table-column prop="" label="操作">
				<template slot-scope='scope'>
					<el-button type="text" size="small" @click="$router.push('/index/window-add/'+scope.row.id)">编辑</el-button>
					<el-button type="text" size="small" @click='deleteItem(scope.row)'>删除</el-button>
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
				list : null
			}
		},
		created () {
			this.initData();
		},
		
		methods : {
			initData(){
				this.http.post('/v1/a_shopIndex/getWindowList',{
					
				}).then(res => {
					this.list = res.data.data;
					console.log(res)
				})
			},
			changeItem(item) {
				this.http.post('/v1/a_shopIndex/updWindow',{
					name : item.name,
					sort : item.sort
				}).then(res => {
					this.utils.msg(res.msg)
				})
			},
			deleteItem(item) {
				this.http.post('/v1/a_shopIndex/delWindow',{
					id : item.id
				}).then(res => {
					this.utils.msg('删除成功');
					this.initData();
				})
			}
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
