(function(){

	let app = angular.module("app", ["slider"]);
	app.controller("appCtrl", function(){
		let app = this;
		app.stuff = "hello";
		app.data = [
			{title: "Here's a Title Section", desc: "blah blah blah blah bro."},
			{title: "Second", desc: "blah blah blah blah mate."},
			{title: "Here's a Third One.", desc: "blah blah blah blah buddy."}
		]
	});

	let slider = angular.module("slider", []);
	slider.component("slider", {
		controller: "sliderCtrl",
		controllerAs: "slider",
		templateUrl: "slider.html",
		bindings: {
			feed: "<"
		}
	});
	slider.controller("sliderCtrl", function($scope){
		let slider = this;
		slider.app = $scope.$parent.app;



		slider.init = () => {
			rotate = setInterval(() => {
				up();
			}, slider.interval);
		};

		slider.getSlides = () => document.querySelectorAll('.slide');

		slider.up = () => {
			slides = slider.getSlides();
			if (index >= slides.length - 1) return;
			index++;
			slider.set();
		};

		slider.down = () => {
			if (index <= 0) return;
			index--;
			slider.set();
		};

		slider.set = () => {
			slider.clear();
			slides = getSlides();
			slideWidth = slideshow.clientWidth;
			feed.style.transition = '.7s ease-out';
			feed.style.transform = `translateX(${-slideWidth * index}px)`;
			slider.init();
		}

		slider.clear = () => {
			clearInterval(rotate);
		}

		slider.$onInit = function(){


			const slideshow = document.querySelector('slideshow');
			slider.interval = 3000;

			let index = 1;
			let slideId;

			let firstClone = slider.feed[0]
			let lastClone = slider.feed[slides.length - 1]
			firstClone.id = 'first-clone';
			lastClone.id = 'last-clone';
			feed.append(firstClone);
			feed.prepend(lastClone);

			let slideWidth = slideshow.clientWidth;

			feed.style.transform = `translateX(${-slideWidth * index}px)`;


		feed.addEventListener('transitionend', () => {
			slides = slider.getSlides();
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

			slider.init();
		}
	});

})()