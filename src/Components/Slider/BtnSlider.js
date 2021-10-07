import React from "react";

export default function BtnSlider({ direction, moveSlide }) {
	console.log(direction, moveSlide);
	return <button onClick={moveSlide} className={direction === "next" ? "next" : "prev"}>
		btn
	</button>
}