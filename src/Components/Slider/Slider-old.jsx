// import React, { useState, useEffect, useRef } from 'react'
// import Slide from './Slide'
// import Controls from './Controls'
// export default function Slider(props) {
// 	const slider = useRef(null);
// 	const [ config, setConfig ] = useState({
		// axis: props.axis ? props.axis : "X",
		// height: props.height ? props.height + "px" : 300,
		// width: props.width ? props.width + "px" : "100%",
		// interval: props.interval ? props.interval : 2000,
		// direction: props.direction ? props.direction : "next",
		// transition: props.transition ? props.transition : 400,
		// delay: props.delay ? props.delay : undefined,
		// controls: props.controls ? true : false,
		// startAt: 1,
	// });
	// const [ index, setIndex ] = useState(1); 
	// const [ feed, setFeed ] = useState([
	// 	props.slides[props.slides.length - 1],
	// 	...props.slides,
	// 	props.slides[0]
	// ])
	// const [ transitionProp, setTransitionProp ] = useState("none")
	const [ move, setMove ] = useState({
		// params: {
		// 	nextIndex: oldIndex - 1,
		// 	loopCond: oldIndex <= 0, // if oldIndex is 0...
		// 	nextToLastSlide: oldIndex <= 1, // if oldIndex is 1...
		// 	loopAt: feed.length - 2 // 3
		// },
		next: () => { 
			setIndex(oldIndex => {
				let params = {
					nextIndex: oldIndex + 1,
					loopCond: oldIndex >= feed.length - 1, // if oldIndex is 4...
					nextToLastSlide: oldIndex >= feed.length - 2, // if oldIndex is 3...
					loopAt: 1, // 1 from 4
				}
				setTransitionProp(oldTransitionProp => {
					console.log(oldIndex, params.nextIndex, config.interval);
					if( params.loopCond ){
						return "none"; 
					}else return config.transition + "ms"
				})
				return params.loopCond ? params.loopAt : params.nextIndex
			})
		},
		transitionEnd: (e) => {
			setIndex(oldIndex => {
				if(config.direction === "next" && oldIndex === 3){ // so next to last....
					console.log(e)
				}
			})
			anim.start();
		}
	})
	const [ anim, setAnim ] = useState({
		cycle: null,
		start: () => {
			if(anim.cycle){ anim.stop(); }
			// if (interval){
				setTimeout(()=>{
					move.next()
				}, config.interval)
			// } else anim.cycle = setInterval(
				// move[ config.direction ],
				// config.delay
			// )
		},
		stop: () => { clearInterval(anim.cycle); }
	})
	// const configFromProps = () => {
	// 	setConfig(oldConfig => {
	// 		return { 
	// 			...oldConfig, 
	// 			...Object.fromEntries(
	// 				Object.keys(props).map(key => {
	// 					return   config[key] && ( props[key] !== config[key] )  ?  [key, props[key]]  :  undefined
	// 				}).filter(e => e !== undefined)
	// 			),
	// 			width: slider.current.offsetWidth,
	// 			height: slider.current.offsetHeight
	// 		}
	// 	})
	// }
	useEffect(() => {
		// configFromProps();
		// window.addEventListener("resize", configFromProps);
		// slider.current.addEventListener("mouseenter", (e) => {
		// 	anim.stop();
		// })
		// slider.current.addEventListener("mouseleave", (ev) => {
		// 	anim.start();
		// })
		// slider.current.querySelector(".slider-feed").addEventListener("transitionend", (e)=>{
		// 	move.transitionEnd(e)
		// });
		anim.start();
	}, [])
	return <div sljs="testing" 
		// style={{ 
		// 	height: config.height, 
		// 	width: config.width,
		// 	position: "relative", 
		// 	overflow: "hidden" 
		// }} 
		// ref={slider}>
		// {!config.controls ? "" : <Controls move={move} slides={props.slides}/>}
		// {!feed ? "" : <div className="slider-feed" 
		// 	style={{
		// 		display: "flex",
		// 		height: "100%",
		// 		flexDirection: config.axis === "Y" ? "column" : "row",
		// 		transform: `translate${config.axis}(${  -(config.axis === "Y" ? config.height : config.width) * index}px)`,
		// 		transition: transitionProp
		// 	}}>
		// 	{feed.map((slide, slideIndex) => <Slide key={slideIndex}slide={{...slide, index: slideIndex, axis: config.axis}}/>)}
		// </div>}
	</div>
}