<template>
	<div class="product-submit">
		<!-- 步骤条 -->
		<el-steps :active="active" simple finish-status="success">
			<el-step title="填写商品基本信息" icon="el-icon-edit"></el-step>
			<el-step title="上传商品详情图" icon="el-icon-edit"></el-step>
			<el-step title="其他相关设置" icon="el-icon-edit"></el-step>
		</el-steps>
		<!-- 商品基本信息 -->
		<div v-show='active == 0' class="product-info form-container">
			<el-form label-width="180px">
				<el-form-item label="商品名称">
					<el-input></el-input>
				</el-form-item>
				<el-form-item label="商品默认价格">
					<el-input></el-input>
				</el-form-item>
				<el-form-item label="会员价">
					<el-input></el-input>
				</el-form-item>
				<el-form-item label="商品分类">
					<!-- <el-select>
						<el-option>分类1</el-option>
					</el-select> -->
				</el-form-item>
				<el-form-item label="商品计量单位">
					<el-input></el-input>
				</el-form-item>
				<el-form-item label="商品SKU">
					<el-input></el-input>
				</el-form-item>
				<el-form-item label="商品库存">
					<el-input></el-input>
				</el-form-item>
				<el-form-item label="商品虚拟销量">
					<el-input></el-input>
				</el-form-item>
			</el-form>
		</div>
		<!-- 商品详情 -->
		<div v-show='active == 1' class="product-info form-container">
			<el-form label-width="180px">
				<el-form-item label="提示">
					<p class="tips">请确保商品封面图、商品主图尺寸一致，且不超过600kb</p>
				</el-form-item>
				<el-form-item label="商品封面图">
					<!-- <el-upload>
						<el-button type="primary" size="small" icon='el-icon-upload'>点击上传</el-button>
					</el-upload> -->
				</el-form-item>
				<el-form-item label="商品主图">
					<!-- <el-upload>
						<el-button type="primary" size="small" icon='el-icon-upload'>点击上传</el-button>
					</el-upload> -->
				</el-form-item>
				<el-form-item label="商品详情"  style='line-height: 30px;'>
					<editor></editor>
				</el-form-item>
			</el-form>
		</div>
		<!-- 其他设置 -->
		<div v-show='active == 2' class="product-info form-container">
			<el-form label-width="180px">
				<el-form-item label='提示'>
					<p class="tips">该步骤内容如不需要，不需要做任何操作，直接发布商品即可。如需要商品规格/属性设置，请选择好规格/属性后，再填写相关规格/属性对应信息。</p>
				</el-form-item>
				<!-- 选择商品属性、规格 -->
				<el-form-item label='选择商品属性/规格组'>
					<el-checkbox-group size='small' v-model='attr_group_checked'>
						<el-checkbox-button  v-for="item in attr_group" :label="item" :key='item.id' :checked='item.checked'>{{item.label}}</el-checkbox-button>
					</el-checkbox-group>
					<div v-if='attr_group_checked'>
						<ul>
							<li v-for='item in attr_group_checked' class="f-s" :key='item.id'>
								<span>{{item.label}}：</span>
								<el-checkbox-group v-model='item.checkList' >
									<el-checkbox :label="attr" v-for='attr in item.children' :key='attr.id' :checked="attr.checked" @change='choseAttr'>{{attr.label}}</el-checkbox>
								</el-checkbox-group>
							</li>
						</ul>
					</div>
				</el-form-item>
				<!-- 填写商品属性规格相关信息 -->
				<el-form-item label='填写对应规格/属性信息' v-if='attr_table_data.length'>
					<el-table
						:data='attr_table_data'
						:header-cell-style = "{backgroundColor: '#fafafa'}"
						stripe
						ref="multipleTable">
						<el-table-column prop='attr_name' label='规格/属性名称'>
							
						</el-table-column>
						<el-table-column prop='market_price' label='市场价'>
							<template slot-scope='scope'>
								<el-input v-model="scope.row.market_price"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop='user_price' label='会员价'>
							<template slot-scope='scope'>
								<el-input v-model="scope.row.user_price"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop='img_url' label='产品图片'></el-table-column>
						<el-table-column prop='stock_number' label='库存'>
							<template slot-scope='scope'>
								<el-input v-model="scope.row.stock_number"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop='sku' label='SKU'>
							<template slot-scope='scope'>
								<el-input v-model="scope.row.sku"></el-input>
							</template>
						</el-table-column>
					</el-table>
				</el-form-item>
			</el-form>
		</div>
		<div class="text-center padding">
			<el-button type="danger" size="small" @click='preStep' v-if='active > 0 '>上一步</el-button>
			<el-button type="danger" size="small" @click='nextStep' v-if='active != 2' >下一步</el-button>
			<el-button type="primary" size="small" v-if='active == 2' @click='test'>发布商品</el-button>
		</div>
	</div>
</template>

<script>
	import editor from '@c/Editor'
	export default {
		components: {editor},
		data () {
			return {
				active : 2,//默认激活选项卡
				attr_group_checked : [],//已选规格属性组
				attr_table_data : [],//生成表单的数据
				attr_group : [
					{
						id : 26,
						label : '颜色',
						parent_id : 0,
						checked : true,
						checkList : [],
						children : [
							{
								parent_id :26,
								label : '绿色',
								id : 25,
								checked : true,
							},{
								checked : false,
								parent_id :26,
								label : '红色',
								id : 29
							}
						]
					},{
						id : 30,
						label : '容量',
						parent_id : 0,
						checkList : [],
						children : [
							{
								checked : false,
								parent_id :30,
								label : '300ML',
								id : 31
							},{
								checked : false,
								parent_id :30,
								label : '400ML',
								id : 32
							}
						]
					}
				]
			}
		},
		created () {
			console.log(this.attr_group_checked)
		},
		
		methods : {
			nextStep () {
				this.active ++;
			},
			preStep () {
				this.active --;
			},
			test () {
				console.log(this.attr_group_checked)
			},
			choseAttr () {
				this.getAttrArr()
			},
			/*
			* 该函数用来根据所选的规格属性生成对应的信息表 
			*  */
			getAttrArr () {
				//重置相关数据
				this.attr_table_data = [];
				this.utils.attr_result = [];
				//将有checklist的数据拼成一个目标数组，可能多维
				let attr_tmp = this.attr_group_checked.filter( item => {
					return item.checkList && item.checkList.length
				}).map( item => item.checkList);
				
				if (attr_tmp.length) {
					this.attr_table_data = this.utils.data_for_attrArr(attr_tmp)
				}
				console.log(this.attr_table_data)
			},
			
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
