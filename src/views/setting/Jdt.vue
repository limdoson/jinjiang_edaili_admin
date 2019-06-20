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
			:header-cell-style = "{backgroundColor: '#fafafa'}">
			<el-table-column type="expand">
				<template slot-scope="props">
					
				</template>
			</el-table-column>
			<el-table-column label="上级路由名称"prop="name"></el-table-column>
			<el-table-column label="上级路由名称"prop="name"></el-table-column>
		 </el-table>
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
				tableData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }],
				list : [
					{
						id : 1,
						name : '设置',
						children : [
							{
								id :2,
								name : '基本设置',
								path : '/index/basic-setting'
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