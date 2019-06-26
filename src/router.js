import Vue from 'vue'
import Router from 'vue-router'
import Store from './store.js'
Vue.use(Router)

let router = new Router({
    base : process.env.NODE_ENV == 'development' ? './' : '/admin/',
    mode : 'hash',
    routes : [
        {//登录页
            path : '/',
			component : () => import('./views/Login'),
        },{//修改密码
			path : '/reset-pwd',
			component : () => import('./views/ResetPwd'),
		},{
            path : '/index',
            component : () => import('./views/Layout'),
			meta : {
				auth_test : true
			},
            children : [
                {
                    path : '',
					meta : {
						auth_test : true
					},
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
                },{//微信分享设置
					path : 'wx-share-config',
					component : () => import('./views/wx-setting/WxShareConfig'),
				},{//运费策略
					path : 'express-setting',
					component : () => import('./views/express/Index'),
				},{//轮播图管理
					path : 'swiper-config',
					component : () => import('./views/window/SwiperConfig'),
				},{//轮播图添加编辑
					path : 'swiper-handle/:id?',
					component : () => import('./views/window/SwiperHandle'),
				},{//广告橱窗
					path : 'display-window',
					component : () => import('./views/window/Index'),
				},{//广告橱窗示例
					path : 'window-demo',
					component : () => import('./views/window/Demo'),
				},{//广告橱窗添加
					path : 'window-add',
					component : () => import('./views/window/Add'),
				},{//在售商品
					path : 'product-insale',
					component : () => import('./views/product/ProductInsale'),
				},{//商品云仓库
					path : 'product-store',
					component : () => import('./views/product/ProductStore'),
				},{//商品详情
					path : 'product-detail/:id',
					component : () => import('./views/product/ProductDetail'),
				},{//商品分类设置
					path : '/index/product-cls',
					component : () => import('./views/product/ProductCls'),
				},{//查看子级分类
					path : '/index/product-sub-cls/:id?',
					name : 'product-sub-cls',
					component : () => import('./views/product/ProductSubCls'),
				},{//商品规格属性管理
					path : 'product-attr-setting',
					component : () => import('./views/product/ProductAttrSetting'),
				},{//商品购买记录
					path : 'product-buy-record',
					component : () => import('./views/product/BuyRecord'),
				},{//用户管理，
					path : 'member',
					component : () => import('./views/member/Index'),
				},{//用户数据导出
					path : 'member-export',
					component : () => import('./views/member/MemberExport'),
				},{//用户信息详情，
					path : 'member-detail/:id',
					component : () => import('./views/member/Detail'),
				},{//分销商团队成员
					path : 'member-team/:id?',
					name : 'member-team',
					component : () => import('./views/member/Team'),
				},{//待审核分销商
					path : 'member-unaudited',
					component : () => import('./views/member/UnauditedMember'),
				},{//厂商列表
					path : 'factory-list',
					component : () => import('./views/factory/List'),
				},{//厂商添加
					path : 'factory-add',
					component : () => import('./views/factory/Add'),
				},{//供应商详情
					path : 'factory-detail/:id',
					component : () => import('./views/factory/Detail'),
				},{//供应商订单
					path : 'factory-order/:id',
					component : () => import('./views/factory/Order'),
				},{//待审核代理
					path : '/index/agent-unaudited',
					component : () => import('./views/agent/Unaudited'),
				},{//已审核代理
					path : '/index/agent-audited',
					component : () => import('./views/agent/Audited'),
				},{//代理详情
					path : '/index/agent-detail/:id',
					component : () => import('./views/agent/Detail'),
				},{//代理进货记录
					path : '/index/agent-purchase-record',
					component : () => import('./views/agent/Purchase'),
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
				},{
					path : 'supplier-data',
					component : () => import('./views/finance/SupplierData'),
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
				},{//优惠券列表
					path : 'coupon-list',
					component : () => import('./views/activity/CouponList'),
				},{//优惠券发放
					path : 'coupon-issuance',
					component : () => import('./views/activity/CouponIssuance'),
				},{//优惠券使用记录
					path : 'coupon-record',
					component : () => import('./views/activity/CouponRecord'),
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


// 全局路由守卫
router.beforeEach((to,form,next) => {
	// console.log(to)
	if (to.meta.auth_test) {
		//验证是否有路由访问权限
		console.log(Store);
		next();
	} else {
		next()
	}
})

export default router;