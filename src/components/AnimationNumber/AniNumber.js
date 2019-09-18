import React from 'react';
// import ReactDOM from 'react-dom';

import '../../App.css';
import square from '../../img2/xanh.png';
import AnimatedNumber from 'react-animated-number';

// const getRandomInt = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);

export default function AniNumber(props){
		return (
			<div className="container">
				<img src={square} alt="box-bg"></img>

				<div className="centered">
					<AnimatedNumber
						style={{
							transition: '0.8s ease-out',
							transitionProperty:
								'background-color, color, opacity',
							fontSize: "calc(52px + 2vmin)",
							fontFamily: "Roboto",
							color:"white",
							fontWeight:"bolder",
							
						}}
						frameStyle={perc => (
							perc === 100 ? {} : { backgroundColor: 'transparent', }
						)}
						stepPrecision={0}
						value={props.value}
						duration={props.duration}
						formatValue={n => ` ${n} `} />
				</div>
			</div>
		)
}