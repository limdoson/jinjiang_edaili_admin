<template>
	<div class="">
		<div class="form-container">
			<el-form label-width="180px">
				<el-form-item label="供应商名称">
					<el-input v-model="name"></el-input>
				</el-form-item>
				<el-form-item label="供应商联系人姓名">
					<el-input v-model="realname"></el-input>
				</el-form-item>
				<el-form-item label="供应商手机号码">
					<el-input v-model="tel" type="number"></el-input>
				</el-form-item>
				<el-form-item label="无偿供货金额" >
					<el-input v-model="money" type="number" readonly></el-input>
					
				</el-form-item>
				<el-form-item label="待结算货款" >
					<el-input v-model="wait_goods_money" type="number" readonly></el-input>
					
				</el-form-item>
				<el-form-item label="待结算运费" >
					<el-input v-model="wait_fare" type="number" readonly></el-input>
					
				</el-form-item>
				<el-form-item label="账号登录密码">
					
					<el-input v-model="password"></el-input>
				</el-form-item>
				<el-form-item label='供应商所在地区'>
					<span>{{province}}/{{city}}/{{area}}</span>
					<el-cascader
						:options="options"
						v-model="selectedOptions"
						placeholder="重新选择">
					</el-cascader>
				</el-form-item>
				<el-form-item label='供应商详细地址'>
					<el-input v-model="adr"></el-input>
				</el-form-item>
				<el-form-item label='供应商所属行业'>
					<el-input v-model="industry"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="info" size="small" @click="$router.back()">返回</el-button>
					<el-button type="primary" size="small" @click='save'>保存</el-button>
					
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import cityData from '@cfg/country-data'
	export default {
		components: {},
		data () {
			return {
				options : cityData,
				selectedOptions : null,
				password : null,//登录密码
				name : null,//供应商名称
				realname : null,//联系人姓名
				tel :null,
				province : null,
				city : null,
				area : null,
				adr : null,
				money :null,//无偿供货额
				industry : null,//行业
				wait_goods_money : null,//待结算货款
				wait_fare : null,//待结算运费
			}
		},
		created () {
			this.http.post('/v1/a_factory/getOne',{
				id : this.$route.params.id
			}).then(res => {
				this.name = res.data.name;
				this.realname = res.data.realname;
				this.tel = res.data.tel;
				this.province = res.data.province;
				this.city = res.data.city;
				this.area = res.data.area;
				this.tel = res.data.tel;
				this.adr = res.data.adr;
				this.money = res.data.gratis;
				this.wait_goods_money = res.data.wait_goods_money;
				this.wait_fare = res.data.wait_fare;
				this.industry = res.data.industry;
			})
		},
		
		methods : {
			save() {
				if (!this.name || !this.tel || !this.realname  ) {
					this.utils.msg('供应商名称/联系人姓名/手机号码/登录密码为必填项');
					return;
				}
				this.http.post('/v1/a_factory/upd',{
					id :this.$route.params.id,
					name :this.name,
					password : this.password,
					realname :this.realname,
					tel : this.tel,
					province : this.selectedOptions ? this.selectedOptions[0] : this.province,
					city : this.selectedOptions ? this.selectedOptions[1] : this.city,
					area : this.selectedOptions ? this.selectedOptions[2] : this.area,
					adr : this.adr,
					money :this.money,
					industry :this.industry
				}).then( res => {
					this.utils.msg(res.msg);
				})
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
