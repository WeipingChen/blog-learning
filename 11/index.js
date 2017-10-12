

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

	
	//可拖拽
	login.drag([$().getTagName("h2").getElement(0)]);


};


