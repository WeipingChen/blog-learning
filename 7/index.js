

window.onload = function() {

	//个人中心
	$().getClass("member").hover(	function() {
		$().getTagName("ul").show();
	}, function () {
		$().getTagName("ul").hide();
	});

	//登录
	var login = $().getId("login");
	var screen = $().getId("screen");
	login.center(350, 250).resize(function (){
		// login.center(350,250);
		if(login.css("display") != "none"){
			screen.lock();
		}
	});
	$().getClass("close").click(function (){
		login.css("display", "none");
		screen.unlock();
	});
	$().getClass("login").click(function (){
		login.center(350,250);		
		login.css("display", "block");	
		screen.lock();
	});

	// var oDiv = document.getElementById("login");
	// oDiv.onmousedown = function (evt) {
	// 	var e = getEvent(e);
	// 	var _this = this;
	// 	// 计算移动距离
	// 	// var leftDown = e.clientX;
	// 	// var topDown = e.clientY;	
	// 	// document.onmousemove = function (evtMove) {
	// 	// 	var eMove = evtMove || window.event;
	// 	// 	var dstLeft = eMove.clientX - leftDown;
	// 	// 	var dstTop = eMove.clientY - topDown;
	// 	// 	leftDown = eMove.clientX;
	// 	// 	topDown = eMove.clientY;
	// 	// 	// console.log(dstLeft+ " " + dstTop);
	// 	// 	oDiv.style.left = parseInt(oDiv.style.left) + dstLeft + "px";
	// 	// 	oDiv.style.top = parseInt(oDiv.style.top) + dstTop + "px";
	// 	// };
		
	// 	//设置鼠标距离，直接减去与原来差值
	// 	var diffX = e.clientX - _this.offsetLeft;
	// 	var diffY = e.clientY - _this.offsetTop;
	// 	document.onmousemove = function (e){
	// 		var e = getEvent(e);
	// 		_this.style.left = e.clientX - diffX + "px";
	// 		_this.style.top = e.clientY - diffY + "px";
	// 	}

	// 	document.onmouseup = function() {
	// 		document.onmousemove = null;
	// 	}
	
	// };
	//可拖拽
	login.drag();

};


