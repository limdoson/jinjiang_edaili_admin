/*
 * 侧边栏菜单数据文件
 */
import store from '@/store.js';

let menu = [
    {
        title : '系统设置',
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
			    id : '1-2',
			    name : '权限管理',
			    path : '/index/jdt'
			},{
			    id : '1-3',
			    name : '角色管理',
			    path : '/index/role'
			},{
			    id : '1-4',
			    name : '管理员',
			    path : '/index/manager'
			}
        ]
    },{
        title : '微信设置',
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
            }
        ]
    },{
		title : '商品管理',
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
        title : '用户管理',
        index : '3',
        sub_menu : [
            {
                id : '3-1',
                name : '用户数据',
                path : '/index/member'
            },{
				id : '3-2',
				name : '数据导出',
				path : '/index/member-export'
			}
        ]
    },{
		title :'厂商管理',
		index : '10',
		sub_menu : [
			{
				id : '10-1',
				name : '厂商列表',
				path : '/index/factory-list'
			},{
				id : '10-2',
				name : '添加厂商',
				path : '/index/factory-add'
			},
		]
	},{
		title : '代理管理',
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
			}
		]
	},{
        title : '订单管理',
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
        title : '财务管理',
        index : '5',
        sub_menu : [
            {
                id : '5-1',
                name : '交易流水数据',
                path : '/index/trade-data'
            },{
				id : '5-3',
				name : '代理缴费记录',
				path : '/index/agent-payment-data'
			},{
				id : '5-4',
				name : '代理收益记录',
				path : '/index/agent-profit-data'
			},{
				id : '5-5',
				name : '分销流水记录',
				path : '/index/fx-data'
			},{
                id : '5-2',
                name : '导出财务数据',
                path : '/index/finance-data-export'
            }
        ]
    },{
		title : '优惠券管理',
		index : '6',
		sub_menu : [
			{
				id : '6-1',
				name : '砸金蛋活动设置',
				path : '/index/egg-config'
			},{
				id : '6-2',
				name : '砸金蛋中奖纪录',
				path : '/index/egg-winning-record'
			}
		]
	}
]

export default menu;