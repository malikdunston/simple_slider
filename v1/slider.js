"use strict";
window.initSliderFromDOM2 = {
	instantiate(global) {
		console.log("slider2");
		console.log(global);
		document.querySelectorAll("*[slider-js]").forEach(function (elem) {
			let slider = {
				html: elem,
				data: makeDataList(global[elem.attributes["slider-js"].value]),
				axis: setDefault(elem, "axis", "X"),
				direction: setDefault(elem, "direction", "forward"),
				index: parseInt(setDefault(elem, "offset", "1")),
				transition: setDefault(elem, "transition", "100ms"),
				interval: setDefault(elem, "interval", "4000"),
				delay: setDefault(elem, "delay", "1")
			}
			console.log(slider);
			render(slider);
			setTimeout(function () {
				animation(slider, "start")
			}, slider.delay)
			window.addEventListener("resize", function () {
				set(slider);
			})
		});

		function makeDataList(arr) {
			if (!arr) arr = [{
				img: "",
				content: {
					title: "Your Slider Has No Data!",
					content: "Attach some data to your slider element to begin."
				}
			}];
			return [arr[arr.length - 1], ...arr, arr[0]];
		}

		function setDefault(elem, name, def) {
			return elem.attributes.hasOwnProperty(name) ? elem.attributes[name].value : def
		}

		function render(slider) {
			slider.html.style.cssText += "position: relative; overflow: hidden; ";
			slider.html.prepend(makeFeed(slider));

			function makeFeed(slider) {
				let feed = Object.assign(
					document.createElement("div"), {
						classList: ["slider-feed"],
						style: `display: flex; height: 100%; flex-direction: ${slider.axis == "Y" ? "column" : "row"}`
					}
				)
				// same as set()
				feed.style.transform = `translate${slider.axis}(${-(slider.axis == "Y" ? slider.html.clientHeight : slider.html.clientWidth) * slider.index}px)`;
				slider.data.forEach(function (obj) {
					feed.appendChild(makeSlides(slider, obj));
				})
				feed.addEventListener('transitionend', function () {
					if (slider.index == slider.data.length - 1) {
						feed.style.transition = "none";
						slider.index = 1;
						feed.style.transform = `translate${slider.axis}(${-(slider.axis == "Y" ? slider.html.clientHeight : slider.html.clientWidth) * slider.index}px)`;
					};
					if (slider.index == 0) {
						feed.style.transition = "none";
						slider.index = slider.data.length - 2;
						feed.style.transform = `translate${slider.axis}(${-(slider.axis == "Y" ? slider.html.clientHeight : slider.html.clientWidth) * slider.index}px)`;
					};
				});

				function makeSlides(slider, obj) {
					let slide = Object.assign(
						document.createElement("div"), {
							style: `${slider.axis == "Y" ? "min-height": "min-width"}: 100%; position: relative;`
						}
					)
					slide.appendChild(Object.assign(
						document.createElement("img"), {
							src: obj.img,
							style: "object-fit: cover; width: 100%; height: 100%; position: absolute"
						}
					));
					slide.appendChild(Object.assign(
						document.createElement("div"), {
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
			set(slider);
		}

		function set(slider) {
			animation(slider, "stop");
			slider.html.querySelector(".slider-feed").style.transition = `${slider.transition}`;
			slider.html.querySelector(".slider-feed").style.transform = `translate${slider.axis}(${-(slider.axis == "Y" ? slider.html.clientHeight : slider.html.clientWidth) * slider.index}px)`;
			animation(slider, "start");
		}

		function animation(slider, startStop) {
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

	}
}

function makeSlider(elem) {
	this.html = elem;
	this.data = makeDataList(this[elem.attributes["slider-js"].value]);
	this.axis = setDefault(elem, "axis", "X");
	this.direction = setDefault(elem, "direction", "forward");
	this.index = parseInt(setDefault(elem, "offset", "1"));
	this.transition = setDefault(elem, "transition", "100ms");
	this.interval = setDefault(elem, "interval", "4000");
	this.delay = setDefault(elem, "delay", "1");
	this.displayInfo = function () {
		return this.name + "is " + this.age + "year's old!";
	}
}

window.addEventListener("load", function(event){
	window.sliderJS = 
	initSliderFromDOM2.instantiate(window);
});
