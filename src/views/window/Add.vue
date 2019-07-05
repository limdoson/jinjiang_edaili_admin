<template>
	<div class="">
		<div class="form-container">
			<el-form label-width="140px">
				<el-form-item label="橱窗名称">
					<el-input v-model="window_title" placeholder="请输入橱窗名称"></el-input>
				</el-form-item>
				<el-form-item label="橱窗类型">
					<el-select v-model='window_type'>
						<el-option label="单图橱窗" value='1'></el-option>
						<el-option label="两图多列橱窗" value='2'></el-option>
						<el-option label="三图橱窗" value='3'></el-option>
						<el-option label="多图可横滚橱窗" value='4'></el-option>
					</el-select>
				</el-form-item>
				<!--  -->
				<!-- <el-form-item label="选择每行图片数量" v-if='window_type == 2'>
					<el-select v-model='pic_num'>
						<el-option label="2张图片" value='1'></el-option>
						<el-option label="3张图片" value='2'></el-option>
					</el-select>
				</el-form-item> -->
				<!--  -->
				<el-form-item label="关联商品">
					<el-button type="warning" size="small" @click='choseProduct'>{{selected_products_ids ? '重新选择' : '选择商品'}}</el-button>
				</el-form-item>
				<el-form-item label="已关联商品ID" v-if='selected_products_ids'>
					{{selected_products_ids}}
				</el-form-item>
				<el-form-item >
					<el-button type="primary" size="small" @click='addWindow'>{{$route.params.id ? '保存编辑' : '添加橱窗'}}</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 选择指定商品dialog -->
		<el-dialog
			title='选择指定商品' 
			:visible='show_product_dialog' 
			:append-to-body='true'
			:close-on-click-modal='false'
			:show-close='false'
			width='70%'>
			<!-- 搜索 -->
			<!-- <el-row class='search-header' :gutter="10" >
				<el-col :span='3'>
					<el-select v-model='search_type_product'>
						<el-option label='商品名称' value='1'></el-option>
						<el-option label='商品ID' value='2'></el-option>
						<el-option label='供货商名称' value='3'></el-option>
						<el-option label='供货商ID' value='4'></el-option>
						<el-option label='供货商电话' value='5'></el-option>
					</el-select>
				</el-col>
				<el-col :span='8'>
					<el-input placeholder="请输入搜索关键词" v-model="key_word_product"></el-input>
				</el-col>
				<el-col :span='2'>
					<el-button type='primary' size="small" icon="el-icon-search">搜索</el-button>
				</el-col>
			</el-row> -->
			<!-- 商品数据 -->
			<el-table
				:data='list'
				ref="multipleTable"
				row-keys='id'
				 @selection-change="productSelectionChange"
				:header-cell-style = "{backgroundColor: '#fafafa'}">
				 <el-table-column
					type="selection"
					width="55"
					:reserve-selection="true">
				</el-table-column>
				<el-table-column prop='id' label='商品ID'></el-table-column>
				<el-table-column prop='name' label='商品名称'></el-table-column>
				<el-table-column prop='buyer' label='图片'>
					<template slot-scope='scope'>
						<img :src="scope.row.cover" alt="" width="60px">
					</template>
				</el-table-column>
				<el-table-column prop='factory_name' label='供应商名称'></el-table-column>
				<el-table-column prop='supply_price' label='供应价'></el-table-column>
				<el-table-column prop='price' label='售价'></el-table-column>
				<el-table-column prop='stock' label='库存'></el-table-column>
			</el-table>
			<div class="pagination s-b">
				<span></span>
				<el-pagination
				  background
				  @current-change='currentChange'
				  layout="prev, pager, next"
				  :total="total">
				</el-pagination>
			</div>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="cancleSelect" size='small'>取 消</el-button>
			    <el-button type="primary" @click="curfirmSelect" size='small'>确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				show_product_dialog :false,
				window_title : null,//橱窗名称
				window_type : '1',
				pic_num : '1',
				list : null,
				page :1,
				limit : 10,
				total : 1,
				selected_products_tmp : [],
				selected_products : [],
				selected_products_ids : null,//已选商品ID集合
				search_type_product : '1',
				key_word_product : null,
				
			}
		},
		created () {
			if (this.$route.params.id) {
				this.http.post('/v1/a_shopIndex/getWindowOne',{
					id : this.$route.params.id
				}).then(res => {
					this.window_title = res.data.window.name;
					this.window_type = res.data.window.type;
					this.selected_products_ids = res.data.window.goods_id
					
				})
			}
		},
		
		methods : {
			productSelectionChange (val) {
				this.selected_products_tmp = val
			},
			cancleSelect () {
				if (this.$route.params.id) {
					this.show_product_dialog = false;
					this.selected_products = null;
					this.selected_products_tmp = null;
				} else {
					this.show_product_dialog = false;
					this.selected_products = null;
					this.selected_products_tmp = null;
					this.selected_products_ids = null;
				}
				
			},
			//点击选择商品
			choseProduct () {
				this.page = 1;
				this.http.post('/v1/a_goods/getIsSale',{
					page :this.page,
					limit : this.limit,
				}).then(res => {
					this.total = res.data.total;
					this.list = res.data.data;
					this.show_product_dialog = true;
				}) 
				
			},
			currentChange (page) {
				this.page = page;
				this.http.post('/v1/a_goods/getIsSale',{
					page :this.page,
					limit : this.limit,
				}).then(res => {
					this.total = res.data.total;
					this.list = res.data.data;
				})
			},
			curfirmSelect () {
				this.selected_products = this.selected_products_tmp;
				this.show_product_dialog = false;
				this.selected_products_ids = JSON.stringify(this.selected_products.map(item => item.id))
			},
			addWindow () {
				if (!this.window_title) {
					this.utils.msg('请填写橱窗名称');
					return;
				}
				if (!this.selected_products_ids) {
					this.utils.msg('请选择橱窗要关联的商品');
					return;
				}
				if(this.$route.params.id) {
					this.http.post('/v1/a_shopIndex/updWindow',{
						id : this.$route.params.id,
						name : this.window_title,
						type : this.window_type,
						goods_id : this.selected_products_ids
					}).then(res => {
						this.utils.msg(res.msg);
					})
				} else {
					this.http.post('/v1/a_shopIndex/addWindow',{
						name : this.window_title,
						type : this.window_type,
						goods_id : this.selected_products_ids
					}).then(res => {
						this.utils.msg(res.msg);
					})
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
