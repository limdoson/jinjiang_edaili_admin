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
					<ul>
						<li v-for="item in selected_products" :key='item.id' v-if='selected_products.length'>{{item.id}}</li>
					</ul>
					<el-button 
						type="primary" 
						size="small" 
						@click='showProductDialog'>{{selected_products.length ? '重新选择' : '选择商品'}}</el-button>
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
					<ul>
						<li v-for="item in selected_users" :key='item.id'>{{item.id}}-{{item.name}}</li>
					</ul>
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
					<el-button type="primary" size="small">确认发放优惠券</el-button>
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
						<el-option label='商品名称' value='1'></el-option>
						<el-option label='商品ID' value='2'></el-option>
						<el-option label='供货商名称' value='3'></el-option>
						<el-option label='供货商ID' value='4'></el-option>
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
				 @selection-change="productSelectionChange"
				:header-cell-style = "{backgroundColor: '#fafafa'}">
				 <el-table-column
					type="selection"
					width="55"
					:reserve-selection="true">
				</el-table-column>
				<el-table-column prop='id' label='商品ID'></el-table-column>
				<el-table-column prop='name' label='商品名称'></el-table-column>
				<el-table-column prop='buyer' label='图片'>
					<template slot-scope='scope'>
						<img src="http://flag.xmwxxx.com/img/entrep.7379ab52.png" alt="" width="60px">
					</template>
				</el-table-column>
				<el-table-column prop='supplier' label='供应商名称'></el-table-column>
				<el-table-column prop='supply_price' label='供应价'></el-table-column>
				<el-table-column prop='market_price' label='售价'></el-table-column>
				<el-table-column prop='stock' label='库存'></el-table-column>
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
			    <el-button type="primary" @click="curfirmSelect" size='small'>确 定</el-button>
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
						<el-option label='昵称' value='2'></el-option>
						<el-option label='姓名' value='3'></el-option>
						<el-option label='电话' value='4'></el-option>
					</el-select>
				</el-col>
				<el-col :span='8'>
					<el-input placeholder="请输入搜索关键词" v-model="key_word_user"></el-input>
				</el-col>
				<el-col :span='2'>
					<el-button type='primary' size="small" icon="el-icon-search">搜索</el-button>
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
				<el-table-column prop='name' label='用户姓名'></el-table-column>
				<el-table-column prop='phone' label='电话'></el-table-column>
				
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
			    <el-button @click="cancleSelectUser" size='small'>取 消</el-button>
			    <el-button type="primary" @click="curfirmSelectUser" size='small' >确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {},
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
				list : [
					{
						id :1,
						name : '商品名称',
						supply_price : '供应价',
						market_price : '售价',
						supplier : '供应商名称',
						stock : '库存'
					},{
						id :2,
						name : '商品名称',
						supply_price : '供应价',
						market_price : '售价',
						supplier : '供应商名称',
						stock : '库存'
					},{
						id :3,
						name : '商品名称',
						supply_price : '供应价',
						market_price : '售价',
						supplier : '供应商名称',
						stock : '库存'
					},{
						id :4,
						name : '商品名称',
						supply_price : '供应价',
						market_price : '售价',
						supplier : '供应商名称',
						stock : '库存'
					},{
						id :5,
						name : '商品名称',
						supply_price : '供应价',
						market_price : '售价',
						supplier : '供应商名称',
						stock : '库存'
					}
				],
				selected_products : [],//已选商品
				// selected_products_data : [],//用来存储已选择的商品数据
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
				this.show_product_dialog = true;
			},
			showUserDialog () {
				this.show_user_dialog = true;
			},
			//修改优惠券类别
			changeCouponCls (cls) {
				if (cls == 1) {//切换为全场商品通用优惠券
					this.selected_products_data = [];
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
