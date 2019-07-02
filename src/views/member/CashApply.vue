<template>
	<div class="">
		<!-- 顶部 -->
		<el-row class='search-header' :gutter="10" >
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
				<el-select v-model='search_type'>
					<el-option label='用户ID' value='1'></el-option>
				</el-select>
			</el-col>
			<el-col :span='4'>
				<el-input v-model="key_wrod"></el-input>
			</el-col>
			<el-col :span='2'>
				<el-button type='primary' size="small" icon="el-icon-search" @click='search'>搜索</el-button>
			</el-col>
		</el-row>
		<!-- tab -->
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick" style='margin-top: 10px;'>
			<el-tab-pane label="待审核提现申请" name="1"></el-tab-pane>
			<el-tab-pane label="已审核提现申请" name="2"></el-tab-pane>
		</el-tabs>
		<!-- table -->
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe>
			<el-table-column label="ID" prop="" width="80"></el-table-column>
			<el-table-column label="会员姓名(ID)" prop=""></el-table-column>
			<el-table-column label="申请金额/剩余金额" prop="" width="160"></el-table-column>
			<el-table-column label="银行卡卡号" prop="" width="140"></el-table-column>
			<el-table-column label="开户行" prop=""></el-table-column>
			<el-table-column label="开户姓名" prop=""></el-table-column>
			<el-table-column label="提交时间" prop=""></el-table-column>
			<el-table-column label="处理时间" prop=""></el-table-column>
			<el-table-column label="状态" prop=""></el-table-column>
			<el-table-column label="操作" prop="" width="200" fixed="right">
				<template slot-scope='scope'>
					<el-button type="text" size="small">标记为已处理</el-button>
					<el-button type="text" size="small">驳回申请</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination s-b">
			<el-button type='primary' size="small"  @click='dataExport'>数据导出</el-button>
			<el-pagination
				background
				@current-change='currentChange'
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
				search_type : '1',
				key_wrod :null,
				time :null,
				activeName :'1',
				list : null,
				page : 1,
				limit : 1,
				total : 1,
			}
		},
		created () {
			
		},
		
		methods : {
			search () {
				
			},
			handleClick () {
				
			},
			dataExport () {
				
			},
			currentChange (page) {
				this.page = page;
				this.initData();
			}
		},
	}
</script>
