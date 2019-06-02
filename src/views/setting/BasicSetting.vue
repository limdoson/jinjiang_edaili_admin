<template>
	<div class="basic-setting">
		<div class="form-container">
			<el-form label-width="100px">
				<el-form-item label='客服电话'>
					<el-input></el-input>
				</el-form-item>
				<el-form-item label='系统敏感词汇'>
					<el-input type='textarea' style='max-width: 300px;'></el-input>
					<el-alert
						title="多个词语请用英文输入法下的','分隔，如“敏感词1,敏感词2”，如果用户评论或其他用户提交信息类流程中，出现敏感词汇设置中的词语，将会以'**'替代。"
						type="warning"
						show-icon>
					</el-alert>
				</el-form-item>
				<el-form-item label='会员默认头像'>
					<el-upload
						action="https://jsonplaceholder.typicode.com/posts/"
						:limit='1'>
						<el-button size='small' type='primary' icon='el-icon-upload'>点击上传</el-button>
						<el-alert
							title="只能上传jpg/png文件，且不超过500kb，图片为正方形图片"
							type="warning"
							show-icon
							slot='tip'>
						</el-alert>
					</el-upload>
				</el-form-item>
				<el-form-item label="自动收货时间">
					发货<el-input  class='mini-input'></el-input>天后自动确认收货。
				</el-form-item>
				<el-form-item label="订单关闭设置">
					订单未支付时，<el-input class='mini-input'></el-input>分钟后关闭
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
				fx_type : 1
			}
		},
		created  () {
			
		},
		//mounted () {},
		methods : {
			save () {
				
			}
		}
	}
</script>