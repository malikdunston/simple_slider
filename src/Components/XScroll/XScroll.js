import React, { useEffect } from 'react'

import { Card } from './Card'
export const XScroll = ({ data, config }) => {
	useEffect(()=>{
		console.log(data);
	}, [])
	return <div className="slider-x-scroll" style={{
		display: "flex",
		height: "100%",
		flexDirection: config.axis === "X" ? "row" : "column",
		transform: config.transform ? config.transform : `translate${ config.axis }(${( -(config.axis === "X" ? config.clientWidth : config.clientHeight) * config.index )}px)`,
		transition: config.transition + "ms",
	}}>
		{data ? data.map((card, i) => <Card key={i} 
			card={{
				...card, 
				axis: config.axis, 
				size:config.size, 
				template: config.template(card, i)
			}} 
			currentIndex={config.index}
			cardIndex={i} />) : "nothing"}
	</div>
}
