
//////////////////////////////////
///实现连缀调用
///
//前台调用
function $(_this) {
	return new Base(_this);
}
//基础库
function Base(args) {
	//创建一个数组，用来保存获取的节点，和节点数组
	this.elements = [];
	//css模拟
	if(args.indexOf(" ") != -1){
		var eles = args.split(" ");//	把节点拆开，保存到数组
		var childElements = [];		//存放临时对象的数值
		var nodes = [];				//存放父节点
		nodes.push(document);
		for(var i = 0; i < eles.length; ++i) {
			switch(eles[i].charAt(0)) {
				case "#":{
					childElements = [];
					childElements.push(this.getId(eles[i].substring(1)));
					nodes = childElements;
				}
				break;
				case "." :{
					childElements = [];
					for(var j = 0; j < nodes.length; ++j){
						childElements = childElements.concat(this.getClass(eles[i].substring(1), nodes[j]));
					}
					nodes = childElements;
				}
				break;
				default: {
					childElements = [];
					for(var j = 0; j < nodes.length; ++j)
					{
						childElements = childElements.concat(this.getTagName(eles[i], nodes[j]));
					}
					nodes = childElements;
				}	
			}
		}
		this.elements = childElements;
	}
	else if(typeof args == "string") {
	//find模拟
		switch(args.charAt(0)) {
			case "#":{
				this.elements.push(this.getId(args.substring(1)));
			}
			break;
			case "." :{
				this.elements = this.getClass(args.substring(1));
			}
			break;
			default: {
				this.elements = this.getTagName(args);
			}
		}
	}
	else if(typeof args == "object") {
		this.elements[0] = _this;
	}
}


Base.prototype.getId = function (id) {
	return document.getElementById(id);
};

Base.prototype.getTagName = function (tagName, parentNode) {
	var node = document;
	var temps = [];
	if(parentNode != undefined) {
		node = parentNode;
	}
	var tags = node.getElementsByTagName(tagName);
	for(var i = 0; i < tags.length; ++i) {
		temps.push(tags[i]);
	}
	return temps;
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
Base.prototype.getClass = function (className, parentNode) {
	var node = document;
	var temps = [];
	if(parentNode != undefined) {
		node = parentNode;
	}
	var all = node.getElementsByTagName("*");
	for(var i = 0; i < all.length; ++i) {
		if(all[i].className == className){
			temps.push(all[i]);
		}
	}
	return temps;
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

//获取节点的子节点
Base.prototype.find = function(str) {
	var childElements = [];
	for(var i = 0; i < this.elements.length; ++i) {

		switch(str.charAt(0)) {
			case "#":{
				childElements.push(this.getId(str.substring(1)));
			}
			break;
			case "." :{
				// var className = str.substring(1);
				// var tags = this.elements[i].getElementsByTagName("*");
				// for(var j = 0; j < tags.length; ++j) {
				// 	if(tags[j].className == className){
				// 		childElements.push(tags[j]);
				// 	}
				// }
				childElements = childElements.concat(this.getClass(str.substring(1), this.elements[i]));
			}
			break;
			default: {
				// var tags = this.elements[i].getElementsByTagName(str);
				// for(var j = 0; j < tags.length; ++j) {
				// 	childElements.push(tags[j]);
				// }
				childElements = childElements.concat(this.getTagName(str, this.elements[i]));
			}
		}
	}	

	this.elements = childElements;
	return this;
}