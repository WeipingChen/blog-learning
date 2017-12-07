

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
		login.show();	
		screen.lock().animate({
				attr:"o",
				// start:0,
				target:30,
				t:30,
			});
	});
	$("#login .close").click(function (){
		login.hide();
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
		reg.show();	
		screen.lock().animate({
				attr:"o",
				// start:0,
				target:30,
				t:30,
			});
	});
	$("#reg .close").click(function (){
		reg.hide();
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

		setTimeout(function(){
			$("#share").animate({
				attr: "y",
				target: getScroll().top + (getInner().height - parseInt(getStyle($("#share").first(), "height"))) / 2,
			});
		}, 50);
		

	});

	$(window).bind("scroll", function(){
		$("#share").animate({
			attr: "y",
			target: getScroll().top + (getInner().height - parseInt(getStyle($("#share").first(), "height"))) / 2,
		});
	});

	//百度分享收缩效果
	$("#share").hover(function(e){
		var event = getEvent(e);
		var toTarget = event.toTarget || event.relatedTarget;
		//防止在内部移动时触发
		if(this.contains(toTarget))
			return ;
		console.log(1);
		$(this).animate({
			"attr": "x",
			"target":0,
			bToEnd:true,
		});
	}, function(e) {
		var event = getEvent(e);
		var toTarget = event.toTarget || event.relatedTarget;
		//防止在内部移动时触发
		if(this.contains(toTarget))
			return;
		console.log(2);
		$(this).animate({
			"attr": "x",	
			"target":-211,
			bToEnd:true,
		});	
	});

	//滑动导航
	$("#nava .about li").hover(function(){
		var target = $(this).first().offsetLeft;
		$("#nav .nav_bg").animate({
			attr: "x",
			target: target + 20,
			speed: 10,
			t:3,


		});
		$("#nav .white").animate({
			attr:"x",
			target : -target,
			speed: 10,
			t:3,
		});
	}, function(){
		$("#nav .nav_bg").animate({
			attr: "x",
			target: 20,
			speed: 10,
			t : 3,
		});
		$("#nav .white").animate({
			attr:"x",
			target : 0,
			speed: 10,
			t : 3,
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

	//表单初始化
	$("form").eq(0).first().reset();


	//表单验证
	// focus blur
	// $("form").eq(0).form("user").value("请输入用户名");
	$("form").eq(0).form("user").bind("focus", function(){
		$("#reg .info_user").show();
		$("#reg .succ_user").hide();
		$("#reg .error_user").hide();	
	}).bind("blur", function(){
		if(trim($(this).value()) == ""){
			$("#reg .info_user").hide();
			$("#reg .succ_user").hide();
			$("#reg .error_user").hide();	
		}
		else if(!check_user() ){
			$("#reg .error_user").show();
			$("#reg .info_user").hide();
			$("#reg .succ_user").hide();
		} else {
			$("#reg .succ_user").show();
			$("#reg .info_user").hide();
			$("#reg .error_user").hide();	
		}
	});

	function check_user() {
		var flag = true;
		if(!/^\w{2,20}$/.test(trim( $("form").eq(0).form("user").value()))) {
			$("#reg .error_user").html("输入不合法，请重新输入！");
			return false;
		}
		else {
			$("#reg .info_user").css("display","none");
			$("#reg .loading").css("display","block");
			ajax({
					method: "post",
					url:"is_user.php",
					data:$("form").eq(0).serialize(),
					success: function(text) {
						if(text == "1") {
							$("#reg .error_user").html("用户名被占用！");
							flag = false;
						}
						else {
							flag = true;
						}
						$("#reg .loading").css("display","none");
					},
					async: false,
				});
		
		}
		return flag;
	}

	//密码验证
	$("form").eq(0).form("pass").bind("focus", function(){
		$("#reg .info_pass").show();
		$("#reg .succ_pass").hide();
		$("#reg .error_pass").hide();
	}).bind("blur", function(){
		if(trim($(this).value()) == ""){
			$("#reg .info_pass").hide();
		} 
		else {
			if(check_pass()){
				$("#reg .succ_pass").show();
				$("#reg .info_pass").hide();
				$("#reg .error_pass").hide();
			} else {
				$("#reg .error_pass").show();
				$("#reg .info_pass").hide();
				$("#reg .succ_pass").hide();	
			}
		}
	});


	//密码强度验证
	$("form").eq(0).form("pass").bind("keyup", function() {
		check_pass();
	});

	//密码验证函数
	function check_pass() {
		var value = trim($("form").eq(0).form("pass").value());
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
	$("form").eq(0).form("notpass").bind("focus", function(){
		$("#reg .info_notpass").show();
		$("#reg .succ_notpass").hide();
		$("#reg .error_notpass").hide();
	}).bind("blur", function(){
		if(trim($(this).value()) == "") {
			$("#reg .info_notpass").hide();	
		}
		else if(check_notpass()) {
			$("#reg .info_notpass").hide();
			$("#reg .succ_notpass").show();
			$("#reg .error_notpass").hide();
		} else {
			$("#reg .info_notpass").hide();
			$("#reg .succ_notpass").hide();
			$("#reg .error_notpass").show();			
		}
	});

	function check_notpass() {
		if(trim($("form").eq(0).form("notpass").value()) == trim($("form").eq(0).form("pass").value())) 
			return true;
		return false;
	}

	function check_ques() {
		if($("form").eq(0).form("ques").value() != 0) {
			return true;
		}
		return false;
	}

	//提问
	$("form").eq(0).form("ques").bind("change", function(){
		if(check_ques()) {
			$("#reg .error_ques").hide();
		}
	});

	//回答
	$("form").eq(0).form("ans").bind("focus", function(){
		$("#reg .info_ans").show();
		$("#reg .succ_ans").hide();
		$("#reg .error_ans").hide();
	}).bind("blur", function(){
		if(trim($(this).value()) == "") {
			$("#reg .info_ans").hide();	
		}
		else if(check_ans()) {
			$("#reg .info_ans").hide();
			$("#reg .succ_ans").show();
			$("#reg .error_ans").hide();
		} else {
			$("#reg .info_ans").hide();
			$("#reg .succ_ans").hide();
			$("#reg .error_ans").show();

		}
	});

	function check_ans() {
		if(trim($("form").eq(0).form("ans").value()).length >=2 && trim($("form").eq(0).form("ans").value()).length <= 32) {
			return true;
		}
		return false
	}

	//电子邮件
	//邮件名：a-zA-Z0-9_-.
	//域名：a-zA-Z0-9_-
	//域名后缀：a-zA-Z
	//
	$("form").eq(0).form("email").bind("focus", function(){
		//补全界面
		if(($(this).value()).indexOf("@") == -1) {
			$("#reg .all_email").show();
		}	
		$("#reg .info_email").show();
		$("#reg .succ_email").hide();
		$("#reg .error_email").hide();
	}).bind("blur", function(){

		$("#reg .all_email").hide();

		if(trim($(this).value()) == "") {
			$("#reg .info_email").hide();	
		}
		else if(check_email()) {
			$("#reg .info_email").hide();
			$("#reg .succ_email").show();
			$("#reg .error_email").hide();
		} else {
			$("#reg .info_email").hide();
			$("#reg .succ_email").hide();
			$("#reg .error_email").show();
		}
	});

	function check_email() {
		if(/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($("form").eq(0).form("email").value()))) {
			return true;
		}
		return false;
	}

	//电子邮件补全系统键入
	$("form").eq(0).form("email").bind("keyup", function(){	
		if(($(this).value()).indexOf("@") == -1) {
			$("#reg .all_email").show();
			$("#reg .all_email li span").html($(this).value());
		}
		else {
			$("#reg .all_email").hide();
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
			$("#reg .all_email").hide();
			this.index = undefined;
		}

	});

	//电子邮件补全系统点击获取
	//PS:click事件是点击弹起后触发的，而blur失去焦点后，没有弹起的元素，导致无法触发
	$("#reg .all_email li").bind("mousedown", function(){
		$("form").eq(0).form("email").value(($(this).text()));
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
	var year = $("form").eq(0).form("year");
	var month = $("form").eq(0).form("month");
	var day = $("form").eq(0).form("day");
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
			$("#reg .error_birthday").hide();			
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
	$("form").eq(0).form("ps").bind("keyup",check_ps).bind("paste", function(){
		setTimeout(check_ps, 50);
	});

	//清尾
	$("#reg .ps .clear").click(function(){
		$("form").eq(0).form("ps").value($("form").eq(0).form("ps").value().substring(0,200));
		check_ps();
	});
 	function check_ps(){
		var num =200 - $("form").eq(0).form("ps").value().length;
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
	$("form").eq(0).form("sub").click(function(){
		var flag = true;
		if(!check_user()) {
			$("#reg .error_user").show();
			$("#reg .info_user").hide();
			$("#reg .succ_user").hide();
			flag = false;
		}
		if(!check_pass()) {
			$("#reg .error_pass").show();
			$("#reg .info_pass").hide();
			$("#reg .succ_pass").hide();	
			flag = false;
		}
		if(!check_notpass()) {
			$("#reg .info_notpass").hide();
			$("#reg .succ_notpass").hide();
			$("#reg .error_notpass").show();	
			flag = false;
		}

		if(!check_ques()) {
			$("#reg .error_ques").show();
			flag = false;
		}

		if(!check_ans()) {
			$("#reg .info_ans").hide();
			$("#reg .succ_ans").hide();
			$("#reg .error_ans").show();
			flag = false;
		}

		if(!check_email()) {
			$("#reg .info_email").hide();
			$("#reg .succ_email").hide();
			$("#reg .error_email").show();
			flag = false;
		}

		if(!check_birthday()) {
			$("#reg .error_birthday").show();
			flag = false;
		}

		if(!check_ps()) {
			flag = false;
		}

		if(flag){
			// $("form").eq(0).first().submit();
			$("#loading").show().center(200,40);
			$("#loaidng p").html("正在提交注册中...");
			var _this = this;
			this.disabled = true;

			ajax({
				method: "post",
				url:"add.php",
				data:$("form").eq(0).serialize(),
				success: function(text) {
					if(text == "1") {
						$("#loading").hide();
						$("#success").show().center(200, 40);
						$("#success p").html("注册成功，请登录...");
						setTimeout(function(){
							$("#success").hide();
							reg.hide();
							$("#reg .succ").hide();
							$("form").eq(0).first().reset();
							_this.disabled = false;
							screen.animate({
								attr:"o",
								target:0,
								t:30,
								fn : function () {
									screen.unlock();	//播完动画再消失
								}
							});
						}, 1500);
						 // alert("注册成功！");						
					}
				},
				async: true,
			});
		
			
		}

		
		
	});


	$("form").eq(1).form("sub").click(function(){
		if(/[\w]{2,20}/.test(trim($("form").eq(1).form("user").value())) && $("form").eq(1).form("pass").value().length>=6) {
			$("#loading").show().center(200,40);
			$("#loading p").html("正在尝试登录...");
			var _this = this;
			_this.disabled = true;
			// $(_this).css("backgroundPosition", "right");
			ajax({
				method: "post",
				url:"is_login.php",
				data:$("form").eq(1).serialize(),
				success: function(text) {
					$("#loading").hide();
					_this.disabled = false;
					if(text == "1") {		//失败
						$("#login .info").html("登录失败：用户名或密码不正确！");
					}
					else { //成功
						$("#login .info").html("");
						$("#success").show().center(200, 40);
						$("#success p").html("登陆成功，请稍后...");
						setCookie("user",trim($("form").eq(1).form("user").value()));
						setTimeout(function(){
							$("#success").hide();
							login.hide();
							$("form").eq(1).first().reset();
							_this.disabled = false;
							$("#header .reg").hide();
							$("#header .login").hide();
							$("#header .info").show().html(getCookie("user") + ",您好！");
							screen.animate({
								attr:"o",
								target:0,
								t:30,
								fn : function () {
									screen.unlock();	//播完动画再消失
								}
							});
						}, 1500);
					}
				},
				async: true,
			});
		
			

		}
		else {
			$("#login .info").html("登录失败：用户名或密码不合法！");
		}
	});

 	//轮播器初始化
 	// $("#banner img").hide();
 	// $("#banner img").eq(0).show();
 	$("#banner img").opacity(0);
 	$("#banner img").eq(0).opacity(100);
 	$("#banner ul li").eq(0).css("color","#333");
 	$("#banner strong").html($("#banner img").eq(0).attr("alt"));
 	
 	//轮播器计数器
 	var banner_index = 1;
 	//轮播器的种类
 	var banner_type = 1;
 	//自动轮播器
 	var banner_timer = setInterval(banner_fn, 3000);

 	//手动轮播器
 	$("#banner ul li").hover(function(){
 		clearInterval(banner_timer);
  		//当前非选定时执行
  		if($(this).css("color") != "rgb(51, 51, 51)" && $(this).css("color") != "#333") {
			banner(this, banner_index == 0 ? $("#banner ul li").length() - 1 : banner_index - 1);
		}
 	}, function(){
 		banner_index = $(this).index() + 1;
 		banner_timer = setInterval(banner_fn, 3000);
 	});

 	function banner(obj, prev) {
 		$("#banner strong").html($("#banner img").eq($(obj).index()).attr("alt"));
		$("#banner ul li").css("color","#999");
 		$(obj).css("color", "#333");
 		if(banner_type == 1){
	 		$("#banner img").eq(prev).animate({
	 			attr:"o",
	 			target: 0,
	 			t:30,
	 			step:10,
	 		});

	 		$("#banner img").eq($(obj).index()).animate({
	 			attr:"o",
	 			target: 100,
	 			t:30,
	 			step:10,
	 		});
 		}
 		else if(banner_type == 2) {
 			$("#banner img").eq(prev).animate({
	 			attr:"y",
	 			target: 150,
	 			t:30,
	 			step:10,
	 		}).opacity(100);

	 		$("#banner img").eq($(obj).index()).animate({
	 			attr:"y",
	 			target: 0,
	 			t:30,
	 			step:10,
	 		}).css("top", "-150px").opacity(100);
 		}
 	}
 	function banner_fn() {
 		if(banner_index >= $("#banner ul li").length()){
 			banner_index = 0;
 		}
 		banner($("#banner ul li").eq(banner_index).first(), banner_index == 0 ? $("#banner ul li").length() - 1 : banner_index - 1);
 		banner_index ++;
 	}


 	//图片进入可见区域时 将图片的xsrc替换到src
 	// alert($(".wait_load").eq(0).attr("xsrc"));
 	// $(".wait_load").eq(0).attr("src", $(".wait_load").eq(0).attr("xsrc"));


 	//获取图片元素到最外层元素的距离
 	// alert(offsetTop($(".wait_load").first()));

 	//获取页面可是区域的最低点的位置
 	// alert(getInner().height + getScroll().top);
 	
 	var $wait_load = $(".wait_load");
 	$wait_load.opacity(0);
 	_wait_load();
 	$(window).bind("scroll", function(){
 		setTimeout(_wait_load, 100);	
 	});

 	$(window).bind("resize", function(){
 		setTimeout(_wait_load, 100);	
 	});

 	function _wait_load() {
 		for(var i = 0; i < $wait_load.length(); ++i) {
 				
 				var _this = $wait_load.ge(i);
 				if(getInner().height + getScroll().top < offsetTop(_this)){
 					continue;
 				}
 				$(_this).attr("src", $(_this).attr("xsrc")).animate(
 					{
 						attr : "o",
 						target : 100,
 						t:30,
 						step:10,
 					}
 				);
 			}
 	}

	//图片弹窗
	var photo_big = $("#photo_big");
	var screen = $("#screen");
	photo_big.center(620, 511).resize(function (){
		if(photo_big.css("display") != "none"){
			screen.lock();
		}
	});
	$("#photo dl dt img").click(function (){
		photo_big.center(620,511);		
		photo_big.show();	
		screen.lock().animate({
				attr:"o",
				// start:0,
				target:30,
				t:30,
			});

		//创建临时的图片对象保存图片
		var temp_img = new Image();
		_this = this;
		//后台加载图片
		$(temp_img).bind("load", function(){
			$("#photo_big .big img").attr("src",$(_this).attr("bigsrc"))
			 	.animate({
					attr: "o",
					target:100,
					t:30,
					setp:10,
				})
				.css("width", "600px").css("height","450px").css("position","static").opacity(0);
		});
		//IE必须把src属性放在load事件下面
		temp_img.src = $(this).attr("bigsrc");


		//预加载前后图片
		var children = this.parentNode.parentNode;
		prev_next_img(children);

	});
	$("#photo_big .close").click(function (){
		photo_big.hide();
		screen.animate({
			attr:"o",
			target:0,
			t:30,
			fn : function () {
				screen.unlock();	//播完动画再消失
			}
		});
		$("#photo_big .big img").attr("src","images/loading.gif")
			.css("position","relative").css("width","32px").css("height","32px");
	});
		
	//可拖拽
	photo_big.drag($("#photo_big h2").last());


	//图片鼠标划过
	$("#photo_big .big .left").hover(function(){
		$("#photo_big .big .sl").animate({
			attr: "o",
			target: 50,
			t: 30,
			step: 10,
		});
	},function(){
		$("#photo_big .big .sl").animate({
			attr: "o",
			target: 0,
			t: 30,
			step: 10,
		});
	});
	$("#photo_big .big .right").hover(function(){
		$("#photo_big .big .sr").animate({
			attr: "o",
			target: 50,
			t: 30,
			step: 10,
		});
	},function(){
		$("#photo_big .big .sr").animate({
			attr: "o",
			target: 0,
			t: 30,
			step: 10,
		});
	});

	//图片上一张
	$("#photo_big .big .left").click(function(){
		$("#photo_big .big img").attr("src","images/loading.gif")
			.css("position","relative").css("width","32px").css("height","32px");
		var current_img = new Image();
		$(current_img).bind("load",function(){
			$("#photo_big .big img").attr("src", current_img.src).animate({
					attr:"o",
					target: 100,
					t: 30,
					step: 10,
				}).opacity(0).css("width", "600px").css("height","450px").css("position","static");
		});
		current_img.src = $(this).attr("src");

		//获取当前图片的小图
		var children = $("#photo dl dt img").ge(prevIndex($("#photo_big .big img").attr("index"),$("#photo").first())).parentNode.parentNode;
		prev_next_img(children);
	});


	//图片下一张
	$("#photo_big .big .right").click(function(){
		$("#photo_big .big img").attr("src","images/loading.gif")
			.css("position","relative").css("width","32px").css("height","32px");
		var current_img = new Image();
		$(current_img).bind("load",function(){
			$("#photo_big .big img").attr("src", current_img.src).animate({
					attr:"o",
					target: 100,
					t: 30,
					step: 10,
				}).opacity(0).css("width", "600px").css("height","450px").css("position","static");
		});
		current_img.src = $(this).attr("src");

		var children = $("#photo dl dt img").ge(nextIndex($("#photo_big .big img").attr("index"),$("#photo").first())).parentNode.parentNode;
		prev_next_img(children);
	});

	function prev_next_img(children) {
		var prev = prevIndex($(children).index(), children.parentNode);
		var next = nextIndex($(children).index(), children.parentNode);
		
		var prev_img = new Image();
		var next_img = new Image();
		prev_img.src = $("#photo dl dt img").eq(prev).attr("bigsrc");
		next_img.src = $("#photo dl dt img").eq(next).attr("bigsrc");

		$("#photo_big .big .left").attr("src", prev_img.src);
		$("#photo_big .big .right").attr("src", next_img.src);
		$("#photo_big .big img").attr("index",$(children).index());
		$("#pohto_big .big .index").html(($(children).index() + 1) + "/" + $("#photo dl dt img").length());
	}

	//发文
	$("#blog").center(580, 320).resize(function (){
		if($("#blog").css("display") != "none"){
			screen.lock();
		}
	});
	$("#header .member a").click(function (){
		$("#blog").center(580,320);		
		$("#blog").show();	
		screen.lock().animate({
				attr:"o",
				target:30,
				t:30,
			});
	});
	$("#blog .close").click(function (){
		$("#blog").hide();
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
	$("#blog").drag($("#blog h2").last());

	$("form").eq(2).form("sub").click(function(){
		if(trim($("form").eq(2).form("title").value()).length <= 0 ||
			trim($("form").eq(2).form("content").value()).length <= 0 )
		{
			$("#blog .info").html("发表失败：标题或内容不得为空！");
		}
		else {
			$("#loading").show().center(200,40);
			$("#loaidng p").html("正在发表博文...");
			var _this = this;
			this.disabled = true;

			ajax({
				method: "post",
				url:"add_blog.php",
				data:$("form").eq(2).serialize(),
				success: function(text) {
					$("#loading").hide();
					if(text == "1") {
						$("#blog .info").html("");
						$("#success").show().center(200, 40);
						$("#success p").html("发表成功，请稍后...");
						setTimeout(function(){
							$("#success").hide();
							$("#blog").hide();
							$("#reg .succ").hide();
							$("form").eq(2).first().reset();
							_this.disabled = false;
							screen.animate({
								attr:"o",
								target:0,
								t:30,
								fn : function () {
									screen.unlock();	//播完动画再消失
								}
							});
						}, 1500);
						 // alert("注册成功！");						
					}
				},
				async: true,
			});
		
			
		}
	});
	



	
});





