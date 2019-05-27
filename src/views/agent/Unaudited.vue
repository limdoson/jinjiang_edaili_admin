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
				<el-input></el-input>
			</el-col>
			<el-col :span='2'>
				<el-button type='primary' size="small" icon="el-icon-search">搜索</el-button>
			</el-col>
		</el-row>
		<!--  -->
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe
			ref="multipleTable">
			<el-table-column prop='id' label='ID'></el-table-column>
			<el-table-column prop='real_name' label='申请者姓名'></el-table-column>
			<el-table-column prop='phone' label='手机号码'></el-table-column>
			<el-table-column prop='agent_level' label='申请代理等级'></el-table-column>
			<el-table-column prop='payment' label='缴费金额'></el-table-column>
			<el-table-column label='缴费状态'>
				<template slot-scope='scope'>
					<span class="red" v-if='scope.row.status == 0'>未缴费</span>
					<span class="green" v-else>已缴费</span>
				</template>
			</el-table-column>
			<el-table-column prop='time' label='申请时间'></el-table-column>
			<el-table-column prop='recommender' label="推荐人"></el-table-column>
			<el-table-column fixed='right' label='操作' width='200'>
				<template slot-scope="scope">
					<el-button type="text" size="small" @click='applyPassed'>通过申请</el-button>
					<el-button type="text" size="small" @click='applyRejected'>驳回申请</el-button>
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
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				search_type : '1',
				list : [
					{
						id : 1,
						real_name : '真实姓名',
						phone : '15960209969',
						agent_level : '1级代理',
						payment :  1000,
						status : 1,//0未缴费，1已缴费
						time : '2018-05-05',
						recommender : '林杜森'
					},{
						id : 1,
						real_name : '真实姓名',
						phone : '15960209969',
						agent_level : '1级代理',
						payment :  1000,
						status : 0,//0未缴费，1已缴费
						time : '2018-05-05',
						recommender : '-'
					}
				],
				show_reason_dialog : false,
				reason_for_reject : null,//驳回原因
				tmp_item : null,//用来存储操作过程中的中间变量
			}
		},
		created () {
			
		},
		
		methods : {
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
