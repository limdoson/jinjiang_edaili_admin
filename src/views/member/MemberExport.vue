<template>
	<div class="">
		<div class="form-container">
			<el-form label-width="100px">
				<el-form-item label='选择导出数据'>
					<el-checkbox-group v-model='result' @change='getResult'>
						<el-checkbox v-for='(item,index) in data_list' :key='index' :label='item.label' >{{item.value}}</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" icon="el-icon-upload">导出数据</el-button>
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
				data_list : [
					{
						label : 'id',
						value : 'ID'
					},{
						label : 'nick_name',
						value : '昵称'
					},{
						label : 'name',
						value : '姓名'
					},{
						label : 'user_identity',
						value : '用户身份'
					},{
						label : 'team_acount',
						value : '团队成员数量'
					},{
						label : 'pending_commission',
						value : '待提现佣金'
					},{
						label : 'commission',
						value : '累计获得佣金数量'
					},{
						label : 'balance',
						value : '账户余额'
					},{
						label : 'reg_time',
						value : '注册时间'
					}
				],
				result : []
			}
		},
		created () {
			
		},
		
		methods : {
			getResult () {
				console.log(this.result)
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
