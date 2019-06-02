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
			<el-table-column prop='real_name' label='姓名'></el-table-column>
			<el-table-column prop='user_identity' label="推荐人(ID)">
				<template slot-scope='scope'>
					{{scope.row.recommender}}（{{scope.row.recommender_id}}）
				</template>
			</el-table-column>
			<el-table-column prop='csp_amount' label='消费金额'></el-table-column>
			<el-table-column prop='time' label='申请时间'></el-table-column>
			<el-table-column fixed='right' label='操作' width='280'>
				<template slot-scope="scope">
					<el-button type="text" size="small">通过申请</el-button>
					<el-button type="text" size="small" @click='show_reason_dialog = true;'>驳回申请</el-button>
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
				list : [
					{
						id :1,
						nick_name : '林',
						real_name : '林杜森',
						user_id : 1,
						recommender : '林文峰',
						recommender_id : 2,
						csp_amount : 1000,
						time : '1920-08-01'
					},{
						id :1,
						nick_name : '林',
						real_name : '林杜森',
						user_id : 1,
						recommender : '林文峰',
						recommender_id : 2,
						csp_amount : 0,
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
			hideDialog () {
				this.show_reason_dialog = false;
				this.reason_for_reject = null;
			},
			curfirmReject () {
				
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