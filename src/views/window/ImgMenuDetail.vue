<template>
	<div class="">
		<!-- <el-row class="search-header">
			<el-col :span='2'>
				<el-button type="primary" size="small" @click="$router.push('swiper-handle')">上传图片</el-button>
			</el-col>
			<el-col :span='2'>
				<el-button type="info" size="small" @click="$router.back()">返回</el-button>
			</el-col>
		</el-row> -->
		<div class="form-container">
			<el-form label-width="140px">
				<el-form-item label="导航文本内容">
					<el-input v-model="content" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="导航链接">
					<el-input v-model="link" placeholder=""></el-input>
				</el-form-item>
				<el-form-item label="图片上传">
					<up-load v-model='img'></up-load>
				</el-form-item>
				<el-form-item >
					
					<el-button type="primary" size="small" @click='confirm'>添加导航项</el-button>
					<el-button type="info" size="small" icon='el-icon-back' @click="$router.back()">返回</el-button>
				</el-form-item>
			</el-form>
		</div>
		
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
		<!-- <div class="pagination s-b">
			<span></span>
			<el-pagination
			  background
			  :current-change='currentChange'
			  layout="prev, pager, next"
			  :total="total">
			</el-pagination>
		</div> -->
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
				total : 1,
				content : null,
				link : null,
				img : null
			}
		},
		created () {
			this.initData()
		},
		
		methods : {
			initData () {
				// this.http.post('/v1/a_shopIndex/getFlashList',{
				// 	limit : this.limit,
				// 	page : this.page
				// }).then(res => {
				// 	console.log(res)
				// 	this.total = res.data.total;
				// 	this.list = res.data.data;
				// })
			},
			//编辑
			changeItem (item) {
				// this.http.post('/v1/a_shopIndex/updFlash',{
				// 	id : item.id,
				// 	img : item.img,
				// 	url : item.url,
				// 	sort :item.sort,
				// 	status : item.status,
				// }).then(res => {
				// 	this.utils.msg(res.msg)
				// })
			},
			currentChange (page) {
				this.page = page;
				this.initData();
			},
			confirm () {
				if (!this.link || !this.img) {
					this.utils.msg('图片、导航链接、文本内容都必填');
					return;
				}
				this.http.post('/v1/a_shopIndex/addFlash',{
					img : this.img,
					url : this.link,
				}).then(res => {
					this.utils.msg(res.msg);
					this.img = null;
					this.link = null;
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
