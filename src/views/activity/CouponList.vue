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
			<el-table-column prop='grant_admin' label='发放人员'></el-table-column>
			<el-table-column prop='type' label='优惠券类别'></el-table-column>
			<el-table-column prop='money' label='优惠券金额' width='180px'></el-table-column>
			<el-table-column prop='target' label='发放目标'></el-table-column>
			<el-table-column prop='grant_num' label='发放数量'></el-table-column>
			<el-table-column prop='number_of_recipients' label='领取数量'></el-table-column>
			<el-table-column prop='userd_num' label='使用数量'></el-table-column>
			<el-table-column prop='exp_date' label='过期时间'></el-table-column>
			<el-table-column width="180px">
				<template slot-scope="scope">
					<el-button type="text" size="small">删除优惠券</el-button>
					<el-button type="text" size="small" @click="$router.push('coupon-record')">领用记录</el-button>
					
				</template>
			</el-table-column>
				
			</el-table-column>
		</el-table>
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
						cls : '全场商品通用优惠券',
						type : '普通优惠券',
						money : '优惠10元',
						number_of_recipients : 100,//领取数量
						userd_num : 80,
						exp_date : '2018-05-05',
						grant_admin : '超级管理员',
						grant_num : '1000',
						target : '领取中心'
					},{
						id :2,
						cls : '全场商品通用优惠券',
						type : '满减优惠券',
						money : '满10元优惠券1元',
						number_of_recipients : 100,//领取数量
						userd_num : 80,
						exp_date : '2018-05-05',
						grant_admin : '林杜森',
						grant_num : '50',
						target : '领取中心'
					},{
						id :3,
						cls : '指定商品优惠券',
						type : '满减优惠券',
						money : '满10元优惠券1元',
						number_of_recipients : 90,//领取数量
						userd_num : 80,
						exp_date : '2018-05-05',
						grant_admin : '林杜森',
						grant_num : '50',
						target : '指定用户'
					},{
						id :4,
						cls : '指定商品优惠券',
						type : '普通优惠券',
						money : '优惠2元',
						number_of_recipients : 90,//领取数量
						userd_num : 80,
						exp_date : '2018-05-05',
						grant_admin : '林杜森',
						grant_num : '2000',
						target : '指定用户'
					}
				],
				search_type : '1',
				key_word : null,
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
