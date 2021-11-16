import React from 'react'
import { Controls } from './Components/Controls/Controls';
import { Feed } from './Components/Feed/Feed';
export const Slider = ({ cards, template }) => {
	return <div className={"test"}>
		<Controls />
		<Feed data={cards} template={template}/>
	</div>
}
