import React, { useState, useEffect, useRef } from 'react'
	import Controls from './Controls'
	import Feed from './Feed'
export default function Slider(props) {
	const slider = useRef(null);
	const [index, setIndex] = useState(0);
	const [config, setConfig] = useState({ // defaults
		axis: "X",
		height: 300,
		interval: 2000,
		direction: "next",
		transition: 400,
		delay: undefined,
		controls: false,
		offset: 1
	});
	const [slides, setSlides] = useState([
		props.slides[props.slides.length - 1],
		...props.slides,
		props.slides[0]
	]);
	const setUserProps = () => {
		let newConfig = Object.assign(config, {
			width: slider.current.offsetWidth,
			height: slider.current.offsetHeight,
			...Object.fromEntries(Object.keys(props).map(prop => {
				let userAddedProp = [prop, props[prop]]
				if((props[prop] !== config[prop]) && config[prop]){
					return userAddedProp
				}
			}).filter(e => e !== undefined))
		})
		setConfig(oldConfig => {
			return { ...oldConfig, ...newConfig }
		})
	}
	const move = () => {
		setIndex(currentIndex => {
			if(config.direction === "next"){
				if(currentIndex >= slides.length - 1) return 1
				else return currentIndex + 1;
			}
			if(config.direction === "prev"){
				if(currentIndex <= 1) return slides.length - 1;
				else return currentIndex - 1;
			}
		})
	}
	const anim = {
		transformFeed: (slideLength) => {
			return `translate${config.axis}(${  -(config.axis === "Y" ? config.height : config.width) * slideLength}px)`
		},
		start: () => {
			setTimeout(()=>{
				anim.interval = setInterval(move, config.interval)
			}, config.delay)
		},
		stop: () => { clearInterval(anim.interval); }
	}
	useEffect(() => {
		setUserProps();
		window.addEventListener("resize", setUserProps)

	// initial transformation...
		let feed = slider.current.querySelector(".slider-feed");
		feed.style.transform = anim.transformFeed(config.offset);

		anim.start();
	}, [])
	return <div sljs="testing" style={{
		height: config.height + "px",
		position: "relative",
		overflow: "hidden",
	}} ref={slider}>
		{/* {config.controls ? <Controls move={move} slides={data}/> : ""} */}
		<Feed slides={slides} index={index} config={config} transformFeed={anim.transformFeed}/>
	</div>
}