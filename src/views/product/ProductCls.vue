<template>
	<div class="">
		<el-row class="search-header">
			<el-button type="primary" size="small" @click='show_dialog = true'>添加商品分类</el-button>
		</el-row>
		<!-- 分类表格 -->
		<el-table
			:data='list'
			@selection-change="handleSelectionChange"
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe
			ref="multipleTable">
			<el-table-column
				type="selection"
				width="80">
			</el-table-column>
			<el-table-column prop='id' label='ID'></el-table-column>
			<el-table-column prop='name' label='分类名称'></el-table-column>
			<el-table-column prop='product_title' label='相关图片'>
				<template slot-scope='scope'>
					<img :src="scope.row.img" alt="" width="80px">
				</template>
			</el-table-column>
			<el-table-column prop='url' label='图片链接'></el-table-column>
			<el-table-column fixed='right' label='操作' width='200'>
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="$router.push('product-sub-cls/'+scope.row.id)">查看下级分类</el-button>
					<el-button type="text" size="small" @click="editItem(scope.row)">编辑</el-button>
					<el-button type="text" size="small" @click="deleteItem(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<div class="pagination s-b">
			<el-button type="danger" size="small" :disabled="disabled" @click='deleteSome'>批量删除</el-button>
			
		</div>
		<!-- 添加分类dialog -->
		<el-dialog 
			title='添加分类'
			:visible.sync="show_dialog"
			append-to-body
			:close-on-press-escape='false'
			:close-on-click-modal='false'
			:show-close='false'>
			<el-form label-width="180px">
				<el-form-item label='所属分类'>
					<el-cascader
					v-model='add_cls_parent'
					:options="options"
					:props="{ checkStrictly: true }"
					clearable></el-cascader>
					<el-alert
						title="不选择所屬分类则表示添加的是顶级分类"
						type="warning"
						show-icon>
					</el-alert>
				</el-form-item>
				<el-form-item label='分类名称'>
					<el-input v-model="add_cls_title" placeholder="请填写分类名称"></el-input>
				</el-form-item>
				<el-form-item label="相关图片" >
					<up-load v-model='add_cls_img'></up-load>
				</el-form-item>
				<el-form-item label='图片链接'>
					<el-input v-model="add_cls_link" placeholder=""></el-input>
				</el-form-item>
			</el-form>
			<div slot='footer'>
				<el-button size='small' type="default" @click='reset'>取 消</el-button>
				<el-button size='small' type="primary" @click='confirmAdd'>确认</el-button>
			</div>
		</el-dialog>
		<!-- 编辑分类 -->
		<el-dialog 
			title='添加分类'
			:visible.sync="show_edit_dialog"
			append-to-body
			:close-on-press-escape='false'
			:close-on-click-modal='false'
			:show-close='false'>
			<el-form label-width="180px" v-if='edit_item'>
				<!-- <el-form-item label='所属分类'>
					<el-cascader
					v-model="add_cls_parent"
					:options="options"
					:props="{ checkStrictly: true }"
					clearable></el-cascader>
				</el-form-item> -->
				<el-form-item label='分类名称'>
					<el-input v-model="edit_item.name" placeholder="请填写分类名称"></el-input>
				</el-form-item>
				<el-form-item label="分类图片" >
					<up-load v-model='edit_item.img'></up-load>
				</el-form-item>
				<el-form-item label='图片链接' >
					<el-input v-model="edit_item.url" placeholder=""></el-input>
				</el-form-item>
			</el-form>
			<div slot='footer'>
				<el-button size='small' type="default" @click='reset'>取 消</el-button>
				<el-button size='small' type="primary" @click='confirmEdit'>确认</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				list : null,
				select_list : [],//多选数据id集合
				disabled : true,//是否禁用批量操作按钮
				show_dialog :false,
				add_cls_parent : null,//所属分类
				add_cls_title : null,//添加分类-分类名称
				add_cls_img : null,//添加分类-广告图
				add_cls_link : null,//添加分类-广告图链接
				options : null,//分类选项
				show_edit_dialog : false,
				edit_item : null,//用来存储编辑时所编辑的数据
			}
		},
		created () {
			this.initData();
		},
		
		methods : {
			initData(){
				this.http.post('/v1/a_goods/typeGetTop',{
					
				}).then( res => {
					this.options = res.data.tree;
					this.list = res.data.top.data;
				})
			},
			handleSelectionChange (val) {
				this.select_list = val.map( item => {
					return item.id
				});
			},
			//隱藏dialog
			hideDialog () {
				this.reset();
			},
			//添加分类确认函数
			confirmAdd () {
				if (!this.add_cls_title) {
					this.utils.msg('请输入分类名称')
					return;
				}
				this.http.post('/v1/a_goods/typeAdd',{
					name : this.add_cls_title,
					f_id : this.add_cls_parent ? this.add_cls_parent[this.add_cls_parent.length -1] : 0,
					level : this.add_cls_parent ? this.add_cls_parent.length : 1,
					img : this.add_cls_img,
					url : this.add_cls_link
				}).then(res => {
					this.$message({
						showIcon : true,
						type : 'success',
						message : '添加成功'
					})
					this.reset();
					this.initData();
				})
			},
			//编辑
			editItem (item) {
				this.edit_item = item;
				console.log(this.edit_item)
				this.show_edit_dialog = true;
			},
			//编辑确认
			confirmEdit () {
				if (!this.edit_item.name) {
					this.utils.msg('请输入分类名称')
					return;
				}
				this.http.post('/v1/a_goods/typeUpd',{
					id : this.edit_item.id,
					name : this.edit_item.name,
					img : this.edit_item.img,
					url : this.edit_item.url
				}).then(res => {
					this.$message({
						showIcon : true,
						type : 'success',
						message : '编辑成功'
					})
					this.reset();
					this.initData();
				})
			},
			//删除
			deleteItem(item){
				this.http.post('/v1/a_goods/typeDel',{
					id : item.id
				}).then(res => {
					this.$message({
						showIcon : true,
						type : 'success',
						message : '添加成功'
					})
					this.reset();
					this.initData();
				})
			},
			//批量删除
			deleteSome () {
				this.http.post('/v1/a_goods/typeMoreDel',{
					idStr : JSON.stringify(this.select_list)
				}).then( res => {
					this.$message({
						showIcon : true,
						type : 'success',
						message : '添加成功'
					})
					this.reset();
					this.initData();
				})
			},
			//
			reset () {
				this.show_dialog = false;
				this.show_edit_dialog = false;
				this.add_cls_img = null;
				this.add_cls_link  = null;
				this.add_cls_parent = null;
				this.add_cls_title = null;
				this.edit_item = null;
			}
		},
		watch : {
			select_list (n,o) {
				console.log()
				if (n && n.length) {
					this.disabled = false;
				} else {
					this.disabled = true;
				}
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
