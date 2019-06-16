<template>
	<div class="">
		<div class="form-container">
			<el-form label-width="180px">
				<el-form-item label="供应商名称">
					<span class="red">*</span>
					<el-input v-model="name"></el-input>
				</el-form-item>
				<el-form-item label="供应商联系人姓名">
					<span class="red">*</span>
					<el-input v-model="realname"></el-input>
				</el-form-item>
				<el-form-item label="供应商手机号码">
					<span class="red">*</span>
					<el-input v-model="tel" type="number"></el-input>
					<el-alert
						title="该手机号码将作为厂商后台登录账号。"
						type="warning"
						show-icon>
					</el-alert>
				</el-form-item>
				<el-form-item label="无偿供货金额">
					<el-input v-model="money" type="number"></el-input>
					<el-alert
						title="请与厂商协商好后填写无偿供货金额数据。"
						type="warning"
						show-icon>
					</el-alert>
				</el-form-item>
				<el-form-item label="账号登录密码">
					<span class="red">*</span>
					<el-input v-model="password"></el-input>
				</el-form-item>
				<el-form-item label='供应商所在地区'>
					<el-cascader
						:options="options"
						v-model="selectedOptions">
					</el-cascader>
				</el-form-item>
				<el-form-item label='供应商详细地址'>
					<el-input v-model="adr"></el-input>
				</el-form-item>
				<el-form-item label='供应商所属行业'>
					<el-input v-model="industry"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click='save'>保存</el-button>
					<el-alert
						title="添加供应商后，系统将自动为供应商生成一个代理商账户，供应商可凭借账号密码，登录代理商系统，自动生成的代理商级别为最低一级代理商。"
						type="warning"
						show-icon>
					</el-alert>
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
				account : null,//用户名
				password : null,//登录密码
				name : null,//供应商名称
				realname : null,//联系人手机
				tel :null,
				province : null,
				city : null,
				area : null,
				adr : null,
				money :null,
				industry : null
			}
		},
		created () {
			
		},
		
		methods : {
			save() {
				if (!this.name || !this.tel || !this.realname || !this.password ) {
					this.utils.msg('供应商名称/联系人姓名/手机号码/登录密码为必填项');
					return;
				}
				this.http.post('/v1/a_factory/add',{
					realname:this.realname,
					password:this.password,
					name:this.name,
					tel:this.tel,
					province:this.selectedOptions[0],
					city:this.selectedOptions[1],
					area:this.selectedOptions[2],
					adr:this.adr,
					money:this.money,
					industry:this.industry
				}).then( res => {
					this.utils.msg('添加成功');
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
