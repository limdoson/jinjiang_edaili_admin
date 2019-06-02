<template>
	<div class="">
		<el-row class="search-header" :gutter="10">
			<el-col :span='2'>
				<el-button type="primary" size="small" @click='initData(1)'>领取记录</el-button>
			</el-col>
			<el-col :span='2'>
				<el-button type="danger" size="small" @click='initData(2)'>使用记录</el-button>
			</el-col>
		</el-row>
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe
			ref="multipleTable">
			<el-table-column prop='id' label='优惠券ID'></el-table-column>
			<el-table-column prop='user_name' label='领用人姓名'></el-table-column>
			<el-table-column prop='type' label="记录类型">
				<template slot-scope='scope'>
					<span v-if='scope.row.type == 1' class="green">领取</span>
					<span v-if='scope.row.type == 2' class="red">使用</span>
				</template>
			</el-table-column>
			<el-table-column prop='time' label='领用时间'></el-table-column>
			<el-table-column prop="order_ind" label="订单编号"></el-table-column>
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
				list : [
					{
						id :1,
						user_name : '林杜森',
						type : 1,
						time : '2018-08-08',
						order_ind : '-'
					},{
						id :2,
						user_name : '林杜森',
						type : 1,
						time : '2018-08-08',
						order_ind : '-'
					}
				],
			}
		},
		created () {
			
		},
		
		methods : {
			initData(flag) {
				if (flag == 2) {
					this.list = [
						{
							id :3,
							user_name : '林杜森',
							type : 2,
							time : '2018-08-08',
							order_ind : '1010101010'
						},{
							id :4,
							user_name : '林杜森',
							type : 2,
							time : '2018-08-08',
							order_ind : '1010101010'
						}
					];
				} else {
					this.list = [
						{
							id :1,
							user_name : '林杜森',
							type : 1,
							time : '2018-08-08',
							order_ind : '-'
						},{
							id :2,
							user_name : '林杜森',
							type : 1,
							time : '2018-08-08',
							order_ind : '-'
						}
					];
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
