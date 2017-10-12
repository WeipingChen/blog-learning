

// window.onload = function (){
// 	var box = document.getElementById("box");
// 	alert(box.innerHTML);
// }


// addEvent(document, "DOMContentLoaded", function() {
// 	var box = document.getElementById("box");
// 	alert(box.innerHTML);
// });
 
// 使用iframe时有问题
// document.write('<script id="ie_loaded" defer="defer" src="javascript:void(0)"></script>');
// var ie_loaded = document.getElementById("ie_loaded");
// ie_loaded.onreadystatechange = function() {
// 	// alert(this.readyState);
// 	if(this.readyState == "complete") {
// 		var box = document.getElementById("box");
// 		alert(box.innerHTML);
// 	}
// };


//使用doScroll
// var timer = null;
// timer = setInterval(function() {
// 	try{
// 		document.documentElement.doScroll("left");

// 		var box = document.getElementById("box");
// 		alert(box.innerHTML);
// 	} catch (e) {

// 	}
// });


//
// function addDomLoaded(fn) {
// 	if(document.addEventListener) { //W3C
// 		addEvent(document, "DOMContentLoaded", function() {
// 			fn();
// 			alert(arguments.callee);
// 			removeEvent(document, "DomContentLoaded", arguments.callee);
// 		});
// 	} else {	//IE
// 		var timer = null;
// 		timer = setInterval(function() {
// 			try{
// 				document.documentElement.doScroll("left");
// 				fn();
// 			} catch (e) {

// 			}
// 		});
// 	}
// }


addDomLoaded(function() {
	var box = document.getElementById("box");
	alert(box.innerHTML);
});