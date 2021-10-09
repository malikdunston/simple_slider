import React from "react";

export default function BtnSlider({ direction, moveSlide }) {
	const viewBox = "0 0 100 100";
	const css = {
		pointerEvents: "none",
		width: "2rem",
		height: "2rem",
	}
	const nextBtn = <svg class="next" viewBox={viewBox} style={css}>
		<polyline points="100 0 50 50 100 100" style={css}></polyline>
	</svg>
	const prevBtn = <svg class="prev" viewBox={viewBox} style={css}>
		<polyline points="0 100 50 50 0 0" style={css}></polyline>
	</svg>
	return <button onClick={moveSlide} className={direction === "next" ? "next" : "prev"}>
		{direction === "next" ? nextBtn : prevBtn}
	</button>
}