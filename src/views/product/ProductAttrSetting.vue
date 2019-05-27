<template>
	<div class="">
		<el-row class='search-header'>
			<el-popover
				placement="top"
				width="250px"
				v-model='showPopover'>
				<el-input placeholder="请填写主属性/规格组名称"></el-input>
				<div style="padding-top: 15px;text-align: right;">
					<el-button size="mini" type="text" @click="showPopover = false">取消</el-button>
					<el-button type="primary" size="mini" @click="showPopover = false">确定</el-button>
				</div>
				<el-button type="primary" size="small" icon="el-icon-circle-plus-outline" slot='reference'>添加商品主规格/属性组</el-button>
			</el-popover>
		</el-row>
		<el-tree
			:data='list'
			node-key='id'
			default-expand-all
			:expand-on-click-node='false'>
			<span class="custom-tree-node" slot-scope='{node,data}'>
				<span>{{node.label}}</span>
				<span>
					<el-button type='success' size='small' @click='addSubItem(node,data)' >添加子属性/规格</el-button>
					<el-button type='danger' size='small' @click='deleteItem(node,data)'>删除当前属性/规格</el-button>
				</span>
			</span>
		</el-tree>
		<!-- 添加子规格dialog -->
		<el-dialog 
			:visible.sync="showDialog"
			title='填写规格/属性名称'
			width='30%'
			append-to-body
			center>
			<el-input v-model='sub_name' placeholder="请输入要添加的规格或属性名称"></el-input>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="showDialog = false" size='small'>取 消</el-button>
			    <el-button type="primary" @click="curfirmAddSub" size='small'>确 定</el-button>
		  	</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				showPopover :false,
				showDialog : true,
				sub_name : null,
				list : [
					{
						id : 1,
						label : '一级分类',
						children : [
							{
								id : 1,
								label : '一级分类子分类',
								children : []
							}
						]
					},{
						id : 2,
						label : '二级分类',
						children : [
						
						]
					}
				],
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
