<template>
	<div class="transaction-config">
		<div class="form-container">
			
			<el-form label-width="180px">
				<el-form-item label="分销商申请是否需要审核">
					<el-radio-group v-model='d_is_verify'>
						<el-radio :label='1'>需要</el-radio>
						<el-radio :label='2'>不需要</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="分销申请条件">
					<el-checkbox-group v-model="fx_update_config" @change='change'>
						<el-checkbox label="1" >免费申请</el-checkbox>
						<el-checkbox label='2'>消费满额</el-checkbox>
						<el-checkbox label="3">充值满额</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item label="升级分销所需消费额度" v-if='need_pay'>
					<el-input v-model="d_pay_money"></el-input>
				</el-form-item>
				<el-form-item label="升级分销所需充值额度" v-if='need_recharge'>
					<el-input v-model="d_recharge_money"></el-input>
				</el-form-item>
				<el-form-item label='分销等级设置'>
					<el-input readonly v-model='d_level' style='width: 120px;'></el-input>
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
								<el-input v-model='item.rate' type="number" ></el-input>
							</div>
							
						</li>
					</ul>
					<el-alert
						title="分销等级说明：A推荐B，B推荐C进入平台，C购买了平台中的商品，B享受1级分销，A享受2级分销;分销比例计算方式：商品销售价格*对应等级分销比例。"
						type="warning"
						show-icon>
					</el-alert>
				</el-form-item>
				<el-form-item label='代理级数'>
					<el-input readonly v-model='a_level' style='width: 120px;'></el-input>
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
								<el-input v-model='item.proportion' type="number" ></el-input>
							</div>
							<div>
								<el-input v-model='item.money'></el-input>
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
					<el-button type="primary" size="small" @click='save'>保存设置</el-button>
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
				d_is_verify : null,//分销是否需要审核
				d_condition : [0,0,0],//分销申请启用项
				d_level : 2,//分销等级
				fx_update_config : [],
				d_pay_money : null,//升级分销所需消费额度
				d_recharge_money : null,//升级分销所需充值额度
				d_proportion : null,//分销比例结果，用来提交后台
				fx_rules_list : [//分销比例->渲染用
					
				],//分销比例
				a_level : 3,//代理级数
				rules_list : [//代理设置
					
				]
			}
		},
		created  () {
			this.initData();
		},
		computed : {
			need_pay () {
				if (this.fx_update_config.indexOf('2') > -1) {
					return true;
				} else {
					return false
				}
			},
			need_recharge () {
				if (this.fx_update_config.indexOf('3') > -1) {
					return true;
				} else {
					return false
				}
			}
		},
		//mounted () {},
		methods : {
			initData () {
				//清空分销规则数组
				this.fx_rules_list = [];
				
				this.http.post('/v1/a_DAConfig/getOne',{
					
				}).then(res =>{
					this.d_is_verify = res.data.d_is_verify;
					this.d_recharge_money = res.data.d_recharge_money;
					this.d_pay_money = res.data.d_pay_money;
					this.d_condition = res.data.d_condition;
					//处理初始展示时的分销申请条件
					this.d_condition.map( (item,index)=>{
						if (item > 0) {
							this.fx_update_config.push( (index+1).toString() )
						}
					})
					this.d_level = res.data.d_level;
					//处理分销比例渲染数据
					this.d_proportion = res.data.d_proportion;
					this.d_proportion.map(item => {
						this.fx_rules_list.push({
							rate : item
						})
					})
					//end
					this.a_level = res.data.a_level;
					//处理代理等级数据渲染
					this.rules_list = res.data.a_info
				})
			},
			change (item) {
				//处理成后台需要的数据格式 0表示不启用，1表示启用
				if (item.indexOf('1') > -1) {
					this.d_condition[0] = 1;
				} else {
					this.d_condition[0] = 0;
				};
				if (item.indexOf('2') > -1) {
					this.d_condition[1] = 1;
				} else {
					this.d_condition[1] = 0;
				};
				if (item.indexOf('3') > -1) {
					this.d_condition[2] = 1;
				} else {
					this.d_condition[2] = 0;
				};
			},
			/* 
			* 增加分销等级
			*  */
			addFxLevel () {
				this.d_level ++;
				this.fx_rules_list.push({
					rate : null
				})
			},
			// 减少分销等级
			reduceFxLevel () {
				if (this.d_level <= 1) {
					this.utils.msg('至少需要设置一个分销等级')
					return;
				}
				this.d_level --;
				this.fx_rules_list.splice(this.fx_rules_list.length - 1, 1)
			},
			/*
			 * 添加奖励条数
			 */
			addAgentLevel () {
				this.a_level ++;
				this.rules_list.push({
					name : null,
					proportion : null,
					money : null
				})
			},
			/*
			 * 减少奖励条数
			 */
			reduceAgentLevel () {
				if (this.a_level <= 1) {
					this.utils.msg('至少需要设置一个代理等级')
					return;
				}
				this.a_level --;
				this.rules_list.splice(this.rules_list.length - 1, 1)
			},
			/*
			 * 保存设置
			 */
			save () {
				// if (this.need_pay && !this.need_pay_account) {
				// 	this.utils.msg('请填写升级分销所需消费额度');
				// 	return;
				// }
				// if (this.need_recharge && !this.need_recharge_acount) {
				// 	this.utils.msg('请填写升级分销所需充值额度');
				// 	return;
				// }
				// if ( !this.fx_rules_list.every(item =>  item.rate > 0) ) {
				// 	this.utils.msg('请完善分销等级对应分销比例');
				// 	return;
				// }
				// if ( !this.rules_list.every(item => item.discount > 0 && item.payment > 0 && item.name) ) {
				// 	this.utils.msg('请完善代理等级对应代理名称、进货折扣、缴费金额设置');
				// 	return;
				// }
				//处理分销处理数据，用来提交后台
				this.d_proportion = this.fx_rules_list.map(item => {
					return Number(item.rate);
				})
				this.http.post('/v1/a_DAConfig/update',{
					d_is_verify : this.d_is_verify,
					d_condition : JSON.stringify(this.d_condition),
					d_pay_money : this.d_pay_money,
					d_recharge_money : this.d_recharge_money,
					d_level : this.d_level,
					d_proportion : JSON.stringify(this.d_proportion),
					a_level :this.a_level,
					a_info : JSON.stringify(this.rules_list)
				}).then(res => {
					this.utils.msg(res.msg)
					this.initData();
				})
				// console.log(this.d_proportion)
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