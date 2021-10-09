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
	const [data, setData] = useState(props.data.map((slide, index) => {
		return {
			...slide,
			thisSlideIndex: index + 1
		}
	}));
	
	const moveSlide = { // 3 slides, on 1
		next: () => {
			if (slideIndex !== props.data.length) { // if 1 !== 3
				setSlideIndex(slideIndex + 1) // move forward... now 2/3
			}
			else if (slideIndex === props.data.length) { // if 1 === 3
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
		},
		loop: () => {
			let feedCSS = {
				transition: "none",
				transform: `translate${config.axis}(${-(config.axis === "Y" ? config.height : config.width) * slideIndex}px)`
			}
			// setSlideIndex([currentIndex, length])
			console.log("animateSlide . loop");
			return {

				feedCSS: feedCSS
			};
		}
	}
	const initialConfig = () => {
		let newConfig = Object.assign(config, {
			width: slider.current.offsetWidth,
			height: slider.current.offsetHeight,
			...props,
		})
		return newConfig
	}
	useEffect(() => {
		setConfig(initialConfig);
		window.addEventListener("resize", ()=>{
			setConfig(initialConfig());
		})
	}, [])
	return <div sljs="testing" style={{
		height: config.height + "px",
		position: "relative",
		overflow: "hidden",
	}} ref={slider}>
		<Controls moveSlide={moveSlide} slides={data}/>
		<Feed slides={[data[data.length - 1], ...data, data[0]]} slideIndex={slideIndex} config={config} onTransitionEnd={(e)=>moveSlide.loop()}/>
	</div>
}