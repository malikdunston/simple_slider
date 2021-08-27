"use strict";
// namespacing...
	window.sliderJS = window.sliderJS || {};
	sliderJS = {
		...sliderJS,
		module: {} // only 1 for now...
	}
// initialization...
	window.addEventListener("load", function(event){
		sliderJS.module = new Module(event);
		window.addEventListener("resize", function () {
		})
		// console.log(sliderJS);
	});
// factories...
	function Module(event){
		this.idAttr = "slider-js";
		this.scope = event.currentTarget;
		this.html = event.target;
		this.sliders = Array.from(this.html.querySelectorAll(`*[${this.idAttr}]`)).map(elem => {
			return new Slider(elem, this);
		})
		this.interval = 1000;
		this.counter = 0;
		this.count = function () {
			this.counter++;
		};
		this.render = function (){
			this.sliders.forEach(s=>s.renderSlider());
			this.rotation ? clearInterval(this.rotation) : this.rotation = setInterval(this.count.bind(this), this.interval);
		};
		this.render();
	}
	function Slider(elem, Module) {
		this.setDefault = (elem, name, def) => {
			return elem.attributes.hasOwnProperty(name) ? elem.attributes[name].value : def
		};
		this.makeDataList = (arr) => {
			if (!arr) arr = [{
				img: "",
				content: {
					title: "Your Slider Has No Data!",
					content: "Attach some data to your slider element to begin."
				}
			}];
			return [arr[arr.length - 1], ...arr, arr[0]];
		};
	// Slide() 
		this.makeSlides = (obj) => {
			let slide = Object.assign(
				document.createElement("div"),
				{
					style: `${this.axis == "Y" ? "min-height": "min-width"}: 100%; position: relative;`
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
		};
		this.setTransformation = () => {
			return `translate${this.axis}(${-(this.axis == "Y" ? this.html.clientHeight : this.html.clientWidth) * this.index}px)`
		}
		this.loopFeed = function(){
			if (this.index == this.data.length - 1) {
				this.feed.style.transition = "none";
				this.index = 1;
				this.feed.style.transform = `translate${this.axis}(${-(this.axis == "Y" ? this.html.clientHeight : this.html.clientWidth) * this.index}px)`;
			};
			if (this.index == 0) {
				this.feed.style.transition = "none";
				this.index = slider.data.length - 2;
				this.feed.style.transform = `translate${this.axis}(${-(this.axis == "Y" ? this.html.clientHeight : this.html.clientWidth) * this.index}px)`;
			};
		}
		this.increment = function(){
			switch (this.direction) {
				case "forward":
					if (this.index >= this.data.length - 1) return;
					this.index++;
					break;
				case "backward":
					if (this.index <= 0) return;
					this.index--;
					break;
			}
			this.set();
		}
		this.animation = function(startStop){
			if (startStop == "start"){
				setTimeout(this.increment.bind(this), this.interval)
				console.log(this.index, this.scope.length);
			}else if (startStop == "stop"){
				clearTimeout(this.rotation)
			}
		}
		this.set = function() {
			this.animation("stop");
			this.html.setAttribute("slider-index", this.index);
			this.html.querySelector(".slider-feed").style.transition = `${this.transition}`;
			this.html.querySelector(".slider-feed").style.transform = `translate${this.axis}(${-(this.axis == "Y" ? this.html.clientHeight : this.html.clientWidth) * this.index}px)`;
			this.animation("start");
		}
		this.renderSlider = () => {
			this.feed = Object.assign(document.createElement("div"), {
				classList: ["slider-feed"],
				style: `
					display: flex; 
					height: 100%; 
					flex-direction: ${this.axis == "Y" ? "column" : "row"};
					transform: ${this.setTransformation()};
				`
			}); // makeDataList should run in this...
			this.data.forEach(d => {
				this.feed.append(this.makeSlides(d));
			})
			this.html.prepend(this.feed);
			this.feed.addEventListener('transitionend', (e)=>{this.loopFeed(e)});
			this.html.style.cssText += "position: relative; overflow: hidden; ";
			this.animation("start");
		}
		this.html = elem;
		this.id = elem.attributes["slider-js"].value;
		this.axis = this.setDefault(elem, "axis", "X");
		this.index = parseInt(this.setDefault(elem, "offset", "1"));
		this.interval = this.setDefault(elem, "interval", "4000");
		this.direction = this.setDefault(elem, "direction", "forward");
		this.transition = this.setDefault(elem, "transition", "100ms");
		this.delay = this.setDefault(elem, "delay", "1");
		this.scope = Module.scope[this.id];
		this.data =  this.makeDataList(this.scope); // replace this w/this.slider.feed...
		return this;
	}