

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
		// setTimeout(function(){
		$("#nav .nav_bg").animate({
			attr: "x",
			target: target + 20,
			speed: 50,
			t:3,

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
			speed: 50,
			t:3,
		});
		// }, 100);
	}, function(){
		// setTimeout(function(){
		$("#nav .nav_bg").animate({
			attr: "x",
			target: 20,
			speed: 50,
			t : 3,
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
			speed: 50,
			t : 3,
		});
		// },100);
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

	//密码验证
	$("form").form("pass").bind("focus", function(){
		$("#reg .info_pass").css("display", "block");
		$("#reg .succ_pass").css("display", "none");
		$("#reg .error_pass").css("display", "none");
	}).bind("blur", function(){
		if(trim($(this).value()) == ""){
			$("#reg .info_pass").css("display", "none");
		} 
		else {
			if(check_pass(this)){
				$("#reg .succ_pass").css("display", "block");
				$("#reg .info_pass").css("display", "none");
				$("#reg .error_pass").css("display", "none");
			} else {
				$("#reg .error_pass").css("display", "block");
				$("#reg .info_pass").css("display", "none");
				$("#reg .succ_pass").css("display", "none");	
			}
		}
	});
	//密码强度验证
	$("form").form("pass").bind("keyup", function() {
		check_pass(this);
	});

	//密码验证函数
	function check_pass(_this) {
		var value = trim($(_this).value());
		var value_length = value.length;
		var code_length = 0;
		var flag = 0;			//是否满足3个条件
		//6-20个字符
		if(value_length >=6 && value_length <= 20){
			$("#reg .info_pass .q1").html("●").css("color","green");
			flag ++;
		}
		else {
			$("#reg .info_pass .q1").html("○").css("color","#666");
		} 

		//只包含大小写、数字、非空格字符
		if(value_length>0 && !/\s/.test(value)) {
			$("#reg .info_pass .q2").html("●").css("color","green");
			flag ++;
		}
		else {
			$("#reg .info_pass .q2").html("○").css("color","#666");			
		}

		//大写字母、小写字母、数字、非空格字符，任意两种
		if(/[\d]/.test(value)) {
			code_length++;
		}
		if(/[a-z]/.test(value)) {
			code_length++;
		}
		if(/[A-Z]/.test(value)) {
			code_length++;
		}
		if(/[^\w]/.test(value)) {
			code_length++;
		}
		if(code_length >= 2) {
			$("#reg .info_pass .q3").html("●").css("color","green");
			flag ++;
		}
		else {
			$("#reg .info_pass .q3").html("○").css("color","#666");			
		}
		if(code_length >= 3 && value_length >= 10) {
			$("#reg .info_pass .s1").css("color","green");
			$("#reg .info_pass .s2").css("color","green");
			$("#reg .info_pass .s3").css("color","green");
			$("#reg .info_pass .s4").html("高").css("color","green");
		}
		else if(code_length >= 2 && value_length >= 8){
			$("#reg .info_pass .s1").css("color","#f60");
			$("#reg .info_pass .s2").css("color","#f60");
			$("#reg .info_pass .s3").css("color","#ccc");	
			$("#reg .info_pass .s4").html("中").css("color","#f60");		
		} else if(code_length >= 1){
			$("#reg .info_pass .s1").css("color","maroon");
			$("#reg .info_pass .s2").css("color","#ccc");
			$("#reg .info_pass .s3").css("color","#ccc");	
			$("#reg .info_pass .s4").html("低").css("color","maroon");			
		} else {
			$("#reg .info_pass .s1").css("color","#ccc");
			$("#reg .info_pass .s2").css("color","#ccc");
			$("#reg .info_pass .s3").css("color","#ccc");	
			$("#reg .info_pass .s4").html("").css("color","maroon");	
		}
		return flag >= 3;
	}

	//密码确认
	$("form").form("notpass").bind("focus", function(){
		$("#reg .info_notpass").css("display", "block");
		$("#reg .succ_notpass").css("display", "none");
		$("#reg .error_notpass").css("display", "none");
	}).bind("blur", function(){
		if(trim($(this).value()) == "") {
			$("#reg .info_notpass").css("display", "none");	
		}
		else if(trim($(this).value()) == trim($("form").form("pass").value())) {
			$("#reg .info_notpass").css("display", "none");
			$("#reg .succ_notpass").css("display", "block");
			$("#reg .error_notpass").css("display", "none");
		} else {
			$("#reg .info_notpass").css("display", "none");
			$("#reg .succ_notpass").css("display", "none");
			$("#reg .error_notpass").css("display", "block");			
		}
	});

	//回答
	$("form").form("ans").bind("focus", function(){
		$("#reg .info_ans").css("display", "block");
		$("#reg .succ_ans").css("display", "none");
		$("#reg .error_ans").css("display", "none");
	}).bind("blur", function(){
		if(trim($(this).value()) == "") {
			$("#reg .info_ans").css("display", "none");	
		}
		else if(trim($(this).value()).length >=2 && trim($(this).value()).length <= 32) {
			$("#reg .info_ans").css("display", "none");
			$("#reg .succ_ans").css("display", "block");
			$("#reg .error_ans").css("display", "none");
		} else {
			$("#reg .info_ans").css("display", "none");
			$("#reg .succ_ans").css("display", "none");
			$("#reg .error_ans").css("display", "block");

		}
	});

	//电子邮件
	//邮件名：a-zA-Z0-9_-.
	//域名：a-zA-Z0-9_-
	//域名后缀：a-zA-Z
	//
	$("form").form("email").bind("focus", function(){
		$("#reg .info_email").css("display", "block");
		$("#reg .succ_email").css("display", "none");
		$("#reg .error_email").css("display", "none");
	}).bind("blur", function(){
		if(trim($(this).value()) == "") {
			$("#reg .info_email").css("display", "none");	
		}
		else if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($(this).value()))) {
			$("#reg .info_email").css("display", "none");
			$("#reg .succ_email").css("display", "block");
			$("#reg .error_email").css("display", "none");
		} else {
			$("#reg .info_email").css("display", "none");
			$("#reg .succ_email").css("display", "none");
			$("#reg .error_email").css("display", "block");
		}
	});

});


