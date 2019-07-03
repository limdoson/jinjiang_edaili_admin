<template>
	<div class="">
		<el-row class="search-header">
			<el-col :span='2'>
				<el-button type="primary" size="small" @click="$router.push('swiper-handle')">添加轮播图</el-button>
			</el-col>
		</el-row>
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}">
			<el-table-column prop="id" label="ID"></el-table-column>
			<el-table-column prop="title" label="图片">
				<template slot-scope='scope'>
					<up-load v-model='scope.row.img' @change='changeItem(scope.row)'></up-load>
				</template>
			</el-table-column>
			<el-table-column prop="type" label="链接">
				<template slot-scope='scope'>
					<el-input v-model="scope.row.url" @change='changeItem(scope.row)'></el-input>
				</template>
			</el-table-column>
			<!-- <el-table-column prop="time" label="最近编辑时间"></el-table-column> -->
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
					<el-button type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination s-b">
			<span></span>
			<el-pagination
			  background
			  :current-change='currentChange'
			  layout="prev, pager, next"
			  :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				list : null,
				limit :10,
				page :1,
				total : 1
			}
		},
		created () {
			this.initData()
		},
		
		methods : {
			initData () {
				this.http.post('/v1/a_shopIndex/getFlashList',{
					limit : this.limit,
					page : this.page
				}).then(res => {
					console.log(res)
					this.total = res.data.total;
					this.list = res.data.data;
				})
			},
			//编辑
			changeItem (item) {
				this.http.post('/v1/a_shopIndex/updFlash',{
					id : item.id,
					img : item.img,
					url : item.url,
					sort :item.sort,
					status : item.status,
				}).then(res => {
					this.utils.msg(res.msg)
				})
			},
			currentChange (page) {
				this.page = page;
				this.initData();
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
