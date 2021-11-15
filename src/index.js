import React from 'react'
import styles from './styles.module.css'
import Feed from './Feed/Feed.js'

export const ExampleComponent = ({ text }) => {
	return <div>
		Ex Comp: {text}
		<Feed/>
	</div>
}
