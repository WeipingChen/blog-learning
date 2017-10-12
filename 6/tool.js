
//跨浏览器获取窗口
function getInner() {
	if(typeof window.innerWidth != "undefined") {
		return {
			width: window.innerWidth,
			height: window.innerHeight,
		};
	} else {
		return {
			width: window.documentElement.clientWidth,
			height: window.documentElement.clientHeight,
		};
	}
}


//跨浏览器获取style
function getStyle(element, attr) {
	if(typeof window.getComputedStyle != "undefined") {
		return window.getComputedStyle(element, null)[attr];
	} else if(typeof element.currentStyle != "undefined"){
		return element.currentStyle[attr];
	}
}


//判断class是否存在
function hasClass(element, className) {
	return element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
}

//跨浏览器添加link规则
function insertRule(sheet, selectorText, cssText, position) {
	if(typeof sheet.insertRule != "undefined") {
		sheet.insertRule(selectorText + "{" +　cssText + "}", position)
	}
	else if(typeof sheet.addRule != "undefined") {
		sheet.addRule(selectorText, cssText, position)
	}
}

//跨浏览器移除link规则
function deleteRule(sheet, index) {
	if(typeof sheet.deleteRule != "undefined") {
		sheet.deleteRule(index);
	}
	else if(typeof sheet.removeRule != "undefined") {
		sheet.removeRule("index");
	}
}