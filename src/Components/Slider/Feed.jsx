import React, { useState, useEffect, useRef } from 'react'
import Slide from './Slide'
export default function Feed({slides, index, config}) {
	const feed = useRef(null)
	// const [css, setCSS] = useState({
	// 	// display: "flex",
	// 	// height: "100%",
	// 	// flexDirection: config.axis === "Y" ? "column" : "row",
	// 	// transition: "none",
	// 	...config.feedCSS
	// });
	useEffect(() => {
		// move();
	}, [ index ])
	// const [ transform, setTransform ] = useState()
	// const move = () => {
	// 	console.log(feed.current.parentNode.clientWidth);
	// // 	if(config.width){
	// // 		feed.current.style.transform = "translateX(" + ( -parseInt(config.width) ) + "px)";
	// // 	}
	// }

	return <div className="slider-feed" style={{
		display: "flex",
		height: "100%",
		flexDirection: config.axis === "Y" ? "column" : "row",
		transform: "translateX(" + ( -config.clientWidth * index ) + "px)",
		transition: index + 1 >= slides.length ? "none" : config.transition + "ms" 
	}} ref={feed}>
		{slides.map((slide, slideIndex) => <Slide key={slideIndex}slide={{...slide, index: slideIndex, axis: config.axis}}/>)}
	</div>
}