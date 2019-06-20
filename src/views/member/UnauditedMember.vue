<template>
	<div class="">
		<!-- 顶部 -->
		<el-row class='search-header' :gutter="10" >
			<el-col :span='8'>
				<el-date-picker
				  	v-model="time"
				  	type="daterange"
				  	format='yyyy-MM-dd'
				  	value-format='yyyy-MM-dd'
				  	start-placeholder="开始日期"
				  	end-placeholder="结束日期">
				</el-date-picker>
			</el-col>
			<el-col :span='2'>
				<el-button type='primary' size="small" icon="el-icon-search">搜索</el-button>
			</el-col>
		</el-row>
		<!-- 数据表 -->
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe
			ref="multipleTable">
			<el-table-column prop='user_id' label='申请人ID'></el-table-column>
			<el-table-column prop='realname' label='姓名'></el-table-column>
			<el-table-column prop='recommend' label="推荐人(ID)">
				
			</el-table-column>
			<el-table-column prop='csp_amount' label='pay_money'></el-table-column>
			<el-table-column prop='updated_at' label='申请时间'></el-table-column>
			<el-table-column fixed='right' label='操作' width='280'>
				<template slot-scope="scope">
					<el-button type="text" size="small" @click='pass(scope.row)'>通过申请</el-button>
					<el-button type="text" size="small" @click='rejectApply(scope.row)'>驳回申请</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 底部分页 -->
		<div class="pagination s-b">
			<span></span>
			<el-pagination
			  background
			  @current-change='currentChange'
			  layout="prev, pager, next"
			  :total="total">
			</el-pagination>
		</div>
		<!-- 驳回申请 -->
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
				search_type : '1',//搜索类型
				time : null,
				show_reason_dialog : false,
				reason_for_reject : null,//驳回原因
				list : null,
				page :1,
				limit : 10,
				total : 0,
				show_pwd_dialog : false,//显示输入密码dialog
				show_recharge_dialog : false,//显示重置dialog
				password : null,//操作安全码
				is_pwd : false,//安全码是否正确
				money : null,//充值金额
				tmp_item : null,//存储审核数据的中间变量
			}
			
		},
		created () {
			this.initData();
		},
		
		methods : {
			initData(){
				this.http.post('/v1/a_user/getApply',{
					page : this.page,
					limit :this.limit,
					realname : this.search_type == '1' ? this.key_word : null,
					tel : this.search_type == '2' ? this.key_word : null,
				}).then(res => {
					this.list = res.data.data;
					this.total = res.data.total;
				})
			},
			//
			currentChange (page) {
				this.page = page;
				this.initData();
			},
			hideDialog () {
				this.show_reason_dialog = false;
				this.reason_for_reject = null;
			},
			//通过分销商申请
			pass (item) {
				this.http.post('/v1/a_user/verifyApply',{
					id : item.id,
					status : 1
				}).then(res => {
					this.utils.msg(res.msg);
					this.initData();
				})
			},
			rejectApply (item) {
				this.tmp_item = item;
				this.show_reason_dialog = true;
			},
			curfirmReject () {
				if (!this.reason_for_reject) {
					this.utils.msg('请填写驳回原因');
					return;
				}
				this.http.post('/v1/a_user/verifyApply',{
					id : this.tmp_item.id,
					status : 2,
					remark : this.reason_for_reject
				}).then(res => {
					this.utils.msg(res.msg);
					this.resetData();
				})
			},
			resetData () {
				this.show_reason_dialog = false;
				this.reason_for_reject = null;
				this.initData();
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