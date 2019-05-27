<template>
	<div class="transaction-config">
		<div class="form-container">
			<el-form label-width="180px">
				<el-form-item label='分销等级设置'>
					<el-input readonly v-model='fx_level' style='width: 120px;'></el-input>
					<el-button type="primary" size="small" style='margin-left: 10px;' @click='addFxLevel()'>添加</el-button>
					<el-button type="danger" size="small" @click='reduceFxLevel'>减少</el-button>
				</el-form-item>
				<el-form-item label='分销比例设置'>
					<ul class="rule-list">
						<li class="s-b">
							<div>分销等级</div>
							<div>分销比例（百分比）</div>
						</li>
						<li v-for='(item,index) in fx_rules_list' :key='item.rate' class="s-b">
							<div>
								<span>{{index+1}}级</span>
								
							</div>
							<div>
								<el-input v-model='item.rate'></el-input>
							</div>
							
						</li>
					</ul>
					<el-alert
						title="分销等级说明：A推荐B，B推荐C进入平台，C购买了平台中的商品，A享受1级分销，B享受2级分销;分销比例计算方式：商品销售价格*对应等级分销比例。"
						type="warning"
						show-icon>
					</el-alert>
				</el-form-item>
				<el-form-item label='代理级数'>
					<el-input readonly v-model='agentLevel' style='width: 120px;'></el-input>
					<el-button type="primary" size="small" style='margin-left: 10px;' @click='addAgentLevel'>添加</el-button>
					<el-button type="danger" size="small" @click='reduceAgentLevel'>减少</el-button>
				</el-form-item>
				<el-form-item label="代理设置">
					<ul class="rule-list">
						<li class="s-b">
							<div>代理名称</div>
							<div>进货折扣（折扣）</div>
							<div>缴费金额（元）</div>
						</li>
						<li v-for='item in rules_list' :key='item.name' class="s-b">
							<div>
								<el-input v-model='item.name'></el-input>
							</div>
							<div>
								<el-input v-model='item.discount'></el-input>
							</div>
							<div>
								<el-input v-model='item.payment'></el-input>
							</div>
						</li>
					</ul>
					<el-alert
						title="进价折扣说明：假设1级代理进货折扣为8折，厂家提供商品市场售价为10元，则1级代理的进货价为10*0.8=8元。"
						type="warning"
						show-icon>
					</el-alert>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small">保存设置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	export default {
		components : {},
		data () {
			return {
				fx_level : 2,//分销等级
				fx_rules_list : [
					{
						rate : 10
					},{
						rate : 5
					}
				],//分销比例
				agentLevel : 3,//代理级数
				rules_list : [//代理设置
					{
						name : '一级代理',
						discount : 8,
						payment : 1000
					},{
						name : '二级代理',
						discount : 8.5,
						payment : 800
					},{
						name : '三级代理',
						discount : 9,
						payment : 600
					}
				]
			}
		},
		created  () {
			
		},
		//mounted () {},
		methods : {
			/* 
			* 增加分销等级
			*  */
			addFxLevel () {
				this.fx_level ++;
				this.fx_rules_list.push({
					rate : null
				})
			},
			// 减少分销等级
			reduceFxLevel () {
				if (this.fx_level <= 1) {
					this.utils.msg('至少需要设置一个分销等级')
					return;
				}
				this.fx_level --;
				this.fx_rules_list.splice(this.fx_rules_list.length - 1, 1)
			},
			/*
			 * 添加奖励条数
			 */
			addAgentLevel () {
				this.agentLevel ++;
				this.rules_list.push({
					name : null,
					discount : null,
					payment : null
				})
			},
			/*
			 * 减少奖励条数
			 */
			reduceAgentLevel () {
				if (this.agentLevel <= 1) {
					this.utils.msg('至少需要设置一个代理等级')
					return;
				}
				this.agentLevel --;
				this.rules_list.splice(this.rules_list.length - 1, 1)
			},
			/*
			 * 保存设置
			 */
			save () {
				if (this.day_unit < 1 || this.time_unit < 1) {
					this.utils.msg('交易频次最小设置值为每1天可交易1手');
					return;
				}
				if (!this.default_buy_price || !this.default_buy_price) {
					this.utils.msg('请设置默认买进价格及默认卖出价格');
					return;
				}
				if (this.default_buy_price <= 0 || this.default_sale_price <= 0) {
					this.utils.msg('默认买进价格及默认卖出价格必须大于0');
					return;
				}
				let flag = this.rules_list.every(item => {
					return item.price > 0 && item.coin > 0
				})
				if (!flag) {
					this.utils.msg('请设置正确的团队奖励规则');
					return;
				}
			}
		}
	}
</script>
<style lang="less">
	.rule-list {
		width: 800px;
		border: 1px solid #f1f1f1;
		li {
			padding: 10px 0;
			text-align: center;
			&:nth-of-type(1) {
				background: #f1f1f1;
			}
			div {
				width: 50%;
				text-align: center;
			}
		}
	}
</style>