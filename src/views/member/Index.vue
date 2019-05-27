<template>
	<div class="">
		<!-- 顶部 -->
		<el-row class='search-header' :gutter="10" >
			<el-col :span='6'></el-col>
			<el-col :span='3'>
				<el-select v-model='search_type'>
					<el-option label='用户ID' value='1'></el-option>
					<el-option label='用户姓名' value='2'></el-option>
					<el-option label='手机号码' value='3'></el-option>
				</el-select>
			</el-col>
			<el-col :span='4'>
				<el-input></el-input>
			</el-col>
			<el-col :span='2'>
				<el-button type='primary' size="small" icon="el-icon-search">搜索</el-button>
			</el-col>
		</el-row>
		<!--  -->
		<el-row :gutter="10" class='search-header' style='padding-top: 10px;'>
			<el-col :span='2'>
				<el-button type='primary' size="small" >全部用户</el-button>
			</el-col>
			<el-col :span='2'>
				<el-button type='success' size="small" >普通用户</el-button>
			</el-col>
			<el-col :span='2'>
				<el-button type='danger' size="small" >分销商</el-button>
			</el-col>
		</el-row>
		<!-- 数据表 -->
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe
			ref="multipleTable">
			<el-table-column prop='id' label='ID'></el-table-column>
			<el-table-column prop='nick_name' label='昵称'></el-table-column>
			<el-table-column prop='real_name' label='真实姓名'></el-table-column>
			<el-table-column prop='team_count' label='团队人数'></el-table-column>
			<el-table-column prop='balance' label='账户余额'></el-table-column>
			<el-table-column prop='csp_amount' label='消费金额'></el-table-column>
			<el-table-column prop='user_identity' label="用户身份"></el-table-column>
			<el-table-column prop='time' label='加入时间'></el-table-column>
			<el-table-column fixed='right' label='操作' width='200'>
				<template slot-scope="scope">
					<el-button type='text' size='small' @click="$router.push('member-detail')">详情</el-button>
					<el-button type='text' size='small' @click="$router.push('role-handle/'+scope.row.id)" v-if='scope.row.user_identity_status > 0'>团队成员</el-button>
					<el-button type="text" size="small" @click='recharge'>账户充值</el-button>
					<!-- <el-button type='text' size='small' @click='deleteItem(scope.row)'>删除</el-button> -->
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
		<!-- 账户充值密码输入Dialog -->
		<el-dialog 
			title='安全码验证'
			:visible.sync="show_pwd_dialog"
			append-to-body
			:close-on-press-escape='false'
			:close-on-click-modal='false'
			:show-close='false'>
			<el-input v-model="password" placeholder="请输入操作安全码"></el-input>
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
				search_type : '1',//搜索类型
				list : [
					{
						id :1,
						nick_name : '林',
						real_name : '林杜森',
						team_count : 100,
						balance : 20,
						csp_amount : 1999,
						user_identity_status : 1,
						user_identity : '分销商',
						time : '1920-08-01'
					},{
						id :1,
						nick_name : '林',
						real_name : '林文峰',
						team_count : '-',
						balance : 20,
						csp_amount : 1999,
						user_identity_status : 0,
						user_identity : '普通会员',
						time : '1920-08-01'
					}
				],
				show_pwd_dialog : false,//显示输入密码dialog
				show_recharge_dialog : false,//显示重置dialog
				password : null,//操作安全码
				is_pwd : false,//安全码是否正确
				money : null,//充值金额
			}
			
		},
		created () {
			
		},
		
		methods : {
			//账户充值
			recharge () {
				//判断是否已输入密码
				if (!this.password) {
					this.show_pwd_dialog = true;
					return;
				}
				//判断验证码是否正确
				if (!this.is_pwd) {
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
				//验证安全码是否正确
				this.is_pwd = true;
				this.show_pwd_dialog = false;
				this.show_recharge_dialog = true;
			},
			//充值
			curfirmRecharge () {
				if (!this.money) {
					this.utils.msg('请输入充值金额');
					return;
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