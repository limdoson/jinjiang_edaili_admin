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
			<el-table-column prop='cls_title' label='分类名称'>
				<template slot-scope='scope'>
					<el-input v-model='scope.row.cls_title'></el-input>
				</template>
			</el-table-column>
			<el-table-column prop='product_title' label='分类广告图'>
				<template slot-scope='scope'>
					<img :src="scope.row.img" alt="" width="80px">
				</template>
			</el-table-column>
			<el-table-column prop='product_title' label='广告图链接'>
				<template slot-scope='scope'>
					<el-input v-model='scope.row.link'></el-input>
				</template>
			</el-table-column>
			<el-table-column fixed='right' label='操作' width='200'>
				<template slot-scope="scope">
					<el-button type="primary" size="small">查看下级分类</el-button>
					<el-button type="danger" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<div class="pagination s-b">
			<el-button type="danger" size="small" :disabled="disabled">批量删除</el-button>
			<el-pagination
			  background
			  layout="prev, pager, next"
			  :total="1000">
			</el-pagination>
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
					<el-select v-model='add_cls_parent'>
						<el-option label='分类' value='1'>分类</el-option>
					</el-select>
					<el-alert
						title="不选择所屬分类则表示添加的是顶级分类"
						type="warning"
						show-icon>
					</el-alert>
				</el-form-item>
				<el-form-item label='分类名称'>
					<el-input v-model="add_cls_title" placeholder="请填写分类名称"></el-input>
				</el-form-item>
				<el-form-item label="分类广告图">
					<el-upload>
						<el-button type="primary" size="small" icon='el-icon-upload'>点击上传</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label='广告图链接'>
					<el-input v-model="add_cls_link" placeholder="请输入广告图链接"></el-input>
				</el-form-item>
			</el-form>
			<div slot='footer'>
				<el-button size='small' type="default" @click='hideDialog'>取 消</el-button>
				<el-button size='small' type="primary">确认</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				list : [
					{
						id : 1,
						cls_title : '分类名称',
						img : 'http://flag.xmwxxx.com/upload/images/product/type/201904/20190401163256_800.png',
						link : '广告链接'
					}
				],
				select_list : [],//多选数据id集合
				disabled : true,//是否禁用批量操作按钮
				show_dialog :false,
				add_cls_parent : null,//所属分类
				add_cls_title : null,//添加分类-分类名称
				add_cls_img : null,//添加分类-广告图
				add_cls_link : null,//添加分类-广告图链接
			}
		},
		created () {
			
		},
		
		methods : {
			handleSelectionChange (val) {
				this.select_list = val.map( item => {
					return item.id
				});
			},
			//隱藏dialog
			hideDialog () {
				this.resetData();
			},
			//重新相关数据
			resetData () {
				this.add_cls_parent = null,
				this.add_cls_title = null,
				this.add_cls_img = null;
				this.add_cls_link = null;
				this.show_dialog = false;
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
