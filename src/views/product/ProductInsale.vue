<template>
	<div class="">
		<el-row class='search-header' :gutter="10" >
			<el-col :span='8'>
				<el-date-picker
				  	v-model="time"
				  	type="datetimerange"
				  	format='yyyy-MM-dd'
				  	value-format='yyyy-MM-dd'
				  	start-placeholder="开始时间"
				  	end-placeholder="结束日期">
				</el-date-picker>
			</el-col>
			<el-col :span='3'>
				<el-select v-model='search_type'>
					<el-option label='商品名称' value='1'></el-option>
					<el-option label='商品ID' value='2'></el-option>
					<el-option label='供货商名称' value='3'></el-option>
					<el-option label='供货商ID' value='4'></el-option>
					<el-option label='供货商电话' value='5'></el-option>
				</el-select>
			</el-col>
			<el-col :span='4'>
				<el-input placeholder="请输入搜索关键词" v-model="key_word"></el-input>
			</el-col>
			<el-col :span='2'>
				<el-button type='primary' size="small" icon="el-icon-search">搜索</el-button>
			</el-col>
		</el-row>
		<el-alert
			title="下架后，商品将退回商品云仓库，不在商城中出售，如果需要重新上架，请在“商品云仓库”中重新上架商品。"
			type="warning"
			show-icon>
		</el-alert>
		<!-- 数据表格 -->
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
			<el-table-column prop='id' label='商品ID'></el-table-column>
			<el-table-column prop='product_title' label='商品图片'>
				<template slot-scope='scope'>
					<img :src="scope.row.img" alt="" width="80px">
				</template>
			</el-table-column>
			<el-table-column prop='product_title' label='商品名称'></el-table-column>
			<el-table-column prop='supply_price' label='供应价'></el-table-column>
			<el-table-column prop='market_price' label='售价'></el-table-column>
			<el-table-column prop='supply_factory_name' label='供货商名称'></el-table-column>
			<el-table-column prop='sales_volume' label='累计销量'></el-table-column>
			<el-table-column prop='time' label='上架时间'></el-table-column>
			<el-table-column fixed='right' label='操作' width='200'>
				<template slot-scope="scope">
					<el-button type="text" size="small">下架商品</el-button>
					<el-button type="text" size="small" @click="$router.push('product-buy-record')">购买记录</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination s-b">
			<el-button type="danger" size="small" :disabled="disabled">批量下架</el-button>
			<el-pagination
			  background
			  layout="prev, pager, next"
			  :total="1000">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				time : null,//搜索时间区间
				search_type : '1',
				key_word : null,//搜索关键词
				list :[//商品数据
					{
						id :1,
						product_title : '商品名称',//商品名称
						img : 'http://flag.xmwxxx.com/img/entrep.7379ab52.png',//商品图片
						supply_price : '供应价',//供应价
						market_price : '售价',//售价
						supply_factory_name : '供应厂家名称',//供应厂家名称
						sales_volume : 1000,//销量
						time : '2019-08-08'
					}
					
				],
				selectList : [],//多选列表数据，存储的是商品的ID数组
				disabled : true,//是否禁用批量下架按钮
			}
		},
		created () {
			
		},
		
		methods : {
			//
			handleSelectionChange(val){
				
				this.selectList = val.map( item => {
					return item.id
				});
			},
		},
		watch : {
			selectList (n,o) {
				console.log(n)
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
