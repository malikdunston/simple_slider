import React from 'react'
import BtnSlider from './BtnSlider'

export default function Controls({moveSlider}) {
	const css = {
		fill: "none",
		stroke: "white",
		strokeMiterlimit: "10",
		strokeWidth: "10px",
		position: "absolute",
		zIndex: "500",
		width: "100%",
		height: "100%",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between"
	}
	return <div className="slider-controls" style={css}>
		<BtnSlider moveSlide={moveSlider.next} direction={"next"} />
		<BtnSlider moveSlide={moveSlider.prev} direction={"prev"} />
	</div>
}