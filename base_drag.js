
//拖拽功能
$().extend("drag", function() {
	var tags = arguments;
	for(var i = 0; i < this.elements.length; ++i){
		addEvent(this.elements[i], "mousedown", function (e) {
			// e.preventDefault();
			var _this = this;
			if(trim(this.innerHTML).length == 0) {
				e.preventDefault();
			}
			//设置鼠标距离，直接减去与原来差值
			var diffX = e.clientX - _this.offsetLeft;
			var diffY = e.clientY - _this.offsetTop;

			//自定义拖拽区域
			var flag = false;

			for(var i = 0; i < tags.length; ++i) {
				if(e.target == tags[i]) {
					flag = true;
					break;
				}
			}

			if(flag)
			{
				addEvent(document, "mousemove", move);
				addEvent(document, "mouseup", up);		
			} else {
				removeEvent(document, "mousemove", move);
				removeEvent(document, "mouseup", up);

			}

			function move(e) {
				//IE捕获鼠标
				if(typeof _this.setCapture != "undefined") {
					_this.setCapture();
				}

				//防止拖出窗口
				var targetX = e.clientX - diffX;
				var targetY = e.clientY - diffY;
				if(targetX < getScroll().left) {
					targetX = getScroll().left;
				}
				else if(targetX > getInner().width + getScroll().left - _this.offsetWidth) {
					targetX = getInner().width + getScroll().left - _this.offsetWidth;
				}
				if(targetY <  getScroll().top) {
					targetY =  getScroll().top;
				}
				else if(targetY > getInner().height + getScroll().top - _this.offsetHeight) {
					targetY = getInner().height + getScroll().top - _this.offsetHeight;
				} 
				_this.style.left =targetX + "px";
				_this.style.top = targetY + "px";

			}

			function up() {
				removeEvent(document, "mousemove", move);
				removeEvent(document, "mouseup", up);
				//IE
				if(typeof _this.releaseCapture != "undefined") {
					_this.releaseCapture();
				}

			}


		});

	}
	return this;
});
