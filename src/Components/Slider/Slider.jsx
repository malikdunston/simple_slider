import React, { useState, useEffect, useRef } from 'react'
import Controls from './Controls'
import Feed from './Feed';
export default function Slider(props) {
	const slider = useRef(null);
	const [ config, setConfig ] = useState({
		axis: props.axis ? props.axis : "X",
		height: props.height ? props.height + "px" : 300,
		width: props.width ? props.width + "px" : "100%",
		transition: props.transition ? props.transition : 400,
		controls: props.controls ? props.controls : ["arrows"],
		index: props.startAt ? props.startAt : 1
	});
	const move = (to) => {
		setConfig(oldConfig => {
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
				return {
					...oldConfig,
					direction: undefined,
					index: oldConfig.index <= 0 ? props.slides.length : oldConfig.index - 1
				}
			}
		})
	}
	const resetDom = () => {
		setConfig(oldConfig=>{
			return {
				...oldConfig,
				clientWidth: slider.current.clientWidth,
				clientHeight: slider.current.clientHeight,
			}
		});
	};
	useEffect(() => { window.addEventListener("resize", resetDom) }, [])
	useEffect( resetDom, [ config.width, config.height ])
	return <div sljs=""  ref={slider} style={{ height: config.height, width: config.width,position: "relative", overflow: "hidden" }}>
		{!config.controls ? "" : <Controls move={move} slides={props.slides}/>}
		{!props.slides ? "" : <Feed  config={config} slides={[ props.slides[ props.slides.length - 1 ], ...props.slides, props.slides[ 0 ] ]}/>}
	</div>
}