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
			<el-table-column type="expand">
				<template slot-scope='scope'>
					<el-table
						:data='scope.row.sub_menu'
						:header-cell-style = "{backgroundColor: '#fafafa'}"
						stripe
						ref="multipleTable">
						<el-table-column  label='二级菜单名称'>
							<template slot-scope='scope'>
								<el-input v-model='scope.row.title' @change='changeItem(scope.row)'></el-input>
							</template>
						</el-table-column>
						<el-table-column  label='菜单链接'>
							<template slot-scope='scope'>
								<el-input v-model='scope.row.url' @change='changeItem(scope.row)'></el-input>
							</template>
						</el-table-column>
						<el-table-column  label='排序'>
							<template slot-scope='scope'>
								<el-input v-model='scope.row.sort' @change='changeItem(scope.row)'></el-input>
							</template>
						</el-table-column>
						<el-table-column fixed='right' label='操作' width='200'>
							<template slot-scope="scope">
								<el-button type='text' size='small' @click='deleteItem(scope.row)'>删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</template>
			</el-table-column>
			<el-table-column  label='菜单名称'>
				<template slot-scope='scope'>
					<el-input v-model='scope.row.title' @change='changeItem(scope.row)'></el-input>
				</template>
			</el-table-column>
			<el-table-column  label='菜单链接'>
				<template slot-scope='scope'>
					<el-input v-model='scope.row.url' @change='changeItem(scope.row)'></el-input>
				</template>
			</el-table-column>
			<el-table-column  label='排序'>
				<template slot-scope='scope'>
					<el-input v-model='scope.row.sort' @change='changeItem(scope.row)'></el-input>
				</template>
			</el-table-column>
			<el-table-column fixed='right' label='操作' width='200'>
				<template slot-scope="scope">
					<el-button type='text' size='small' @click='deleteItem(scope.row)'>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div>
			<el-button class="button" type='primary' size='small' icon='el-icon-check' @click='setMenu'>生成菜单</el-button>
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
					<el-select v-model='menu_data.pid'>
						<el-option :label='item.title' :value='item.id' v-for='item in list' :key='item.id'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label='菜单名称'>
					<el-input type='text' v-model='menu_data.title' placeholder='请输入菜单名称'></el-input>
				</el-form-item>
				<el-form-item label='菜单链接'>
					<el-input type='text' v-model='menu_data.url' placeholder='请输入菜单链接'></el-input>
				</el-form-item>
				<el-form-item label='菜单排序'>
					<el-input type='number' v-model='menu_data.sort' placeholder='请输入菜单排序'></el-input>
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
				list : null,
				//添加菜单数据
				menu_data : {
					type : '1',
					title : null,
					url : null,
					sort :null,
					pid :null,
				},
				parent_option : null,
			}
		},
		created  () {
			this.initData();
		},
		//mounted () {},
		methods : {
			initData () {
				this.http.post('/v1/wechat/listMenu',{
					
				}).then(res => {
					this.list = res.data;
				})
			},
			//取消添加菜单
			cancalAdd () {
				this.resetData();
			},
			//确认添加菜单
			curfirmAdd () {
				if (this.menu_data.type == 2 && !this.menu_data.pid){
					this.utils.msg('请选择所属上级菜单')
					return;
				}
				if (!this.menu_data.title) {
					this.utils.msg('请输入菜单名称');
					return;
				}
				if (!this.menu_data.url) {
					this.utils.msg('请输入菜单链接');
					return;
				}
				if (!this.menu_data.sort) {
					this.utils.msg('请填写菜单排序');
					return;
				}
				this.http.post('/v1/wechat/addMenu',{
					title : this.menu_data.title,
					url : this.menu_data.url,
					pid : this.menu_data.pid,
					sort :this.menu_data.sort
				}).then(res => {
					this.utils.msg(res.msg);
					this.menu_data = {
						type : '1',
						title : null,
						url : null,
						sort : null,
						pid :null,
					}
					this.showDialog = false;
					this.initData();
				})
				
			},
			//编辑菜单
			changeItem (item) {
				this.http.post('/v1/wechat/updMenu',{
					id : item.id,
					title : item.title,
					url : item.url,
					sort : item.sort,
					pid : item.pid
				}).then(res => {
					this.$message({
						type : 'success',
						message : res.msg
					})
				})
			},
			//删除菜单
			deleteItem(item){
				this.http.post('/v1/wechat/delMenu',{
					id : item.id
				}).then(res =>{
					this.utils.msg(res.msg);
					this.initData();
				})
			},
			resetData () {
				this.showDialog = false
				this.menu_data = {
					type : '1',
					title : null,
					url : null,
					sort : null,
					pid :null,
				}
			},
			setMenu () {
				this.http.post('/v1/wechat/setMenu',{
					
				}).then(res => {
					this.$message({
						type : 'success',
						message : res.msg
					})
				})
			}
		}
	}
</script>