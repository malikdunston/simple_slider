import React, { useState, useEffect, useRef } from 'react'
import Slide from './Slide'
import Controls from './Controls'
export default function Slider(props) {
	const slider = useRef(null);
	const [ index, setIndex ] = useState(1); 
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
	const [ feed, setFeed ] = useState([
		props.slides[props.slides.length - 1],
		...props.slides,
		props.slides[0]
	])
	const [ transitionProp, setTransitionProp ] = useState("none")
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
					return oldIndex >= feed.length - 1 ? 1 : oldIndex + 1
				})
			}
		}
	})
	const [ anim, setAnim ] = useState({
		start: () => {
			anim.stop();
			setTimeout(()=>{
				anim.interval = setInterval( move[ config.direction ], config.interval )
			}, config.delay)
		},
		stop: () => { clearInterval(anim.interval); },
		loop: (index) => {
		}
	})
	useEffect(() => {
		setTransitionProp(oldTransitionProp => {
			console.log(index, feed.length - 1);

			if ( config.direction === "next" && index > 0 && index < feed.length ) {
				return config.transition + "ms"
			}else return "none"

			return (config.direction === "next" && index >= feed.length-1)
				|| (config.direction === "prev" && index <= 0) 
					? "none" 
					: config.transition + "ms"
		})
	}, [ index ])
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
		{!config.controls ? "" : <Controls move={move} slides={props.slides}/>}
		{!feed ? "" : <div className="slider-feed" 
			style={{
				display: "flex",
				height: "100%",
				flexDirection: config.axis === "Y" ? "column" : "row",
				transform: `translate${config.axis}(${  -(config.axis === "Y" ? config.height : config.width) * index}px)`,
				transition: transitionProp
			}}>
			{feed.map((slide, slideIndex) => <Slide key={slideIndex}slide={{...slide, index: slideIndex, axis: config.axis}}/>)}
		</div>}
	</div>
}