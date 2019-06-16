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
						<el-option label="多图多列橱窗" value='2'></el-option>
						<el-option label="三图橱窗" value='3'></el-option>
						<el-option label="多图可横滚橱窗" value='4'></el-option>
					</el-select>
				</el-form-item>
				<!--  -->
				<el-form-item label="选择每行图片数量" v-if='window_type == 2'>
					<el-select v-model='pic_num'>
						<el-option label="2张图片" value='1'></el-option>
						<el-option label="3张图片" value='2'></el-option>
					</el-select>
				</el-form-item>
				<!--  -->
				<el-form-item label="关联商品">
					<el-button type="warning" size="small" @click='show_product_dialog = true'>选择商品</el-button>
				</el-form-item>
				<el-form-item >
					<el-button type="primary" size="small">添加橱窗</el-button>
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
			<el-row class='search-header' :gutter="10" >
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
			</el-row>
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
						<img src="http://flag.xmwxxx.com/img/entrep.7379ab52.png" alt="" width="60px">
					</template>
				</el-table-column>
				<el-table-column prop='supplier' label='供应商名称'></el-table-column>
				<el-table-column prop='supply_price' label='供应价'></el-table-column>
				<el-table-column prop='market_price' label='售价'></el-table-column>
				<el-table-column prop='stock' label='库存'></el-table-column>
			</el-table>
			<div class="pagination s-b">
				<span></span>
				<el-pagination
				  background
				  layout="prev, pager, next"
				  :total="1000">
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
				list : [
					{
						id :1,
						name : '商品名称',
						supply_price : '供应价',
						market_price : '售价',
						supplier : '供应商名称',
						stock : '库存'
					},{
						id :2,
						name : '商品名称',
						supply_price : '供应价',
						market_price : '售价',
						supplier : '供应商名称',
						stock : '库存'
					},{
						id :3,
						name : '商品名称',
						supply_price : '供应价',
						market_price : '售价',
						supplier : '供应商名称',
						stock : '库存'
					},{
						id :4,
						name : '商品名称',
						supply_price : '供应价',
						market_price : '售价',
						supplier : '供应商名称',
						stock : '库存'
					},{
						id :5,
						name : '商品名称',
						supply_price : '供应价',
						market_price : '售价',
						supplier : '供应商名称',
						stock : '库存'
					}
				],
				selected_products : [],
				search_type_product : '1',
				key_word_product : null,
				
			}
		},
		created () {
			
		},
		
		methods : {
			productSelectionChange (val) {
				this.selected_products = val
			},
			cancleSelect () {
				this.show_product_dialog = false;
			},
			curfirmSelect () {
				
			},
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
