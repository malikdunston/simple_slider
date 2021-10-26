import React, { useState, useEffect, useRef } from 'react'
	import Controls from './Controls'
	import Feed from './Feed'
	import Slide from './Slide'
export default function Slider(props) {
	const slider = useRef(null);
	const [index, setIndex] = useState(1);
	const [config, setConfig] = useState({ // defaults
		axis: "X",
		height: 300,
		interval: 2000,
		direction: "next",
		transition: 400,
		delay: undefined,
		controls: false,
		startAt: 1,
	});
	const [feedCSS, setFeedCSS] = useState({
		display: "flex",
		height: "100%",
		flexDirection: props.axis === "Y" ? "column" : "row",
		translate: `translate${config.axis}(${  -(config.axis === "Y" ? config.height : config.width) * index}px)`
	})
	const [slides, setSlides] = useState([ // this.data...
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
	const move = () => { // increment...
	// make to sure to include config.direction
	// as a number...
		setIndex(currentIndex => {
			if(config.direction === "next"){
				if(currentIndex >= slides.length - 1){ 
					return 1
				}
				else return currentIndex + 1;
			}
		// don't worry about this rn.
			if(config.direction === "prev"){
				if(currentIndex <= 1)  return slides.length - 1;
				else return currentIndex - 1;
			}
		})
	// stuff from Feed.js...
		setConfig(oldConfig => {
			if(oldConfig.direction === "next" && index === 1){ 
				return {
					...oldConfig,
					feedCSS: {
						...oldConfig.feedCSS,
						transition: "none",
						transform: anim.transformFeed(index)
					}
				}
			}else return {
				...oldConfig,
				feedCSS: {
					...oldConfig.feedCSS,
					transition: oldConfig.transition + "ms",
					transform: anim.transformFeed(index)
				}
			}
		})

	}
	const checkLoop = () => {
		console.log("checking for loop...");
		let origTransition = config.transition;
		if(index === slides.length - 1 || index === 0){
			config.transition = 0;
			if (index === slides.length - 1) {
				console.log("end of loop");
			};
			if (index === 0) {
				console.log("beginning of loop");
			};
		} else config.transition = origTransition;
	}
	const anim = {
		transformFeed: (index) => {
			// if(index === slides.length - 1){
			// 	config.transition = 0
			// 	console.log(index, "the end");
			// };
			let translate = `translate${config.axis}(${  -(config.axis === "Y" ? config.height : config.width) * index}px)`;
			console.log(translate);
			return translate;
		},
		start: () => {
			setTimeout(()=>{
				anim.interval = setInterval(move, config.interval)
			}, config.delay)
		},
		stop: () => { clearInterval(anim.interval); },
		// reset: () => {
		// }
	}
	const reset = () => {
		anim.stop();
		checkLoop();
		console.log(index);


		anim.start();
	}
	useEffect(() => {
		setUserProps();
		window.addEventListener("resize", setUserProps)
		const feed = slider.current.querySelector(".slider-feed");
	// won't be needing this...
		feed.style.transform = anim.transformFeed(config.startAt);
		anim.start();
	}, [])
	return <div sljs="testing" style={{
		height: config.height + "px",
		position: "relative",
		overflow: "hidden",
	}} ref={slider}>
		{/* {config.controls ? <Controls move={move} slides={data}/> : ""} */}
		{/* <Feed slides={slides} index={index} config={{...config, feedCSS: feedCSS}}/> */}
		<div className="slider-feed" style={{
			display: "flex",
			height: "100%",
			flexDirection: props.axis === "Y" ? "column" : "row",
			transform: `translate${config.axis}(${  -(config.axis === "Y" ? config.height : config.width) * index}px)`,
			transition: config.transition + "ms" 
		}}>
			{slides.map((slide, index) => <Slide key={index}slide={{...slide, index: index, axis: config.axis}}/>)}
		</div>
	</div>
}