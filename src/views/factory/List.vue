<template>
	<div class="">
		<el-row :gutter='10' class="search-header" type="flex">
			<el-col :span='3'>
				<el-select v-model="search_type" placeholder="请选择">
					<el-option value='1' label='厂商ID'></el-option>
					<el-option value='2' label='厂商名称'></el-option>
					<el-option value='3' label='厂商联系人姓名'></el-option>
					<el-option value='4' label='厂商联系人电话'></el-option>
			  	</el-select>
			</el-col>
			<el-col :span='4'>
				<el-input placeholder='输入搜索关键字' v-model='key_word'></el-input>
			</el-col>
			<el-col :span='2'>
				<el-button type='primary' size='small' icon='el-icon-search' @click='search'>搜索</el-button>
			</el-col>
		</el-row>
		<el-alert
			title="如果厂家有设置无偿供货金额，则货款将优先从无偿供货金额中扣除，当无偿供货金额归零时，货款则统计入未结算金额。"
			type="warning"
			show-icon>
		</el-alert>
		<!-- 表格 -->
		<el-table :data='list' 
			stripe 
			header-row-class-name='bg-table-header'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			ref="multipleTable">
			<el-table-column prop='id' label='厂商ID'></el-table-column>
			<el-table-column prop='factory_name' label='厂商名称'></el-table-column>
			<el-table-column prop='user_name' label='厂商联系人姓名'></el-table-column>
			<el-table-column prop='phone' label='厂商联系人手机'></el-table-column>
			<el-table-column prop='free_supply' label='无偿供货金额(元)'></el-table-column>
			<el-table-column prop='unsettled_amount' label='未结算货款(元)'></el-table-column>
			<el-table-column prop='time' label='添加时间'></el-table-column>
			<el-table-column fixed='right' label='操作' width='200'>
				<template slot-scope="scope">
					<el-button type="text" size="small">详情</el-button>
					<el-button type="text" size="small" @click='showDialog(scope.row)'>结算货款</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<div class="pagination s-b">
			<span></span>
			<el-pagination
			  background
			  layout="prev, pager, next"
			  :total="1000">
			</el-pagination>
		</div>
		<!-- 结算dialog -->
		<el-dialog 
			title='结算' 
			:visible.sync='show_dialog' 
			:append-to-body='true'
			:close-on-click-modal='false'
			:close-on-press-escape='false'
			:show-close='false'>
			<el-input v-model='settled_amount' type='number' placeholder="请输入结算金额"></el-input>
			<el-alert
				title="如果厂家有设置无偿供货金额，结算时将优先从无偿供货金额中扣除，当无偿供货金额归零时，结算金额从未结算金额中扣除。"
				type="warning"
				show-icon>
			</el-alert>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="cancle" size='small'>取 消</el-button>
			    <el-button type="primary" @click="curfirm" size='small'>确 定</el-button>
		  	</span>
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
				list : [
					{
						id : 1,
						factory_name : 'xx工厂',
						user_name : '陈厂长',
						phone : 15960209969,
						time : '2018-08-08',
						free_supply : 50000,
						unsettled_amount : 0
					},{
						id : 2,
						factory_name : 'xx工厂',
						user_name : '陈厂长',
						phone : 15960209969,
						time : '2018-08-08',
						free_supply : 0,
						unsettled_amount : 4000
					}
					
				],
				show_dialog : false,
				settled_amount : null,//dialog中的结算金额
			}
		},
		created () {
			
		},
		
		methods : {
			showDialog (item) {
				this.show_dialog = true;
			},
			cancle () {
				this.show_dialog = false;
				this.settled_amount = null;
			},
			curfirm () {
				if (!this.settled_amount) {
					this.utils.msg('请输入结算金额');
					return;
				}
				if (this.settled_amount <= 0) {
					this.utils.msg('结算金额必须大于0');
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
