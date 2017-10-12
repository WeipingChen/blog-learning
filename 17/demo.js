

// $(function(){
// 	var box = document.getElementById("box");

// 	// alert(getStyle(box, "left"));

// 	setInterval(function(){
// 		box.style.left = parseInt(getStyle(box, "left")) + 10 + "px";
// 	}, 10);
// });


$(function() {
	$("#button").click(function(){
		$("#box").animate({
			"attr":"x",
			"alert" : 50,
			"target" : 300,
			"step" : 7,
		});
		// $("#box").animate("top", 10, 500);
	});
});



