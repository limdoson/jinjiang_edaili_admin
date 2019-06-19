<template>
	<div class="">
		<el-row class='search-header' :gutter="10" >
			<el-col :span='8'>
				<el-date-picker
				  	v-model="time"
				  	type="daterange"
				  	format='yyyy-MM-dd'
				  	value-format='yyyy-MM-dd'
				  	start-placeholder="开始时间"
				  	end-placeholder="结束日期">
				</el-date-picker>
			</el-col>
			<el-col :span='3'>
				<el-select v-model='search_type'>
					<el-option label='商品ID' value='1'></el-option>
					<el-option label='商品名称' value='2'></el-option>
					<el-option label='供货商ID' value='3'></el-option>
					<el-option label='供货商名称' value='4'></el-option>
					<el-option label='供货商电话' value='5'></el-option>
				</el-select>
			</el-col>
			<el-col :span='4'>
				<el-input placeholder="请输入搜索关键词" v-model="key_word"></el-input>
			</el-col>
			<el-col :span='6'>
				<el-button type='primary' size="small" icon="el-icon-search" @click='search'>搜索</el-button>
				<el-button type='danger' size="small"  @click='resetSearch'>重置搜索条件</el-button>
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
			<el-table-column prop='' label='商品图片'>
				<template slot-scope='scope'>
					<img :src="scope.row.cover" alt="" width="80px">
				</template>
			</el-table-column>
			<el-table-column prop='name' label='商品名称'></el-table-column>
			<el-table-column prop='supply_price' label='供应价'></el-table-column>
			<el-table-column prop='price' label='售价'></el-table-column>
			<el-table-column prop='factory_name' label='供货商名称'></el-table-column>
			<el-table-column prop='sale' label='累计销量'></el-table-column>
			<!-- <el-table-column prop='time' label='上架时间'></el-table-column> -->
			<el-table-column fixed='right' label='操作' width='240'>
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="offShelf(scope.row.id)">下架商品</el-button>
					<el-button type="text" size="small" @click="$router.push('product-buy-record')">购买记录</el-button>
					<el-button type="text" size="small" @click="$router.push('product-detail/'+scope.row.id)">商品详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination s-b">
			<el-button type="danger" size="small" :disabled="disabled" @click='offShelfSome'>批量下架</el-button>
			<el-pagination
			  background
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
				time : null,//搜索时间区间
				search_type : '1',
				key_word : null,//搜索关键词
				list :null,
				selectList : [],//多选列表数据，存储的是商品的ID数组
				disabled : true,//是否禁用批量下架按钮
				page :1,
				limit : 10,
				total : 1
			}
		},
		created () {
			this.initData();
		},
		
		methods : {
			initData() {
				this.http.post('/v1/a_goods/getIsSale',{
					page : this.page,
					limit : this.limit,
					id : this.search_type == '1' ? this.key_word : null,
					name : this.search_type == '2' ? this.key_word : null,
					factoryId : this.search_type == '3' ? this.key_word : null,
					factoryName : this.search_type == '4' ? this.key_word : null,
					factoryTel : this.search_type == '5' ? this.key_word : null,
					startTime : this.time ? this.time[0] : null,
					endTime : this.time ? this.time[0] : null,
				}).then(res => {
					console.log(res)
					this.list = res.data.data;
				})
			},
			//商品搜索
			search () {
				this.page = 1;
				this.initData();
			},
			//重置搜索
			resetSearch () {
				this.page = 1;
				this.search_type = '1',
				this.key_word = null;
				this.time = null;
				this.initData()
			},
			//下架商品
			offShelf(id) {
				this.http.post('/v1/a_goods/downGoods',{
					id : id
				}).then(res => {
					this.utils.msg('下架成功');
					this.initData();
				})
			},
			//批量下架
			offShelfSome () {
				this.http.post('/v1/a_goods/downMoreGoods',{
					idStr : JSON.stringify(this.selectList)
				}).then(res => {
					this.utils.msg('下架成功');
					this.initData();
				})
			},
			//
			handleSelectionChange(val){
				this.selectList = val.map( item => {
					return item.id
				});
			},
		},
		watch : {
			selectList (n,o) {
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
