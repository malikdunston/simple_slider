import React, { useState } from 'react'
	import Slide from './Slide'
export default function Feed({slides, index, move, config}) {
	const [css, setCSS] = useState({
		display: "flex",
		height: "100%",
		flexDirection: config.axis === "Y" ? "column" : "row",
		transition: config.transition + "ms",
		transform: `translate${config.axis}(${  -(config.axis === "Y" ? config.height : config.width) * index}px)`
	})
	const toggleTransitionProperty = () => {
		let newTransitionProperty;
		// console.log(index, feedCSS);
	// if at end of cycle?
		if (index >= slides.length - 1 || index <= 0) {
			newTransitionProperty = "none"
		} else newTransitionProperty = config.transition + "ms"

		console.log(index, newTransitionProperty);

		return newTransitionProperty



	// add/remove transform prop
	// based on end of cycle...
		// let feedCSS = {
		// 	transition: "none",
		// 	// transition: config.transition,
		// 	// transform: `translate${config.axis}(${-(config.axis === "Y" ? config.height : config.width) * index}px)`
		// }
		// return {
		// 	feedCSS: feedCSS
		// };
	}
	// useEffect(() => {
	// 	console.log(index)
	// 	setCSS(prevCSS => {return {
	// 		...prevCSS,
	// 		transition: toggleTransitionProperty()
	// 	}});
	// 	// move();
	// 	// console.log(index);
	// }, [index])
	return <div className="slider-feed" style={css}>
		{slides.map((slide, index) => <Slide key={index}
			slide={{...slide, index: index, axis: config.axis}}/>)}
	</div>
}