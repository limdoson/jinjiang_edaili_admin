<template>
	<div class="wx-menu">
		<el-button 
			type='primary' 
			size='small' 
			icon='el-icon-circle-plus-outline'
			@click="showDialog = true">添加菜单</el-button>
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe
			ref="multipleTable">
			<el-table-column  label='菜单名称'>
				<template slot-scope='scope'>
					<el-input v-model='scope.row.name'></el-input>
				</template>
			</el-table-column>
			<el-table-column  label='菜单链接'>
				<template slot-scope='scope'>
					<el-input v-model='scope.row.uri'></el-input>
				</template>
			</el-table-column>
			<el-table-column  label='排序'>
				<template slot-scope='scope'>
					<el-input v-model='scope.row.sort'></el-input>
				</template>
			</el-table-column>
			<el-table-column fixed='right' label='操作' width='200'>
				<template slot-scope="scope">
					<el-button type='text' size='small' @click="$router.push('wx-menu-sub/'+scope.row.id)">查看二级菜单</el-button>
					<el-button type='text' size='small' @click='deleteItem(scope.row)'>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div>
			<el-button class="button" type='primary' size='small' icon='el-icon-check'>生成菜单</el-button>
		</div>
		<!--添加菜单dialog-->
		<el-dialog 
			title='添加菜单' 
			:visible.sync='showDialog' 
			:append-to-body='true'
			:close-on-click-modal='false'
			:show-close='false'>
			<el-form ref="form" label-width="80px">
				<el-form-item label='菜单类型'>
					<el-select v-model='menu_data.type'>
						<el-option label='一级菜单' value='1'></el-option>
						<el-option label='二级菜单' value='2'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label='上级菜单' v-if='menu_data.type == 2'>
					<el-select v-model='menu_data.parent'>
						<el-option label='一级菜单A' value='1'></el-option>
						<el-option label='二级菜单B' value='2'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label='菜单名称'>
					<el-input type='text' v-model='menu_data.name' placeholder='请输入菜单名称'></el-input>
				</el-form-item>
				<el-form-item label='菜单链接'>
					<el-input type='text' v-model='menu_data.uri' placeholder='请输入菜单链接'></el-input>
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
				showDialog : false,
				list : [
					{
						id : 1,
						name : '菜单名称',
						uri : 'http://flag.xmwxxx.com',
						sort : 0
					}
				],
				//添加菜单数据
				menu_data : {
					type : '1',
					name : null,
					uri : null,
				}
			}
		},
		created  () {
			
		},
		//mounted () {},
		methods : {
			//取消添加菜单
			cancalAdd () {
				this.resetData();
			},
			//确认添加菜单
			curfirmAdd () {
				if (this.menu_data.type == 2 && !this.menu_data.parent){
					this.utils.msg('请选择所属上级菜单')
					return;
				}
				if (!this.menu_data.name) {
					this.utils.msg('请输入菜单名称');
					return;
				}
				if (!this.menu_data.uri) {
					this.utils.msg('请输入菜单链接');
					return;
				}
				
			},
			resetData () {
				this.showDialog = false
				this.menu_data = {
					type : '1',
					name : null,
					uri : null,
				}
			}
		}
	}
</script>