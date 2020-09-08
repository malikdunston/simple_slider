const eventsWrapper = document.querySelector('body');
const slider = document.querySelector('.slider');

const forward = document.querySelector('.forward');
const backwards = document.querySelector('.backwards');
let order;

function moveup(){
	order = -1;
	eventsWrapper.style.justifyContent = 'flex-start';
	slider.style.transform = 'translate(-20%)';
}

function movedown(){
	if (order === -1) {
		order = 1;
		slider.appendChild(slider.firstElementChild);
	}
	eventsWrapper.style.justifyContent = 'flex-end';
	slider.style.transform = 'translate(20%)';
}

forward.addEventListener('click', function () {
	moveup();
});

backwards.addEventListener('click', function () {
	clearInterval(go);
	movedown();
});

slider.addEventListener('transitionend', function () {
	if (order === 1) {
		slider.prepend(slider.lastElementChild);
	} else {
		slider.appendChild(slider.firstElementChild);
	}
	slider.style.transition = 'none';
	slider.style.transform = 'translate(0)';
	setTimeout(() => {
		slider.style.transition = 'all 0.5s';
	})
}, false);

let go = setInterval(moveup, 3000);