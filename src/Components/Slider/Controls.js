import React from 'react'
	import BtnSlider from './BtnSlider'
	// import Select from './Select'
export default function Controls({move, slides}) {
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
		<BtnSlider move={move.prev} direction={"prev"} />
		<BtnSlider move={move.next} direction={"next"} />
		{/* <Select move={move.select} slides={slides}/> */}
	</div>
}