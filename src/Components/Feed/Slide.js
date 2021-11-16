import React from 'react'
export const Slide = ({ slide, currentIndex, slideIndex }) => {
	return <div className="slide" style={{
		position: "relative",
		[slide.axis === "Y" ? "minHeight" : "minWidth"]: "100%"
	}}>
		{slide.template ? slide.template : "Slide " + slideIndex}	
	</div>
}