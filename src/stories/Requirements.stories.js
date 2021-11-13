import React from 'react';
import { storiesOf } from '@storybook/react';
import './assets/optional-styles.css';
import { Requirements } from '../Components/Requirements';

const stories = storiesOf('App Test', module);
// npm run storybook...
stories.add("App", ()=>{
	const pets = {
		dogs: [
			{
				img: "/public/img/doberman.jpg",
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
	const template = (obj) => {
		return <div>
			<img src={"/public/img/doberman.jpg"} 
				alt={obj.content.content}
				style={{ objectFit:"cover", width:"100%", height:"100%", position:"absolute" }} /> : ""}
			<div className="slider-content" style={{
				bottom:"0",
				width:"100%",
				position:"absolute",
				background: "rgba(0, 0, 0, .5)",
				color: "white"
			}}>
				<h2>{obj.content.title}</h2>
				<p>{obj.content.content}</p>
			</div>			
		</div>
	}
	return <div className="App">
	{/* testing... */}
		<Requirements template={template} slides={pets.dogs} axis={"Y"} height={300} controls={["index", "arrows"]} transition={100} startAt={3}/>
	{/* default... */}
		<Requirements template={template} slides={pets.dogs}/>
	{/* all settings custom...  */}
		<Requirements template={template} slides={[ ...pets.cats, ...pets.dogs ]}
			axis="Y"
			height={250}
			width={250}
			transition={200}
			controls={["index"]}
			startAt={2}/>
	</div>
}) 