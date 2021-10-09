import React from 'react'
	import Slide from './Slide'
export default function Feed({slides, slideIndex, config}) {
	return <div className="slider-feed" style={{
		display: "flex",
		height: "100%",
		color: "blue",
		flexDirection: config.axis === "Y" ? "column" : "row",
		transform: `translate${config.axis}(${-(config.axis === "Y" ? config.height : config.width) * slideIndex}px)`
	}}>
		{slides.map((slide, key) => <Slide key={key + "-" + slide.thisSlideIndex} slide={{...slide, feedOrder: key}} config={config}/>)}
	</div>
}