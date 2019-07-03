<template>
	<div class="home">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<h1>财务统计（本月）</h1>
			</div>
			<ul class="finance-data s-b">
				<li>
					<p>{{account.saleMoney}}</p>
					<h1>销售额</h1>
				</li>
				<li>
					<p>{{account.disMoney}}</p>
					<h1>产生分销佣金</h1>
				</li>
				<li>
					<p>{{account.agentMoney}}</p>
					<h1>产生代理收益</h1>
				</li>
				<li>
					<p>{{account.profitMoney}}</p>
					<h1>平台收益</h1>
				</li>
			</ul>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<h1>用户统计（本月）</h1>
			</div>
			<ul class="finance-data s-b">
				<li>
					<p>{{user.agentNum}}</p>
					<h1>新增代理</h1>
				</li>
				<li>
					<p>{{user.disNum}}</p>
					<h1>新增分销商</h1>
				</li>
				<li>
					<p>{{user.factoryNum}}</p>
					<h1>新增供应商</h1>
				</li>
				<li>
					<p>{{user.user}}</p>
					<h1>新增用户(含分销商)</h1>
				</li>
			</ul>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<h1>订单统计（本月）</h1>
			</div>
			<ul class="finance-data s-b">
				<li>
					<p>{{order.all}}</p>
					<h1>总订单</h1>
				</li>
				<li>
					<p>{{order.waitPay}}</p>
					<h1>待付款订单</h1>
				</li>
				<li>
					<p>{{order.waitSend}}</p>
					<h1>待发货订单</h1>
				</li>
				<li>
					<p>{{order.waitGet}}</p>
					<h1>待收货订单</h1>
				</li>
			</ul>
		</el-card>
		<!-- <el-card class="box-card">
			<div slot="header" class="clearfix">
				<h1>待办事项</h1>
			</div>
			<ul class="wait-to-do">
				<li>订单号：<span class="red">151515151000</span>，下单时间：<span class="red">1988-02-02</span>，金额：<span class="red">￥100.00</span>还未发货。</li>
			</ul>
		</el-card>
		
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<h1>最近结算记录<span style="color: #ccc;font-size: 13px;">（仅显示最近30条记录，更多记录请前往财务管理->结算记录查看）</span></h1>
			</div>
			<ul class="wait-to-do">
				<li><span class="red">2018-05-08</span>，平台管理员：<span class="red">林杜森</span>与<span class="red">xxx工厂</span>进行货款结算，金额：<span class="red">￥100.00</span>。</li>
			</ul>
		</el-card> -->
	</div>
</template>
<script>
	export default {
		components : {},
		data () {
			return {
				account :null,
				order :null,
				user :null
			}
		},
		created  () {
			this.initData();
		},
		//mounted () {},
		methods : {
			initData () {
				this.http.post('/v1/a_index/getIndex',{
					
				}).then(res => {
					this.account = res.data.account;
					this.order = res.data.order;
					this.user = res.data.user;
				})
			}
		}
	}
</script>