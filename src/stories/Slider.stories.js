import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { Slider } from '..';
import './optional-styles.css'
const stories = storiesOf("Slider", module);
stories.add("Projects", ()=>{
	const [ projects, setProjects ] = useState([]);
	const getData = async ( lookFor, params ) =>{
		params = params || {};
		params["per_page"] = params.perPage || "100";
		let url = new URL(("https://wp.malikdunston.com/wp-json/wp/v2/" + lookFor));
		url.search = new URLSearchParams(params).toString();
		return  await fetch(url).then(resp => resp.json());
	}
	const getProjects = async () => {
		let projects = await getData("graphic-design");
		let parentProjs = projects.filter(proj => proj.parent === 0);
		projects = parentProjs.map(proj => {
			if(proj.parent === 0){
				proj.projChildren = projects.filter(p => p.parent === proj.id);
				console.log("projchildren", proj.projChildren);
				return proj;
			}
		})
		setProjects( projects );
	}
	const template = card => <div style={{position: "relative", width: "100%", height: "100%"}}>
		{card ? <img src={card.acf.cover} 
			alt={card.title.rendered}
			style={{ objectFit:"cover", width:"100%", height:"100%", position:"absolute" }} /> : ""}
		<div className="card-content" style={{
			bottom:"0",
			width:"100%",
			position:"absolute",
			background: "rgba(0, 0, 0, .5)",
			color: "white"
		}}>
			<h1 dangerouslySetInnerHTML={{__html: card.title.rendered}}></h1>
			<a href={"/work/"+card.slug} target="_blank" className={"button"}> View </a>
		</div>
	</div>
	useEffect(() => { getProjects() }, []);
	return <div>
		<Slider cards={projects}
			template={template}
			controls={true}
			size={66.66}/>
	</div>
})
