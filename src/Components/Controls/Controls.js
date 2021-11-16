import React from 'react'
import { BtnSlider } from './BtnSlider'
import { Select } from './Select'
export const Controls = ({ text }) => {
	return <div className="slider-controls" >
		{text}
		<BtnSlider></BtnSlider>
		<Select></Select>
	</div>
}
