<template>
	<div>
		<div class="form-container">
			<el-form label-width="140px">
				<el-form-item label='提示'>
					<span class="red">请确保所有轮播图尺寸一致。</span>
				</el-form-item>
				<el-form-item label="轮播图链接">
					<el-input v-model="link" placeholder="请输入轮播图链接"></el-input>
				</el-form-item>
				<el-form-item label="图片上传">
					<up-load v-model='img'></up-load>
				</el-form-item>
				<el-form-item >
					
					<el-button type="primary" size="small" @click='confirm'>添加轮播图</el-button>
					<el-button type="info" size="small" icon='el-icon-back' @click="$router.back()">返回</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				link : null,
				img : null
			}
		},
		methods: {
			confirm () {
				if (!this.link || !this.img) {
					this.utils.msg('轮播图链接及图片都必填');
					return;
				}
				this.http.post('/v1/a_shopIndex/addFlash',{
					img : this.img,
					url : this.link,
				}).then(res => {
					this.utils.msg(res.msg);
					this.img = null;
					this.link = null;
				})
			}
		}
	}
</script>

<style>
</style>
