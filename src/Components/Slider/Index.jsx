import React from 'react'
import BtnSlider from './BtnSlider'

export default function Index({moveSlide, data}) {
	const css = {
		background: "red",
		position: "absolute",
		bottom: 0,
		display: "flex"
	}
	return <div className="container-dots" style={css}>
		{data.map((slide, index) => <div>
			<BtnSlider moveSlide={moveSlide} direction={index + 1} slide={slide[index]}/>
		</div>)}
	</div>
}