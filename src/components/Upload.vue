<template>
	<el-upload
		:action="_config.img_upload_host"
		name='img'
		:show-file-list='false'
		:before-upload="beforeUpload"
		:on-progress='uploadProgress'
		:on-success='uploadSuccess'
		:on-error='uploadError'
		accept='image/*'>
		<img :src="imgUrl" alt="" v-if='imgUrl'>
		<el-button size='small' type='primary' icon='el-icon-upload' v-else>点击上传</el-button>
	</el-upload>
</template>

<script>
	export default {
		props : {
			value : String
		},
		data () {
			return {
				loading : null,
				imgUrl : this.value,
			}
		},
		created () {
			
		},
		methods: {
			//上传前回调
			beforeUpload (file) {

				const isLt2M = file.size / 1024 / 1024 < this._config.upload_img_size;
				if (!isLt2M) {
					this.$message.error('上传图片不允许超过500kb');
				}
				return isLt2M;
			},
			//上传中回调
			uploadProgress (){
				this.loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)',
				})
			},
			//上传成功回调
			uploadSuccess (res,file) {
				this.loading.close();
				this.$emit('input',res.data)
			},
			// 上传失败回调
			uploadError () {
				if (this.loading) {
					this.loading.close();
					this.utils.msg('文件上传失败')
				}
			},
			
		},
		watch : {
			value (n) {
				this.imgUrl = n;
			},
		}
	}
</script>
<style scoped>
	img {
		width: 180px;
	}
</style>
