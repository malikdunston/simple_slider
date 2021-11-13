import React from 'react';
export default function Card({ card, currentIndex  }) {
	return <div className={ "card" + (card.index === currentIndex ? " selected" : "") }style={{
		[card.axis === "Y" ? "min-height" : "min-width"]: card.cardSize,
		[card.axis === "Y" ? "min-width" : "min-height"]: "100%"
	}} >
		{card.template}
	</div>
}