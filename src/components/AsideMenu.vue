<template>
	<el-menu 
		background-color='#545C64' 
		text-color='#fff'
		router
		:unique-opened='true'>
		<el-submenu index='1' v-for='item,index in menu' :key='index' :index='item.index'>
			<template slot='title'>
				<i class="iconfont" style='margin-right: 10px;'>&#xe63e;</i>
				<span>{{item.name}}</span>
			</template>
			<!--子菜单-->
			<el-menu-item-group v-for='sub_menu_item in item.sub_menu' :key='sub_menu_item.id'>
				<el-menu-item :index='sub_menu_item.path'>{{sub_menu_item.name}}</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
	</el-menu>
</template>
<script>
	import menu from '@/config/menu.js'
	export default {
		components : {},
		data () {
			return {
				menu,
			}
		},
		created  () {
			
		},
		//mounted () {},
		methods : {
			
		}
	}
</script>