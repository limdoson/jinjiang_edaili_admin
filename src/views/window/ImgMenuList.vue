<template>
	<div class="swiper-list">
		<el-row class="search-header">
			<el-col :span='2'>
				<el-button type="primary" size="small" @click="showDialog = true">添加轮播图</el-button>
			</el-col>
		</el-row>
		<el-alert
			title="轮播图只允许添加两个,如有超过两个轮播图存在,系统仅会显示排序最靠前的两个轮播图."
			type="warning"
			show-icon>
		</el-alert>
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}">
			<el-table-column prop="id" label="id"></el-table-column>
			<el-table-column prop="title" label="轮播图名称">
				<template slot-scope='scope'>
					<el-input v-model="scope.row.title" @change='changeItem(scope.row)'></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="sort" label="排序">
				<template slot-scope='scope'>
					<el-input v-model="scope.row.sort" @change='changeItem(scope.row)'></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="title" label="操作">
				<template slot-scope='scope'>
					<el-button type="text" size="small" @click='toUpload(scope.row)'>编辑导航项</el-button>
					<el-button type="text" size="small" @click='deleteItem(scope.row)'>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination s-b">
			<div></div>
			<el-pagination
			  background
			  @current-change='currentChange'
			  layout="prev, pager, next"
			  :total="total">
			</el-pagination>
		</div>
		<!-- dialog -->
		<el-dialog  
			:visible.sync='showDialog' 
			:append-to-body='true'
			:close-on-click-modal='false'
			:show-close='false'>
			<el-form ref="form" label-width="120px">
				<el-form-item label='轮播图名称'>
					<el-input type='text' v-model='title'></el-input>
				</el-form-item>
				<el-form-item label='排序' >
					<el-input type='number' v-model='sort'></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="cancalAdd" size='small'>取 消</el-button>
			    <el-button type="primary" @click="curfirmAdd" size='small'>确 定</el-button>
		  	</span>
		</el-dialog>
		<!-- dialog end -->
	</div>
</template>

<script>
	export default {
		data () {
			return {
				showDialog :false,
				list : null,
				page :1,
				limit : 10,
				total : 1,
				title : null,
				sort : null,
			}
		},
		created () {
			this.initData();
		},
		methods: {
			initData () {
				this.http.post('/v1/a_shopIndex/listNavDiv',{
					page : this.page,
					limit : this.limit
				}).then(res => {
					this.list = res.data.data;
					this.total = res.data.total;
				})
			},
			currentChange (page) {
				this.page = page;
				this.initData()
			},
			changeItem (item) {
				this.http.post('/v1/a_shopIndex/updNavDiv',{
					id :item.id,
					title : item.title,
					sort : item.sort
				}).then(res =>{
					this.utils.msg(res.msg)
				})
			},
			deleteItem (item) {
				this.http.post('/v1/a_shopIndex/delNavDiv',{
					id : item.id
				}).then(res => {
					this.utils.msg(res.msg);
					this.initData();
				})
			},
			cancalAdd () {
				this.showDialog = false;
				this.title = null;
				this.sort = null;
			},
			curfirmAdd () {
				if (!this.title) {
					this.utils.msg('请填写轮播图名称');
					return;
				}
				if (!this.sort) {
					this.utils.msg('请填写轮播图排序');
					return;
				}
				this.http.post('/v1/a_shopIndex/addNavDiv',{
					title : this.title,
					sort : this.sort,
				}).then(res =>{
					this.utils.msg('添加成功');
					this.title = null;
					this.sort = null;
					this.showDialog = false;
					this.initData();
				})
			},
			toUpload (item) {
				this.$router.push('/index/img-menu-detail/'+item.id)
			}
		}
	}
</script>

<style>
</style>
