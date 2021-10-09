import React from 'react'
	import Slide from './Slide'
export default function Feed({slides, slideIndex, config}) {
	const setTransformation = () => {
		return `translate${config.axis}(${-(config.axis === "Y" ? config.height : config.width) * slideIndex}px)`
	}
	const css = {
		display: "flex",
		height: "100%",
		color: "blue",
		flexDirection: `${config.axis === "Y" ? "column" : "row"};`,
		transform: setTransformation()
	}
	return <div className="slider-feed" style={css}>
		{slides.map((slide, index) => <Slide slide={slide} config={config}/>)}
	</div>
}