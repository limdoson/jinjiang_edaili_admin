/*
文件用来保存所有表单校验的字自定义校验规则
*/ 
let validator =  {
	checkRequired : {
		required : true,
		message : '此处不能为空',
		trigger :'blur'
	},
	/*
	验证输入是否为合法手机号码
	*/ 
	checkMobile ( rule, value, callback ) {
		if (!/^1[3456789]\d{9}$/.test(value)) {
			callback(new Error('手机号码格式错误'));
		} else {
			callback()
		}
	},
	/*
	验证输入是否全为中文 -是返回false -是返回true
	*/
	checkName ( rule, value, callback ) {
		//如果全是中文 返回false  
		if (/[^\u4e00-\u9fa5]/.test(value)) {
			callback(new Error('请填写正确的姓名'))
		} else {
			callback()
		}
	},
	checkPwd ( rule, value, callback ) {
		if (!value || value == '') {
			callback(new Error('密码不能为空'))
		} else if (value.length < 6) {
			callback(new Error('密码长度不能小于6位'))
		} else  {
			callback()
		}
	}
} 
module.exports = validator