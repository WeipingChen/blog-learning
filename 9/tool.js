
//跨浏览器获取窗口
function getInner() {
	if(typeof window.innerWidth != "undefined") {
		return {
			width: window.innerWidth,
			height: window.innerHeight,
		};
	} else {
		return {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight,
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


//获取Event对象
function getEvent(e) {
	return e || window.event;
}


//取消默认行为
function preDef(event) {
	var e = getEvent(event);
	if(typeof e.preventDefault != "undefined") {
		e.preventDefault();
	}
	else {
		e.returnValue = false;
	}
}

//跨浏览器事件绑定
function addEvent(obj, type, fn) {
	if(typeof obj.addEventListener != "undefined") {
		obj.addEventListener(type, fn, false);
	}
	else {
		//创建一个哈希表
		if(!obj.events)obj.events = {};
		if(!obj.events[type]){
			obj.events[type] = [];
			if(obj["on" + type]) {obj.events[type][0] = obj["on" + type];}
		}
		else if(addEvent.equal(obj.events[type], fn)) {
			return false;
		}
		obj.events[type][addEvent.ID++] = fn;
		obj["on" + type] = addEvent.exec;
	}
}

//为每个事件分配一个计数器实现累加
addEvent.ID = 1;

//执行事件处理函数
addEvent.exec = function(event) {
	var e = event || addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for(var i in es) {
		es[i].call(this,e);
	}
}

//屏蔽同一个事件函数
addEvent.equal = function (es, fn) {
	for(var i in es) {
		if(es[i] == fn) {
			return true;
		}
	}
	return false;
}

//吧IE常用的Event对象配对到W3C中去
addEvent.fixEvent = function (event) {
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation;
	return event;
}

//IE阻止默认行为
addEvent.fixEvent.preventDefault = function() {
	this.returnValue = false;
}

//IE取消冒泡
addEvent.fixEvent.stopPropagation = function (e) {
	this.cancelBubble = true;
}

function removeEvent(obj, type, fn) {
	if(typeof obj.removeEventListener != "undefined") {
		obj.removeEventListener(type, fn, false);
	} else {
		for(var i in obj.events[type] ) {
			if (obj.events[type][i] == fn) {
				delete obj.events[type][i];
			}
		}
	}
}


