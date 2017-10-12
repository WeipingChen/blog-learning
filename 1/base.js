

/////////////////////
///函数式通过Id获取
///
// function $(id) {
// 	return document.getElementById(id);
// }

/////////////////////////////////
///对象式
// var Base = {
// 	$ : function (id){
// 		return document.getElementById(id)
// 	},
// 	$$ : function (name) {
// 		return document.getElementsByName(name);
// 	},
// 	$$$: function (tagName) {
// 		return document.getElementsByTagName(tagName);
// 	},
// }
var Base = {
	getId : function (id){
		return document.getElementById(id)
	},
	getName : function (name) {
		return document.getElementsByName(name);
	},
	getTagName : function (tagName) {
		return document.getElementsByTagName(tagName);
	},
}
