

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

function $() {
	return new Base();
}

function Base() {
	this.elements = [];

	this.getId = function (id) {
		this.elements.push(document.getElementById(id));
		return this;
	};

	this.getTagName = function (tagName) {
		this.elements = document.getElementsByTagName(tagName);
		return this;
	};

}

Base.prototype.css = function (attr, value) {
	for(var i = 0; i < this.elements.length; ++i) {
		this.elements[i].style[attr] = value;
	}
	return this;
}

Base.prototype.html = function (str) {
	for(var i = 0; i < this.elements.length; ++i) {
		this.elements[i].innerHTML = str;
	}
	return this;
}

Base.prototype.click = function (func) {

	for(var i = 0; i < this.elements.length; ++i) {
		this.elements[i].onclick = func;
	}
	return this;
}