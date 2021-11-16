import React from 'react'
export const Card = ({ card, currentIndex, cardIndex  }) => {
	return <div className={ "card" + (cardIndex === currentIndex ? " selected" : "") }style={{
		[card.axis === "Y" ? "min-height" : "min-width"]: card.cardSize,
		[card.axis === "Y" ? "min-width" : "min-height"]: "100%"
	}} >
		{card.template ? card.template : "Slide #" + cardIndex}	
	</div>
}
