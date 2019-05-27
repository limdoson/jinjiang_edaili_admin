<template>
	<div class="">
		<!-- 顶部 -->
		<el-row :gutter='10' class="search-header" type="flex">
			
			<el-col :span='8'>
				 <el-date-picker
			      	v-model="time"
			      	type="datetimerange"
			      	format='yyyy-MM-dd'
			      	value-format='yyyy-MM-dd'
			      	start-placeholder="开始日期"
			      	end-placeholder="结束日期">
			    </el-date-picker>
			</el-col>
			<el-col :span='2'>
				<el-select v-model="search_type" placeholder="请选择">
					<el-option value='1' label='会员ID'></el-option>
					<el-option value='2' label='会员姓名'></el-option>
					<el-option value='3' label='会员电话'></el-option>
			  	</el-select>
			</el-col>
			<el-col :span='4'>
				<el-input placeholder='输入搜索关键字' v-model='key_word'></el-input>
			</el-col>
			<el-col :span='2'>
				<el-button type='primary' size='small' icon='el-icon-search' @click='search'>搜索</el-button>
			</el-col>
		</el-row>
		<!-- 表格 -->
		<el-table :data='list' 
			stripe 
			header-row-class-name='bg-table-header'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			ref="multipleTable">
			<el-table-column prop='id' label='ID'></el-table-column>
			
			<el-table-column  label='获奖用户（ID）'>
				<template slot-scope='scope'>
					{{scope.row.username}}({{scope.row.user_id}})
				</template>
			</el-table-column>
			<el-table-column prop='count' label='获奖数量'></el-table-column>
			<el-table-column prop='created_at' label='获奖时间'></el-table-column>
		</el-table>
		<div class="pagenation s-b">
			<div>
				<!--<el-button type="primary" icon="el-icon-delete" @click='deleteSome' size='small' :disabled = 'disabled'>批量删除</el-button>-->
			</div>
			<el-pagination
			  	background
			  	layout="prev, pager, next"
			  	:total="total"
			  	@current-change='currentChange'>
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				search_type : '1',//搜索类型
				key_word : null,//搜索关键词
				time : null,//搜索时间
				total : 1,
				list : [
					{
						id :1,
						username : '林杜森',
						user_id : 100,
						count : 50,
						created_at : '2018-02-08'
					}
				]
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
