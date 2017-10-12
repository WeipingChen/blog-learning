
//////////////////////////////////
///实现连缀调用
///
//前台调用
function $(_this) {
	return new Base(_this);
}
//基础库
function Base(_this) {
	this.elements = [];
	if(_this != undefined) {
		this.elements[0] = _this;
	}
}


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
			return getStyle(this.elements[i], attr);
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

//获取某一个节点，返回这个对象
Base.prototype.getElement = function (num) {
	return this.elements[num];
}

//获取某一个节点，返回base
Base.prototype.eq = function(num) {
	var element = this.elements[num];
	this.elements = [];
	this.elements.push(element);
	return this;
}


//添加Class
Base.prototype.addClass = function(className) {
	for(var i = 0; i < this.elements.length; ++i) {
		if(!hasClass(this.elements[i], className)){
			this.elements[i].className += " " + className;
		}	
	}
	return this;
}

//移除Class
Base.prototype.removeClass = function (className) {
	for(var i = 0; i < this.elements.length; ++i) {
		if(hasClass(this.elements[i], className)){
			this.elements[i].className = this.elements[i].className.replace(new RegExp("(\\s|^)" + className + "(\\s|$)"), " ");
		}	
	}
	return this;
}

//添加link或style的CSS规则
Base.prototype.addRule = function(num, selectorText, cssText, position) {
	var sheet = document.styleSheets[num];
	insertRule(sheet, selectorText, cssText, position);
	return this;
}	

//移除link或style的CSS规则
Base.prototype.removeRule = function(num, index) {
	var sheet = document.styleSheets[num];
	deleteRule(sheet, index);
	return this;
}


//设置鼠标移入移除方法
Base.prototype.hover = function(over, out) {
	for(var i = 0; i < this.elements.length; ++i) {
		addEvent(this.elements[i], "mouseover", over);
		addEvent(this.elements[i], "mouseout", out);
	}
	return this;
}


//设置显示
Base.prototype.show = function(over, out) {
	for(var i = 0; i < this.elements.length; ++i) {
		this.elements[i].style.display = "block";
		// document.documentElement.style.overflow = "hidden";
	}
}

//设置隐藏
Base.prototype.hide = function(over, out) {
	for(var i = 0; i < this.elements.length; ++i) {
		this.elements[i].style.display = "none";
		// document.documentElement.style.overflow = "auto";
	}
}

//设置物体居中
Base.prototype.center = function (width, height) {
	var top = (getInner().height - height) / 2;
	var left = (getInner().width - width) / 2;
	for(var i = 0; i < this.elements.length; ++i) {
		this.elements[i].style.top = top + "px";
		this.elements[i].style.left = left + "px";		
	}
	return this;
}

//触发浏览器窗口事件
Base.prototype.resize = function (fn) {
	for(var i = 0; i < this.elements.length; ++i) {
		var element = this.elements[i];
		
		addEvent(window, "resize", function () {
			fn();
			if(element.offsetLeft > getInner().width - element.offsetWidth) {
				element.style.left = getInner().width - element.offsetWidth + "px";
			}
			if(element.offsetTop > getInner().height - element.offsetHeight) {
				element.style.top = getInner().height - element.offsetHeight + "px";
			}
		});
	}
	return this;
}



//锁屏功能
Base.prototype.lock = function() {	
	for(var i = 0; i < this.elements.length; ++i) {
		this.elements[i].style.width = getInner().width + "px";
		this.elements[i].style.height = getInner().height + "px";		
		this.elements[i].style.display = "block";	
		addEvent(window, "scroll", scrollTop);
	}
	return this;
}



//解开锁屏
Base.prototype.unlock = function() {	
	for(var i = 0; i < this.elements.length; ++i) {
		this.elements[i].style.display = "none";
		removeEvent(window, "scroll", scrollTop);
	}
	return this;
}

Base.prototype.extend = function(name, fn) {
	Base.prototype[name] = fn; 
}


//拖拽功能
// Base.prototype.drag = function () {

// }

