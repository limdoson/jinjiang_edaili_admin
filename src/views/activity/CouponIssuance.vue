<template>
	<div class="">
		<div class="form-container">
			<el-form label-width="200px">
				<el-form-item label='优惠券名称'>
					<el-input v-model="coupon_title"></el-input>
				</el-form-item>
				<el-form-item label="优惠券类别">
					<el-select v-model='coupon_cls' @change='changeCouponCls'>
						<el-option label='全场商品通用优惠券' value='1'></el-option>
						<el-option label='指定商品优惠券' value='2'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label='选择指定商品' v-if='coupon_cls == 2'>
					<p v-if='selected_products'>已经选择商品：{{selected_products.name}}</p>
					<el-button 
						type="primary" 
						size="small" 
						@click='showProductDialog'>{{selected_products ? '重新选择' : '选择商品'}}</el-button>
				</el-form-item>
				<el-form-item label="优惠券类型">
					<el-select v-model='coupon_type' @change='changeCouponType'>
						<el-option label='普通优惠券' value='1'></el-option>
						<el-option label='满减优惠券' value='2'></el-option>
					</el-select>
					<el-alert
						type='warning'
						show-icon
						title='普通优惠券任意订单金额都可使用，请设置合理金额，避免金优惠券金额容易大于订单金额'></el-alert>
				</el-form-item>
				<el-form-item label='优惠券金额' v-if='coupon_type == 1'>
					<el-input v-model="coupon_money" type="number"></el-input>
				</el-form-item>
				<el-form-item label="满减设置" v-if='coupon_type == 2'>
					订单金额满
					<el-input class='mini-input' v-model="coupon_limit" type='number'></el-input >元，
					减<el-input class='mini-input' v-model='coupon_limit_money' type='number'></el-input>元
				</el-form-item>
				<el-form-item label="优惠券发放至">
					<el-select v-model='coupon_target' @change='changeCouponTarget'>
						<el-option label='领券中心' value='1'></el-option>
						<el-option label='指定用户' value='2'></el-option>
						<el-option label='全部用户' value='3'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="优惠券发放数量" v-if='coupon_target == 1'>
					<el-input type='number' v-model='coupon_num'></el-input>
					<el-alert
						type="warning"
						show-icon
						title='发放数量填写0表示不限制数量，当优惠券发放至指定用户以及全部用户时，默认为每个用户发放一张优惠券'></el-alert>
				</el-form-item>
				<el-form-item label="选择用户" v-if='coupon_target == 2'>
					<p v-if='selected_users.length'>已选用户ID：{{selected_users | returnIds}}</p>
					<el-button 
						type="primary"
						size="small" 
						@click='showUserDialog'>{{selected_users.length ? '重新选择' : '选择用户'}}</el-button>
				</el-form-item>
				<el-form-item label="优惠券过期时间">
					自发放<el-input class='mini-input' type="number" v-model="expiration_date"></el-input>天后过期
					<el-alert
						type='warning'
						show-icon
						title='填写0则表示永不过期，只有当用户使用了该优惠券后，该优惠券才会失效'></el-alert>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click='confirmAdd'>确认发放优惠券</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- 选择商品dialog -->
		<el-dialog
			title='选择指定商品' 
			:visible='show_product_dialog' 
			:append-to-body='true'
			:close-on-click-modal='false'
			:show-close='false'
			width='70%'>
			<!-- 搜索 -->
			<el-row class='search-header' :gutter="10" >
				<el-col :span='3'>
					<el-select v-model='search_type_product'>
						<el-option label='商品ID' value='1'></el-option>
						<el-option label='商品名称' value='2'></el-option>
						<el-option label='供货商ID' value='3'></el-option>
						<el-option label='供货商名称' value='4'></el-option>
						<el-option label='供货商电话' value='5'></el-option>
					</el-select>
				</el-col>
				<el-col :span='8'>
					<el-input placeholder="请输入搜索关键词" v-model="key_word_product"></el-input>
				</el-col>
				<el-col :span='2'>
					<el-button type='primary' size="small" icon="el-icon-search">搜索</el-button>
				</el-col>
			</el-row>
			<!-- 商品数据 -->
			<el-table
				:data='list'
				ref="multipleTable"
				row-keys='id'
				:header-cell-style = "{backgroundColor: '#fafafa'}">
				<el-table-column prop='id' label='商品ID'></el-table-column>
				<el-table-column prop='name' label='商品名称'></el-table-column>
				<el-table-column prop='buyer' label='图片'>
					<template slot-scope='scope'>
						<img :src="scope.row.cover" alt="" width="60px">
					</template>
				</el-table-column>
				<el-table-column prop='factory_name' label='供应商名称'></el-table-column>
				<el-table-column prop='supply_price' label='供应价'></el-table-column>
				<el-table-column prop='price' label='售价'></el-table-column>
				<el-table-column prop='stock' label='库存'></el-table-column>
				<el-table-column prop='buyer' label='图片'>
					<template slot-scope='scope'>
						<el-button type="primary" size="small" @click='choseProduct(scope.row)'>选择该商品</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination s-b">
				<span></span>
				<el-pagination
				  background
				  layout="prev, pager, next"
				  :total="1000">
				</el-pagination>
			</div>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="cancleSelect" size='small'>取 消</el-button>
			</span>
		</el-dialog>
		<!-- 选择用户dialog -->
		<el-dialog
			title='选择指定用户' 
			:visible='show_user_dialog' 
			:append-to-body='true'
			:close-on-click-modal='false'
			:show-close='false'
			width='70%'>
			<!-- 搜索 -->
			<el-row class='search-header' :gutter="10" >
				<el-col :span='3'>
					<el-select v-model='search_type_user'>
						<el-option label='用户ID' value='1'></el-option>
						<el-option label='用户姓名' value='2'></el-option>
						<el-option label='手机号码' value='3'></el-option>
					</el-select>
				</el-col>
				<el-col :span='8'>
					<el-input placeholder="请输入搜索关键词" v-model="key_word_user"></el-input>
				</el-col>
				<el-col :span='2'>
					<el-button type='primary' size="small" icon="el-icon-search" @click='searchUser'>搜索</el-button>
				</el-col>
			</el-row>
			<!-- 用户数据 -->
			<el-table
				:data='user_list'
				ref="multipleTable"
				row-keys='id'
				 @selection-change="userSelectionChange"
				:header-cell-style = "{backgroundColor: '#fafafa'}">
				 <el-table-column
					type="selection"
					width="55"
					:reserve-selection="true">
				</el-table-column>
				<el-table-column prop='id' label='用户ID'></el-table-column>
				<el-table-column prop='nickname' label='昵称'></el-table-column>
				<el-table-column prop='realname' label='用户姓名'></el-table-column>
				<el-table-column prop='tel' label='电话'></el-table-column>
				
			</el-table>
			<div class="pagination s-b">
				<span></span>
				<el-pagination
				  background
				  layout="prev, pager, next"
				  @current-change='userCurrentChange'
				  :total="user_total">
				</el-pagination>
			</div>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="cancleSelectUser" size='small'>取 消</el-button>
			    <el-button type="primary" @click="curfirmSelectUser" size='small' >确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {},
		filters: {
			returnIds: function(item) {
				return item.map(item => item.id);
			}
		},
		data () {
			return {
				show_product_dialog : false,
				show_user_dialog : false,
				coupon_title : null,//优惠券名称
				coupon_cls : '1',//优惠券种类
				coupon_type : '1',//优惠券类型
				coupon_target : '1',//优惠券发放至哪里
				coupon_money : null,//普通优惠券优惠金额
				coupon_limit : null,//满减优惠券条件金额
				coupon_limit_money : null,//满减优惠券优惠金额
				coupon_num : null,//优惠券发放数量
				expiration_date : null,//优惠券过期时间
				list : null,
				limit : 10,
				page : 1,
				total : 1,
				selected_products : null,//已选商品
				search_type_product :'1',//搜索类型
				key_word_product : null,//搜索关键字
				user_list : [
					{
						id :1,
						name : '林杜森',
						nick_name : '林',
						phone : 15960209969
					},{
						id :2,
						name : '林杜森',
						nick_name : '林',
						phone : 15960209969
					},{
						id :3,
						name : '林杜森',
						nick_name : '林',
						phone : 15960209969
					},{
						id :4,
						name : '林杜森',
						nick_name : '林',
						phone : 15960209969
					}
				],
				user_page : 1,
				user_limit : 10,
				user_total : 1,
				search_type_user :'1',//搜索类型
				key_word_user : null,//搜索关键字
				selected_users :[],//多选用户集合
				// selected_users_data : [],//用来存储已选用户数据
			}
		},
		created () {
			
		},
		
		methods : {
			showProductDialog () {
				this.getProductData();
				
			},
			getProductData () {
				this.http.post('/v1/a_goods/getIsSale',{
					page : this.page,
					limit : this.limit,
					id : this.search_type_product == '1' ? this.key_word_product : null,
					name : this.search_type_product == '2' ? this.key_word_product : null,
					factoryId : this.search_type_product == '3' ? this.key_word_product : null,
					factoryName : this.search_type_product == '4' ? this.key_word_product : null,
					factoryTel : this.search_type_product == '5' ? this.key_word_product : null,
				}).then(res => {
					this.total = res.data.total;
					this.list = res.data.data;
					this.show_product_dialog = true;
				})
			},
			choseProduct (item) {
				this.selected_products = item;
				this.show_product_dialog = false;
			},
			showUserDialog () {
				this.http.post('/v1/a_user/getAll',{
					page : this.user_page,
					limit :this.user_limit,
					page : this.user_page,
					limit :this.user_limit,
					id : this.search_type_user == '1' ? this.key_word_user : null,
					realname : this.search_type_user == '2' ? this.key_word_user : null,
					tel : this.search_type_user == '3' ? this.key_word_user : null,
				}).then(res => {
					this.user_list = res.data.data;
					this.user_total = res.data.total;
					this.show_user_dialog = true;
					
				})
				
			},
			getUserData () {
				this.http.post('/v1/a_user/getAll',{
					page : this.user_page,
					limit :this.user_limit,
					id : this.search_type_user == '1' ? this.key_word_user : null,
					realname : this.search_type_user == '2' ? this.key_word_user : null,
					tel : this.search_type_user == '3' ? this.key_word_user : null,
				}).then(res => {
					this.user_list = res.data.data;
					this.user_total = res.data.total;
				})
			},
			userCurrentChange (page) {
				this.user_page = page;
				this.getUserData()
			},
			searchUser () {
				this.page = 1;
				this.getUserData();
			},
			//修改优惠券类别
			changeCouponCls (cls) {
				if (cls == 1) {//切换为全场商品通用优惠券
					this.selected_products = null;
				} else if (cls == 2) {//切换为指定商品优惠券
					
				}
			},
			//修改优惠券类型
			changeCouponType(type) {
				if (type == 1) {//切换为普通优惠券
					this.coupon_limit = null;
					this.coupon_limit_money = null;
				} else if (type == 2) {//切换为满减优惠券
					this.coupon_money = null;
					
				}
			},
			//修改优惠券发放目标
			changeCouponTarget (target) {
				if (target == 1) {//切换为发放到领券中心
					this.selected_users = [];
					
				} else if (target == 2) {//切换为发放指定用户
					this.coupon_num = null;
				}
			},
			productSelectionChange (val) {
				this.selected_products = val
			},
			userSelectionChange (val) {
				this.selected_users = val;
			},
			//取消选择商品
			cancleSelect () {
				this.resetData()
			},
			//确认选择商品
			curfirmSelect () {
				// if (this.selected_products_data.length > 0) {//已有选择商品
				// 	let filter_result = this.selected_products.filter( a_item => {
				// 		return this.selected_products_data.every( b_item => {
				// 			return b_item.id != a_item.id
				// 		} )
				// 	} )
				// 	this.selected_products_data = this.selected_products_data.concat(filter_result)
				// 	
				// } else {
				// 	this.selected_products_data = this.selected_products;
				// }
				this.resetData()
			},
			//取消选择用户
			cancleSelectUser () {
				this.resetData();
			},
			//确认选择用户
			curfirmSelectUser () {
				// if (this.selected_users_data.length > 0) {//已有选择商品
				// 	let filter_result = this.selected_users.filter( a_item => {
				// 		return this.selected_users_data.every( b_item => {
				// 			return b_item.id != a_item.id
				// 		} )
				// 	} )
				// 	this.selected_users_data = this.selected_users_data.concat(filter_result)
				// 	
				// } else {
				// 	this.selected_users_data = this.selected_users;
				// }
				this.resetData()
			},
			resetData () {
				this.show_product_dialog = false;
				this.show_user_dialog = false;
			},
			//处理表格的选中状态
			toggleSelection(rows) {
				if (rows) {
					console.log(this.$refs.multipleTable)
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row)
					})
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			//确认发放优惠券
			confirmAdd () {
				if (!this.coupon_title) {
					this.utils.msg('请填写优惠券名称');
					return;
				}
				if (this.coupon_cls == '2' && !this.selected_products) {
					this.utils.msg('请选择指定商品');
					return;
				}
				if (this.coupon_type == 1 && !this.coupon_money) {
					this.utils.msg('请设置优惠券金额');
					return;
				}
				if (this.coupon_type == 2 && !this.coupon_limit && !this.coupon_limit_money) {
					this.utils.msg('请设置优惠券使用条件既满减金额');
					return;
				}
				if (this.coupon_target == 1 && !this.coupon_num) {
					this.utils.msg('请设置优惠券发放数量');
					return;
				}
				if (this.coupon_target == 2 && (!this.selected_users || !this.selected_users.length)) {
					this.utils.msg('请选择指定用户');
					return;
				}
				if(!this.expiration_date) {
					this.utils.msg('请设置优惠券过期天数');
					return;
				}
				this.http.post('/v1/a_coupon/setCoupon',{
					title : this.coupon_title,//优惠券名称
					model : this.coupon_cls,//优惠券类别
					type : this.coupon_type,//优惠券类型
					money : this.coupon_money,//优惠券金额
					order_money : this.coupon_limit,//满减优惠券使用条件
					reduce_money : this.coupon_limit_money,//满减多少
					number : this.coupon_num,//发放数量
					to : this.coupon_target,//发放目的地
					user_id : this.selected_users.length ? JSON.stringify(this.selected_users.map(item => item.id)) : null,//指定用户时的IDJSON数据
					goods_id : this.selected_products ? this.selected_products.id : null,
					end_time : this.expiration_date,//优惠券过期天数
				}).then(res => {
					// this.utils.msg(res.msg,()=>{
					// 	this.$router.back();
					// })
				})
			}
		},
		
		computed: {
			
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
