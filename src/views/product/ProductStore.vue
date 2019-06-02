<template>
	<div class="">
		<el-row class='search-header' :gutter="10" >
			<el-col :span='8'>
				<el-date-picker
				  	v-model="time"
				  	type="datetimerange"
				  	format='yyyy-MM-dd'
				  	value-format='yyyy-MM-dd'
				  	start-placeholder="开始时间"
				  	end-placeholder="结束日期">
				</el-date-picker>
			</el-col>
			<el-col :span='3'>
				<el-select v-model='search_type'>
					<el-option label='商品名称' value='1'></el-option>
					<el-option label='商品ID' value='2'></el-option>
					<el-option label='供货商名称' value='3'></el-option>
					<el-option label='供货商ID' value='4'></el-option>
					<el-option label='供货商电话' value='5'></el-option>
				</el-select>
			</el-col>
			<el-col :span='4'>
				<el-input placeholder="请输入搜索关键词" v-model="key_word"></el-input>
			</el-col>
			<el-col :span='2'>
				<el-button type='primary' size="small" icon="el-icon-search">搜索</el-button>
			</el-col>
		</el-row>
		<!-- 数据表格 -->
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe
			row-key="id"
			:expand-row-keys='expand_row_keys'
			@expand-change='expandChange'>
			<!-- <el-table-column
			      	type="selection"
			      	width="80">
			    </el-table-column> -->
			<el-table-column type="expand">
				<template slot-scope='props'>
					<!-- 有多属性的商品 -->
					<div  v-if='props.row.attr_arr'>
						<el-form  label-width='180px' class="f-s" v-for="(item,index) in props.row.attr_arr" :key='index'>
							<el-form-item >
								{{item.attr_title}}
							</el-form-item>
							<el-form-item label="供应价">
								<span class="red" >{{item.supply_price}}元</span>
							</el-form-item>
							<el-form-item label="售价">
								<el-input placeholder="请设置该规格属性售价"  v-model='item.market_price'></el-input>
							</el-form-item>
						</el-form>
						
					</div>
					<!-- 无多规格的商品 -->
					<div v-else>
						<el-form  label-width='180px' class="f-s">
							<el-form-item label="供应价">
								<span class="red">{{props.row.supply_price}}元</span>
							</el-form-item>
							<el-form-item label="售价">
								<el-input placeholder="请设置该规格属性售价" v-model="props.row.market_price"></el-input>
							</el-form-item>
						</el-form>
					</div>
					<div class="text-center">
						<el-button type="primary" size="small" @click='curfirmCommodityShelves'>确认上架</el-button>
					</div>
				</template>
				<!-- <template v-else slot-scope='props'>
					111
					<el-form  label-width='180px' class="s-b">
						<el-form-item label="供应价">
							<el-input value='10' readonly></el-input>
						</el-form-item>
						<el-form-item label="售价">
							<el-input placeholder="请设置该规格属性售价"></el-input>
						</el-form-item>
					</el-form>
					<div class="text-center">
						<el-button type="primary" size="small">确认上架</el-button>
					</div>
				</template> -->
			</el-table-column>
			<el-table-column prop='id' label='商品ID'></el-table-column>
			<el-table-column prop='product_title' label='商品图片'>
				<template slot-scope='scope'>
					<img :src="scope.row.img" alt="" width="80px">
				</template>
			</el-table-column>
			<el-table-column prop='product_title' label='商品名称'></el-table-column>
			<el-table-column prop='supply_price' label='供应价'></el-table-column>
			<el-table-column prop='supply_factory_name' label='供货商名称'></el-table-column>
			<el-table-column prop='time' label='提交仓库时间'></el-table-column>
			<el-table-column fixed='right' label='操作' width='200'>
				<template slot-scope="scope">
					<el-button type="text" size="small">详情</el-button>
					<el-button type="text" size="small" @click='commodityShelves(scope.row)'>上架商品</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination s-b">
			<span></span>
			<el-pagination
			  background
			  layout="prev, pager, next"
			  :total="1000">
			</el-pagination>
		</div>
		<!-- 上架设置商品 -->
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {
				time : null,//搜索时间区间
				search_type : '1',
				key_word : null,//搜索关键词
				list :[//商品数据
					{
						id :1,
						product_title : '商品名称',//商品名称
						img : 'http://flag.xmwxxx.com/img/entrep.7379ab52.png',//商品图片
						supply_price : 10,//供应价
						market_price : null,//售价
						supply_factory_name : '供应厂家名称',//供应厂家名称
						sales_volume : 1000,//销量
						time : '2019-08-08',
						attr_arr : [
							{
								attr_title : '红色,300ml',
								supply_price : 10,
								market_price : null
							},{
								attr_title : '红色,100ml',
								supply_price : 15,
								market_price : null
							}
						]
					},{
						id :2,
						product_title : '商品名称',//商品名称
						img : 'http://flag.xmwxxx.com/img/entrep.7379ab52.png',//商品图片
						supply_price : 15,//供应价
						market_price : null,//售价
						supply_factory_name : '供应厂家名称',//供应厂家名称
						sales_volume : 1000,//销量
						time : '2019-08-08',
						
					}
					
				],
				selectList : [],//多选列表数据，存储的是商品的ID数组
				disabled : true,//是否禁用批量下架按钮
				expand_row_keys : [],//展开的table-column
				row_tmp : null,//用来存储上架操作中的中间变量
			}
		},
		created () {
			
		},
		
		methods : {
			//多选
			handleSelectionChange(val){
				
				this.selectList = val.map( item => {
					return item.id
				});
			},
			//表格上架商品操作按钮
			commodityShelves (item) {
				this.expand_row_keys = [];
				this.expand_row_keys.push(item.id)
				this.row_tmp = item;
			},
			//监听表格展开
			expandChange (row) {
				this.expand_row_keys = [];
				this.expand_row_keys.push(row.id)
				this.row_tmp = row;
			},
			//确认上架
			curfirmCommodityShelves () {
				
				if (this.row_tmp.attr_arr && !this.row_tmp.attr_arr.every( item => {return item.market_price > 0} )) {
					this.utils.msg('请设置该商品所有规格属性对应售价');
					return;
				}
				if (!this.row_tmp.attr_arr && !this.row_tmp.market_price) {
					this.utils.msg('请设置该商品的售价');
					return;
				}
				console.log(this.row_tmp)
			}
		},
		watch : {
			selectList (n,o) {
				console.log(n)
				if (n && n.length) {
					this.disabled = false;
				} else {
					this.disabled = true;
				}
			}
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
