import upLoad from '@c/Upload'
import PicturesUpload from '@c/PicturesUpload'
function vComponent(Vue) {
	// 判断组件组件是否已安装
	if(vComponent.installed){
		return;
	}
	Vue.component('upLoad',upLoad);
	Vue.component('pics-upload',PicturesUpload);
}
// 导出组件
export default vComponent