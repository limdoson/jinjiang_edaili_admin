<template>
	<div class="">
		<div class="form-container">
			<el-form label-width="180px">
				<el-form-item label='可玩次数/天'>
					<el-input></el-input>
				</el-form-item>
				<el-form-item  label="奖品数量" >
					<el-input readonly v-model="num_of_prize"></el-input>
					<el-button type="primary" size="small" style='margin-left: 10px;' @click='addConfig'>添加</el-button>
					<el-button type="danger" size="small" @click='minusConfig'>减少</el-button>
				</el-form-item>
				<el-form-item label="奖品设置">
					<el-table
						stripe 
						header-row-class-name='bg-table-header'
						:header-cell-style = "{backgroundColor: '#fafafa'}"
						ref="multipleTable"
						:data='prize_config'>
						<el-table-column prop='id' label='中奖概率(百分比)'>
							<template slot-scope='scope'>
								<el-input placeholder="请设置中奖概率(百分比)" v-model="scope.row.rate"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop='id' label='奖励U币数量'>
							<template slot-scope='scope'>
								<el-input placeholder="请设置对应奖励U币数量" v-model="scope.row.coin"></el-input>
							</template>
						</el-table-column>
					</el-table>
					<p class="tips">请确保所有奖品的中奖率之和为100</p>
				</el-form-item>
				<el-form-item>
					<el-button  type="primary" size="small" icon="el-icon-upload">保存设置</el-button>
				</el-form-item>
			</el-form>
		</div>
		
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				num_of_prize : 4,//奖品数量
				prize_config : [
					{
						rate : 10,//中奖概率
						coin : 10,//奖励U币数量
						
					},{
						rate : 10,//中奖概率
						coin : 10,//奖励U币数量
					
					},{
						rate : 10,//中奖概率
						coin : 10,//奖励U币数量
						
					},{
						rate : 10,//中奖概率
						coin : 10,//奖励U币数量
						
					}
				]
			}
		},
		created () {
			
		},
		
		methods : {
			/* 添加奖品设置 */
			addConfig () {
				this.num_of_prize ++;
				this.prize_config.push({
					rate : null,//中奖概率
					coin : null,//奖励U币数量
					
				})
			},
			/* 减少奖品设置 */
			minusConfig(){
				if (this.num_of_prize <= 1) {
					this.utils.msg('至少需要设置一个奖品，且中奖率之和为100');
					return;
				}
				this.num_of_prize --;
				this.prize_config.splice(-1,1)
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
