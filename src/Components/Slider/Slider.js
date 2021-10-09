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
		css: {
			height: "125px",
			position: "relative",
			overflow: "hidden",
		}
	});
	const moveSlide = {
		next: () => {
			if (slideIndex !== props.dataSlider.length) {
				setSlideIndex(slideIndex + 1)
			}
			else if (slideIndex === props.dataSlider.length) {
				setSlideIndex(1)
			}
		},
		prev: () => {
			if (slideIndex !== 1) {
				setSlideIndex(slideIndex - 1)
			}
			else if (slideIndex === 1) {
				setSlideIndex(props.dataSlider.length)
			}
		},
		select: newIndex => {
			setSlideIndex(newIndex)
		}
	}
	useEffect(() => {
		setConfig(Object.assign(config, props))
	}, [])
	return <div sljs="testing" style={config.css}>
		<Controls moveSlide={moveSlide} slides={props.data}/>
		<Feed slides={props.data} slideIndex={slideIndex}/>
	</div>
}