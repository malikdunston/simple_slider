import React, { useState, useEffect, useRef } from 'react'
import Slide from './Slide'
import Controls from './Controls'
export default function Slider(props) {
	const slider = useRef(null);
	const [ config, setConfig ] = useState({
		axis: props.axis ? props.axis : "X",
		height: props.height ? props.height + "px" : 300,
		width: props.width ? props.width + "px" : "100%",
		interval: props.interval ? props.interval : 2000,
		direction: props.direction ? props.direction : "next",
		transition: props.transition ? props.transition : 400,
		delay: props.delay ? props.delay : undefined,
		controls: props.controls ? true : false,
		startAt: 1,

	});
	const [ index, setIndex ] = useState(1); 
	useEffect(() => {
	}, [])
	return <div sljs="testing" 
		style={{ 
			height: config.height, 
			width: config.width,
			position: "relative", 
			overflow: "hidden" 
		}} 
		ref={slider}>
		{/* {!config.controls ? "" : <Controls move={move} slides={props.slides}/>} */}
		{!props.slides ? "" : <div className="slider-feed" style={{
			display: "flex",
			height: "100%",
			flexDirection: config.axis === "Y" ? "column" : "row",
			transform: `translate${config.axis}(${  -(config.axis === "Y" ? config.height : config.width) * index}px)`,
			transition: index + 1 >= 4 ? "none" : config.transition + "ms"
		}}>
			{props.slides.map((slide, slideIndex) => <Slide key={slideIndex}slide={{...slide, index: slideIndex, axis: config.axis}}/>)}
		</div>}
	</div>
}