import React, { useState, useEffect, useRef } from 'react'
	import Controls from './Controls'
	import Feed from './Feed'
export default function Slider(props) {
	const defHeight = 500;
	const slider = useRef(null);
	const [slideIndex, setSlideIndex] = useState(1);
	const [config, setConfig] = useState({
		axis: "X",
		height: defHeight + "px",
		interval: "4000",
		direction: "forward",
		transition: "100ms",
		delay: "1",
		controls: "1",
		css: {
			height: defHeight + "px",
			position: "relative",
			overflow: "hidden",
		}
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
			width: slider.current.offsetWidth + "px",
			...props
		}));
		window.addEventListener("resize", ()=>{
			setConfig(Object.assign(config, {
				width: slider.current.offsetWidth + "px",
				...props
			}));
		})
	}, [])
	return <div sljs="testing" style={config.css} ref={slider}>
		<Controls moveSlide={moveSlide} slides={props.data}/>
		<Feed slides={props.data} slideIndex={slideIndex} config={config}/>
	</div>
}