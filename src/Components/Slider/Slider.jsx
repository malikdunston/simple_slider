import React, { useState, useEffect, useRef } from 'react'
import Slide from './Slide'
import Controls from './Controls'
import Feed from './Feed';
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
	const move = (to) => {
		if(to === "next"){
			console.log("next");
			setIndex(oldIndex => oldIndex + 1)
		}else if(to === "prev"){
			setIndex(oldIndex => oldIndex - 1)
		}else if(typeof to === "number"){
			setIndex(to);
		}
	}
	useEffect(() => {
		setConfig(oldConfig=>{
			return {
				...oldConfig,
				clientWidth: slider.current.clientWidth,
				clientHeight: slider.current.clientHeight,
			}
		});
		move("next");
	}, [  config.width, config.height  ])
	return <div sljs="testing" style={{ 
		height: config.height, 
		width: config.width,
		position: "relative", 
		overflow: "hidden" 
	}} ref={slider}>
		{!config.controls ? "" : <Controls move={move} slides={props.slides}/>}
		{!props.slides ? "" : <Feed slides={[
			props.slides[ props.slides.length - 1 ],
			...props.slides,
			props.slides[ 0 ]
		]} index={index} config={config} />}
	</div>
}