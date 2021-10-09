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
		console.log("next");
		if (slideIndex !== props.dataSlider.length) {
			setSlideIndex(slideIndex + 1)
		}
		else if (slideIndex === props.dataSlider.length) {
			setSlideIndex(1)
		}
	}
	const prevSlide = () => {
		console.log("prev");
		if (slideIndex !== 1) {
			setSlideIndex(slideIndex - 1)
		}
		else if (slideIndex === 1) {
			setSlideIndex(props.dataSlider.length)
		}
	}
	const moveDot = index => {
		console.log("indexSlide");
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
		<Controls moveSlider={{next: nextSlide, prev: prevSlide, index: moveDot}} data={config.dataSlider}/>
		{/* <Feed slides={props.dataSlider} slideIndex={slideIndex}/> */}
	</div>
}