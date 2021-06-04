
function render(slider){
	if (!slider.html.style.height) slider.html.style.height = "10em";
	slider.html.style.cssText += "position: relative; overflow: hidden; ";
	slider.html.appendChild(makeFeed(slider));
	function makeFeed(slider){
		let feed = Object.assign(
			document.createElement("div"),
			{
				classList: ["slider-feed"],
				style: `display: flex; height: 100%; flex-direction: ${slider.direction == "Y" ? "column" : "row"}`
			}
		)
		feed.style.transform = `translate${slider.direction}(${-(slider.direction == "Y" ? slider.html.clientHeight : slider.html.clientWidth) * slider.index}px)`;
		slider.data.forEach(function(obj){
			feed.appendChild(makeSlides(slider, obj));
		})
		feed.addEventListener('transitionend', function(){
			if (slider.index == slider.data.length -1) {
				feed.style.transition = "none";
				slider.index = 1;
				feed.style.transform = `translate${slider.direction}(${-(slider.direction == "Y" ? slider.html.clientHeight : slider.html.clientWidth) * slider.index}px)`;
			};
			if (slider.index == 0) {
				feed.style.transition = "none";
				slider.index = slider.data.length - 2;
				feed.style.transform = `translate${slider.direction}(${-(slider.direction == "Y" ? slider.html.clientHeight : slider.html.clientWidth) * slider.index}px)`;
			};
		});
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
		return feed;
	}
}
function increment(slider, forBack){
	switch(forBack){
		case"forward":
			if (slider.index >= slider.data.length - 1) return;
			slider.index ++;
			break;
		case "backward":
			if (slider.index <= 0) return;
			slider.index --;
			break;
	}
	set(slider);
}
function set(slider){
	animation(slider, "stop");
	slider.html.querySelector(".slider-feed").style.transition = `${slider.transition + "ms"}`;
	slider.html.querySelector(".slider-feed").style.transform = `translate${slider.direction}(${-(slider.direction == "Y" ? slider.html.clientHeight : slider.html.clientWidth) * slider.index}px)`;
	animation(slider, "start");
}
function animation(slider, startStop){
	switch(startStop){
		case"start":
			slider.rotation = setInterval(function(){
				increment(slider, "forward");
			}, slider.interval)
			break;
		case "stop":
			clearInterval(slider.rotation);
			break;
	}
}
function makeDataList(arr){
	if (!arr) arr =  [
		{
			img: "",
			content: {
				title: "Your Slider Has No Data!",
				content: "Attach some data to your slider element to begin."
			}
		}
	];
	return [arr[arr.length - 1], ...arr, arr[0]];
}
function setDefault(elem, name, def){
	return elem.attributes.hasOwnProperty(name) ? elem.attributes[name].value : def
}



window.sliderJSByMalikDunston = function(){
	"use strict";

	document.querySelectorAll("*[slider-js]").forEach(function(elem){
		let slider = {
			html: elem,
			data: makeDataList(window[elem.attributes["slider-js"].value]),
			direction: setDefault(elem, "direction", "X"),
			offset: parseInt(setDefault(elem, "offset", "1")),
			index: parseInt(setDefault(elem, "offset", "1")),
			transition: setDefault(elem, "transition", "0"),
			interval: setDefault(elem, "interval", "1000")
		}
		render(slider);
		animation(slider, "start");
	});
	console.log("SliderJS by Malik Dunston");
}

window.addEventListener("load", sliderJSByMalikDunston);

function x(){
	console.log(this);
}

function add(){
	console.log(this.one + this.two)
	return this.one + this.two
}

function subtract(){
	console.log(this.one - this.two)
	return this.one - this.two
}

let newobj = {
	one: 10,
	two: 5
};

let obj = {
	one: 7,
	two: 40,
	that: "a",
	b: "sumthin",
	prop: this,
	do: function(){
		return this
	},
	sumelse: function(){
		console.log(this);
	}
};

let addUpObject = add.bind(obj);

console.log(addUpObject()); // runs twice (return via log, then log in function as it runs)
addUpObject(); // 47 --- console.log

// or you can use call or apply... call is better because of spread operator!!!!!
subtract.call(obj);
subtract.call(newobj);

// bind is like... a more concrete way of using call
// it exists so you can reuse it instead of calling again and again... 