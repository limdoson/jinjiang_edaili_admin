import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
    base : process.env.NODE_ENV == 'development' ? './' : '/admin/',
    mode : 'hash',
    routes : [
        {
            path : '/',
			component : () => import('./views/Login'),
        },{
            path : '/index',
            component : () => import('./views/Layout'),
            children : [
                {
                    path : '',
                    component : () => import('./views/Home')
                },{//基础设置
                    path : 'basic-setting',
                    component : () => import('./views/setting/BasicSetting'),
                },{//分销及代理设置
                    path : 'transaction-config',
                    component : () => import('./views/setting/TransactionConfig'),
                },{//权限设置
                    path : 'jdt',
                    component : () => import('./views/setting/Jdt'),
                },{//角色管理
                    path : 'role',
                    component : () => import('./views/setting/Role'),
                },{//添加/编辑角色
                    path : 'role-handle/:id?',
                    component : () => import('./views/setting/RoleHandle'),
                },{//管理员
                    path : 'manager',
                    component : () => import('./views/setting/Manager'),
                },{//添加/编辑管理员
                    path : 'manager-handle/:id?',
                    component : () => import('./views/setting/ManagerHandle'),
                },{//微信设置
                    path : 'wx-config',
                    component : () => import('./views/wx-setting/WxConfig'),
                },{//公众号菜单设置
                    path : 'wx-menu',
                    component : () => import('./views/wx-setting/WxMenu'),
                },{//公众号二级菜单
                    path : 'wx-menu-sub/:id?',
                    component : () => import('./views/wx-setting/WxMenuSub'),
                },{//在售商品
					path : 'product-insale',
					component : () => import('./views/product/ProductInsale'),
				},{//商品云仓库
					path : 'product-store',
					component : () => import('./views/product/ProductStore'),
				},{//商品分类设置
					path : '/index/product-cls',
					component : () => import('./views/product/ProductCls'),
				},{//商品规格属性管理
					path : 'product-attr-setting',
					component : () => import('./views/product/ProductAttrSetting'),
				},{//用户管理
					path : 'member',
					component : () => import('./views/member/Index'),
				},{//用户数据导出
					path : 'member-export',
					component : () => import('./views/member/MemberExport'),
				},{//用户信息详情
					path : 'member-detail',
					component : () => import('./views/member/Detail'),
				},{//厂商列表
					path : 'factory-list',
					component : () => import('./views/factory/List'),
				},{//厂商添加
					path : 'factory-add',
					component : () => import('./views/factory/Add'),
				},{//待审核代理
					path : '/index/agent-unaudited',
					component : () => import('./views/agent/Unaudited'),
				},{//已审核代理
					path : '/index/agent-audited',
					component : () => import('./views/agent/Audited'),
				},{//代理详情
					path : '/index/agent-detail',
					component : () => import('./views/agent/Detail'),
				},{//订单数据
					path : 'order',
					component : () => import('./views/order/Index'),
				},{//订单数据导出
					path : 'order-export',
					component : () => import('./views/order/OrderExport'),
				},{//订单详情
					path : 'order-detail/:id?',
					component : () => import('./views/order/Detail'),
				},{//交易流水
					path : 'trade-data',
					component : () => import('./views/finance/TradeData'),
				},{//代理缴费记录
					path : 'agent-payment-data',
					component : () => import('./views/finance/AgentPaymentData'),
				},{//代理收益记忆
					path : 'agent-profit-data',
					component : () => import('./views/finance/AgentProfitData'),
				},{//分销记录
					path : 'fx-data',
					component : () => import('./views/finance/FxData'),
				},{//U币流水
					path : 'coin-data',
					component : () => import('./views/finance/CoinData'),
				},{//财务记录导出
					path : 'finance-data-export',
					component : () => import('./views/finance/FinanceDataExport'),
				},{//砸金蛋活动配置
					path : 'egg-config',
					component : () => import('./views/activity/EggConfig'),
				},{//砸金蛋中奖纪录
					path : 'egg-winning-record',
					component : () => import('./views/activity/EggWinningRecord'),
				}
            ]
        },{
			path : '/404',
			component : () => import('./views/404'),
		},{
			path : '*',
			redirect : '/404'
		}
    ]
})


export default router;