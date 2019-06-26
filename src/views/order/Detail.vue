<template>
	<div class="">
		<div class="s-a order-detail" v-if="product_info">
			<table>
				<tbody>
					<tr class="table-title">
						<td colspan="2">订单信息</td>
					</tr>
					<tr>
						<td>订单号</td>
						<td>{{product_info.ind}}</td>
					</tr>
					<tr>
						<td>下单时间</td>
						<td>{{product_info.add_time}}</td>
					</tr>
					<tr>
						<td>买家姓名(电话)</td>
						<td>{{product_info.userRealname}}</td>
					</tr>
					<tr>
						<td>支付单号</td>
						<td>{{product_info.trade_no}}</td>
					</tr>
					<tr>
						<td>订单状态</td>
						<td>
							{{product_info.pay_status == 0 ? '待付款' : '已付款'}}
						</td>
					</tr>
					<tr>
						<td>收货信息</td>
						<td>
							<p>收货人：{{product_info.get_name}}</p>
							<p>电话：{{product_info.get_tel}}</p>
							<p>地址：{{product_info.get_adr}}</p>
						</td>
					</tr>
					<tr>
						<td>发货方式</td>
						<td>
							<template v-if='product_info.delivery_type ==1'>快递</template>
							<template v-if='product_info.delivery_type ==2'>物流</template>
							<template v-if='product_info.delivery_type ==3'>供应商配送</template>
						</td>
					</tr>
					<tr>
						<td>快递公司</td>
						<td>{{product_info.express_name}}</td>
					</tr>
					<tr>
						<td>快递/物流单号</td>
						<td>{{product_info.express_ind}}</td>
					</tr>
					<tr v-if='product_info.delivery_tel'>
						<td>供应商配送人电话</td>
						<td>{{product_info.delivery_tel}}</td>
					</tr>
					<tr>
						<td>运费</td>
						<td>{{product_info.freight}}</td>
					</tr>
					<tr >
						<td class="table-title" colspan="2">订单金额</td>
					</tr>
					<tr>
						<td>总金额(含运费)</td>
						<td>{{product_info.total_amount}}</td>
					</tr>
				</tbody>
			</table>
			<!-- 商品信息 -->
			<table >
				<tbody >
					<tr>
						<td class="table-title" colspan="2">商品信息</td>
					</tr>
					<tr v-for='(item,index) in product_info.goods' :key='item.img'>
						<td >商品{{index +1}}</td>
						<td>
							<p>名称：{{item.name}}</p>
							
							<p>数量：{{item.num}}</p>
							<p>单价：{{item.price}}元</p>
						</td>
						
					</tr>
					<tr>
						<td>买家留言</td>
						<td >{{product_info.msg}}</td>
					</tr>
					<tr>
						<td>备注信息</td>
						<td >{{product_info.remark}}</td>
					</tr>
				</tbody>
			</table>
			
		</div>
		<div style="text-align: center;padding: 15px;">
			<el-button type="info" size="small" icon="el-icon-back" @click='$router.back()'>返回</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				product_info : null,
			}
		},
		created () {
			this.initData();
		},
		
		methods : {
			initData () {
				this.http.post('/v1/a_order/getOne',{
					id :this.$route.params.id
				}).then(res => {
					console.log(res)
					this.product_info = res.data;
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
	.order-detail {
		.table-title {
			background: #eceeef;
			font-weight: 700;
		}
		table {
			width: 45%;
			border: 1px solid #eceeef;
		}
		tr {
			width: 100%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			border: 1px solid #eceeef;
		}
		td {
			border: 1px solid #eceeef;
		}
	}
	
</style>
