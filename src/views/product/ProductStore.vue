<template>
	<div class="">
		<el-row class='search-header' :gutter="10" >
			<el-col :span='8'>
				提交时间：
				<el-date-picker
				  	v-model="time"
				  	type="daterange"
				  	format='yyyy-MM-dd'
				  	value-format='yyyy-MM-dd'
				  	start-placeholder="开始时间"
				  	end-placeholder="结束日期">
				</el-date-picker>
			</el-col>
			<el-col :span='3'>
				<el-select v-model='search_type'>
					<el-option label='商品ID' value='1'></el-option>
					<el-option label='商品名称' value='2'></el-option>
					<el-option label='供货商ID' value='3'></el-option>
					<el-option label='供货商名称' value='4'></el-option>
					<el-option label='供货商电话' value='5'></el-option>
				</el-select>
			</el-col>
			<el-col :span='4'>
				<el-input placeholder="请输入搜索关键词" v-model="key_word"></el-input>
			</el-col>
			<el-col :span='4'>
				<el-button type='primary' size="small" icon="el-icon-search" @click='search'>搜索</el-button>
				<el-button type='danger' size="small"  @click='resetSearch'>重置搜索条件</el-button>
			</el-col>
		</el-row>
		<!-- 数据表格 -->
		<el-table
			:data='list'
			:header-cell-style = "{backgroundColor: '#fafafa'}"
			stripe
			row-key="id"
			:expand-row-keys='expand_row_keys'>
			<!-- <el-table-column
			      	type="selection"
			      	width="80">
			    </el-table-column> -->
			<el-table-column type="expand">
				<template slot-scope='scope'>
					<!-- 有多属性的商品 -->
					<div  v-if='scope.row.attribute && scope.row.attribute.length > 0'>
						<el-form  label-width='180px' class="f-s" v-for="(item,index) in scope.row.attribute" :key='index'>
							<el-form-item >
								{{item.name}}
							</el-form-item>
							<el-form-item label="供应价">
								<span class="red" >{{item.supply_price}}元</span>
							</el-form-item>
							<el-form-item label="默认分销比例">
								<el-input placeholder="如有需要,可设置单品分销比例" type="text" v-model='item.distributor'></el-input>
								<p class="tips">填写示例：10@8,表示1级分销比例为10，2级分销比例为8</p>
							</el-form-item>
							<el-form-item label="售价">
								<el-input placeholder="请设置该规格属性售价" type="number" v-model='item.price'></el-input>
							</el-form-item>
						</el-form>
					</div>
					<!-- 无多规格的商品 -->
					<div v-else>
						<el-form  label-width='180px' class="f-s">
							<el-form-item label="供应价">
								<span class="red">{{scope.row.supply_price}}元</span>
							</el-form-item>
							<el-form-item label="默认分销比例">
								<el-input placeholder="如有需要,可设置单品分销比例" type="text" v-model='scope.row.distributor'></el-input>
								<p class="tips">填写示例：10@8,表示1级分销比例为10，2级分销比例为8</p>
							</el-form-item>
							<el-form-item label="售价">
								<el-input placeholder="请设置该规格属性售价" type="price" v-model="scope.row.price"></el-input>
							</el-form-item>
						</el-form>
					</div>
					<div class="text-center">
						<el-button type="primary" size="small" @click="curfirmCommodityShelves(scope.row)">确认上架</el-button>
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
					<img :src="scope.row.cover" alt="" width="80px">
				</template>
			</el-table-column>
			<el-table-column prop='name' label='商品名称'></el-table-column>
			<el-table-column prop='supply_price' label='供应价'></el-table-column>
			<el-table-column prop='factory_name' label='供货商名称'></el-table-column>
			<el-table-column prop='add_time' label='提交仓库时间'></el-table-column>
			<el-table-column fixed='right' label='操作' width='200'>
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="$router.push('product-detail/'+scope.row.id)">详情</el-button>
					<el-button type="text" size="small" @click='commodityShelves(scope.row)'>上架商品</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination s-b">
			<span></span>
			<el-pagination
			  background
			  @current-change='currentChange'
			  layout="prev, pager, next"
			  :total="total">
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
								market_price : null,
								distributor : null
							},{
								attr_title : '红色,100ml',
								supply_price : 15,
								market_price : null,
								distributor : null
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
				page :1,
				limit :10,
				total :1,
				selectList : [],//多选列表数据，存储的是商品的ID数组
				disabled : true,//是否禁用批量下架按钮
				expand_row_keys : [],//展开的table-column
				row_tmp : null,//用来存储上架操作中的中间变量
			}
		},
		created () {
			this.initData();
		},
		
		methods : {
			initData(){
				this.http.post('/v1/a_goods/getWaitSale',{
					page : this.page,
					limit : this.limit,
					id : this.search_type == '1' ? this.key_word : null,
					name : this.search_type == '2' ? this.key_word : null,
					factoryId : this.search_type == '3' ? this.key_word : null,
					factoryName : this.search_type == '4' ? this.key_word : null,
					factoryTel : this.search_type == '5' ? this.key_word : null,
					startTime : this.time ? this.time[0] : null,
					endTime : this.time ? this.time[0] : null,
				}).then(res => {
					this.list = res.data.data;
					this.total = res.data.total;
				})
			},
			currentChange (page) {
				this.page = page;
				this.initData();
			},
			//搜索
			search () {
				this.page = 1;
				this.initData();
			},
			//重置搜索
			resetSearch () {
				this.page = 1;
				this.search_type = '1',
				this.key_word = null;
				this.time = null;
				this.initData()
			},
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
			},
			//确认上架
			curfirmCommodityShelves (row) {
				//判断该商品是否有规格属性，如果有，则判断每个属性是否都设置了价格
				//如果没有属性，判断商品是否设置了价格
				if (row.attribute && row.attribute.length > 0) {
					if (!row.attribute.every(item => {return item.price > 0})) {
						this.utils.msg('请设置该商品所有规格属性对应售价');
						return;
					};
					this.http.post('/v1/a_goods/upGoods',{
						id : row.id,
						attributePrice : JSON.stringify(row.attribute)
					}).then(res => {
						this.$message({
							showIcon : true,
							type : 'success',
							message : '上架成功'
						})
						this.initData();

					})
				} else {//无属性
					this.http.post('/v1/a_goods/upGoods',{
						id : row.id,
						price : row.price,
						distributor : row.distributor
					}).then(res => {
						this.$message({
							showIcon : true,
							type : 'success',
							message : '上架成功'
						})
						this.initData();
					
					})
				}
				
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
