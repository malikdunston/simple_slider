function render(slider){
	slider.html.style = "position: relative; overflow: hidden;";
	slider.html.appendChild(makeFeed(slider));
	function makeFeed(slider){
		let feed = Object.assign(
			document.createElement("div"),
			{
				style: `display: flex; height: 100%; transition: ${slider.transition + "ms"}; flex-direction: ${slider.direction == "Y" ? "column" : "row"}`
			}
		)
		slider.data.forEach(function(obj){
			feed.appendChild(makeSlides(slider, obj));
		})
		return feed;
	}
	function makeSlides(slider, obj){
		let slide = Object.assign(
			document.createElement("div"),
			{
				style: `${slider.direction == "Y" ? "min-height": "min-width"}: 100%; position: relative;`
			}
		)
		slide.appendChild(Object.assign(
			document.createElement("img"),
			{
				src: obj.img,
				style: "object-fit: cover; width: 100%; height: 100%; position: absolute"
			}
		));
		slide.appendChild(Object.assign(
			document.createElement("div"),
			{
				classList: ["slider-content"],
				style: "width: 100%; position: absolute; bottom: 0",
				innerHTML: [obj.content.title, obj.content.content].join("</br>")
			}
		));
		return slide;
	}
	console.log(slider.index);
	setTimeout(function(){move(slider);}, slider.interval);
}
function move(slider){
	slider.html.querySelector("*:first-child").style.transform = `translate${slider.direction}(-${(slider.direction == "Y" ? slider.html.clientHeight : slider.html.clientWidth) * slider.index}px)`;
	endOfList(slider);
	render(slider);
}
function endOfList(slider){
	// if(slider.index == slider.data.length){
	// 	slider.html.innerHTML = "";
	// 	slider.index = slider.offset;
	// }else{
		slider.index++;
	// }
}
window.addEventListener("load", function(){
	document.querySelectorAll(".slider-js").forEach(function(elem){
		let slider = {
			html: elem,
			data: makeDataList(window[elem.attributes.data.value]),
			direction: setDefault("direction", "X"),
			offset: parseInt(setDefault("offset", "1")),
			index: parseInt(setDefault("offset", "1")),
			transition: setDefault("transition", "0"),
			interval: setDefault("interval", "3000")
		}
		function makeDataList(arr){
			return arr
		}
		function setDefault(name, def){
			return elem.attributes.hasOwnProperty(name) ? elem.attributes[name].value : def
		}
		render(slider);
	});
});
