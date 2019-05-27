<template>
	<div class="">
		<!-- 顶部 -->
		<el-row :gutter='10' class="search-header" type="flex">
			<el-col :span='4' class='text'>
				<span class="green">分销支出金额：18000</span>
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
					<el-option value='1' label='推荐人ID'></el-option>
					<el-option value='2' label='推荐人姓名'></el-option>
					<el-option value='3' label='推荐人电话'></el-option>
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
			<el-table-column prop='agent_level' label='推荐人姓名（ID）'>
				<template slot-scope='scope'>
						{{scope.row.recommender}}({{scope.row.recommender_id}})
					</template>
				</el-table-column>
			</el-table-column>
			<el-table-column prop='agent_level' label='消费者姓名（ID）'>
				<template slot-scope='scope'>
						{{scope.row.buyer_name}}({{scope.row.buyer_id}})
					</template>
				</el-table-column>
			</el-table-column>
			<el-table-column prop='order_id' label='订单编号'>
				
			</el-table-column>
			<el-table-column prop='pay_money' label='消费金额（元）'>
				
			</el-table-column>
			<el-table-column prop='fx_rate' label='分销比例（百分比）'>
				
			</el-table-column>
			<el-table-column prop='profit' label='获得分销金额（元）'>
				
			</el-table-column>
			
			<el-table-column prop='time' label='时间'>
				
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
						recommender : '林杜森',
						recommender_id : 1,
						buyer_name : '林文峰',
						buyer_id : 2,
						fx_rate : 10,
						pay_money : 100,
						profit : 10,
						order_id : 1,
						time : '2019-02-02'
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
