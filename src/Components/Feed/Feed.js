import React, { useEffect } from 'react'
import { Slide } from './Slide'
export const Feed = ({ data, config }) => {
	useEffect(()=>{
		console.log(data);
	}, [])
	return <div className="slider-feed" style={{
		display: "flex",
		height: "100%",
		flexDirection: config.axis === "X" ? "row" : "column",
		transform: `translate${ config.axis }(${( -(config.axis === "X" ? config.clientWidth : config.clientHeight) * config.index )}px)`,
		transition: (config.direction === "next" && config.index <= 1) || (config.direction === "prev" && config.index >= data.length - 2) ? "none" : config.transition + "ms",
	}}>
		{data ? data.map((slide, i) => <Slide key={i} 
			slide={{
				...slide, 
				axis: config.axis,
				template: config.template(slide, i)
			}}
			currentIndex={config.index}
			slideIndex={i}/>) : "nothing"}
	</div>
}
