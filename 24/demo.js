

// $(function(){
// 	var box = document.getElementById("box");

// 	// alert(getStyle(box, "left"));

// 	setInterval(function(){
// 		box.style.left = parseInt(getStyle(box, "left")) + 10 + "px";
// 	}, 10);
// });


$(function() {
	$("#button").toggle(function(){
		$("#box").css("background", "blue");
	}, function(){
		$("#box").css("background", "red");
	}, function(){
		$("#box").css("background", "yellow");
	}, function(){
		$("#box").css("background", "green");
	});
	$("#button1").toggle(function(){
		$("#pox").css("background", "blue");
	}, function(){
		$("#pox").css("background", "red");
	}, function(){
		$("#pox").css("background", "yellow");
	}, function(){
		$("#pox").css("background", "green");
	});

});



