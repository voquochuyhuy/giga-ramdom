import React from 'react';

import '../App.css';

export default function CustomerLogo(props) {
	// Top Left Corner Logo
	return (
		<img
			className="CustomerLogo"
			src={props.logo}
			style={{
				position: "absolute",
				top: "2%",
				left: "2%",
				width: "5%"
			}}
			alt={props.name}
		/>
	)
}