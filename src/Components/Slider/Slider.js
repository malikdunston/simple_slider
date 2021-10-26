import React, { useState, useEffect, useRef } from 'react'
	import Controls from './Controls'
	import Slide from './Slide'
export default function Slider(props) {
	const slider = useRef(null);
	const [index, setIndex] = useState(1);
	const [config, setConfig] = useState({
		axis: "X",
		height: 300,
		interval: 2000,
		direction: props.direction ? props.direction : "next",
		transition: 400,
		delay: undefined,
		controls: true,
	});
	const configFromProps = () => {
		setConfig(oldConfig => {
			return { 
				...oldConfig, 
				...Object.fromEntries(
					Object.keys(props).map(key => {
						let userAddedProp = [key, props[key]]
						if(  config[key] && ( props[key] !== config[key] )  ){
							return userAddedProp
						}
					}).filter(e => e !== undefined)
				),
				width: slider.current.offsetWidth,
				height: slider.current.offsetHeight
			}
		})
	}
	const anim = {
		move: () => { 
			setIndex(currentIndex => {
				if(config.direction === "next"){
					if(currentIndex >= props.slides.length + 1){ 
						return 1
					}
					else return currentIndex + 1;
				}
				if(config.direction === "prev"){
					if(currentIndex === 0){ 
						return props.slides.length
					}
					else return currentIndex - 1;
				}
			})
		},
		start: () => {
			setTimeout(()=>{
				anim.interval = setInterval(anim.move, config.interval)
			}, config.delay)
		},
		stop: () => { clearInterval(anim.interval); },
	}
	useEffect(() => {
		configFromProps();
		window.addEventListener("resize", configFromProps)
		anim.start();
	}, [])
	return <div sljs="testing" style={{ height: config.height + "px", position: "relative", overflow: "hidden" }} ref={slider}>
		{/* {config.controls ? <Controls move={move} slides={data}/> : ""} */}
		<div className="slider-feed" 
			style={{
				display: "flex",
				height: "100%",
				flexDirection: config.axis === "Y" ? "column" : "row",
				transform: `translate${config.axis}(${  -(config.axis === "Y" ? config.height : config.width) * index}px)`,
				transition: (props.direction === "next" && index === 1) || (props.direction === "prev" && index === props.slides.length) ? "none" : config.transition + "ms"
			}}>
			{[ // slides
				props.slides[props.slides.length - 1],
				...props.slides,
				props.slides[0]
			].map((slide, slideIndex) => <Slide key={slideIndex}slide={{...slide, index: slideIndex, axis: config.axis}}/>)}
		</div>
	</div>
}