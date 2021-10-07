import React, { useState } from 'react'
import BtnSlider from './BtnSlider'

export default function Slider({dataSlider}) {
	const [slideIndex, setSlideIndex] = useState(1);
	const nextSlide = () => {
		if (slideIndex !== dataSlider.length) {
			setSlideIndex(slideIndex + 1)
		}
		else if (slideIndex === dataSlider.length) {
			setSlideIndex(1)
		}
	}
	const prevSlide = () => {
		if (slideIndex !== 1) {
			setSlideIndex(slideIndex - 1)
		}
		else if (slideIndex === 1) {
			setSlideIndex(dataSlider.length)
		}
	}
	const moveDot = index => {
		setSlideIndex(index)
	}
	return <div className="container-slider">
		{dataSlider.map((obj, index) => (<div key={obj.id} className={slideIndex === index + 1 ? "active-anim" : ""}>
			<img src={process.env.PUBLIC_URL + `/Imgs/img${index + 1}.jpg`} alt={obj.subTitle}/>
		</div>))}
		<BtnSlider moveSlide={nextSlide} direction={"next"} />
		<BtnSlider moveSlide={prevSlide} direction={"prev"} />
		<div className="container-dots">
			{dataSlider.map((obj, index) => (
				<div onClick={() => moveDot(index + 1)}className={slideIndex === index + 1 ? "active" : ""}></div>
			))}
		</div>
	</div>
}