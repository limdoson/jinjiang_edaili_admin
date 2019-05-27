<template>
	<div class="">
		<div class="s-a order-detail">
			<table>
				<tbody>
					<tr class="table-title">
						<td colspan="2">订单信息</td>
					</tr>
					<tr>
						<td>订单号</td>
						<td>15151</td>
					</tr>
					<tr>
						<td>下单时间</td>
						<td>1</td>
					</tr>
					<tr>
						<td>买家信息</td>
						<td>1</td>
					</tr>
					<tr>
						<td>支付单号</td>
						<td>1</td>
					</tr>
					<tr>
						<td>订单状态</td>
						<td>1</td>
					</tr>
					<tr>
						<td>收货信息</td>
						<td>
							<p>收货人：1</p>
							<p>电话：1</p>
							<p>地址：1</p>
						</td>
					</tr>
					<tr>
						<td>快递公司</td>
						<td>1</td>
					</tr>
					<tr>
						<td>快递单号</td>
						<td>1</td>
					</tr>
					<tr>
						<td>运费</td>
						<td>1</td>
					</tr>
					<tr >
						<td class="table-title" colspan="2">订单金额</td>
					</tr>
					<tr>
						<td>总金额(含运费)</td>
						<td>1</td>
					</tr>
				</tbody>
			</table>
			<!-- 商品信息 -->
			<table >
				<tbody>
					<tr>
						<td class="table-title" colspan="2">商品信息</td>
					</tr>
					<tr >
						<td >商品1</td>
						<td>
							<p>名称：1</p>
							
							<p>数量：1</p>
							<p>单价：1元</p>
						</td>
						
					</tr>
					<tr>
						<td>买家留言</td>
						<td >1</td>
					</tr>
					<tr>
						<td>备注信息</td>
						<td >1</td>
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
				
			}
		},
		created () {
			
		},
		
		methods : {
			
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
