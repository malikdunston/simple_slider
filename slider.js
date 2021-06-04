const slideshow = document.querySelector('.slideshow');
const feed = slideshow.querySelector('.feed');
const forward = slideshow.querySelector('.forward');
const backward = slideshow.querySelector('.backward');
const interval = 3000;

let slides = document.querySelectorAll('.slide');
let index = 1;
let slideId;

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
