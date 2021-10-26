import React, { useState, useEffect, useRef } from 'react'
import Slide from './Slide'
import Controls from './Controls'
export default function Slider(props) {
	const slider = useRef(null);
	const [config, setConfig] = useState({
		axis: "X",
		height: 300,
		interval: 2000,
		direction: props.direction ? props.direction : "next",
		transition: 400,
		delay: undefined,
		controls: true,
		index: 1
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
	const [move, setMove] = useState({
		next: () => { 
			setConfig(oldConfig => {
				return {
					...oldConfig,
					index: oldConfig.index >= props.slides.length + 1 ? 1 : oldConfig.index + 1
				}
			})
		},
		prev: () => { 
			setConfig(oldConfig => {
				return {
					...oldConfig,
					index: oldConfig.index === 0 ? props.slides.length : oldConfig.index - 1
				}
			})
		}
	})
	const [anim, setAnim] = useState({
		start: () => {
			anim.stop();
			setTimeout(()=>{
				anim.interval = setInterval(move[ config.direction ], config.interval)
			}, config.delay)
		},
		stop: () => { clearInterval(anim.interval); },
	})
	useEffect(() => {
		configFromProps();
		window.addEventListener("resize", configFromProps);
		slider.current.addEventListener("mouseenter", (e) => {
			anim.stop();
		})
		slider.current.addEventListener("mouseleave", (ev) => {
			anim.start();
		})
		anim.start();
	}, [])
	return <div sljs="testing" style={{ height: config.height + "px", position: "relative", overflow: "hidden" }} ref={slider}>
		{!config.controls ? "" : <Controls 
			move={move} 
			slides={props.slides}/>}
		<div className="slider-feed" 
			style={{
				display: "flex",
				height: "100%",
				flexDirection: config.axis === "Y" ? "column" : "row",
				transform: `translate${config.axis}(${  -(config.axis === "Y" ? config.height : config.width) * config.index}px)`,
				transition: (props.direction === "next" && config.index === 1) || (props.direction === "prev" && config.index === props.slides.length) ? "none" : config.transition + "ms"
			}}>
			{[ // slides
				props.slides[props.slides.length - 1],
				...props.slides,
				props.slides[0]
			].map((slide, slideIndex) => <Slide key={slideIndex}slide={{...slide, index: slideIndex, axis: config.axis}}/>)}
		</div>
	</div>
}