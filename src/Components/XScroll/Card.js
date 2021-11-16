import React from 'react'
export const Card = ({ card, currentIndex, cardIndex  }) => {
	return <div className={ "card" + (cardIndex === currentIndex ? " selected" : "") }style={{
		[card.axis === "Y" ? "minHeight" : "minWidth"]: card.size,
		[card.axis === "Y" ? "minWidth" : "minHeight"]: "100%"
	}} >
		{card.template ? card.template : "Slide #" + cardIndex}	
	</div>
}
