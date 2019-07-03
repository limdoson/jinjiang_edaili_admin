<template>
	<div class="">
		<!-- 顶部 -->
		<el-row :gutter='10' class="search-header" type="flex">
			
			<!-- <el-col :span='8'>
				 <el-date-picker
			      	v-model="time"
			      	type="datetimerange"
			      	format='yyyy-MM-dd'
			      	value-format='yyyy-MM-dd'
			      	start-placeholder="开始日期"
			      	end-placeholder="结束日期">
			    </el-date-picker>
			</el-col> -->
			<el-col :span='3'>
				<el-select v-model="search_type" placeholder="请选择">
					<el-option value='1' label='用户ID'></el-option>
					<!-- <el-option value='2' label='推荐人姓名'></el-option>
					<el-option value='3' label='推荐人电话'></el-option> -->
			  	</el-select>
			</el-col>
			<el-col :span='4'>
				<el-input placeholder='输入搜索关键字' v-model='key_word'></el-input>
			</el-col>
			<el-col :span='2'>
				<el-button type='primary' size='small' icon='el-icon-search' @click='search'>搜索</el-button>
			</el-col>
		</el-row>
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick" style='margin-top: 10px;'>
			<el-tab-pane label="普通用户账户信息" name="1">
				<el-table :data='list' 
					stripe 
					header-row-class-name='bg-table-header'
					:header-cell-style = "{backgroundColor: '#fafafa'}"
					ref="multipleTable">
					<el-table-column prop='id' label='ID'></el-table-column>
					<el-table-column prop='realname' label='真实姓名'></el-table-column>
					<el-table-column prop='tel' label='电话'></el-table-column>
					<el-table-column prop='income' label='累计充值'></el-table-column>
					<el-table-column prop='expend' label='总支出'></el-table-column>
					<el-table-column prop='freeze' label='冻结金额'></el-table-column>
					<el-table-column prop='balance' label='可用余额'></el-table-column>
					<el-table-column prop='total' label='账户总额'></el-table-column>
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
			</el-tab-pane>
			<el-tab-pane label="普通用户账户流水" name="2">
				<el-table :data='data_list' 
					stripe 
					header-row-class-name='bg-table-header'
					:header-cell-style = "{backgroundColor: '#fafafa'}"
					ref="multipleTable">
					<el-table-column prop='id' label='ID'></el-table-column>
					<el-table-column prop='id' label='记录类型'>
						<template slot-scope='scope'>
							<span class="red">{{scope.row.typeName}}</span>
						</template>
					</el-table-column>
					<el-table-column prop='id' label='记录描述' width="200">
						<template slot-scope='scope'>
							<span class="red">{{scope.row.remark}}</span>
						</template>
					</el-table-column>
					<el-table-column prop='realname' label='真实姓名'></el-table-column>
					<el-table-column prop='tel' label='电话'></el-table-column>
					<el-table-column prop='income' label='累计充值'></el-table-column>
					<el-table-column prop='expend' label='总支出'></el-table-column>
					<el-table-column prop='freeze' label='冻结金额'></el-table-column>
					<el-table-column prop='balance' label='可用余额'></el-table-column>
					<el-table-column prop='total' label='账户总额'></el-table-column>
					<el-table-column prop='add_time' label="时间"></el-table-column>
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
			</el-tab-pane>
			<el-tab-pane label="分销商账户信息" name="3">
				<el-table :data='fx_list' 
					stripe 
					header-row-class-name='bg-table-header'
					:header-cell-style = "{backgroundColor: '#fafafa'}"
					ref="multipleTable">
					<el-table-column prop='id' label='ID'></el-table-column>
					<el-table-column prop='realname' label='真实姓名'></el-table-column>
					<el-table-column prop='tel' label='电话'></el-table-column>
					<el-table-column prop='freeze' label='总冻结'></el-table-column>
					<el-table-column prop='expend' label='总支出'></el-table-column>
					<el-table-column prop='income' label='总收入'></el-table-column>
					<el-table-column prop='balance' label='可提现佣金'></el-table-column>
					<el-table-column prop='total' label='总佣金'></el-table-column>
				</el-table>
				<div class="pagenation s-b">
					<div>
						
					</div>
					<el-pagination
					  	background
					  	layout="prev, pager, next"
					  	:total="total"
					  	@current-change='currentChange'>
					</el-pagination>
				</div>
			</el-tab-pane>
			<el-tab-pane label="分销商账户信息" name="4">
				<el-table :data='fx_data_list' 
					stripe 
					header-row-class-name='bg-table-header'
					:header-cell-style = "{backgroundColor: '#fafafa'}"
					ref="multipleTable">
					<el-table-column prop='id' label='ID'></el-table-column>
					<el-table-column prop='id' label='记录类型'>
						<template slot-scope='scope'>
							<span class="red">{{scope.row.typeName}}</span>
						</template>
					</el-table-column>
					<el-table-column prop='id' label='记录描述' width="200">
						<template slot-scope='scope'>
							<span class="red">{{scope.row.remark}}</span>
						</template>
					</el-table-column>
					<el-table-column prop='realname' label='真实姓名'></el-table-column>
					<el-table-column prop='tel' label='电话'></el-table-column>
					<el-table-column prop='freeze' label='总冻结'></el-table-column>
					<el-table-column prop='expend' label='总支出'></el-table-column>
					<el-table-column prop='income' label='总收入'></el-table-column>
					<el-table-column prop='balance' label='可提现佣金'></el-table-column>
					<el-table-column prop='total' label='总佣金'></el-table-column>
					<el-table-column prop='add_time' label="时间"></el-table-column>
				</el-table>
				<div class="pagenation s-b">
					<div>
						
					</div>
					<el-pagination
					  	background
					  	layout="prev, pager, next"
					  	:total="total"
					  	@current-change='currentChange'>
					</el-pagination>
				</div>
			</el-tab-pane>
		</el-tabs>
		<!-- 表格 -->
		
		
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				activeName : '1',
				search_type : '1',//搜索类型
				key_word : null,//搜索关键词
				time : null,//搜索时间
				total : 1,
				list : null,//普通用户账户信息
				data_list :null,//普通用户账户流水
				fx_list : null,//分销商账户信息
				fx_data_list :null,//分销商账户流水
				page :1,
				limit :10,
				
				fx_page : 1,
				fx_total : 1,
			}
		},
		created () {
			this.getNormalData();
		},
		
		methods : {
			/* 页码切换函数 */
			currentChange (page) {
				this.page = page;
				switch (this.activeName){
					case '1':
						this.getNormalData()
						break;
					case '2':
						this.getNormalDataList()
						break;
					case '3':
						this.getFxData()
						break;
					case '4':
						this.getFxDataList()
						break;
					default:
						break;
				}
				
			},
			search () {
				switch (this.activeName){
					case '1':
						this.getNormalData()
						break;
					case '2':
						this.getNormalDataList()
						break;
					case '3':
						this.getFxData()
						break;
					case '4':
						this.getFxDataList()
						break;
					default:
						break;
				}
			},
			getNormalData () {
				this.http.post('/v1/a_account/user',{
					userId : this.key_word,
					limit :this.limit,
					page : this.page
				}).then(res =>{
					this.list = res.data.data;
					this.total = res.data.total;
				})
			},
			//普通用户流水
			getNormalDataList () {
				this.http.post('/v1/a_account/userLog',{
					userId : this.key_word,
					limit :this.limit,
					page : this.page
				}).then(res => {
					this.data_list = res.data.data;
					this.total = res.data.total;
				})
			},
			//分销商账户信息
			getFxData () {
				this.http.post('/v1/a_account/userProfit',{
					userId : this.key_word,
					limit :this.limit,
					page : this.page
				}).then(res =>{
					this.fx_list = res.data.data;
					this.total = res.data.total;
				})
			},
			//分销商账户流水
			getFxDataList () {
				this.http.post('/v1/a_account/userProfitLog',{
					userId : this.key_word,
					limit :this.limit,
					page : this.page
				}).then(res =>{
					this.fx_data_list = res.data.data;
					this.total = res.data.total;
				})
			},
			handleClick (tab) {
				this.page = 1;
				this.key_word = null;
				switch (tab.name){
					case '1':
						this.getNormalData()
						break;
					case '2':
						this.getNormalDataList()
						break;
					case '3':
						this.getFxData()
						break;
					case '4':
						this.getFxDataList()
						break;
					default:
						break;
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
