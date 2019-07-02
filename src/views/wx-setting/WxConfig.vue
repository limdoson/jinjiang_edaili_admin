<template>
	<div class="wx-config">
		<div class="form-container">
			<el-form ref="form" label-width="130px" size="small">
				<el-form-item label='公众号名称'>
					<el-input v-model="app_name"></el-input>
				</el-form-item>
				<el-form-item label='公众号AppId'>
					<el-input v-model="app_id"></el-input>
				</el-form-item>
				<el-form-item label='AppSecret'>
					<el-input v-model="app_secret"></el-input>
				</el-form-item>
				<el-form-item label='TOKEN'>
					<el-input v-model="token"></el-input>
				</el-form-item>
				<el-form-item label='微信支付商户号'>
					<el-input v-model="mchid"></el-input>
				</el-form-item>
				<el-form-item label='商户号秘钥'>
					<el-input v-model="api_key"></el-input>
				</el-form-item>
				<el-form-item label='公众号二维码'>
					<up-load v-model='qrcode'></up-load>
				</el-form-item>
				<el-form-item label='公钥证书'>
					<el-upload
						action="https://jsonplaceholder.typicode.com/posts/"
						:limit='1'>
						<el-button size='small' type='primary' icon='el-icon-upload'>点击上传</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label='私钥证书'>
					<el-upload
						action="https://jsonplaceholder.typicode.com/posts/"
						:limit='1'>
						<el-button size='small' type='primary' icon='el-icon-upload'>点击上传</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item>
					<el-button type="primary"  size='small' icon='el-icon-upload2' @click='save'>保存设置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	export default {
		components : {},
		data () {
			return {
				app_name :null,//公众号名称
				app_id : null,//APPID
				app_secret : null,//appSecret
				token :null,
				mchid : null,//微信支付商户号
				api_key : null,//微信支付秘钥
				qrcode :null,//公众号二维码
				public_key :null,//微信支付公钥
				privare_key :null,//微信支付私钥
			}
		},
		created  () {
			this.http.post('/v1/wechat/getConfig',{
				
			}).then(res => {
				this.app_name = res.data.app_name;
				this.app_id = res.data.app_id;
				this.app_secret = res.data.app_secret;
				this.token = res.data.token;
				this.mchid = res.data.mchid;
				this.api_key = res.data.api_key;
				this.qrcode = res.data.qrcode;
				this.public_key = res.data.public_key;
				this.privare_key = res.data.privare_key
				console.log(res)
			})
		},
		//mounted () {},
		methods : {
			save () {
				this.http.post('/v1/wechat/setConfig',{
					app_name : this.app_name,
					app_id : this.app_id,
					app_secret : this.app_secret,
					token :this.token,
					mchid : this.mchid,
					api_key : this.api_key,
					qrcode : this.qrcode,
					public_key : this.privare_key,
					privare_key : this.privare_key
				}).then(res => {
					this.utils.msg('设置成功');
				})
			}
		}
	}
</script>