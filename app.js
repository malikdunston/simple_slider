(function () {

	let app = angular.module("app", ["slider"]);
	app.controller("appCtrl", function () {
		let app = this;
		app.stuff = "hello";
		app.data = [{
				title: "Here's a Title Section",
				desc: "blah blah blah blah bro."
			},
			{
				title: "Second",
				desc: "blah blah blah blah mate."
			},
			{
				title: "Here's a Third One.",
				desc: "blah blah blah blah buddy."
			}
		]
	});

	// let slider = angular.module("slider", []);
	// slider.component("slider", {
	// 	controller: "sliderCtrl",
	// 	controllerAs: "slider",
	// 	templateUrl: "slider.html",
	// 	bindings: {
	// 		feed: "<"
	// 	}
	// });
	// slider.controller("sliderCtrl", function ($scope) {
	// 	let slider = this;
	// 	slider.app = $scope.$parent.app;

	// 	slider.init = () => {
	// 		rotate = setInterval(() => {
	// 			up();
	// 		}, slider.interval);
	// 	};

	// 	slider.getSlides = () => document.querySelectorAll('.slide');

	// 	slider.up = () => {
	// 		slides = slider.getSlides();
	// 		if (index >= slides.length - 1) return;
	// 		index++;
	// 		slider.set();
	// 	};

	// 	slider.down = () => {
	// 		if (index <= 0) return;
	// 		index--;
	// 		slider.set();
	// 	};

	// 	slider.set = () => {
	// 		slider.clear();
	// 		slides = getSlides();
	// 		slideWidth = slideshow.clientWidth;
	// 		feed.style.transition = '.7s ease-out';
	// 		feed.style.transform = `translateX(${-slideWidth * index}px)`;
	// 		slider.init();
	// 	}

	// 	slider.clear = () => {
	// 		clearInterval(rotate);
	// 	}

	// 	slider.$onInit = function () {


	// 		// const slideshow = document.querySelector('slideshow');
	// 		// slider.interval = 3000;

	// 		// let index = 1;
	// 		// let slideId;

	// 		// // let firstClone = slider.feed[0]
	// 		// // let lastClone = slider.feed[slides.length - 1]
	// 		// // firstClone.id = 'first-clone';
	// 		// // lastClone.id = 'last-clone';
	// 		// // feed.append(firstClone);
	// 		// // feed.prepend(lastClone);

	// 		// // let slideWidth = slideshow.clientWidth;

	// 		// $scope.$watch(slideshow, function () {
	// 		// 	totalWidth = slideshow[0].clientWidth;
	// 		// 	totalHeight = slideshow[0].clientHeight;
	// 		// 	console.log(totalWidth); // returns 100
	// 		// });

	// 		// slider.feedX = `translateX(${-slideWidth * index}px)`;

	// 		// feed.addEventListener('transitionend', () => {
	// 		// 	slides = slider.getSlides();
	// 		// 	if (slides[index].id === firstClone.id) {
	// 		// 		feed.style.transition = 'none';
	// 		// 		index = 1;
	// 		// 		feed.style.transform = `translateX(${-slideWidth * index}px)`;
	// 		// 	}
	// 		// 	if (slides[index].id === lastClone.id) {
	// 		// 		feed.style.transition = 'none';
	// 		// 		index = slides.length - 2;
	// 		// 		feed.style.transform = `translateX(${-slideWidth * index}px)`;
	// 		// 	}
	// 		// });

	// 		// slider.init();
	// 	}
	// });

	let slider = angular.module("slider", []);
	slider.directive("slider", function(){
		function link(scope, elem, attr){
			let slideshow = elem[0];
			let feed = slideshow.querySelector(".feed");
			slideshow.style.display = "block";
			let index = 1;

			scope.interval = 1000;

			scope.init = () => {
				scope.rotate = setInterval(() => {
					scope.up();
				}, scope.interval);
			};

			scope.up = () => {
				// slides = scope.getSlides();
				if (index >= scope.feed.length - 1) return;
				index++;
				scope.set();
			};

			scope.down = () => {
				if (index <= 0) return;
				index--;
				scope.set();
			};

			scope.set = () => {
				scope.clear();
				feed.style.transition = '.7s ease-out';
				feed.style.transform = `translateX(${-slideshow.clientWidth * index}px)`;
				scope.init();
			}

			scope.clear = () => {
				clearInterval(scope.rotate);
			}
			console.log(scope);
			scope.init();
		}

		function compile(elem, attrs, transclude){
			// alert(attrs);
			return function(scope, elem, attrs, controller, transcludeFn){
				link(scope, elem, attrs);
				scope.stuff = "asdfasfffffffffffffffffffffffff";
				console.log(scope);
				/**
				 * this function is a post link function.
				 * Dom manipulation and adding listeners to DOM element can be done here.
				 */
			}


		}
		
		return {
			restrict: 'AE',
			scope: {
				feed: "=feed"
			},
			templateUrl: 'slider.html',
			// link: link,
			compile: compile
		}
	});

})()