

$(function() {
	//个人中心
	$("#header .member").hover(	function() {
		$("#header .member ul").show();
	}, function () {
		$("#header .member ul").hide();
	});

	//登录
	var login = $("#login");
	var screen = $("#screen");
	login.center(350, 250).resize(function (){
		if(login.css("display") != "none"){
			screen.lock();
		}
	});
	$("#header .login").click(function (){
		login.center(350,250);		
		login.css("display", "block");	
		screen.lock();
	});
	$("#login .close").click(function (){
		login.css("display", "none");
		screen.unlock();
	});
	
	//可拖拽
	login.drag($("#login h2").last());


	//百度分享初始化位置
	$("#share").css("top", (getInner().height - parseInt(getStyle($("#share").first(), "height"))) / 2 + "px");

	//百度分享收缩效果
	$("#share").hover(function(){
		$(this).animate({
			"attr": "x",
			"target":0,
		});
	}, function() {
		$(this).animate({
			"attr": "x",	
			"target":-211,
		});	
	});


});


