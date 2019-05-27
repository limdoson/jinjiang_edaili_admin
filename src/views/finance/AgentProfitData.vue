<template>
	<div class="">
		<!-- 顶部 -->
		<el-row :gutter='10' class="search-header" type="flex">
			<el-col :span='4' class='text'>
				<span class="green">收益金额：18000</span>
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
					<el-option value='1' label='代理ID'></el-option>
					<el-option value='2' label='代理姓名'></el-option>
					<el-option value='3' label='代理电话'></el-option>
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
			<el-table-column prop='agent_level' label='上级代理姓名（ID）'>
				<template slot-scope='scope'>
						{{scope.row.user_name}}({{scope.row.user_id}})
					</template>
				</el-table-column>
			</el-table-column>
			<el-table-column prop='agent_level' label='上级代理等级（进货折扣）'>
				<template slot-scope='scope'>
						{{scope.row.agent_level}}({{scope.row.agent_discount}})
					</template>
				</el-table-column>
			</el-table-column>
			<el-table-column prop='discount' label='进货代理姓名（ID）'>
				<template slot-scope='scope'>
							{{scope.row.buyer_user_name}}({{scope.row.buyer_user_id}})
						</template>
					</el-table-column>
				</el-table-column>
			</el-table-column>
			<el-table-column prop='discount' label='进货代理等级（进货折扣）'>
				<template slot-scope='scope'>
							{{scope.row.buyer_agent_level}}({{scope.row.buyer_agent_discount}})
						</template>
					</el-table-column>
				</el-table-column>
			</el-table-column>
			<el-table-column prop='money' label='进货金额（元）'>
				
			</el-table-column>
			
			<el-table-column prop='time' label='时间'>
				
			</el-table-column>
			<el-table-column prop='profit' label='收益'></el-table-column>
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
						user_name : '林杜森',
						user_id : 1,
						agent_level : '1级代理',
						agent_discount : 8,
						buyer_agent_id : 2,
						buyer_agent_level : '2级代理',
						buyer_user_name : '林文峰',
						buyer_user_id : 2,
						buyer_agent_discount : 9,
						money : 1000,
						profit : 100,
						time : '2018-18-18'
					},{
						id :1,
						user_name : '林杜森',
						user_id : 1,
						agent_level : '1级代理',
						agent_discount : 8,
						buyer_agent_id : 2,
						buyer_agent_level : '2级代理',
						buyer_user_name : '林文峰',
						buyer_user_id : 2,
						buyer_agent_discount : 9,
						money : 1000,
						profit : 100,
						time : '2018-18-18'
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
