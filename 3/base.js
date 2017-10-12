

// var Base = {
// 	getId : function (id){
// 		return document.getElementById(id);
// 	},
// 	getName : function (name) {
// 		return document.getElementsByName(name);
// 	},
// 	getTagName : function (tagName) {
// 		return document.getElementsByTagName(tagName);
// 	},
// }

//////////////////////////////////
///实现连缀调用
///
//前台调用
function $() {
	return new Base();
}
//基础库
function Base() {

}

Base.prototype.elements = [];

Base.prototype.getId = function (id) {
	this.elements.push(document.getElementById(id));
	return this;
};

Base.prototype.getTagName = function (tagName) {
	this.elements = document.getElementsByTagName(tagName);
	return this;
};


//设置css
Base.prototype.css = function (attr, value) {
	for(var i = 0; i < this.elements.length; ++i) {
		if(arguments.length == 1) {
			if(typeof window.getComputedStyle != "undefined") {
				return window.getComputedStyle(this.elements[i], null)[attr];
			} else if(typeof this.elements[i].currentStyle != "undefined"){
				return this.elements[i].currentStyle[attr];
			}
		}
		this.elements[i].style[attr] = value;
	}
	return this;
}
//设置html
Base.prototype.html = function (str) {
	for(var i = 0; i < this.elements.length; ++i) {
		if(arguments.length == 0)
		{
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = str;
	}
	return this;
}
//设置点击事件
Base.prototype.click = function (func) {

	for(var i = 0; i < this.elements.length; ++i) {
		this.elements[i].onclick = func;
	}
	return this;
}

//获取class节点数组
Base.prototype.getClass = function (className, id) {
	var node = document;
	if(arguments.length == 2) {
		node = document.getElementById(id);
	}
	var all = node.getElementsByTagName("*");
	for(var i = 0; i < all.length; ++i) {
		if(all[i].className == className){
			this.elements.push(all[i]);
		}
	}
	return this;
}

//获取某一个节点
Base.prototype.getElement = function (num) {
	var element = this.elements[num];
	this.elements = [];
	this.elements.push(element);
	return this;
}