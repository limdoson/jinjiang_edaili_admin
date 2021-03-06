/*
 * 侧边栏菜单数据文件
 */
import store from '@/store.js';

let menu = [
    {
        name : '系统设置',
        index :'1',
        sub_menu : [
            {
                id : '1-1',
                name : '基本设置',
                path : '/index/basic-setting'
            },{
                id : '1-5',
                name : '分销及代理设置',
                path : '/index/transaction-config'
            },{
			    id : '1-3',
			    name : '角色管理',
			    path : '/index/role'
			},{
			    id : '1-4',
			    name : '管理员列表',
			    path : '/index/manager'
			}
        ]
    },{
        name : '微信设置',
        index : '2',
        sub_menu : [
            {
                id : '2-1',
                name : '公众号配置',
                path : '/index/wx-config'
            },{
                id : '2-2',
                name : '公众号菜单设置',
                path : '/index/wx-menu'
            },
			// {
			// 	id : '2-3',
			// 	name : '分享设置',
			// 	path : '/index/wx-share-config'
			// }
        ]
    },{
		name : '运费策略',
		index : '11',
		sub_menu : [
			{
				id : '11-1',
				name : '运费设置',
				path : '/index/express-setting'
			}
		]
	},{
		name : '首页内容管理',
		index : '12',
		sub_menu : [
			{
				id : '12-4',
				name : '首页轮播图维护',
				path : '/index/swiper-list'
			},{
				id : '12-5',
				name : '首页导航维护',
				path : '/index/img-menu-list'
			},
			// {
			// 	id : '12-1',
			// 	name : '广告橱窗',
			// 	path : '/index/display-window'
			// },{
			// 	id : '12-2',
			// 	name : '广告橱窗效果示例',
			// 	path : '/index/window-demo'
			// },
		]
	},{
		name : '商品管理',
		index : '7',
		sub_menu : [
			{
				id : '7-1',
				name : '在售商品',
				path : '/index/product-insale'
			},{
				id : '7-2',
				name : '商品云仓库',
				path : '/index/product-store'
			},{
				id : '7-3',
				name : '商品分类设置',
				path : '/index/product-cls'
			}
			// {
			// 	id : '7-1',
			// 	name : '发布商品',
			// 	path : '/index/product-submit'
			// },{
			// 	id : '7-2',
			// 	name : '所有商品',
			// 	path : '/index/product-data'
			// },{
			// 	id : '7-3',
			// 	name : '快递设置',
			// 	path : '/index/express-setting'
			// },{
			// 	id : '7-4',
			// 	name : '商品规格属性管理',
			// 	path : '/index/product-attr-setting'
			// },{
			// 	id : '7-5',
			// 	name : '邮费策略',
			// 	path : '/index/postage-setting'
			// }
		]
	},{
        name : '用户管理',
        index : '3',
        sub_menu : [
            {
                id : '3-1',
                name : '用户数据',
                path : '/index/member'
            },{
				id : '3-3',
				name : '待审核分销商',
				path : '/index/member-unaudited'
			},{
				id : '3-4',
				name : '分销商提现管理',
				path : '/index/member-cash-apply'
			}
        ]
    },{
		name :'供应商管理',
		index : '10',
		sub_menu : [
			{
				id : '10-1',
				name : '供应商列表',
				path : '/index/factory-list'
			},{
				id : '10-2',
				name : '添加供应商',
				path : '/index/factory-add'
			},
		]
	},{
		name : '代理管理',
		index : '9',
		sub_menu : [
			{
				id : '9-1',
				name : '待审核代理',
				path : '/index/agent-unaudited'
			},{
				id : '9-2',
				name : '已审核代理',
				path : '/index/agent-audited'
			},{
				id : '9-3',
				name : '代理商提现管理',
				path : '/index/agent-cash-apply'
			}
		]
	},{
        name : '订单管理',
        index : '4',
        sub_menu : [
            {
                id : '4-1',
                name : '订单数据',
                path : '/index/order'
            },{
                id : '4-2',
                name : '订单数据导出',
                path : '/index/order-export'
            }
        ]
    },{
        name : '财务管理',
        index : '5',
        sub_menu : [
            {
				id : '5-8',
				name : '用户相关财务',
				path : '/index/finance/user'
			},{
				id : '5-9',
				name : '代理相关财务',
				path : '/index/finance/agent'
			},{
				id : '5-10',
				name : '供应商相关财务',
				path : '/index/finance/factory'
			},{
				id : '5-11',
				name : '平台流水',
				path : '/index/finance/platform'
			}
			// {
   //              id : '5-2',
   //              name : '导出财务数据',
   //              path : '/index/finance-data-export'
   //          }
        ]
    },{
		name : '优惠券管理',
		index : '6',
		sub_menu : [
			{
				id: '6-3',
				name : '优惠券列表',
				path : '/index/coupon-list'
			},{
				id: '6-4',
				name : '优惠券发放',
				path : '/index/coupon-issuance'
			}
		]
	}
]

export default menu;