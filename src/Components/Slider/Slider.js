import React, { useState, useEffect, useRef } from 'react'
	import Controls from './Controls'
	import Feed from './Feed'
export default function Slider(props) {
	const slider = useRef(null);
	const [slideIndex, setSlideIndex] = useState(1);
	const [config, setConfig] = useState({
		axis: "X",
		height: 300,
		interval: 4000,
		direction: "forward",
		transition: 100,
		delay: 1,
		controls: true,
	});
	const moveSlide = {
		next: () => {
			if (slideIndex !== props.data.length) {
				setSlideIndex(slideIndex + 1)
			}
			else if (slideIndex === props.data.length) {
				setSlideIndex(1)
			}
		},
		prev: () => {
			if (slideIndex !== 1) {
				setSlideIndex(slideIndex - 1)
			}
			else if (slideIndex === 1) {
				setSlideIndex(props.data.length)
			}
		},
		select: newIndex => {
			setSlideIndex(newIndex)
		}
	}
	useEffect(() => {
		setConfig(Object.assign(config, {
			width: slider.current.offsetWidth,
			height: slider.current.offsetHeight,
			...props
		}));
		window.addEventListener("resize", ()=>{
			setConfig(Object.assign(config, {
				width: slider.current.offsetWidth,
				height: slider.current.offsetHeight,
				...props
			}));
		})
	}, [])
	return <div sljs="testing" style={{
		height: config.height + "px",
		position: "relative",
		overflow: "hidden",
	}} ref={slider}>
		<Controls moveSlide={moveSlide} slides={props.data}/>
		<Feed slides={props.data} slideIndex={slideIndex} config={config}/>
	</div>
}