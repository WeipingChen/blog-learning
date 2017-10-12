

//闭包  打开后执行的代码
(function (){	
	window.sys = {};							//外部可访问，浏览器信息对象
	var ua = navigator.userAgent.toLowerCase(); //获取浏览器信息字符串
	var s;										//浏览器信息数值，浏览器名称+版本

	// ua.match(/msie ([\d.]+)/);			//msie8.0,8.0
	// if((/msie ([\d.]+)/).test(ua)){
	// 	s = ua.match(/msie ([\d.]+)/);
	// 	sys.ie = s[1];
	// }

	// if((/firefox\/([\d.]+)/).test(ua)){
	// 	s = ua.match(/firefox\/([\d.]+)/);
	// 	sys.firefox = s[1];
	// }

	// if((/chrome\/([\d.]+)/).test(ua)){
	// 	s = ua.match(/chrome\/([\d.]+)/);
	// 	sys.chrome = s[1];
	// }

	// if((/opera\/.*version\/([\d.]+)/).test(ua)){
	// 	s = ua.match(/opera\/.*version\/([\d.]+)/);
	// 	sys.opera = s[1];
	// }

	// if(ua.opera){
	// 	sys.opera = ua.opera.version();
	// }

	// if((/version\/([\d.]+).*safari/).test(ua)) {
	// 	s = ua.match(/version\/([\d.]+).*safari/);
	// 	sys.safari = s[1];
	// }

	(s = ua.match(/msie ([\d.]+)/))? sys.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/))? sys.firefox = s[1]:	
	(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1]:
	(s = ua.match(/opera\/.*version\/([\d.]+)/))? sys.opera = s[1]:
	(s = ua.match(/version\/([\d.]+).*safari/))? sys.safari = s[1] : 0;
})();

// alert(sys.firefox);
// alert(sys.ie);
// alert(sys.chrome);
// alert(sys.opera);
// alert(safari);



