<template>
	<div class="">
		<!-- 顶部 -->
		<el-row :gutter='10' class="search-header" type="flex">
			<el-col :span='4' class='text'>
				<span class="green">销售总收入：18000</span>
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
			<el-col :span='2'>
				<el-select v-model="search_type" placeholder="请选择">
					<el-option value='1' label='会员ID'></el-option>
					<el-option value='2' label='会员姓名'></el-option>
					<el-option value='3' label='会员电话'></el-option>
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
			<el-table-column prop='id' label='ID'>
				
			</el-table-column>
			<el-table-column prop='title' label='流水项目名称'>
				
			</el-table-column>
			<el-table-column prop='order_ind' label='订单编号'>
				
			</el-table-column>
			<el-table-column  label='用户姓名（ID）'>
				<template slot-scope='scope'>
					{{scope.row.buyer_name}}({{scope.row.user_id}})
				</template>
			</el-table-column>
			<el-table-column prop='pay_ind' label='支付单号'>
				
			</el-table-column>
			<el-table-column prop='money' label='金额'>
				
			</el-table-column>
			<el-table-column prop='created_at' label='时间'>
				
			</el-table-column>
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
						title : '用户购买商品',
						order_ind : '订单编号',
						buyer_name : '林杜森',
						user_id : '100',
						pay_ind : 1815511515,
						money : 1840,
						created_at : '2018-02-08'
					},{
						id :1,
						title : '用户购买商品',
						order_ind : '订单编号',
						buyer_name : '林杜森',
						user_id : '100',
						pay_ind : 1815511515,
						money : 1840,
						created_at : '2018-02-08'
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
