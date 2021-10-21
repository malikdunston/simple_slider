import React, { useState, useEffect, useRef } from 'react'
	import Controls from './Controls'
	import Feed from './Feed'
export default function Slider(props) {
	const slider = useRef(null);
	const [index, setIndex] = useState(0);
	const [config, setConfig] = useState({
		axis: "X",
		height: 300,
		interval: 2000,
		direction: "next",
		transition: 400,
		delay: undefined,
		controls: false,
	});
	const [slides, setSlides] = useState([
		props.slides[props.slides.length - 1],
		...props.slides,
		props.slides[0]
	]);
	const move = (index, direction) => {
		console.log(index);
		let newIndex = index;
		if (typeof direction == "number") newIndex = direction;
		if(direction === "next" || direction === undefined) newIndex = index + 1;
		if (direction === "prev") newIndex = index -1;
		setIndex(newIndex);
		return newIndex;
	};
	const reset = () => {
		anim.stop();

		anim.start();
	}
	const anim = {
		start: () => {
			setTimeout(()=>{
				anim.interval = setInterval(move, config.interval)
			}, config.delay)
		},
		stop: () => {
			clearInterval(anim.interval);
		}
	}
	const newConfigFromProps = () => {
	// lets try to use this in config/setConfig... and just
	// add event listener to root elem on mount...
		let newConfig = Object.assign(config, {
			width: slider.current.offsetWidth,
			height: slider.current.offsetHeight,
			...Object.fromEntries(Object.keys(props).map(prop => {
				let tuple = [prop, props[prop]]
				if((props[prop] !== config[prop]) && config[prop]){
					return tuple
				}
			}).filter(e => e !== undefined))
		})
		setConfig(oldConfig => { return {
			...oldConfig,
			newConfig
		}})
	}
	useEffect(() => {
		newConfigFromProps();
		window.addEventListener("resize", newConfigFromProps)
		reset();
	}, [])
	return <div sljs="testing" style={{
		height: config.height + "px",
		position: "relative",
		overflow: "hidden",
	}} ref={slider}>
		{/* {config.controls ? <Controls move={move} slides={data}/> : ""} */}
		<Feed slides={slides} 
			index={index} 
			move={move}
			config={config}/>
	</div>
}