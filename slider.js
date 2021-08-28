"use strict";
// namespacing...
	window.sliderJS = window.sliderJS || {};
	sliderJS = {
		...sliderJS,
		module: {} // only 1 for now...
	}
// initialization...
	window.addEventListener("load", function(event){
		sliderJS.module = Module(event);
		sliderJS.module.render();
		// window.addEventListener("resize", function () {
		// })
		// console.log(sliderJS);
	});
// factories...
	const Module = event => {
		this.scope = event.currentTarget, this.html = event.target;
		this.interval = 1000, this.counter = 0;
		this.render = () =>{
			const childNodes = "sljs";
			const count = () => this.counter++;
			const sliders = Array.from(this.html.querySelectorAll(`*[${childNodes}]`)).map(elem => {
				let slider = new Slider(elem, this);
				slider.render();
				return slider;
			});
			this.rotation ? clearInterval(this.rotation) : this.rotation = setInterval(count.bind(this), this.interval);
		};
		return this
	}
	function Slider(elem, Module) {
		const setDefault = (elem, name, def) => {
			return elem.attributes.hasOwnProperty(name) ? elem.attributes[name].value : def
		};
		const makeDataList = (arr) => {
			if (!arr) arr = [{
				img: "",
				content: {
					title: "Your Slider Has No Data!",
					content: "Attach some data to your slider element to begin."
				}
			}];
			return [arr[arr.length - 1], ...arr, arr[0]];
		};
		const makeSlides = (obj) => {
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
		this.animation = function(startStop){
			const increment = () => {
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
			if (startStop == "start"){
				this.rotation = setInterval(increment.bind(this), this.interval)
				console.log(this.index, this.scope.length);
			}else if (startStop == "stop"){
				clearInterval(this.rotation)
			}
		}
		this.set = function() {
			this.animation("stop");
			this.html.setAttribute("slider-index", this.index);
			this.html.querySelector(".slider-feed").style.transition = `${this.transition}`;
			this.html.querySelector(".slider-feed").style.transform = `translate${this.axis}(${-(this.axis == "Y" ? this.html.clientHeight : this.html.clientWidth) * this.index}px)`;
			this.animation("start");
		}
		this.html = elem;
		this.id = elem.attributes["sljs"].value;
		this.scope = Module.scope[this.id];
		this.data =  makeDataList(this.scope); // replace this w/this.slider.feed...
		this.axis = setDefault(elem, "axis", "X");
		this.index = parseInt(setDefault(elem, "offset", "1"));
		this.interval = setDefault(elem, "interval", "4000");
		this.direction = setDefault(elem, "direction", "forward");
		this.transition = setDefault(elem, "transition", "100ms");
		this.controls = setDefault(elem, "controls", "1");
		this.delay = setDefault(elem, "delay", "1");
		this.feed = Object.assign(document.createElement("div"), {
			classList: ["slider-feed"],
			style: `
				display: flex; 
				height: 100%; 
				flex-direction: ${this.axis == "Y" ? "column" : "row"};
				transform: ${this.setTransformation()};
			`,
			innerHTML: this.data.map(d => makeSlides(d).outerHTML).join(""),
			ontransitionend: (e)=>{this.loopFeed(e)}
		});
		this.html = Object.assign(elem, {
			style: `
				height: 325px; 
				position: relative;
				overflow: hidden;
			`
		});
		this.render = () => {
			let controls = Controls();
			console.log(controls);
			this.html.append(
				controls,
				this.feed,
			);
			this.animation("start");
		}
		return this;
	}

	const Controls = () => {
		const viewBox = "0 0 100 100";
		const btnStyles = `
			width: 2rem;
			height: 2rem;
		`;
		this.backward = Object.assign(document.createElement("svg"), {
			style: btnStyles,
			title: "backward",
			innerHTML: `<polyline points="100 0 50 50 100 100" />`,
			onclick: () => {
				alert("bac");
			}
		});
		this.forward = Object.assign(document.createElement("svg"), {
			style: btnStyles,
			title: "forward",
			innerHTML: `<polyline points="0 100 50 50 0 0" style="pointer-events: none"/>`,
		});
		this.backward.setAttribute("viewbox", viewBox)
		this.forward.setAttribute("viewbox", viewBox)
		this.html = Object.assign(document.createElement("div"), {
			classList: ["slider-controls"],
			style: `
				fill: none;
				stroke: white;
				stroke-miterlimit: 10;
				stroke-width: 10px;
				position: absolute;
				z-index: 500;
				width: 100%;				
				height: 100%;		
				display: flex;
				align-items: center;
				justify-content: space-between;	
			`,
			innerHTML: [this.backward.outerHTML, this.forward.outerHTML].join(""),
			onclick: e => {
				let x;
				if(e.target.nodeName == "svg") {
					e.target.title == "backward" ? x = "bac" : x = "for"
					console.dir(e.target)
				}
			}
		});
		// this.html.addEventListener("click", function(e){
		// 	console.dir(e.target);
		// })
		return this.html;
	}