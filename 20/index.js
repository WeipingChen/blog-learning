

$(function() {
	//个人中心
	$("#header .member").hover(	function() {
		$("#header .member ul").show().animate({
			attr:"o",
			// start:0,
			target:100,
			t:30,
			step:10,
		});
	}, function () {
		$("#header .member ul").animate({
			attr:"o",
			start:100,
			target:0,
			t:30,
			step:10,
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


	//test  列队动画
	// $("#test").click(function (){
	// 	var _this = this;
	// 	$(_this).animate({
	// 		attr: "w",
	// 		target: 300,
	// 		fn: function() {
	// 			$(_this).animate({
	// 				attr: "h",
	// 				target: 300,

	// 				fn: function() {
	// 					$(_this).animate({
	// 						attr: "o",
	// 						target: 30,
	// 					});
	// 				},
	// 			});
	// 		},
	// 	});
	// });

	//test1 多个动画同时 会停止前面的动画
	$(".test1").hover(function(){
		$(this).animate({
			"attr": "w",
			"target":300,
		});
	}, function() {
		$(this).animate({
			"attr": "w",	
			"target":100,
		});	
	});

});


