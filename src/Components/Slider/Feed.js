import React, { useState, useEffect, useRef } from 'react'
	import Slide from './Slide'
export default function Feed({slides, slideIndex, config}) {
	const setTransformation = () => {
		return `translate${config.axis}(${-(config.axis === "Y" ? config.height : config.width) * slideIndex}px)`
	}
	const css = {
		display: "flex",
		height: "100%",
		color: "blue",
	}
	if (config.axis === "Y"){
		css.flexDirection = "column"
	}else if (config.axis === "X"){
		css.flexDirection = "row"
	}
	css.transform = setTransformation();
	console.log(config);
	useEffect(() => {
	}, [])
	return <div className="slider-feed" style={css}>
		{slides.map((slide, index) => <Slide slide={slide} config={config}/>)}
	</div>
}