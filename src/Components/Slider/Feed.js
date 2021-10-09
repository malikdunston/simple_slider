import React from 'react'

export default function Feed({slides, slideIndex}) {
	const css = {
		display: "flex",
		height: "100%",
		flexDirection: "row",
		// flexDirection: `${this.axis == "Y" ? "column" : "row"};`,
		// transform: `${this.setTransformation()};`
	}
	return <div className="slider-feed" style={css}>
		{slides.map((obj, index) => <div key={obj.id} className={slideIndex === index + 1 ? "active-anim" : ""}>
			<img src={process.env.PUBLIC_URL + `/Imgs/img${index + 1}.jpg`} alt={obj.subTitle}/>
		</div>)}
	</div>
}