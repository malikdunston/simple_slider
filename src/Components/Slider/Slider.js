import React, { useState, useEffect } from 'react'
import Controls from './Controls'
import Feed from './Feed'

export default function Slider(props) {
	const [slideIndex, setSlideIndex] = useState(1);
	const [config, setConfig] = useState({
		axis: "X",
		interval: "4000",
		direction: "forward",
		transition: "100ms",
		delay: "1",
		controls: "1",
	});
	const nextSlide = () => {
		if (slideIndex !== props.dataSlider.length) {
			setSlideIndex(slideIndex + 1)
		}
		else if (slideIndex === props.dataSlider.length) {
			setSlideIndex(1)
		}
	}
	const prevSlide = () => {
		if (slideIndex !== 1) {
			setSlideIndex(slideIndex - 1)
		}
		else if (slideIndex === 1) {
			setSlideIndex(props.dataSlider.length)
		}
	}
	const moveDot = index => {
		setSlideIndex(index)
	}
	const updateSettings = props => {
		let settings = {
			css: {
				height: "325px",
				position: "relative",
				overflow: "hidden",
			},
			...Object.assign(config, props)
		}
		setConfig(settings);
	}
	useEffect(() => {
		console.log("useEffect called...");
		updateSettings(props);
	}, [])
	return <div sljs="testing" style={config.css}>
		<Controls moveSlider={{next: nextSlide, prev: prevSlide}}/>
		{/* <Feed slides={props.dataSlider} slideIndex={slideIndex}/> */}
		<div className="container-dots">
			{props.dataSlider.map((obj, index) => (
				<div onClick={() => moveDot(index + 1)}className={slideIndex === index + 1 ? "active" : ""}></div>
			))}
		</div>
	</div>
}