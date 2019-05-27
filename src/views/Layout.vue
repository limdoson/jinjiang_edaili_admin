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
				    <el-dropdown-item command="a" >修改密码</el-dropdown-item>
				    <el-dropdown-item command="b">待办事项</el-dropdown-item>
				    <el-dropdown-item command="c">使用文档</el-dropdown-item>
				    <el-dropdown-item command="e" divided>退出登录</el-dropdown-item>
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
			
		},
		//mounted () {},
		methods : {
			handleCommand(command) {
        		this.$message('click on item ' + command);
      		}
		}
	}
</script>