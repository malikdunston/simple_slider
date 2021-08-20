"use strict";
// namespacing...
	window.sliderJS = window.sliderJS || {};
	sliderJS = {
		...sliderJS,
		modules: [] // only 1 for now...
	}
// initialization...
	window.addEventListener("load", function(event){
		sliderJS.modules = [new Module()];
		window.addEventListener("resize", function () {
		})
		console.log(sliderJS);
	});

// factories...
	function Module(){
		this.global = {
			anim: 0,
			scope: window
		},
		this.sliders = [];
		this.currentIndex = 0;
		Array.from(document.querySelectorAll("*[slider-js]")).forEach(elem => {
			let slider = new Slider(elem, this);
			slider.render();
			// return slider
		})
	}
	function Slider(elem, Module) {
		this.setDefault = (elem, name, def) => {
			return elem.attributes.hasOwnProperty(name) ? elem.attributes[name].value : def
		}
		this.makeDataList = (arr) => {
			if (!arr) arr = [{
				img: "",
				content: {
					title: "Your Slider Has No Data!",
					content: "Attach some data to your slider element to begin."
				}
			}];
			return [arr[arr.length - 1], ...arr, arr[0]];
		}
		this.html = elem,
		this.data =  this.makeDataList(Module.global.scope[elem.attributes["slider-js"].value]), // replace this w/this.slider.feed...
		this.axis = this.setDefault(elem, "axis", "X"),
		this.direction = this.setDefault(elem, "direction", "forward"),
		this.index = parseInt(this.setDefault(elem, "offset", "1")),
		this.transition = this.setDefault(elem, "transition", "100ms"),
		this.interval = this.setDefault(elem, "interval", "4000"),
		this.delay = this.setDefault(elem, "delay", "1"),
		this.feed = new Feed(this) // makeDataList should run in this...
		this.render = () => {
			this.html.style.cssText += "position: relative; overflow: hidden; ";
			this.html.prepend(this.feed.html);
			// console.log(this)
		}
	}
	function Feed(slider){
		this.makeSlides = (obj) => {
			let slide = Object.assign(
				document.createElement("div"),
				{
					style: `${slider.axis == "Y" ? "min-height": "min-width"}: 100%; position: relative;`
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
		this.setTransformation = (slider) => {
			return `translate${slider.axis}(${-(slider.axis == "Y" ? slider.html.clientHeight : slider.html.clientWidth) * slider.index}px)`
		}
		this.html = Object.assign(document.createElement("div"), {
			classList: ["slider-feed"],
			style: `
				display: flex; 
				height: 100%; 
				flex-direction: ${slider.axis == "Y" ? "column" : "row"};`
		});
		this.html.style.transform = this.setTransformation(slider);
		slider.data.forEach(d => {
			console.log(slider, d);
			this.html.appendChild(this.makeSlides(d));
		})
		this.html.addEventListener('transitionend', function () {
			if (slider.index == slider.data.length - 1) {
				this.html.style.transition = "none";
				slider.index = 1;
				this.html.style.transform = this.setTransformation(slider);
			};
			if (slider.index == 0) {
				this.html.style.transition = "none";
				slider.index = slider.data.length - 2;
				this.html.style.transform = this.setTransformation(slider);
			};
		});
		this.html.prepend("asldkjf;alskdjf;alksdjfa");
		// console.log(this);
		return this;
	}
	
// unused functions from v1...
	function animation(slider, startStop) {
		console.log(slider, startStop);
		switch (startStop) {
			case "start":
				slider.rotation = setInterval(function () {
					increment(slider, slider.direction);
				}, slider.interval)
				break;
			case "stop":
				clearInterval(slider.rotation);
				break;
		}
	}
	function increment(slider, forBack) {
		switch (forBack) {
			case "forward":
				if (slider.index >= slider.data.length - 1) return;
				slider.index++;
				break;
			case "backward":
				if (slider.index <= 0) return;
				slider.index--;
				break;
		}
		resetAnimation(slider);
	}
	function resetAnimation(slider) {
		animation(slider, "stop");
		slider.html.querySelector(".slider-feed").style.transition = `${slider.transition}`;
		slider.html.querySelector(".slider-feed").style.transform = setTransformation();
		animation(slider, "start");
	}
