

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
			speed: 10,
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
			speed: 10,
			t:3,
		});
		// }, 100);
	}, function(){
		// setTimeout(function(){
		$("#nav .nav_bg").animate({
			attr: "x",
			target: 20,
			speed: 10,
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
			speed: 10,
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

	//表单初始化
	$("form").first().reset();


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
		else if(!check_user() ){
			$("#reg .error_user").css("display", "block");
			$("#reg .info_user").css("display", "none");
			$("#reg .succ_user").css("display", "none");
		} else {
			$("#reg .succ_user").css("display", "block");
			$("#reg .info_user").css("display", "none");
			$("#reg .error_user").css("display", "none");	
		}
	});

	function check_user() {
		if(/^\w{2,20}$/.test(trim( $("form").form("user").value()))) {
			return true;
		}
		return false;
	}

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
			if(check_pass()){
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
		check_pass();
	});

	//密码验证函数
	function check_pass() {
		var value = trim($("form").form("pass").value());
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
		else if(check_notpass()) {
			$("#reg .info_notpass").css("display", "none");
			$("#reg .succ_notpass").css("display", "block");
			$("#reg .error_notpass").css("display", "none");
		} else {
			$("#reg .info_notpass").css("display", "none");
			$("#reg .succ_notpass").css("display", "none");
			$("#reg .error_notpass").css("display", "block");			
		}
	});

	function check_notpass() {
		if(trim($("form").form("notpass").value()) == trim($("form").form("pass").value())) 
			return true;
		return false;
	}

	function check_ques() {
		if($("form").form("ques").value() != 0) {
			return true;
		}
		return false;
	}

	//提问
	$("form").form("ques").bind("change", function(){
		if(check_ques()) {
			$("#reg .error_ques").css("display", "none");
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
		else if(check_ans()) {
			$("#reg .info_ans").css("display", "none");
			$("#reg .succ_ans").css("display", "block");
			$("#reg .error_ans").css("display", "none");
		} else {
			$("#reg .info_ans").css("display", "none");
			$("#reg .succ_ans").css("display", "none");
			$("#reg .error_ans").css("display", "block");

		}
	});

	function check_ans() {
		if(trim($("form").form("ans").value()).length >=2 && trim($("form").form("ans").value()).length <= 32) {
			return true;
		}
		return false
	}

	//电子邮件
	//邮件名：a-zA-Z0-9_-.
	//域名：a-zA-Z0-9_-
	//域名后缀：a-zA-Z
	//
	$("form").form("email").bind("focus", function(){
		//补全界面
		if(($(this).value()).indexOf("@") == -1) {
			$("#reg .all_email").css("display", "block");
		}	
		$("#reg .info_email").css("display", "block");
		$("#reg .succ_email").css("display", "none");
		$("#reg .error_email").css("display", "none");
	}).bind("blur", function(){

		$("#reg .all_email").css("display", "none");

		if(trim($(this).value()) == "") {
			$("#reg .info_email").css("display", "none");	
		}
		else if(check_email()) {
			$("#reg .info_email").css("display", "none");
			$("#reg .succ_email").css("display", "block");
			$("#reg .error_email").css("display", "none");
		} else {
			$("#reg .info_email").css("display", "none");
			$("#reg .succ_email").css("display", "none");
			$("#reg .error_email").css("display", "block");
		}
	});

	function check_email() {
		if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($("form").form("email").value()))) {
			return true;
		}
		return false;
	}

	//电子邮件补全系统键入
	$("form").form("email").bind("keyup", function(){	
		if(($(this).value()).indexOf("@") == -1) {
			$("#reg .all_email").css("display", "block");
			$("#reg .all_email li span").html($(this).value());
		}
		else {
			$("#reg .all_email").css("display", "none");
		}
	
		$("#reg .all_email li").css("background", "none");
		$("#reg .all_email li").css("color","#666")		

		if(event.keyCode == 40) {
			if(this.index == undefined || this.index >= $("#reg .all_email li").length() - 1)
			{
				this.index = 0;
			}
			else {
				this.index++;
			}
			$("#reg .all_email li").eq(this.index).css("background", "#e5edf2");
			$("#reg .all_email li").eq(this.index).css("color","#369")
		}

		if(event.keyCode == 38) {
			if(this.index == undefined || this.index <= 0)
			{
				this.index = $("#reg .all_email li").length() - 1;
			}
			else {
				this.index--;
			}
			$("#reg .all_email li").eq(this.index).css("background", "#e5edf2");
			$("#reg .all_email li").eq(this.index).css("color","#369")
		}

		if(event.keyCode == 13) {
			$(this).value(($("#reg .all_email li").eq(this.index).text()));
			$("#reg .all_email").css("display", "none");
			this.index = undefined;
		}

	});

	//电子邮件补全系统点击获取
	//PS:click事件是点击弹起后触发的，而blur失去焦点后，没有弹起的元素，导致无法触发
	$("#reg .all_email li").bind("mousedown", function(){
		$("form").form("email").value(($(this).text()));
	});


	//电子邮件补全鼠标移入移出效果
	$("#red .all_email li").hover(function(){
		$(this).css("background", "#e5edf2");
		$(this).css("color","#369")
	}, function(){
		$(this).css("background", "none");
		$(this).css("color","#666")		
	});


	//年月日
	var year = $("form").form("year");
	var month = $("form").form("month");
	var day = $("form").form("day");
	var day30 = [4,6,9,11];
	var day31 = [1,3,5,7,8,10,12];
	//注入年
	for(var i = 1950; i<= 2017; ++i) {
		year.first().add(new Option(i,i), undefined);
	}
	//注入月
	for(var i = 1; i<= 12; ++i) {
		month.first().add(new Option(i,i), undefined);
	}

	var cur_day = 0;
	//注入日
	year.bind("change", select_day);
	month.bind("change", select_day);
	day.bind("change", function(){
		if(check_birthday()) {
			$("#reg .error_birthday").css("display", "none");			
		}
	});

	function check_birthday() {
		if(year.value() != 0 && month.value() != 0 && day.value() != 0) {
			return true;
		}
		return false;
	}


	function select_day() {
		day.first().options.length = 1;
		if(year.value() != 0 && month.value() != 0) {
			if(inArray(day31, parseInt(month.value()))){
				cur_day = 31;
			} 
			else if(inArray(day30, parseInt(month.value()))){
				cur_day = 30;
			} else {
				cur_day = 28;
				if(parseInt(year.value()) % 400 == 0 || (parseInt(year.value()) % 100 !=0 && parseInt(year.value()) % 4 == 0) ){
					cur_day = 29;
				}
			}
			for(var i = 1; i <= cur_day; ++i) {
				day.first().add(new Option(i,i), undefined);
			}

		}
	}


	//备注
	$("form").form("ps").bind("keyup",check_ps).bind("paste", function(){
		setTimeout(check_ps, 50);
	});

	//清尾
	$("#reg .ps .clear").click(function(){
		$("form").form("ps").value($("form").form("ps").value().substring(0,200));
		check_ps();
	});
 	function check_ps(){
		var num =200 - $("form").form("ps").value().length;
		if(num >= 0) {
			$("#reg .ps").eq(0).css("display","block");
			$("#reg .ps .num").eq(0).html(num);
			$("#reg .ps").eq(1).css("display","none");
			return true;
		}
		else {
			$("#reg .ps").eq(0).css("display","none");
			$("#reg .ps .num").eq(1).html(Math.abs(num));
			$("#reg .ps").eq(1).css("display","block");
			return false;
		}
	}

	//提交
	$("form").form("sub").click(function(){
		var flag = true;
		if(!check_user()) {
			$("#reg .error_user").css("display", "block");
			$("#reg .info_user").css("display", "none");
			$("#reg .succ_user").css("display", "none");
			flag = false;
		}
		if(!check_pass()) {
			$("#reg .error_pass").css("display", "block");
			$("#reg .info_pass").css("display", "none");
			$("#reg .succ_pass").css("display", "none");	
			flag = false;
		}
		if(!check_notpass()) {
			$("#reg .info_notpass").css("display", "none");
			$("#reg .succ_notpass").css("display", "none");
			$("#reg .error_notpass").css("display", "block");	
			flag = false;
		}

		if(!check_ques()) {
			$("#reg .error_ques").css("display", "block");
			flag = false;
		}

		if(!check_ans()) {
			$("#reg .info_ans").css("display", "none");
			$("#reg .succ_ans").css("display", "none");
			$("#reg .error_ans").css("display", "block");
			flag = false;
		}

		if(!check_email()) {
			$("#reg .info_email").css("display", "none");
			$("#reg .succ_email").css("display", "none");
			$("#reg .error_email").css("display", "block");
			flag = false;
		}

		if(!check_birthday()) {
			$("#reg .error_birthday").css("display", "block");
			flag = false;
		}

		if(!check_ps()) {
			flag = false;
		}

		if(flag){
			$("form").first().submit();
		}
	});

});


