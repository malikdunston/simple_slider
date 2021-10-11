import React, { useState, useEffect, useRef } from 'react'
	import Controls from './Controls'
	import Feed from './Feed'
export default function Slider(props) {
	const slider = useRef(null);
	const [animInterval, setAnimInterval] = useState(null);
	const [slideIndex, setSlideIndex] = useState(1);
	const [config, setConfig] = useState({
		axis: "X",
		height: 300,
		interval: 2000,
		direction: "next",
		transition: 400,
		delay: undefined,
		controls: false,
	});
	const [data, setData] = useState(props.data.map((slide, index) => {
		return {
			...slide,
			thisSlideIndex: index + 1
		}
	}));	
	const moveSlide = {
		increment: (forBack) => {
			forBack ? forBack = forBack : forBack = config.direction;
			switch (forBack) {
				case "next":
					if (slideIndex >= props.data.length - 1) return;
					setSlideIndex(slideIndex + 1)
					break;
				case "prev":
					if (slideIndex <= 0) return;
					setSlideIndex(slideIndex - 1)
					break;
				default:
					break;
			}
		},
		next: () => {
			if (slideIndex >= 78) return;
			setSlideIndex(slideIndex + 1)
		// handled by loop()...
			// else if (slideIndex >= props.data.length) {
			// 	setSlideIndex(1)
			// }
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
			return {
				feedCSS: feedCSS
			};
		}
	}
	const animSlide = {
		set: () => {
			setAnimInterval(setInterval(()=>{
				moveSlide.next()
			}, config.interval))
		},
		start: () => {
			if(config.delay){
				setTimeout(()=>{
					animSlide.set();
				}, config.delay)
			}else{
				animSlide.set();
			}
		}
	}
	const newConfigFromProps = () => {
		return Object.assign(config, {
			width: slider.current.offsetWidth,
			height: slider.current.offsetHeight,
			...Object.fromEntries(Object.keys(props).map(prop => {
				let tuple = [prop, props[prop]]
				if((props[prop] !== config[prop]) && config[prop]){
					return tuple
				}
			}).filter(e => e !== undefined))
		})
	}
	useEffect(() => {
		setConfig(newConfigFromProps());
		window.addEventListener("resize", ()=>{
			setConfig(newConfigFromProps());
		})
		animSlide.start();
	}, [])
	return <div sljs="testing" style={{
		height: config.height + "px",
		position: "relative",
		overflow: "hidden",
	}} ref={slider}>
		{config.controls ? <Controls moveSlide={moveSlide} slides={data}/> : ""}
		<Feed slides={[data[data.length - 1], ...data, data[0]]} slideIndex={slideIndex} config={config} loop={moveSlide.loop}/>
	</div>
}