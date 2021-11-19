import React from 'react'
import { BtnSlider } from './BtnSlider'
import { Select } from './Select'
export const Controls = ({ move, data, config }) => {
	return <div className="slider-controls" style={{
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
	}}>
		{config.controls ? <BtnSlider move={()=>{move("prev")}} direction={"prev"} /> : ""}
		{config.controls ? <BtnSlider move={()=>{move("next")}} direction={"next"} /> : ""}
		{config.breadcrumbs === false ? "" : <Select move={move} data={data} config={config} />}
	</div>
}