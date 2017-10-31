
//////////////////////////////////
///实现连缀调用
///
//前台调用
function $(args) {
	return new Base(args);
};

//基础库
function Base(args) {
	//创建一个数组，用来保存获取的节点，和节点数组
	this.elements = [];
	//css模拟
	if(typeof args == "string") {
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
		else {
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
	}
	else if(typeof args == "object") {
		this.elements[0] = args;
	}
	else if (typeof args == "function") {
		addDomLoaded(args);
	}
};

//addDomLoaded
Base.prototype.ready = function(fn) {
	addDomLoaded(fn);
};

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
};

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
};

//设置innerText
Base.prototype.text = function (str) {
	for(var i = 0; i < this.elements.length; ++i) {
		if(arguments.length == 0)
		{
			return getInnerText(this.elements[i]);
		}
		setInnerText(this.elements[i], str);
	}
	return this;
};


//设置点击事件
Base.prototype.click = function (func) {

	for(var i = 0; i < this.elements.length; ++i) {
		this.elements[i].onclick = func;
	}
	return this;
};

//获取class节点数组
Base.prototype.getClass = function (className, parentNode) {
	var node = document;
	var temps = [];
	if(parentNode != undefined) {
		node = parentNode;
	}
	var all = node.getElementsByTagName("*");
	for(var i = 0; i < all.length; ++i) {
		// if(all[i].className == className){
		if((new RegExp("(\\s|^)" + className + "(\\s|$)")).test(all[i].className)){
			temps.push(all[i]);
		}
	}
	return temps;
};

//获取某一个节点，返回这个对象
Base.prototype.getElement = function (num) {
	return this.elements[num];
};

//获取第一个节点,返回这个节点
Base.prototype.first = function () {
	return this.elements[0];
};

//获取末尾节点,返回这个节点
Base.prototype.last = function () {
	return this.elements[this.elements.length-1];
};

//获取某组节点的数量
Base.prototype.length = function() {
	return this.elements.length;
}

//获取某一个节点，返回Base对象
Base.prototype.eq = function(num) {
	var element = this.elements[num];
	this.elements = [];
	this.elements.push(element);
	return this;
};

//获取当前节点的下一个节点
Base.prototype.next = function() {
	for(var i = 0; i < this.elements.length; ++i) {
		this.elements[i] = this.elements[i].nextSibling;
		if(this.elements[i] == null) {
			throw new Error("找不到下一个同级元素!");
		}
		if(this.elements[i].nodeType == 3) this.next();
	}
	return this;
};

//获取当前节点的上一个节点
Base.prototype.prev = function() {
	for(var i = 0; i < this.elements.length; ++i) {
		this.elements[i] = this.elements[i].previousSibling;
		if(this.elements[i] == null) {
			throw new Error("找不到上一个同级元素!");
		}
		if(this.elements[i].nodeType == 3) this.prev();
	}
	return this;
};

//添加Class
Base.prototype.addClass = function(className) {
	for(var i = 0; i < this.elements.length; ++i) {
		if(!hasClass(this.elements[i], className)){
			this.elements[i].className += " " + className;
		}	
	}
	return this;
};

//移除Class
Base.prototype.removeClass = function (className) {
	for(var i = 0; i < this.elements.length; ++i) {
		if(hasClass(this.elements[i], className)){
			this.elements[i].className = this.elements[i].className.replace(new RegExp("(\\s|^)" + className + "(\\s|$)"), " ");
		}	
	}
	return this;
};

//添加link或style的CSS规则
Base.prototype.addRule = function(num, selectorText, cssText, position) {
	var sheet = document.styleSheets[num];
	insertRule(sheet, selectorText, cssText, position);
	return this;
};	

//设置表单字段元素
Base.prototype.form = function(name) {
	for(var i = 0; i < this.elements.length; ++i) {
		this.elements[i] = this.elements[i][name];
	}
	return this;
}

//设置表单字段内容获取
Base.prototype.value = function(str) {
	for(var i = 0; i < this.elements.length; ++i) {
		if(arguments.length == 0)
		{
			return this.elements[i].value;
		}
		this.elements[i].value = str;
	}
	return this;
}

//移除link或style的CSS规则
Base.prototype.removeRule = function(num, index) {
	var sheet = document.styleSheets[num];
	deleteRule(sheet, index);
	return this;
};

//设置事件发生器
Base.prototype.bind = function(event, fn) {
	for(var i = 0; i < this.elements.length; ++i) {
		addEvent(this.elements[i], event, fn);
	}
	return this;
}


//设置鼠标移入移除方法
Base.prototype.hover = function(over, out) {
	for(var i = 0; i < this.elements.length; ++i) {
		addEvent(this.elements[i], "mouseover", over);
		addEvent(this.elements[i], "mouseout", out);
	}
	return this;
};

//设置点击切换方法
Base.prototype.toggle = function() {
	for(var i = 0; i < this.elements.length; ++i) {
		(function(element, args){
			var count = 0;
			addEvent(element, "click", function(){
				// console.log(count);
				args[count++ % args.length].call(this);
			});		
		})(this.elements[i], arguments);
	}
	return this;
};

//设置显示
Base.prototype.show = function(over, out) {
	for(var i = 0; i < this.elements.length; ++i) {
		this.elements[i].style.display = "block";
		// document.documentElement.style.overflow = "hidden";
	}
	return this;
};

//设置隐藏
Base.prototype.hide = function(over, out) {
	for(var i = 0; i < this.elements.length; ++i) {
		this.elements[i].style.display = "none";
		// document.documentElement.style.overflow = "auto";
	}
	return this;
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
};

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
};

//锁屏功能
Base.prototype.lock = function() {	
	for(var i = 0; i < this.elements.length; ++i) {
		this.elements[i].style.width = getInner().width + "px";
		this.elements[i].style.height = getInner().height + "px";		
		this.elements[i].style.display = "block";	
		addEvent(window, "scroll", scrollTop);
	}
	return this;
};

//解开锁屏
Base.prototype.unlock = function() {	
	for(var i = 0; i < this.elements.length; ++i) {
		this.elements[i].style.display = "none";
		removeEvent(window, "scroll", scrollTop);
	}
	return this;
};

Base.prototype.extend = function(name, fn) {
	Base.prototype[name] = fn; 
};

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
};



//设置动画
//
//
//{
//	attr: 表示动画的变换类别  x/y表示位置变化
//		  w/h表示宽高变化	opacity表示透明的
//		  默认为left 位置变化
//	start: 初始位置（可选）
//	t: 	  动画没帧时间 默认10毫秒
//	step: 步长，匀速变化时使用 默认10
//	type: 0为匀速变化，1位缓冲变化
//	speed: 速度 缓冲变化时使用
//	alter：与目标位置的增量
//	target: 目标位置 alter与target必选其一
//	fn: 结束后执行方法  (动画队列)
//}
Base.prototype.animate = function(obj) {
	for(var i = 0; i < this.elements.length; ++i) {
		var element = this.elements[i];
		// console.log(element.timer);
		clearInterval(element.timer);
		
		var attr = obj["attr"] == "x" ? "left" : obj["attr"] == "y" ? "top" :
				   obj["attr"] == "w" ? "width" : obj["attr"] == "h" ? "height" :
				   obj["attr"] == "o" ? "opacity" : obj["attr"]!= undefined ? obj["attr"]: "left";	//默认left 可选x、y
		
		var start = obj["start"] != undefined ? obj["start"] : 
					attr == "opacity"? parseFloat(getStyle(element, attr)) * 100: parseInt(getStyle(element, attr));
	
		var t = obj["t"] != undefined ? obj["t"] : 10;
		var step = obj["step"] != undefined ? obj["step"] : 10;		//可选

		var speed = obj["speed"] != undefined ? obj["speed"] : 6;	//可选，默认缓冲速度为6
		var type = obj["type"] == 0 ? "constant" : obj["type"] == 1 ? "buffer" : "buffer";  //可选，0表示匀速，1表示缓冲
		
		var mul = obj["mul"];
		var alter = obj["alter"];							//目标
		var target = obj["target"];							//必选，增量

		if(alter != undefined && target == undefined) {
			target = alter + start;
		} else if (alter == undefined && target == undefined && mul == undefined) {
			throw new Error("alter增量或者target或者mul目标量必须传一个!");
		}

		if(start > target && step > 0 ||
			start < target && step < 0){
				step = -step;
		}
		if(attr == "opacity") {
			start = parseInt(start);
			element.style.opacity = start / 100;
			element.filter = "alpha(opacity=" + start + ")";
		} else {
			// element.style[attr] = start + "px";
		}


		if(mul == undefined) {
			mul = {};
			mul[attr] = target;
		}

		element.timer = setInterval(function(){
			/*
				问题1：多个动画执行了多个列队动画，应该只执行一个列队动画
				问题2：多个动画差值太大，导致动画无法执行到目标值，因为timer被提前清理了
				
				解决1：只提供一个列队动画的机会
				解决2：多个动画按最后一个分动画执行完毕后再清理		 
	
			 */

			var flag = true;

			for(var i in mul) {
				attr = i == "x"?"left": i == "y" ? "top" : i == "w" ? "width" : i == "h" ? "height": i == "o" ? "opacity": i!= undefined? i : "left";
				target = mul[i];
			

				if(type == "buffer") {
					step = attr == "opacity" ? (target - parseFloat(getStyle(element, attr)) * 100) / speed :
							(target - parseInt(getStyle(element, attr))) / speed;
					step = step > 0 ? Math.ceil(step) : Math.floor(step);
				}


				if(attr == "opacity") {
					var temp = parseFloat(getStyle(element, attr)) * 100;
					element.style.opacity = parseInt(temp + step) / 100;
					element.style.filter = "alpha(opacity=" + parseInt(temp + step) + ")";
					if(step == 0) {
						setOpacity();
					}
					if(step > 0 && parseFloat(getStyle(element, attr)) * 100 >= target) {
						setOpacity();
					} else if(step < 0 && parseFloat(getStyle(element, attr)) * 100 <= target) {
						setOpacity();
					}
					if(parseInt(target) != parseInt(parseFloat(getStyle(element, attr)) * 100)){
						flag = false;
					}
				}
				else {
					element.style[attr] = parseInt(getStyle(element, attr)) + step + "px";
					if(step == 0) {
						setTarget();
					}
					if(step > 0 && parseInt(getStyle(element, attr)) >= target) {
						setTarget();
					} else if(step < 0 && parseInt(getStyle(element, attr)) <= target) {
						setTarget();
					}
					if(parseInt(target) != parseInt(getStyle(element, attr))){
						flag = false;
					}
				}
				 // console.log(getStyle(element, attr) + " " + step);
				function setTarget() {
					element.style[attr] = target + "px";
				}
				function setOpacity() {
					element.style.opacity = parseInt(target) / 100;
					element.style.filter = "alpha(opacity=" + parseInt(target) + ")";
				}
			}
			if(true === flag) {
				clearInterval(element.timer);
				if(obj.fn !=undefined) {
					obj.fn();
				}
			}
		}, t);
	}

	return this;
};