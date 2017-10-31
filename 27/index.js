

$(function() {
	//个人中心
	$("#header .member").hover(	function() {
		$("#header .member ul").show().animate({
			attr:"o",
			t:30,
			step:10,
			mul : {
				o : 100,
				h : 110,
			}
		});
	}, function () {
		$("#header .member ul").animate({
			attr:"o",
			start:100,
			t:30,
			step:10,
			mul: {
				o: 0,
				h: 0,
			},
			fn : function() {
				$("#header .member ul").hide();
			}
		});
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
		screen.lock().animate({
				attr:"o",
				// start:0,
				target:30,
				t:30,
			});
	});
	$("#login .close").click(function (){
		login.css("display", "none");
		screen.animate({
			attr:"o",
			// start:0,
			target:0,
			t:30,
			fn : function () {
				screen.unlock();	//播完动画再消失
			}
		});
	});

	//注册框
	var reg = $("#reg");
	var screen = $("#screen");
	reg.center(350, 250).resize(function (){
		if(reg.css("display") != "none"){
			screen.lock();
		}
	});
	$("#header .reg").click(function (){
		reg.center(650,550);		
		reg.css("display", "block");	
		screen.lock().animate({
				attr:"o",
				// start:0,
				target:30,
				t:30,
			});
	});
	$("#reg .close").click(function (){
		reg.css("display", "none");
		screen.animate({
			attr:"o",
			// start:0,
			target:0,
			t:30,
			fn : function () {
				screen.unlock();	//播完动画再消失
			}
		});
	});
		
	//可拖拽
	login.drag($("#login h2").last());
	reg.drag($("#reg h2").last());



	//百度分享初始化位置
	$("#share").css("top",getScroll().top + (getInner().height - parseInt(getStyle($("#share").first(), "height"))) / 2 + "px");
	
	addEvent(window, "scroll", function() {
		// $("#share").css("top",getScroll().top + (getInner().height - parseInt(getStyle($("#share").first(), "height"))) / 2 + "px");
		$("#share").animate({
			attr: "y",
			target: getScroll().top + (getInner().height - parseInt(getStyle($("#share").first(), "height"))) / 2,
		});

	});

	$(window).bind("scroll", function(){
		$("#share").animate({
			attr: "y",
			target: getScroll().top + (getInner().height - parseInt(getStyle($("#share").first(), "height"))) / 2,
		});
	});

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

	//滑动导航
	$("#nava .about li").hover(function(){
		var target = $(this).first().offsetLeft;
		$("#nav .nav_bg").animate({
			attr: "x",
			target: target + 20,
			speed: 20,

			// fn: function() {
			// 	$("#nav .white").animate({
			// 		attr:"x",
			// 		target : -target,

			// 	});
			// }

		});
		$("#nav .white").animate({
			attr:"x",
			target : -target,
			speed: 20,
		});
	}, function(){
		$("#nav .nav_bg").animate({
			attr: "x",
			target: 20,
			speed: 20,
			// fn: function() {
			// 	$("#nav .white").animate({
			// 		attr:"x",
			// 		target : 0,

			// 	});
			// }
		});
		$("#nav .white").animate({
			attr:"x",
			target : 0,
			speed: 20,
		});
	});

	//左侧菜单
	$("#sidebar h2").toggle(function(){
		 $(this).next().animate({
		 	mul: {
		 		h: 0,
		 		o: 0,
		 	},
		 });
	}, function(){ 
		$(this).next().animate({
		 	mul:{
		 		h: 150,
		 		o: 100,
		 	},
		});
	});

	//表单验证
	// focus blur
	// $("form").form("user").value("请输入用户名");
	$("form").form("user").bind("focus", function(){
		$("#reg .info_user").css("display", "block");
		$("#reg .succ_user").css("display", "none");
		$("#reg .error_user").css("display", "none");	
	}).bind("blur", function(){
		if(trim($(this).value()) == ""){
			$("#reg .info_user").css("display", "none");
			$("#reg .succ_user").css("display", "none");
			$("#reg .error_user").css("display", "none");	
		}
		else if(!(/^\w{2,20}$/.test(trim( $(this).value()))) ){
			$("#reg .error_user").css("display", "block");
			$("#reg .info_user").css("display", "none");
			$("#reg .succ_user").css("display", "none");
		} else {
			$("#reg .succ_user").css("display", "block");
			$("#reg .info_user").css("display", "none");
			$("#reg .error_user").css("display", "none");	
		}
	});

	// console.log($("#reg .info_user").first());
});


