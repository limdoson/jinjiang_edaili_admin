<template>
	<div class="">
		<!-- 顶部 -->
		<el-row :gutter='10' class="search-header" type="flex">
			<el-col :span='4' class='text'>
				<span class="green">货款额：18000</span>
			</el-col>
			<el-col :span='8'>
				 <el-date-picker
			      	v-model="time"
			      	type="datetimerange"
			      	format='yyyy-MM-dd'
			      	value-format='yyyy-MM-dd'
			      	start-placeholder="开始日期"
			      	end-placeholder="结束日期">
			    </el-date-picker>
			</el-col>
			<el-col :span='3'>
				<el-select v-model="search_type" placeholder="请选择">
					<el-option value='1' label='供应商ID'></el-option>
					<el-option value='2' label='供应商名称'></el-option>
					<el-option value='3' label='供应商电话'></el-option>
			  	</el-select>
			</el-col>
			<el-col :span='4'>
				<el-input placeholder='输入搜索关键字' v-model='key_word'></el-input>
			</el-col>
			<el-col :span='2'>
				<el-button type='primary' size='small' icon='el-icon-search' @click='search'>搜索</el-button>
			</el-col>
		</el-row>
		<!-- 表格 -->
		<el-table :data='list' 
			stripe 
			header-row-class-name='bg-table-header'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			ref="multipleTable">
			<el-table-column prop='id' label='ID'></el-table-column>
			<el-table-column prop='agent_level' label='代理名称(ID)'>
				<template slot-scope='scope'>
					{{scope.row.supplier_name}}({{scope.row.supplier_id}})
				</template>
			</el-table-column>
			<el-table-column prop='free_supply' label="无偿供货额"></el-table-column>
			<el-table-column prop='order_ind' label="订单ID"></el-table-column>
			<el-table-column prop='payment_for_goods' label="描述"></el-table-column>
			<el-table-column prop='target' label="货款流向"></el-table-column>
			<el-table-column prop='surplus_free_supply' label="剩余无偿供货额"></el-table-column>
			<el-table-column prop='unsettled_payment' label="未结算货款"></el-table-column>
			<el-table-column prop='settled_payment' label="已结算货款"></el-table-column>
			<el-table-column prop='time' label='时间'></el-table-column>
		</el-table>
		<div class="pagenation s-b">
			<div>
				<!--<el-button type="primary" icon="el-icon-delete" @click='deleteSome' size='small' :disabled = 'disabled'>批量删除</el-button>-->
			</div>
			<el-pagination
			  	background
			  	layout="prev, pager, next"
			  	:total="total"
			  	@current-change='currentChange'>
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				search_type : '1',//搜索类型
				key_word : null,//搜索关键词
				time : null,//搜索时间
				total : 1,
				list : [
					{
						id :1,
						supplier_id : 2,
						supplier_name : '供应商名称',
						free_supply : 5000,
						order_ind : 120,
						payment_for_goods : '代理进货，产生1000货款',
						target : '从无偿供货额中扣除',
						all_payment_for_goods : '总货款：0',
						unsettled_payment : '0',
						surplus_free_supply : 4000,
						settled_payment : '0',
						time : '2018-02-08'
					},{
						id :1,
						supplier_id : 2,
						supplier_name : '供应商名称',
						free_supply : 0,
						order_ind : 120,
						payment_for_goods : '消费者购买商品，产生1000货款',
						target : '计入未结算货款中',
						all_payment_for_goods : '总货款：1000',
						surplus_free_supply : 0,
						unsettled_payment : '1000',
						settled_payment : '0',
						time : '2018-02-08'
					}
				]
			}
		},
		created () {
			
		},
		
		methods : {
			/* 页码切换函数 */
			currentChange (page) {
				
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
