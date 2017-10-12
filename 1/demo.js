

window.onload = function() {
	// alert(document.getElementById("box").innerHTML);
	// alert(document.getElementsByName("sex")[0].value);
	// alert(document.getElementsByTagName("p")[0].innerHTML);
	// alert(Base.$("box").innerHTML);
	// alert(Base.$$("sex")[0].value);
	// alert(Base.$$$("p")[0].innerHTML);
	alert(Base.getId("box").innerHTML);
	alert(Base.getName("sex")[0].value);
	alert(Base.getTagName("p")[0].innerHTML);
}


