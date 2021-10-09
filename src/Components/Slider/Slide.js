import React from 'react'
export default function Slide({slide, config}) {
	return <div className="slide" style={{
		position: "relative",
		[config.axis === "Y" ? "minHeight" : "minWidth"]: "50%"
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
			}}>
			<h2>{slide.content.title}</h2>
			<p>{slide.content.content}</p>
		</div>
	</div>
}