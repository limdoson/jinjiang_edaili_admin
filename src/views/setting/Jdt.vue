<template>
	<div class="jdt">
		<el-button 
			type='primary' 
			size='small' 
			icon='el-icon-circle-plus-outline'
			@click='showDialog = true'>添加主权限</el-button>
		<!--权限数据表格-->
		<el-table
			:data='list'
			ref='jdtTable'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe>
			<el-table-column type="expand">
				<template slot-scope='scope'>
					<el-table
						:header-cell-style = "{backgroundColor: '#fafafa'}"
						stripe
						:data='scope.row.sub_jdt'>
						<el-table-column prop="id" label="ID"></el-table-column>
						<el-table-column prop="name" label="子路由名称"></el-table-column>
						<el-table-column prop="path" label="子路由路径"></el-table-column>
						<el-table-column prop="name" label="操作">
							<template slot-scope='scope'>
								<el-button type="text" size="small">删除</el-button>
								<el-button type="text" size="small" @click='editItem(scope.row,true)'>编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
				</template>
			</el-table-column>
			<el-table-column prop="id" label="ID"></el-table-column>
			<el-table-column prop="name" label="主路由名称"></el-table-column>
			<el-table-column prop="name" label="操作">
				<template slot-scope='scope'>
					<el-button type="text" size="small" @click='add_sub(scope.row)'>添加下级路由</el-button>
					<el-button type="text" size="small" @click='editItem(scope.row)'>编辑</el-button>
					<el-button type="text" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--添加权限弹出层-->
		<el-dialog  
			:visible.sync='showDialog' 
			:append-to-body='true'
			:close-on-click-modal='false'
			:show-close='false'>
			<el-form ref="form" label-width="80px">
				<el-form-item label='路由名称'>
					<el-input type='text' v-model='route_name'></el-input>
				</el-form-item>
				<el-form-item label='路由路径' v-if='flag'>
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
						id :1,
						name : '系统设置',
						sub_jdt : [
							{
								value : 2,
								name : '基本设置',
								path : '../abc.com'
							}
						]
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
				route_name : null,//dialog中主路由名称
				route_path : null,//dialog中路由路径
				flag  : false,//用来标识是否是添加子权限
				route_item_tmp : null,//用来存储权限数据的临时中间变量
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
			//添加下级路由
			add_sub (item) {
				this.flag = true;
				this.$refs.jdtTable.toggleRowExpansion(item);
				this.showDialog = true;
			},
			//编辑路由
			editItem (item,flag) {
				this.route_item_tmp = item;
				this.route_name = item.name;
				this.route_path = item.path;
				if (flag) {
					this.flag = flag;
				} else {
					this.flag = true;
				}
				this.showDialog = true;
			},
			/*
			 * 重置相关数据
			 */
			resetInput () {
				this.route_name = null;
				this.route_path = null;
				this.showDialog = false;
				this.route_item_tmp = null;
			}
		}
	}
</script>