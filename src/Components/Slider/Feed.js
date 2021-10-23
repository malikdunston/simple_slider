import React, { useState, useEffect } from 'react'
	import Slide from './Slide'
export default function Feed({slides, index, move, config}) {
	const [css, setCSS] = useState({
		display: "flex",
		height: "100%",
		flexDirection: config.axis === "Y" ? "column" : "row",
		transition: config.transition + "ms",
		transform: `translate${config.axis}(${  -(config.axis === "Y" ? config.height : config.width) * index}px)`
	})
	const loop = () => {
		let newTransitionProperty;
		if (index >= slides.length - 1 || index <= 0) newTransitionProperty = "none";
		else newTransitionProperty = config.transition + "ms"
		return newTransitionProperty
	}
	useEffect(() => {
		setCSS(oldCSS => {
			return {
				...oldCSS,
				transform: `translate${config.axis}(${  -(config.axis === "Y" ? config.height : config.width) * index}px)`
			}
		})
	}, [index])
	return <div className="slider-feed" style={css}>
		{slides.map((slide, index) => <Slide key={index}slide={{...slide, index: index, axis: config.axis}}/>)}
	</div>
}