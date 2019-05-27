<template>
	<div class="">
		<el-form label-width="140px">
			<el-form-item label='订单类型'>
				<el-select v-model='order_status'>
					<el-option label='全部订单' value='0'></el-option>
					<el-option label='待付款订单' value='1'></el-option>
					<el-option label='待发货订单' value='2'></el-option>
					<el-option label='待收货订单' value='3'></el-option>
					<el-option label='已完成订单' value='4'></el-option>
					<el-option label='已取消订单' value='5'></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="起始/结束时间">
				<el-date-picker
			      	v-model="time"
			      	type="datetimerange"
			      	format='yyyy-MM-dd'
			      	value-format='yyyy-MM-dd'
			      	start-placeholder="开始日期"
			      	end-placeholder="结束日期">
			    </el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" size="small" icon='el-icon-upload' @click='curfirm'>导出数据</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				order_status : null,
				time : null
			}
		},
		created () {
			
		},
		
		methods : {
			curfirm () {
				console.log(this.time)
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
