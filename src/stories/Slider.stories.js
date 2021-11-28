import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { Slider } from '..';
import './optional-styles.css'
const stories = storiesOf("Slider", module);
stories.add("Projects", ()=>{
	const [ projects, setProjects ] = useState([]);
	const [ direction, setDirection ] = useState("Y");
	const getData = async ( lookFor, params ) =>{
		params = params || {};
		params["per_page"] = params.perPage || "100";
		let url = new URL(("https://wp.malikdunston.com/wp-json/wp/v2/" + lookFor));
		url.search = new URLSearchParams(params).toString();
		return  await fetch(url).then(resp => resp.json());
	}
	const getProjects = async type => {
		let projects = await getData(type);
		let parentProjs = projects.filter(proj => proj.parent === 0);
		projects = parentProjs.map(proj => {
			if(proj.parent === 0){
				proj.projChildren = projects.filter(p => p.parent === proj.id);
				return proj;
			}
		})
		projects.shift();
		setProjects( projects );
	}
	useEffect(() => { getProjects("projects") }, []);
	return App(projects, direction)
})
function App(projects, direction){
	const template = (proj, index) => proj ? <div style={{position: "relative", width: "100%", height: "100%"}}>
		<img className="card-img"
			src={proj.acf.cover} 
			alt={proj.title.rendered}
			style={{ objectFit:"cover", width:"100%", height:"100%", position:"absolute" }} />
		<div className="card-content" style={{
			bottom:"0",
			width:"100%",
			position:"absolute",
			background: "rgba(0, 0, 0, .5)",
			color: "white"
		}}>
			<h1 dangerouslySetInnerHTML={{__html: proj.title.rendered}}></h1>
			<a href={"/work/"+proj.slug} target="_blank" className={"button"}> View </a>
		</div>
	</div> : "Slide/Card #" + index
	const breadcrumbs = proj => <img src={proj.acf.cover} alt="" />
	window.addEventListener("resize", (e)=>{
		if(e.innerWidth > 1000){
			direction = "X"
		}else direction = "Y"
	})
	return <div>
		{/* <Slider slides={projects} template={template}/> */}
		<Slider slides={projects}
			axis={direction}
			template={template}
			breadcrumbs={breadcrumbs}
			mouseEffect={true}
			controls={true}/>
		<Slider slides={projects}
			axis={direction}
			template={template}
			breadcrumbs={breadcrumbs}
			controls={true}/>
		{/* <Slider slides={projects}
			template={template}
			breadcrumbs={true}/> */}
	</div>
}