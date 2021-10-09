import React from 'react'
export default function Index({moveSlide, slides}) {
	const css = {
		background: "red",
		position: "absolute",
		bottom: 0,
		display: "flex"
	}
	return <div className="slider-index" style={css}>
		{slides ? slides.map((slide, index) => <div>
			<div onClick={(e) => {moveSlide(index + 1)}}>{index + 1}</div>
		</div>) : ""}
	</div>
}