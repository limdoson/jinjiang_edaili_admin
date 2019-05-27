<template>
	<div class="jdt">
		<el-button 
			type='primary' 
			size='small' 
			icon='el-icon-circle-plus-outline'
			@click='showDialog = true'>添加权限</el-button>
		<!--权限数据表格-->
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe
			ref="multipleTable"
			@selection-change="handleSelectionChange">
		 	<el-table-column
		      	type="selection"
		      	width="60">
		    </el-table-column>
			<el-table-column prop='id' label='ID'></el-table-column>
			<el-table-column prop='name' label='路由名称'></el-table-column>
			<el-table-column prop='path' label='路由'></el-table-column>
			<el-table-column fixed='right' label='操作' width='200'>
				<template slot-scope="scope">
					<el-button type='text' size='small' @click='edit(scope.row)'>编辑</el-button>
					<el-button type='text' size='small' @click='deleteItem(scope.row)'>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--分页-->
		<div class="pagination s-b">
			<span></span>
			<el-pagination
			  	background
			  	layout="prev, pager, next"
			  	:total="count">
			</el-pagination>
		</div>
		<!--添加权限弹出层-->
		<el-dialog 
			title='添加权限' 
			:visible.sync='showDialog' 
			:append-to-body='true'
			:close-on-click-modal='false'
			:show-close='false'>
			<el-form ref="form" label-width="80px">
				<el-form-item label='路由名称'>
					<el-input type='text' v-model='route_name'></el-input>
				</el-form-item>
				<el-form-item label='路由路径'>
					<el-input type='text' v-model='route_path'></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="cancalAdd" size='small'>取 消</el-button>
			    <el-button type="primary" @click="curfirmAdd" size='small'>确 定</el-button>
		  	</span>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		components : {},
		data () {
			return {
				list : [
					{
						id : 1,
						name : '设置',
						path : '/index'
					}
				],
				count : 1,
				table_column_selected : [],
				showDialog : false,//是否显示dialog
				route_options : [
					{
						value : '/index',
						label : '路由1',
						children : [
							{
								value : '/index/jdt',
								label : '路由2'
							}
						]
					}
				],
				route_name : null,//dialog中路由名称
				route_path : null,//dialog中路由路径
			}
		},
		created  () {
			
		},
		//mounted () {},
		methods : {
			handleSelectionChange (val) {
				this.table_column_selected = val;
			},
			/*
			 * cancalAdd
			 */
			cancalAdd () {
				this.resetInput();
			},
			/*
			 * 确认添加路由
			 */
			curfirmAdd () {
				this.list.length ? this.list.push({
					id :2,
					name : this.route_name,
					path : this.route_path
				}) : this.list = [{
					id :2,
					name : this.route_name,
					path : this.route_path
				}]
				
				this.resetInput();
			},
			/*
			 * 重置相关数据
			 */
			resetInput () {
				this.route_name = null;
				this.route_path = null;
				this.showDialog = false;
			}
		}
	}
</script>