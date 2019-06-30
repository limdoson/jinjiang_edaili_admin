<template>
	<div class="">
		<!-- 顶部 -->
		<el-row class='search-header' :gutter="10" >
			<el-col :span='6'></el-col>
			<el-col :span='3'>
				<el-select v-model='search_type'>
					<el-option label='代理姓名' value='1'></el-option>
					<el-option label='代理手机' value='2'></el-option>
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
			<el-table-column prop='realname' label='代理人姓名'></el-table-column>
			<el-table-column prop='tel' label='手机号码'></el-table-column>
			<el-table-column prop='level_name' label='代理等级'></el-table-column>
			<el-table-column prop='discount' label='拿货价折扣'></el-table-column>
			<el-table-column prop='purchase_amount' label='累计进货额'></el-table-column>
			<el-table-column prop='purchase_money' label='货款余额'></el-table-column>
			
			<el-table-column prop='recommend' label="推荐人"></el-table-column>
			<el-table-column fixed='right' label='操作' width='200'>
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="$router.push('agent-detail/'+scope.row.id)">详情</el-button>
					<el-button type="text" size="small" @click='recharge(scope.row)'>账户充值</el-button>
					<!-- <el-button type="text" size="small" @click="$router.push('agent-purchase-record')">进货记录</el-button> -->
				</template>
			</el-table-column>
		</el-table>
		<!-- 底部分页 -->
		<div class="pagination s-b">
			<span></span>
			<el-pagination
			  background
			  layout="prev, pager, next"
			  :total="1000">
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
		<!-- 账户充值密码输入Dialog -->
		<el-dialog 
			title='安全码验证'
			:visible.sync="show_pwd_dialog"
			append-to-body
			:close-on-press-escape='false'
			:close-on-click-modal='false'
			:show-close='false'>
			<el-input v-model="password" placeholder="请输入交易密码"></el-input>
			<div slot='footer'>
				<el-button size='small' type="default" @click='show_pwd_dialog = false'>取 消</el-button>
				<el-button size='small' type="primary" @click='curfirmPwd'>确认</el-button>
			</div>
		</el-dialog>
		<!-- 账户充值dialog -->
		<el-dialog 
			title='账户充值'
			:visible.sync="show_recharge_dialog"
			append-to-body
			:close-on-press-escape='false'
			:close-on-click-modal='false'
			:show-close='false'>
			<el-input v-model="money" placeholder="请输入充值金额"></el-input>
			<div slot='footer'>
				<el-button size='small' type="default" @click='show_recharge_dialog = false'>取 消</el-button>
				<el-button size='small' type="primary" @click='curfirmRecharge'>确认</el-button>
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
				show_reason_dialog : false,
				reason_for_reject : null,//驳回原因
				tmp_item : null,//用来存储操作过程中的中间变量
				show_pwd_dialog : false,//显示输入密码dialog
				show_recharge_dialog : false,//显示重置dialog
				password : null,//操作安全码
				money : null,//充值金额
				user_tmp : null,//用来处理充值时，临时存储操作用户数据对象
			}
		},
		created () {
			this.initData();
		},
		
		methods : {
			initData () {
				this.http.post('/v1/a_agent/getAll',{
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
				this.tmp_item = item;
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
				this.resetData();
			},
			resetData () {
				this.show_reason_dialog = false;
				this.reason_for_reject = null;
			},
			//账户充值
			recharge (item) {
				this.user_tmp = item;
				//判断是否已输入密码
				if (!this.$store.state.transaction_pwd) {
					this.show_pwd_dialog = true;
					return;
				}
				//验证码正确，显示重置dialog
				this.show_recharge_dialog = true;
			},
			curfirmPwd () {
				if (!this.password) {
					this.utils.msg('请输入安全码');
					return;
				}
				this.http.post('/v1/a_super/checkSuper',{
					super : this.password
				}).then(res => {
					this.$store.commit('changeTratPwd', true);
					this.show_pwd_dialog = false;
					this.show_recharge_dialog = true;
				})
			},
			//充值
			curfirmRecharge () {
				if (!this.money) {
					this.utils.msg('请输入充值金额');
					return;
				}
				this.http.post('/v1/a_agent/recharge',{
					id : this.user_tmp.id,
					money : this.money
				}).then(res => {
					this.utils.msg('充值成功');
					this.show_pwd_dialog = false;
					this.show_recharge_dialog = false;
					this.money = null;
					this.initData();
				})
			},
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
