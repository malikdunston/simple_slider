import React, { useState, useEffect, useRef } from 'react'
import Slide from './Slide'
export default function Feed({slides, config}) {
	const feed = useRef(null);
	return <div className="slider-feed" style={{
		display: "flex",
		height: "100%",
		flexDirection: config.axis === "X" ? "row" : "column",
		transform: `translate${ config.axis }(${( -(config.axis === "X" ? config.clientWidth : config.clientHeight) * config.index )}px)`,
		transition: (config.direction === "next" && config.index <= 1) || (config.direction === "prev" && config.index >= slides.length - 2) ? "none" : config.transition + "ms",
	}} ref={feed}>
		{slides.map((slide, slideIndex) => <Slide key={slideIndex}slide={{...slide, index: slideIndex, axis: config.axis}}/>)}
	</div>
}