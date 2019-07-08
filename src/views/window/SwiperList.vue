<template>
	<div class="swiper-list">
		<el-row class="search-header">
			<el-col :span='2'>
				<el-button type="primary" size="small" @click="showDialog = true">添加轮播图</el-button>
			</el-col>
		</el-row>
		<el-alert
			title="轮播图只允许添加两个,如有超过两个轮播图存在,系统仅会显示排序最靠前的两个轮播图."
			type="warning"
			show-icon>
		</el-alert>
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}">
			<el-table-column prop="id" label="id"></el-table-column>
			<el-table-column prop="name" label="轮播图名称"></el-table-column>
			<el-table-column prop="sort" label="排序"></el-table-column>
			<el-table-column prop="title" label="操作">
				<template slot-scope='scope'>
					<el-button type="text" size="small" @click='toUpload'>上传图片</el-button>
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
				<el-form-item label='轮播图名称'>
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
				this.$router.push('/index/swiper-config')
			}
		}
	}
</script>

<style>
</style>
