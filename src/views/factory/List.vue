<template>
	<div class="">
		<el-row :gutter='10' class="search-header" type="flex">
			<el-col :span='3'>
				<el-select v-model="search_type" placeholder="请选择">
					<el-option value='id' label='厂商ID'></el-option>
					<el-option value='name' label='厂商名称'></el-option>
					<el-option value='realname' label='厂商联系人姓名'></el-option>
					<el-option value='tel' label='厂商联系人电话'></el-option>
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
			<el-table-column prop='name' label='厂商名称'></el-table-column>
			<el-table-column prop='realname' label='厂商联系人姓名'></el-table-column>
			<el-table-column prop='tel' label='手机号码'></el-table-column>
			<el-table-column prop='gratis' label='无偿供货金额(元)'></el-table-column>
			<el-table-column prop='wait_goods_money' label='未结算货款(元)'></el-table-column>
			<el-table-column prop='wait_fare' label='未结算运费(元)'></el-table-column>
			<!-- <el-table-column prop='time' label='添加时间'></el-table-column> -->
			<el-table-column fixed='right' label='操作' width='320'>
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="$router.push('factory-detail/'+scope.row.id)">详情</el-button>
					<el-button type="text" size="small" @click='showDialog(scope.row)'>结算货款</el-button>
					<el-button type="text" size="small" @click='showDialogExpress(scope.row)'>结算运费</el-button>
					<el-button type="text" size="small" @click="$router.push('factory-order/'+scope.row.id)">查看订单</el-button>
					<el-button type="text" size="small" @click="deleteItem(scope.row.id)">删除供应商</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<div class="pagination s-b">
			<span></span>
			<el-pagination
			  background
			  layout="prev, pager, next"
			  :total="total">
			</el-pagination>
		</div>
		<!-- 结算货款dialog -->
		<el-dialog 
			title='货款结算' 
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
		<!-- 结算运费dialog -->
		<el-dialog 
			title='运费结算' 
			:visible.sync='show_dialog_express' 
			:append-to-body='true'
			:close-on-click-modal='false'
			:close-on-press-escape='false'
			:show-close='false'>
			<el-input v-model='settled_amount_express' type='number' placeholder="请输入结算金额"></el-input>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="cancleExpress" size='small'>取 消</el-button>
			    <el-button type="primary" @click="curfirmExpress" size='small'>确 定</el-button>
		  	</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				limit : 10,
				page :1,
				total  :1,
				search_type : 'id',
				key_word : null,
				list : null,
				show_dialog : false,
				show_dialog_express : false,
				settled_amount : null,//dialog中的结算金额
				settled_amount_express : null,//dialog中的结算运费金额
				item_tmp : null,//临时中间变量，用来存储结算时的供货商对象
			}
		},
		created () {
			this.initData()
		},
		
		methods : {
			initData(){
				this.http.post('/v1/a_factory/getAll',{
					limit : this.limit,
					page : this.page,
					id : this.search_type == 'id' ? this.key_word : null,
					name : this.search_type == 'name' ? this.key_word : null,
					realname : this.search_type == 'realname' ? this.key_word : null,
					tel : this.search_type == 'tel' ? this.key_word : null,
				}).then(res => {
					console.log(res)
					this.list = res.data.data;
					this.total = res.total;
				})
			},
			//显示结算货款dialog
			showDialog (item) {
				this.item_tmp = item;
				this.show_dialog = true;
			},
			showDialogExpress (item) {
				this.show_dialog_express = true;
			},
			cancle () {
				this.show_dialog = false;
				this.settled_amount = null;
				this.item_tmp = null;
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
				
				this.http.post('/v1/a_factory/settlementPurchase',{
					factory_id : this.item_tmp.id,
					money : this.settled_amount
				}).then(res => {
					this.utils.msg(res.msg);
					this.cancle();
					this.initData();
				})
			},
			cancleExpress () {
				this.show_dialog_express = false;
				this.settled_amount_express = null;
			},
			curfirmExpress () {
				if (!this.settled_amount_express) {
					this.utils.msg('请输入结算金额');
					return;
				}
				if (this.settled_amount_express <= 0) {
					this.utils.msg('结算金额必须大于0');
					return;
				}
			},
			search () {
				this.page = 1;
				this.initData();
			},
			// 删除供应商
			deleteItem (id) {
				this.$alert('删除供应商后，该供应商对应的商品/财务等数据都将一起被删除，您确定删除供应商吗？', '警告', {
					confirmButtonText: '确定',
					showCancelButton :true,
					callback: action => {
						if ( action == 'confirm' ) {
							this.http.post('/v1/a_factory/del',{
								id : id
							}).then(res => {
								//删除成功回调
								this.$alert('删除成功','提示',{
									confirmButtonText : '确定',
									closeOnClickModal : false,
									closeOnPressEscape : false,
									showClose : false,
									callback : action => {
										this.initData();
									}
								})
							})
						}
					}
				});
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
