import React from 'react'
import BtnSlider from './BtnSlider'
import Index from './Index'

export default function Controls({moveSlider, data}) {
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
		<BtnSlider moveSlide={moveSlider.prev} direction={"prev"} />
		<BtnSlider moveSlide={moveSlider.next} direction={"next"} />
		<Index moveSlide={moveSlider.index} data={data}/>
	</div>
}