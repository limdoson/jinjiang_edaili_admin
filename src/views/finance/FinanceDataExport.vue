<template>
	<div class="">
		<div class="form-container">
			<el-form label-width="180px">
				<el-form-item label='选择导出项目'>
					<el-select v-model='type'>
						<el-option label="交易流水数据" value='1'></el-option>
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
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				type : null,
				time : null,
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
