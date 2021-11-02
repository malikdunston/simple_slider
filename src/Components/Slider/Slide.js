import React from 'react'
export default function Slide({slide}) {
	return <div className="slide" style={{
		position: "relative",
		[slide.axis === "Y" ? "minHeight" : "minWidth"]: "100%"
	}}>
		<img src={process.env.PUBLIC_URL + ( slide.img.split(".")[1] + "." + slide.img.split(".")[2])} 
			style={{
				objectFit:"cover",
				width:"100%",
				height:"100%",
				position:"absolute",
			}}
			alt={slide.content.title}/>
		<div className="slider-content"
			style={{
				bottom:"0",
				width:"100%",
				position:"absolute",
				color: slide.index >= 4 || slide.index <= 0 ? "red" : "blue"
			}}>
			<h2>{slide.content.title}</h2>
			<p>{slide.content.content}</p>
		</div>
	</div>
}