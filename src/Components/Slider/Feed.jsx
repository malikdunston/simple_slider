import React, { useState, useEffect, useRef } from 'react'
import Slide from './Slide'
export default function Feed({slides, index, config, move}) {
	const feed = useRef(null);
	return <div className="slider-feed" style={{
		display: "flex",
		height: "100%",
		flexDirection: config.axis === "Y" ? "column" : "row",
		transform: "translateX(" + ( -config.clientWidth * index ) + "px)",
		transition: (config.direction === "next" && index <= 1) || (config.direction === "prev" && index >= slides.length - 2) ? "none" : config.transition + "ms",
	}} ref={feed}>
		{slides.map((slide, slideIndex) => <Slide key={slideIndex}slide={{...slide, index: slideIndex, axis: config.axis}}/>)}
	</div>
}