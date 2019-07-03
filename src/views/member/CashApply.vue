<template>
	<div class="">
		<!-- 顶部 -->
		<el-row class='search-header' :gutter="10" >
			<el-col :span='8'>
				<!-- <el-date-picker
				  	v-model="time"
				  	type="datetimerange"
				  	format='yyyy-MM-dd'
				  	value-format='yyyy-MM-dd'
				  	start-placeholder="开始日期"
				  	end-placeholder="结束日期">
				</el-date-picker> -->
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
			<el-tab-pane label="待审核提现申请" name="0"></el-tab-pane>
			<el-tab-pane label="已审核提现申请" name="1"></el-tab-pane>
			<el-tab-pane label="已驳回提现申请" name="2"></el-tab-pane>
			<el-tab-pane label="用户取消提现申请" name="3"></el-tab-pane>
		</el-tabs>
		<!-- table -->
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe>
			<el-table-column label="ID" prop="id" width="80"></el-table-column>
			<el-table-column label="会员姓名(id)" prop="realname">
				<template slot-scope='scope'>
					{{scope.row.name}}({{scope.row.user_id}})
				</template>
			</el-table-column>
			<el-table-column label="申请金额/剩余金额" prop="" width="160">
				<template slot-scope='scope'>
					{{scope.row.money}}/({{scope.row.balance}})
				</template>
			</el-table-column>
			<el-table-column label="实际到账金额" prop="arrival_money" width="140"></el-table-column>
			<el-table-column label="银行卡卡号" prop="account" width="180"></el-table-column>
			<el-table-column label="开户行" prop="" width="220">
				<template slot-scope='scope'>
					{{scope.row.bank}}({{scope.row.bank_branch}})
				</template>
			</el-table-column>
			<el-table-column label="开户姓名" prop="realname"></el-table-column>
			<el-table-column label="提交时间" prop="add_time" width="180"></el-table-column>
			<el-table-column label="处理时间" prop="update_time" width="180"></el-table-column>
			<el-table-column label="操作" prop="" width="200" fixed="right" >
				<template slot-scope='scope'>
					<el-button type="text" size="small" @click='applyHandle(scope.row.id,1)' v-if='scope.row.status == 0'>标记为已处理</el-button>
					<el-button type="text" size="small" @click='applyHandle(scope.row.id,2)' v-if='scope.row.status == 0'>驳回申请</el-button>
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
				activeName :'0',
				list : null,
				page : 1,
				limit : 10,
				total : 1,
			}
		},
		created () {
			this.initData()
		},
		
		methods : {
			initData () {
				this.http.post('/v1/a_user/getApplyCash',{
					userId : this.key_wrod,
					status : this.activeName,
					limit : this.limit,
					page : this.page
				}).then(res => {
					this.list = res.data.data;
					this.total = res.data.total;
				})
			},
			search () {
				if (!this.key_wrod) {
					this.utils.msg('请填写搜索关键词');
					return;
				}
				this.page = 1;
				this.initData();
			},
			handleClick (tab) {
				this.page = 1;
				this.key_wrod = null;
				this.initData();
			},
			dataExport () {
				
			},
			currentChange (page) {
				this.page = page;
				this.initData();
			},
			applyHandle (id,status) {
				this.http.post('/v1/a_user/verifyApplyCash',{
					id : id,
					status : status
				}).then(res => {
					this.utils.msg(res.msg);
					this.initData();
				})
			}
		},
	}
</script>
