<template>
	<div class="">
		
		<el-form>
			<el-form-item label="运费是否参与分销">
				<el-switch 
					v-model="is_express_fee_join_fx"
					active-text="参与"
					inactive-text="不参与"></el-switch>
			</el-form-item>
		</el-form>
		<el-row class="search-header">
			<el-col span='2'>
				<el-button type="primary" size="small" @click='addRules'>添加运费规则</el-button>
			</el-col>
		</el-row>
		<el-alert
			title='设置后请勿随意修改'
			type='warning'
			show-icon></el-alert>
		<el-table 
			:data='list'
			:show-header='false'
			border>
			<el-table-column>
				<template slot-scope='scope'>
					订单满<el-input class='mini-input' v-model='scope.row.order_account'></el-input>元，
					运费为<el-input class='mini-input' v-model='scope.row.express_fee'></el-input>元
				</template>
			</el-table-column>
			<el-table-column width="180px">
				<template slot-scope='scope'>
					<el-button type="danger" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="text-center">
			<el-button type="primary" size="small">保存设置</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				list : [
					{
						id : 1,
						order_account : 0,
						express_fee : 10,
					},{
						id : 2,
						order_account : 100,
						express_fee : 8,
					},{
						id : 2,
						order_account : 200,
						express_fee : 0,
					}
				],
				is_express_fee_join_fx : false
			}
		},
		created () {
			
		},
		
		methods : {
			
			addRules () {
				this.list.push({
					order_account : null,
					express_fee : null,
				})
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
<style lang="less">
	.express-table {
		width: 100%;
		// border: 1px solid #f1f1f1;
		tr {
			padding: 10px;
			border: 1px solid #f1f1f1;
			td,th {
				padding: 10px;
				box-shadow: 1px 1px 1px #f1f1f1,-1px -1px 1px #f1f1f1;
			}
		}
	}
</style>
