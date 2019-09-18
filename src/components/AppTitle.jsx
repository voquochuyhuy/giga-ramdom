import React from 'react';

import '../App.css';

// Default App Title Image
import defaultTitle from '../img/title.png'

export default function AppTitle(props) {
	const appTitle = props.image? props.image : defaultTitle
	// Center App Title Image
	return (
		<img
			className="AppTitle"
			src={appTitle}
			style={{ height: "200px" }}
			loop="infinite"
			alt="app-title"
		/>
	)
}