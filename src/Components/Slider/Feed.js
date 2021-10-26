import React, { useState, useEffect } from 'react'
	import Slide from './Slide'
export default function Feed({slides, index, config, transformFeed}) {
	// const [css, setCSS] = useState({
	// 	// display: "flex",
	// 	// height: "100%",
	// 	// flexDirection: config.axis === "Y" ? "column" : "row",
	// 	// transition: "none",
	// 	...config.feedCSS
	// });
	// useEffect(() => {
		// if(config.direction === "next" && index === 1){ 
		// 	setCSS(oldCSS => { return {...oldCSS, transition: "none", transform: transformFeed(index)}})
		// }else setCSS(oldCSS => { return {...oldCSS, transition: config.transition + "ms", transform: transformFeed(index)}})
	// }, [index])
	return <div className="slider-feed" style={config.feedCSS}>
		{slides.map((slide, index) => <Slide key={index}slide={{...slide, index: index, axis: config.axis}}/>)}
	</div>
}