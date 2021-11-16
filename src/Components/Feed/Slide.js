import React from 'react'
export const Slide = ({ axis, template, index }) => {
	return <div className="slide" style={{
		position: "relative",
		[axis === "Y" ? "minHeight" : "minWidth"]: "100%"
	}}>
		{template ? template : "Slide " + index}	
	</div>
}