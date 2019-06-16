<template>
	<div class="">
		<el-row class='search-header' :gutter="10" >
			<el-col :span='4' class='text'>
				<span class="green">购买次数：100</span>
			</el-col>
			<el-col :span='4' class='text'>
				<span class="red">销售金额：100</span>
			</el-col>
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
			<el-col :span='2'>
				<el-button type='primary' size="small" icon="el-icon-search">搜索</el-button>
			</el-col>
		</el-row>
		<!-- table -->
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe
			ref="multipleTable">
			<el-table-column prop='id' label='订单ID'></el-table-column>
			<el-table-column prop='order_ind' label='订单编号'></el-table-column>
			<el-table-column prop='buyer' label='买家姓名'></el-table-column>
			<el-table-column prop='buyer_id' label='买家ID'></el-table-column>
			<el-table-column prop='buy_num' label='购买数量'></el-table-column>
			<el-table-column prop='money' label='订单金额'></el-table-column>
			<el-table-column prop='time' label='购买时间'></el-table-column>
		</el-table>
		<!-- 底部分页 -->
		<div class="pagination s-b">
			<el-button type="info" size="small" icon="el-icon-back" @click='$router.back()'>返回</el-button>
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
				time : null,
				list : [
					{
						id : 1,
						order_ind : '订单编号',
						buy_num : '购买数量',
						buyer : '买家姓名',
						buyer_id : '买家ID',
						money : '订单金额',
						time : '2019-08-08'
					}
				]
			}
		},
		created () {
			
		},
		
		methods : {
			
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
