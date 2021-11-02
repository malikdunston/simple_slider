import React, { useState, useEffect, useRef } from 'react'
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
		index: 1
	});
	const move = (to) => {
		setConfig(oldConfig => {
			console.log( "slider:  ", oldConfig.index + "  -->  " + (oldConfig.index + 1) + " / " + (props.slides.length + 1) );
			if(to === "next"){
				return {
					...oldConfig,
					direction: to,
					index: oldConfig.index >= props.slides.length + 1 ? 1 : oldConfig.index + 1
				}
			}else if(to === "prev"){
				return {
					...oldConfig,
					direction: to,
					index: oldConfig.index <= 0 ? props.slides.length : oldConfig.index - 1
				}
			}else if(typeof to === "number"){

			}
		})
	}
	useEffect(() => {
		setConfig(oldConfig=>{
			return {
				...oldConfig,
				clientWidth: slider.current.clientWidth,
				clientHeight: slider.current.clientHeight,
			}
		});
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
		]} index={config.index} config={config} move={move} />}
	</div>
}