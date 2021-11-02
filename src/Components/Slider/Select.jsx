import React from 'react'
export default function Select({move, slides}) {
	return <div className="slider-index" style={{
		background: "red",
		position: "absolute",
		bottom: 0,
		display: "flex"
	}}>
		{slides ? slides.map((slide, index) => <div key={index + 1}>
			<div onClick={(e) => {move(index + 1)}}>{index + 1}</div>
		</div>) : ""}
	</div>
}