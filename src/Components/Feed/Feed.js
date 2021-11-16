import React from 'react'
import { Slide } from './Slide'
export const Feed = ({ data, template }) => {
	return <div className="slider-feed" >
		{typeof data === "object" ? data.map((p, i) => <Slide key={i} stuff={p} index={i} template={template(p, i)}/>) : data}
	</div>
}
