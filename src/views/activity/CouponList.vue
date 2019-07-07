<template>
	<div class="">
		<!-- 顶部 -->
		<el-row class='search-header' :gutter="10" >
			<el-col :span='6'></el-col>
			<el-col :span='3'>
				<el-select v-model='search_type'>
					<el-option label='优惠券ID' value='1'></el-option>
					<el-option label='发放人员' value='2'></el-option>
				</el-select>
			</el-col>
			<el-col :span='4'>
				<el-input v-model="key_word" placeholder="请输入搜索关键词"></el-input>
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
			<el-table-column prop='id' label='ID'></el-table-column>
			<el-table-column prop='title' label='优惠券名称'></el-table-column>
			<el-table-column prop='admin_name' label='发放人员'></el-table-column>
			<el-table-column prop='type' label='优惠券类别'>
				<template slot-scope='scope'>
					{{scope.row.model == 1 ? '全场通用优惠券 ' : '指定单品优惠券'}}
				</template>
			</el-table-column>
			<el-table-column prop='money' label='优惠券金额' >
				<template slot-scope='scope'>
					<span v-if='scope.row.type == 1'>{{scope.row.money}}</span>
					<span v-if='scope.row.type == 2'>满{{scope.row.order_money}}元减{{scope.row.reduce_money}}</span>
					
				</template>
			</el-table-column>
			<el-table-column prop='target' label='发放目标'>
				<template slot-scope='scope'>
					<span v-if='scope.row.to == 1'>领券中心</span>
					<span v-if='scope.row.to == 2'>指定用户</span>
					<span v-if='scope.row.to == 3'>所有用户</span>
					
				</template>
			</el-table-column>
			<el-table-column prop='number' label='发放数量'></el-table-column>
			<el-table-column prop='collar_number' label='领取数量'></el-table-column>
			<el-table-column prop='use_number' label='使用数量'></el-table-column>
			<el-table-column prop='end_time' label='过期时间'></el-table-column>
			<!-- <el-table-column width="180px">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="$router.push('coupon-record')">领用记录</el-button>
					
				</template>
			</el-table-column> -->
				
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				list : null,
				limit : 10,
				page : 1,
				total : 1,
				search_type : '1',
				key_word : null,
			}
		},
		created () {
			this.initData();
		},
		
		methods : {
			initData () {
				this.http.post('/v1/a_coupon/getCoupon',{
					limit : this.limit,
					page : this.page,
					id : this.search_type == 1 ? this.key_word :null,
					admin_name : this.search_type == 2 ? this.key_word : null
				}).then(res => {
					this.list = res.data.data;
					this.total = res.data.total;
				})
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
