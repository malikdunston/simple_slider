import React,  { useState, useEffect, useRef } from 'react'
import { Controls } from './Components/Controls/Controls';
import { Feed } from './Components/Feed/Feed';
import { XScroll } from './Components/XScroll/XScroll';
export const Slider = ( props ) => {
	const slider = useRef(null);
	const [ config, setConfig ] = useState({
		axis: props.axis ? props.axis : "X",
		transition: props.transition ? props.transition : 400,
		controls: props.controls ? props.controls : false,
		index: props.cards ? 0 : 1,
		xScroll: props.cards ? true : false,
		size: props.size ? props.size + "%" : "66.66%",
		transform: null,
		template: props.template ? props.template : (itemObj, i) => <div> Slide # {i}</div>,
		breadcrumbs: (item, index) => props.breadcrumbs ? props.breadcrumbs(item, index ) : ""
	});
	const move = (to) => {
		if(props.cards){
			function translate(oldConfig, newIndex) { 
				let sliderSize = oldConfig.axis === "X" ? oldConfig.clientWidth : oldConfig.clientHeight;
				let propsSizeAsNum = oldConfig.size.split("%")[0];
				sliderSize = sliderSize / ( 100 / propsSizeAsNum );
				let increment = sliderSize * -newIndex;
				console.log(newIndex, );
				return `translate${ oldConfig.axis }(${ increment }px)`
			}
			if(to === "next" && config.index < props.cards.length - 1){
				setConfig(oldConfig => {
					return {
						...oldConfig,
						direction: to,
						transform: translate(oldConfig, oldConfig.index + 1),
						index: oldConfig.index + 1
					}
				})
			}else if(to === "prev" && config.index > 0){
				setConfig(oldConfig => {
					return {
						...oldConfig,
						direction: to,
						transform: translate(oldConfig, oldConfig.index - 1),
						index: oldConfig.index - 1
					}
				})
			}else if(typeof to === "number"){
				setConfig(oldConfig => {
					return {
						...oldConfig,
						direction: undefined,
						transform: translate(oldConfig, to),
						index: to
					}
				})
			}
		}else if(props.slides){
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
						index: to + 1
					}
				}
			})
		}
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
	useEffect(() => { resetDom(); window.addEventListener("resize", resetDom) }, [])
	return <div className="slider-js" ref={slider} style={{ position: "relative", overflow: "hidden" }}>
		{config.controls ? <Controls move={move} 
			config={config}
			data={props.cards ? props.cards : props.slides} /> : ""}
		{props.cards ? <XScroll config={config} 
			data={props.cards}/> : "" }
		{props.slides ? <Feed  config={config} 
			data={[ props.slides[ props.slides.length - 1 ], ...props.slides, props.slides[ 0 ] ]}/> : ""}
	</div>
}
