

window.onload = function() {
	var oButton = document.getElementById("button");
	addEvent(oButton, "click", fButton);
	// removeEvent(oButton, "click", fButton);
};

var fButton = function (e) {
	// alert(e.clientX);
	alert(this.value);
}

// addEvent(window, "load", function () {alert("1");});
// addEvent(window, "load", function () {alert("2");});
// addEvent(window, "load", function () {alert("3");});

