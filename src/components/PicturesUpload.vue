<template>
	<el-upload
		class="upload-demo"
		:action="_config.img_upload_host"
		name = 'img'
		:before-upload="beforeUpload"
		:on-progress='uploadProgress'
		:on-success='uploadSuccess'
		:on-remove="removePicture"
		:file-list="com_file_list"
		list-type="picture-card">
		<el-button size="small" type="primary">点击上传</el-button>
	</el-upload>
</template>

<script>
	//
	export default {
		//由于elementui渲染filelist的数据要求，传进来的value必须是数组
		props : ['value'],
		data () {
			return {
				com_file_list : [],//组件内渲染用的filelist数组
				file_list : this.value,//程序处理结束后向外到处的数据
			}
		},
		created () {
			
			
		},
		mounted() {
			
		},
		methods : {
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
			uploadSuccess (res,file,fileList) {
				this.loading.close();
				this.getUrlList(fileList)
			},
			//删除已上传图片
			removePicture (file,fileList) {
				this.getUrlList(fileList)
			},
			//根据fileList数组，获取其中的已上传图片的链接，向外emit
			getUrlList (fileList) {
				
				if (fileList.length) {
					this.file_list = fileList.map(item => {
						
						if (item.response) {
							return item.response.data;
						} else {
							return item.url
						}
					})
					this.$emit('input',this.file_list)
				} else {
					this.$emit('input',[])
				}
			}
		},
		watch : {
			value (n) {
				this.file_list = n;
				if (this.com_file_list.length == 0) {
					this.com_file_list = n.map((item,index) => {
						return {
							name : index,
							url : item
						}
					})
				}
			},
		}
	}
</script>

<style scoped>
	img {
		width: 180px;
	}
</style>
