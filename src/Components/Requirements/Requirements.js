import { useState, useEffect } from 'react';

export const Requirements = ({ foo }) => {
	const [x, setX] = useState(3)
	useEffect(()=>{
		setX(x + 1)
		alert(x + ": " + foo.that);
	}, [])
	return <button>Hello World {x + ": " + foo.that}</button>
}