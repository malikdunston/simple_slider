function sliderJS(){

	const slideshow = document.querySelector('.slideshow');
	const feed = slideshow.querySelector('.feed');
	const forward = slideshow.querySelector('.forward');
	const backward = slideshow.querySelector('.backward');
	const interval = 3000;

	let slides = document.querySelectorAll('.slide');
	let index = 1;

	const firstClone = slides[0].cloneNode(true);
	const lastClone = slides[slides.length - 1].cloneNode(true);
	firstClone.id = 'first-clone';
	lastClone.id = 'last-clone';
	feed.append(firstClone);
	feed.prepend(lastClone);

	let slideWidth = slideshow.clientWidth;

	feed.style.transform = `translateX(${-slideWidth * index}px)`;

	const init = () => {
		rotate = setInterval(() => {
			up();
		}, interval);
	};

	const getSlides = () => document.querySelectorAll('.slide');

	feed.addEventListener('transitionend', () => {
		slides = getSlides();
		if (slides[index].id === firstClone.id) {
			feed.style.transition = 'none';
			index = 1;
			feed.style.transform = `translateX(${-slideWidth * index}px)`;
		}
		if (slides[index].id === lastClone.id) {
			feed.style.transition = 'none';
			index = slides.length - 2;
			feed.style.transform = `translateX(${-slideWidth * index}px)`;
		}
	});

	const up = () => {
		slides = getSlides();
		if (index >= slides.length - 1) return;
		index++;
		set();
	};

	const down = () => {
		if (index <= 0) return;
		index--;
		set();
	};

	const set = () => {
		clear();
		slides = getSlides();
		slideWidth = slideshow.clientWidth;
		feed.style.transition = '.7s ease-out';
		feed.style.transform = `translateX(${-slideWidth * index}px)`;
		init();
	}

	const clear = () => {
		clearInterval(rotate);
	}

	slideshow.addEventListener('mouseenter', clear);
	slideshow.addEventListener('mouseleave', init);
	slideshow.addEventListener("resize", set);

	forward.addEventListener('click', up);
	backward.addEventListener('click', down);

	init();

	console.log(slideshow);
};



window.addEventListener("load", function(){
	sliderJS();





	function render(slider){
		// slider.html.innerHTML = "";
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
				// slide.appendChild(Object.assign(
				// 	document.createElement("img"),
				// 	{
				// 		src: obj.img,
				// 		style: "object-fit: cover; width: 100%; height: 100%; position: absolute"
				// 	}
				// ));
				slide.appendChild(Object.assign(
					document.createElement("div"),
					{
						classList: ["slider-content"],
						// style: "width: 100%; position: absolute; bottom: 0",
						innerHTML: [obj.content.title, obj.content.content].join("</br>")
					}
				));
				return slide;
			}
		}
	}


	document.querySelectorAll("*[slider-js]").forEach(function(elem){
		let slider = {
			html: elem,
			data: window[elem.attributes["slider-js"].value] || [
				{img: "", content: {title: 1, content: "slide one"}}, 
				{img: "", content: {title: 2, content: "slide two"}}
			],
		}
		console.log(slider, slider.html);
		render(slider);
	});



});