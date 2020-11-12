(function () {

	let app = angular.module("app", ["slider"]);
	app.controller("appCtrl", function () {
		let app = this;
		app.stuff = "hello";
		app.data = [{
				title: "1",
				desc: "blah blah blah blah bro."
			},
			{
				title: "2",
				desc: "blah blah blah blah mate."
			},
			{
				title: "3",
				desc: "blah blah blah blah buddy."
			}
		]
	});

	let slider = angular.module("slider", []);
	slider.directive("slider", function(){

		function compile(elem, attrs, transclude){
			let slideshow = elem[0];
			let feed = slideshow.querySelector('.feed');
			return function(scope, elem, attrs, controller, transcludeFn){
				link(scope, elem, attrs, slideshow, feed);
				slideshow.addEventListener('mouseenter', scope.clear);
				slideshow.addEventListener('mouseleave', scope.init);
				slideshow.addEventListener("resize", scope.set);
				feed.addEventListener('transitionend', () => {
					if (scope.index == scope.allSlides.length - 1) { // end
						console.log("done.");
						scope.index = 1;
						scope.set("loopEnd");
					}
					if (scope.index === 0) {
						console.log("start.");
						scope.index = scope.allSlides.length - 2;
						scope.set("loopBegin");
					}
				});
				scope.init();
			}
		}

		function link(scope, elem, attr, slideshow, feed){
			scope.allSlides = [
				scope.feed[scope.feed.length - 1],
				...scope.feed, 
				scope.feed[0]
			];
			scope.index = 0;
			scope.interval = 1000;
			scope.init = () => {
				scope.up();
				// scope.down();
				rotate = setInterval(() => {
					scope.up();
					// scope.down();
				}, scope.interval);
			};
				scope.up = () => {
					if (scope.index >= scope.allSlides.length - 1) return;
					scope.index++;
					scope.set();
				};
				scope.down = () => {
					if (scope.index <= 0) return;
					scope.index--;
					scope.set();
				};
					scope.set = (loop) => {
						if(loop){
							feed.style.transition = 'none';
						}else{
							feed.style.transition = '.7s ease-out';
						}
						feed.style.transform = `translateX(${-slideshow.clientWidth * scope.index}px)`;
						console.log("on slide " + scope.index);
					}
			scope.clear = () => {
				clearInterval(rotate);
			}
		}
		
		return {
			restrict: 'AE',
			scope: {
				feed: "=feed"
			},
			templateUrl: 'slider.html',
			compile: compile
		}

	});

})()