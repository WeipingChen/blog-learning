

window.onload = function() {
	
	// alert(Base.getId("box").innerHTML);
	//alert(Base.getTagName("p")[0].innerHTML);
	var base = new Base();
	// base.getId("box").css("color","red").css("background", "blue");
	// base.getTagName("p").css("color","red").html("标题").click(function (){alert("a");});
	$().getTagName("p").css("color","red").html("标题").click(function (){alert("a");});
	$().getId("box").css("color","pink");
};


