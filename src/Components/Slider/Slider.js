import React, { useState, useEffect, useRef } from 'react'
import Slide from './Slide'
import Controls from './Controls'
export default function Slider(props) {
	const slider = useRef(null);
	const [ config, setConfig ] = useState({
		axis: "X",
		height: 300,
		interval: 2000,
		direction: props.direction ? props.direction : "next",
		transition: 400,
		delay: undefined,
		controls: true,
		startAt: 1,
	});
// Very important. We are using mid-level user's "i" value (0-4)
	// end-user: 1, 2, 3
	// mid-user: 4, 1, 2, 3, 1
	// pro-user: 0, 1, 2, 3, 4  <-----
	const [ index, setIndex ] = useState(1); 
	const [ slideData, setSlideData ] = useState({
		slides: props.slides,
		feed: [
			props.slides[props.slides.length - 1],
			...props.slides,
			props.slides[0]
		]
	})
	const configFromProps = () => {
		setConfig(oldConfig => {
			return { 
				...oldConfig, 
				...Object.fromEntries(
					Object.keys(props).map(key => {
						return   config[key] && ( props[key] !== config[key] )  ?  [key, props[key]]  :  undefined
					}).filter(e => e !== undefined)
				),
				width: slider.current.offsetWidth,
				height: slider.current.offsetHeight
			}
		})
	}
	const [move, setMove] = useState({
		next: () => { 
			move.to("next");
		},
		prev: () => { 
		},
		to: ( newDirection ) => {
			if( newDirection === "next" || newDirection === "prev" ){
				setIndex(oldIndex => {
					anim.loop(oldIndex);
					console.log(oldIndex + " to " + (oldIndex + 1));
					return oldIndex >= slideData.feed.length - 1 ? 1 : oldIndex + 1
				})
			}
		}
	})
	const [ transitionProp, setTransitionProp ] = useState("none")
	const [ anim, setAnim ] = useState({
		start: () => {
			anim.stop();
			setTimeout(()=>{
				anim.interval = setInterval(move[ config.direction ], config.interval)
			}, config.delay)
		},
		stop: () => { clearInterval(anim.interval); },
		loop: (index) => {
			setTransitionProp(oldTransitionProp => {
				return (config.direction === "next" && index >= slideData.feed.length-1)
					|| (config.direction === "prev" && index <= 0) 
						? "none" 
						: config.transition + "ms"
			})
		}
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
		{!config.controls ? "" : <Controls move={move} slides={slideData.slides}/>}
		{!slideData.feed ? "" : <div className="slider-feed" 
			style={{
				display: "flex",
				height: "100%",
				flexDirection: config.axis === "Y" ? "column" : "row",
				transform: `translate${config.axis}(${  -(config.axis === "Y" ? config.height : config.width) * index}px)`,
				transition: transitionProp
			}}>
			{slideData.feed.map((slide, slideIndex) => <Slide key={slideIndex}slide={{...slide, index: slideIndex, axis: config.axis}}/>)}
		</div>}
	</div>
}