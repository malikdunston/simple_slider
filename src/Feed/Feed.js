import React from 'react';
import Slide from './Slide'
export const Feed = ({ slides, config }) => {
	return <div className="slider-feed" style={{
		display: "flex",
		height: "100%",
		flexDirection: config.axis === "X" ? "row" : "column",
		transform: `translate${ config.axis }(${( -(config.axis === "X" ? config.clientWidth : config.clientHeight) * config.index )}px)`,
		transition: (config.direction === "next" && config.index <= 1) || (config.direction === "prev" && config.index >= slides.length - 2) ? "none" : config.transition + "ms",
	}}>
		{slides.map((slide, i) => <Slide key={i}
			slide={{
				...slide, 
				index: i, 
				axis: config.axis,
				template: config.template(slide, i)
			}}/>
		)}
	</div>
}
