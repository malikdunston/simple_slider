import Slider from './Components/Slider/Slider';

export default function App() {
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