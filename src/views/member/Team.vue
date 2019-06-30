<template>
	<div class="">
		<!-- 顶部 -->
		<!-- <el-row class='search-header' :gutter="10" >
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
		</el-row> -->
		<!--  -->
		<el-row :gutter="10" class='search-header' style='padding-top: 10px;'>
			<el-col :span='3' class='text'>
				<span class="green">团队总人数：{{total}}</span>
			</el-col>
			<!-- <el-col :span='2'>
				<el-button type='primary' size="small" >全部用户</el-button>
			</el-col>
			<el-col :span='2'>
				<el-button type='success' size="small" >普通用户</el-button>
			</el-col>
			<el-col :span='2'>
				<el-button type='danger' size="small" >分销商</el-button>
			</el-col> -->
		</el-row>
		<!-- 数据表 -->
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe
			ref="multipleTable">
			<el-table-column prop='id' label='ID'></el-table-column>
			
			<el-table-column prop='realname' label='真实姓名'></el-table-column>
			<el-table-column prop='tel' label='电话' width="120"></el-table-column>
			<el-table-column prop='recommend_id' label="推荐人ID">
				<!-- <template slot-scope='scope'>
					{{scope.row.recommend}}
				</template> -->
			</el-table-column>
			<el-table-column  label="用户身份">
				<template slot-scope='scope'>
					{{scope.row.type == 1 ? '普通用户' : '分销商'}}
				</template>
			</el-table-column>
			<el-table-column prop='team_num' label='团队人数'></el-table-column>
			<el-table-column prop='balance' label='账户余额'></el-table-column>
			<el-table-column prop='wait_commission' label='待结算佣金'></el-table-column>
			<el-table-column prop='pay_money' label='消费金额'></el-table-column>
			<el-table-column prop='add_time' label='加入时间' width="180"></el-table-column>
			<el-table-column fixed='right' label='操作' width='280px' >
				<template slot-scope="scope">
					<el-button type='text' size='small' @click="$router.push('/index/member-detail/'+scope.row.id)">详情</el-button>
					<el-button type='text' size='small' @click="getNextTeam(scope.row)" v-if='scope.row.type == 2'>团队成员</el-button>
					<el-button type="text" size="small" @click='recharge'>账户充值</el-button>
					<el-button type="text" size="small" @click='changeUserType(scope.row,1)' v-if='scope.row.type == 2'>转为普通用户</el-button>
					<el-button type="text" size="small" @click='changeUserType(scope.row,2)' v-if='scope.row.type == 1'>转为分销商</el-button>
					<!-- <el-button type='text' size='small' @click='deleteItem(scope.row)'>删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>
		<!-- 底部分页 -->
		<div class="pagination s-b">
			<el-button type="info" size="small" icon='el-icon-back' @click='$router.back()'>返回上一级</el-button>
			<el-pagination
			  background
			  @current-change="currentChange"
			  layout="prev, pager, next"
			  :total="total">
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
				list : null,
				page : 1,
				limit : 10,
				total : null,
				show_pwd_dialog : false,//显示输入密码dialog
				show_recharge_dialog : false,//显示重置dialog
				password : null,//操作安全码
				is_pwd : false,//安全码是否正确
				money : null,//充值金额
			}
			
		},
		created () {
			this.initData();
			console.log('c--',this.$route.params.id)
			//console.log('load')
		},
		
		methods : {
			initData(){
				this.http.post('/v1/a_user/getTeamUnder',{
					recommend_id : this.$route.params.id,
					page : this.page,
					limit : this.limit
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
			//修改用户身份
			changeUserType (item,type) {
				this.http.post('/v1/a_user/conversionType',{
					id : item.id,
					type : type
				}).then(res => {
					this.utils.msg(res.msg);
					this.initData();
				})
			},
			//获取下级团队成员
			getNextTeam (item) {
				this.$router.push({
					name : 'member-team',
					params : {id : item.id}
				})
			},
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
		watch : {
			$route (n) {
				this.initData();
			}
		}
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