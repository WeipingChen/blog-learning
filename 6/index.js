

window.onload = function() {

	//个人中心
	$().getClass("member").hover(	function() {
		$().getTagName("ul").show();
	}, function () {
		$().getTagName("ul").hide();
	});


	//登录
	// var top = (document.documentElement.clientHeight - 250) / 2;
	// var left = (document.documentElement.clientWidth - 350) / 2;
	// $().getId("login").css("top", top + "px").css("left", left + "px");

	// window.onresize = function () {
	// 	var top = (document.documentElement.clientHeight - 250) / 2;
	// 	var left = (document.documentElement.clientWidth - 350) / 2;
	// 	$().getId("login").css("top", top + "px").css("left", left + "px");
	// 	}
	var login = $().getId("login");
	var screen = $().getId("screen");
	// login.center(350, 250).resize(function() {
	// 	login.center(350, 250);
	// });
	
	login.center(350, 250);
	login.resize(function (){
		login.center(350,250);
		if(login.css("display") != "none"){
			screen.lock();
		}
	});

	
	$().getClass("close").click(function (){
		login.css("display", "none");
		screen.unlock();
	});
	$().getClass("login").click(function (){
		login.css("display", "block");	
		screen.lock();
	});

};


