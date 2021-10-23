import React, { useState, useEffect } from 'react'
	import Slide from './Slide'
export default function Feed({slides, index, config, transformFeed}) {
	const [css, setCSS] = useState({
		display: "flex",
		height: "100%",
		flexDirection: config.axis === "Y" ? "column" : "row",
	});
	useEffect(() => { // this is loop()
		// if(index === slides.length - 1){
		// 	transition = "none";
		// }
		setCSS(oldCSS => {
			return {
				...oldCSS,
				transition: (index === slides.length - 1 || index === 0) ? "none" : config.transition + "ms",
				transform: transformFeed(index)
			}
		})
	}, [index])
	return <div className="slider-feed" style={css}>
		{slides.map((slide, index) => <Slide key={index}slide={{...slide, index: index, axis: config.axis}}/>)}
	</div>
}