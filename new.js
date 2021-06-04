function render(slider){
	slider.html.innerHTML = "";
	slider.html.style = "position: relative; overflow: hidden;";
	slider.html.appendChild(makeFeed(slider));
	function makeFeed(slider){
		let feed = Object.assign(
			document.createElement("div"),
			{
				classList: ["slider-feed"],
				style: `display: flex; height: 100%; transition: ${slider.transition + "ms"}; flex-direction: ${slider.direction == "Y" ? "column" : "row"};`
			}
		)
		slider.data.forEach(function(obj){
			feed.appendChild(makeSlides(slider, obj));
		})
		return feed;
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
	}
	function makeCounter(slider){
		return Object.assign(
			document.createElement("div"),
			{
				classList: ["slider-counter"],
				style: "position: absolute; top: 0",
				innerHTML: `${slider.index}/${slider.data.length}`
			}
		)
	}
	function makeProgressBar(slider){
		let wrap = Object.assign(
			document.createElement("div"),
			{
				classList: ["slider-progress-wrap"],
				style: `position: absolute; bottom: 0; height: 10px; width: 100%; background: red;`
			}
		)
		wrap.appendChild(Object.assign(
			document.createElement("div"),
			{
				classList: ["slider-progress-bar"],
				style: `position: absolute; bottom: 0; height: 10px; width: ${"0px"}; background: purple; transition: ${slider.transition + "ms"}`
			}
		))
		return wrap;
	}
}
function move(slider){
	console.log(slider.index);
	animate(slider, "stop");
	slider.html.querySelector(".slider-feed").style.transform = `translate${slider.direction}(-${(slider.direction == "Y" ? slider.html.clientHeight : slider.html.clientWidth) * slider.index}px)`;
	slider.index++	
	// move(slider)
}
function set(slider){

}
// function endOfList(slider){
// 	// if(slider.index == slider.data.length){
// 	// 	slider.html.innerHTML = "";
// 	// 	slider.index = slider.offset;
// 	// }else{
// 		slider.index++;
// 	// }
// }
function animate(slider, startStop){
	switch(startStop){
		case "start":
			slider.animation = setInterval(function(){move(slider)}, slider.interval);
			break;
		case "stop":
			clearInterval(slider.animation);
			break;
	}
}

window.addEventListener("load", function(){
	document.querySelectorAll("*[slider-js]").forEach(function(elem){
		let slider = {
			html: elem,
			data: window[elem.attributes["slider-js"].value] || [
				{img: "", content: {title: 1, content: "slide one"}}, 
				{img: "", content: {title: 2, content: "slide two"}}
			],
			direction: setDefault("direction", "X"),
			offset: parseInt(setDefault("offset", "1")),
			index: parseInt(setDefault("offset", "1")),
			transition: setDefault("transition", "100"),
			interval: setDefault("interval", "3000")
		}
		function setDefault(name, def){
			return elem.attributes.hasOwnProperty(name) ? elem.attributes[name].value : def
		}
		render(slider);
	});
});
