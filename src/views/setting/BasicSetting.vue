<template>
	<div class="basic-setting">
		<div class="form-container">
			<el-form label-width="100px">
				<el-form-item label='客服电话'>
					<el-input v-model="service_tel" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item label='系统敏感词汇'>
					<el-input type='textarea' style='max-width: 300px;' v-model="sensitive" placeholder="请输入内容"></el-input>
					<el-alert
						title="多个词语请用英文输入法下的','分隔，如“敏感词1,敏感词2”，如果用户评论或其他用户提交信息类流程中，出现敏感词汇设置中的词语，将会以'**'替代。"
						type="warning"
						show-icon>
					</el-alert>
				</el-form-item>
				<el-form-item label='会员默认头像'>
					<up-load v-model='default_avatar'></up-load>
				</el-form-item>
				<el-form-item label="自动收货时间">
					发货<el-input  class='mini-input' v-model="auto_collect_time"></el-input>天后自动确认收货。
				</el-form-item>
				<el-form-item label="订单关闭设置">
					订单未支付时，<el-input class='mini-input' v-model="auto_close_time"></el-input>分钟后关闭
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="save" size='small' icon='el-icon-upload2'>保存设置</el-button>
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
				fx_type : 1,
				sensitive : null,//敏感字符串
				service_tel : null,//客服电话
				default_avatar : null,//用户默认头像
				auto_collect_time : null,//自动收货时间
				auto_close_time : null,//支付超时时间
				
			}
		},
		created  () {
			this.initData()
		},
		//mounted () {},
		methods : {
			//获取初始数据
			initData (){
				
				this.http.post('/v1/a_config/getOne',{
					
				}).then(res => {
					this.service_tel = res.data.service_tel;
					this.sensitive = res.data.sensitive;
					this.default_avatar = res.data.default_avatar;
					this.auto_collect_time = res.data.auto_collect_time;
					this.auto_close_time = res.data.auto_close_time;
				})
			},
			save () {
				// console.log(this.default_avatar)
				this.http.post('/v1/a_config/update',{
					service_tel : this.service_tel,
					sensitive : this.sensitive,
					default_avatar : this.default_avatar,
					auto_collect_time : this.auto_collect_time,
					auto_close_time : this.auto_close_time
				}).then(res => {
					this.utils.msg(res.msg)
				})
			},
			getImg (img) {
				this.default_avatar = img;
			}
		}
	}
</script>