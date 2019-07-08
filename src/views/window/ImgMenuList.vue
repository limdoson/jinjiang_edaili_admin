<template>
	<div class="swiper-list">
		<el-row class="search-header">
			<el-col :span='2'>
				<el-button type="primary" size="small" @click="showDialog = true">添加图片导航</el-button>
			</el-col>
		</el-row>
		<el-alert
			title="图片导航最多允许添加两个,每个图片导航允许最多添加10个导航项,如果超过2个,将仅显示排序最前的两个图片导航"
			type="warning"
			show-icon>
		</el-alert>
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}">
			<el-table-column prop="id" label="id"></el-table-column>
			<el-table-column prop="name" label="图片导航名称"></el-table-column>
			<el-table-column prop="sort" label="排序"></el-table-column>
			<el-table-column prop="title" label="操作">
				<template slot-scope='scope'>
					<el-button type="text" size="small" @click='toUpload'>编辑导航项</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- dialog -->
		<el-dialog  
			:visible.sync='showDialog' 
			:append-to-body='true'
			:close-on-click-modal='false'
			:show-close='false'>
			<el-form ref="form" label-width="120px">
				<el-form-item label='图片导航名称'>
					<el-input type='text' v-model='name'></el-input>
				</el-form-item>
				<el-form-item label='排序' >
					<el-input type='number' v-model='sort'></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="cancalAdd" size='small'>取 消</el-button>
			    <el-button type="primary" @click="curfirmAdd" size='small'>确 定</el-button>
		  	</span>
		</el-dialog>
		<!-- dialog end -->
	</div>
</template>

<script>
	export default {
		data () {
			return {
				showDialog :false,
				list : [
					{
						id:1,
						name : '轮播图名称',
						sort : 1
					}
				],
				name : null,
				sort : null,
			}
		},
		methods: {
			cancalAdd () {
				this.showDialog = false;
				this.name = null;
				this.sort = null;
			},
			curfirmAdd () {},
			toUpload () {
				this.$router.push('/index/img-menu-detail')
			}
		}
	}
</script>

<style>
</style>
