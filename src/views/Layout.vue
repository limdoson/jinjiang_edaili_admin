<template>
	<el-container class='layout'>
		<!--顶部header-->
		<el-header class='s-b'>
			<router-link class="sys-name" tag='div' to='/index'>
				<img src="../assets/img/img.png" alt="">
			</router-link>
			<!--登陆者下拉菜单-->
			<el-dropdown @command="handleCommand">
			  	<span class="el-dropdown-link">
				    超级管理员<i class="el-icon-arrow-down el-icon--right"></i>
			  	</span>
			  	<el-dropdown-menu slot="dropdown">
				    <el-dropdown-item command="resetPwd" >修改密码</el-dropdown-item>
				    <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
			  	</el-dropdown-menu>
			</el-dropdown>
		</el-header>
		<!--侧边栏-->
		<el-aside width='200px'>
			<!--侧边菜单栏-->
			<aside-menu></aside-menu>
		</el-aside>
		<!--内容主体容器Main-->
		<el-main>
			<router-view></router-view>
		</el-main>
	</el-container>
</template>
<script>
	import AsideMenu from '@c/AsideMenu'
	export default {
		components : {AsideMenu},
		data () {
			return {
				
			}
		},
		created  () {
			// console.log(this.$store.state)
		},
		//mounted () {},
		methods : {
			//管理员右上角菜单选项
			handleCommand(command) {
				switch (command){
					case 'resetPwd'://重置密码
						this.$router.push('/reset-pwd')
						break;
					case 'logout'://退出登录
						this.logout()
						break;
				}
      		},
			//退出登录方法
			logout () {
				this.http.post('/v1/a_admin/logout',{
					
				}).then(res => {
					this.$router.replace('/')
				})
			}
		}
	}
</script>