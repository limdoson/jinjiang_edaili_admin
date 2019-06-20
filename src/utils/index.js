import Vue from 'vue';

class Utils extends Vue {
    constructor () {
        super();
		this.attr_result = [];
    }
    /*
     * 封装element-ui中的$confirm方法作为提示用
     * -msg : 提示内容
     */
    msg (msg = null,cb) {
        if (!msg) {
           throw new Error('utils类中msg方法缺省必要参数msg')
        }
		this.$alert(msg, '标题名称', {
			confirmButtonText: '确定',
			callback: action => {
				cb && cb();
			}
        });
        // this.$confirm(msg,'提示',{
        //     showClose : false, //是否显示右上角关闭按钮
        //     showCancelButton :false,//是否显示取消按钮
        //     closeOnClickModal :false,//是否允许点击mask关闭对话框
        // })
    }
	/*
	 用来根据二维数组，生成属性规格数据
	 */
	data_for_attrArr (arr,level = 0,stringBuffer = '') {
		
		let obj;
		//判断是一维数组还是二维数组
		if (arr.length > 1) {//二维数组
			for (let i = 0; i < arr[level].length; i ++) {
				if (level != arr.length - 1) {
					this.data_for_attrArr(arr,level + 1, stringBuffer + arr[level][i].label + '/')
				} else {
					obj = {
						attr_name : stringBuffer + arr[level][i].label + '/',
						market_price : null,
						user_price : null,
						img_url : null,
						img_url_data : null,
						stock_number : null,
						sku : null
					}
					this.attr_result.push(obj)
				}
			}
		} else {//一维数组
			for (let i = 0; i < arr[0].length; i ++) {
				obj = {
					attr_name : stringBuffer + arr[level][i].label,
					market_price : null,
					user_price : null,
					img_url : null,
					img_url_data : null,
					stock_number : null,
					sku : null
				}
				this.attr_result.push(obj)
			}
			
		}
		return this.attr_result;
	}
}

export default new Utils;