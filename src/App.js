import React from 'react'
import Slider from './Components/Slider/Slider';
export default function App() {
	const pets = {
		dogs: [
			{
				img: "./assets/img/doberman.jpg",
				content: {
					title: "Doberman Pinscer",
					content: "A lovely breed, indeed"
				}
			},
			{
				img: "./assets/img/husky.jpg",
				content: {
					title: "Siberian Husky",
					content: "A lovely breed, indeed"
				}
			},
			{
				img: "./assets/img/pitbull.jpg",
				content: {
					title: "American Pit Bull Terrier",
					content: "A lovely breed, indeed"
				}
			},
		],
		cats: [
			{
				img: "./assets/img/siamese.jpg",
				content: {
					title: "One",
					// content: "A lovely breed, indeed"
				}
			},
			{
				img: "./assets/img/bengal.jpg",
				content: {
					title: "Two",
					// content: "A lovely breed, indeed"
				}
			},
			{
				img: "./assets/img/persian.jpg",
				content: {
					title: "Three",
					// content: "A lovely breed, indeed"
				}
			}
		],
		sample: [
			{
				img: "./assets/img/siamese.jpg",
				content: {
					title: "1/3",
				}
			},
			{
				img: "./assets/img/bengal.jpg",
				content: {
					title: "2/3",
				}
			},
			{
				img: "./assets/img/persian.jpg",
				content: {
					title: "3/3",
				}
			}
		]
	}
	return <div className="App">
	{/* with defaults... */}
		<Slider slides={pets.dogs} id={"b"} height={500} controls={true} />
		{/* <Slider slides={pets.dogs} id={"a"} direction={"prev"} height={200} controls={true} /> */}
	{/* with all possible settings  */}
		{/* <Slider slides={pets.cats} // 10/27
			axis="Y" // 10/27
			direction={"prev"} // 10/27
			index={3} // 10/27
			height={200} // --- bug
			/> */}
	</div>
}