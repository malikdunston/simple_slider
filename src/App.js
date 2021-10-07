import React, { useState } from 'react'
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
					title: "Siamese",
					content: "A lovely breed, indeed"
				}
			},
			{
				img: "./assets/img/bengal.jpg",
				content: {
					title: "Bengal",
					content: "A lovely breed, indeed"
				}
			},
			{
				img: "./assets/img/persian.jpg",
				content: {
					title: "Persian",
					content: "A lovely breed, indeed"
				}
			}
		]
	}
	const ZiratsuData = [
		{
			id: 1,
			title: "Lorem ipsum",
			subTitle: "Lorem"
		},
		{
			id: 2,
			title: "Lorem ipsum",
			subTitle: "Lorem"
		},
		{
			id: 3,
			title: "Lorem ipsum",
			subTitle: "Lorem"
		}
	];
	return <div className="App">
		<Slider dataSlider={ZiratsuData}/>
	</div>
}