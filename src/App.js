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
					content: "A lovely breed, indeed"
				}
			},
			{
				img: "./assets/img/bengal.jpg",
				content: {
					title: "Two",
					content: "A lovely breed, indeed"
				}
			},
			{
				img: "./assets/img/persian.jpg",
				content: {
					title: "Three",
					content: "A lovely breed, indeed"
				}
			}
		]
	}
	return <div className="App">
	{/* testing... */}
		<Slider slides={pets.dogs} axis={"Y"} height={300} controls={["index", "arrows"]} transition={100} startAt={3}/>
	{/* default... */}
		<Slider slides={pets.dogs}/>
	{/* all settings custom...  */}
		<Slider slides={[ ...pets.cats, ...pets.dogs ]}
			axis="Y"
			height={250}
			width={250}
			transition={200}
			controls={["index"]}
			startAt={2}/>
	</div>
}