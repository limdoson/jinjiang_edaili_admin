<template>
	<div class="">
		<!-- 顶部 -->
		<el-row class='search-header' :gutter="10" >
			<el-col :span='6'></el-col>
			<el-col :span='4'>
				<el-select v-model='search_type'>
					<el-option label='申请人姓名' value='1'></el-option>
					<el-option label='申请人手机' value='2'></el-option>
				</el-select>
			</el-col>
			<el-col :span='4'>
				<el-input v-model="key_word" placeholder="请输入搜索关键词"></el-input>
			</el-col>
			<el-col :span='2'>
				<el-button type='primary' size="small" icon="el-icon-search" @click='search'>搜索</el-button>
			</el-col>
		</el-row>
		<!--  -->
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe
			ref="multipleTable">
			<el-table-column prop='id' label='ID'></el-table-column>
			<el-table-column prop='realname' label='申请者姓名'></el-table-column>
			<el-table-column prop='tel' label='手机号码'></el-table-column>
			<el-table-column prop='level_name' label='申请代理等级'></el-table-column>
			<el-table-column prop='pay_money' label='缴费金额'></el-table-column>
			<el-table-column label='缴费状态'>
				<template slot-scope='scope'>
					<span class="red" v-if='scope.row.pay_status == 0'>未缴费</span>
					<span class="green" v-else>已缴费</span>
				</template>
			</el-table-column>
			<el-table-column prop='add_time' label='申请时间'></el-table-column>
			<el-table-column prop='recommend' label="推荐人"></el-table-column>
			<el-table-column fixed='right' label='操作' width='200'>
				<template slot-scope="scope">
					<el-button type="text" size="small" @click='applyPassed(scope.row)'>通过申请</el-button>
					<el-button type="text" size="small" @click='applyRejected(scope.row)'>驳回申请</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 底部分页 -->
		<div class="pagination s-b">
			<span></span>
			<el-pagination
			  background
			  layout="prev, pager, next"
			  :total="total">
			</el-pagination>
		</div>
		<!-- 填写驳回原因 -->
		<el-dialog 
			title='驳回原因'
			:visible.sync="show_reason_dialog"
			append-to-body
			:close-on-press-escape='false'
			:close-on-click-modal='false'
			:show-close='false'>
			<el-input v-model="reason_for_reject" placeholder="请填写驳回原因"></el-input>
			<div slot='footer'>
				<el-button size='small' type="default" @click='hideDialog'>取 消</el-button>
				<el-button size='small' type="primary" @click='curfirmReject'>确认</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				search_type : '1',
				key_word : null,
				list : null,
				page :1,
				limit : 10,
				total : 1,
				show_reason_dialog : false,
				reason_for_reject : null,//驳回原因
				tmp_item : null,//用来存储操作过程中的中间变量
			}
		},
		created () {
			this.initData();
		},
		
		methods : {
			initData(){
				
				this.http.post('/v1/a_agent/getApply',{
					page : this.page,
					limit :this.limit,
					realname : this.search_type == '1' ? this.key_word : null,
					tel : this.search_type == '2' ? this.key_word : null,
				}).then(res => {
					this.list = res.data.data;
					this.total = res.data.total;
				})
			},
			//搜索
			search () {
				this.page = 1;
				this.initData();
			},
			//表格通过申请操作
			applyPassed (item) {
				this.http.post('/v1/a_agent/verifyApply',{
					id : item.id,
					status : 1
				}).then(res => {
					this.utils.msg(res.msg);
				})
			},
			//表格驳回申请操作
			applyRejected (item) {
				this.tmp_item = item;
				this.show_reason_dialog = true;
			},
			hideDialog () {
				this.resetData();
			},
			curfirmReject () {
				if (!this.reason_for_reject) {
					this.utils.msg('请填写申请被驳回原因');
					return;
				}
				this.http.post('/v1/a_agent/verifyApply',{
					id : this.tmp_item.id,
					status : 2,
					remark :this.reason_for_reject
				}).then(res => {
					this.utils.msg(res.msg);
				})
				this.resetData();
				
			},
			resetData () {
				this.show_reason_dialog = false;
				this.reason_for_reject = null;
				this.initData()
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
