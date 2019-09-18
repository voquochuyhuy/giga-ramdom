import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default class PrizeList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			 giftTopic :"Chọn giải thưởng"
		}
	}

	handleSelectItem() {

	}

	render() {
		return (
			<DropdownButton
				id="dropdown-basic-button"
				title={this.state.giftTopic}
				variant="success"
				style={{position:"absolute",top:"52%",left:"46%",width:"163px"}}
			>
	
				{this.props.numberOfPrizes.map(prize=>{
					let array = [];
					let info = prize.info;
					if(prize.id === 1)
					{
						
						for(let i=0;i<prize.quantity;i++)
						{
							
							array.push(
								<Dropdown.Item
									style={{color:"white",backgroundColor:"green"}}
									onClick={() => {
										localStorage.setItem("prize","1");
										this.props.changePrizeInfo(info);
										this.setState({giftTopic:"Giải đặc biệt"});
									}}>
										Giải đặc biệt
								</Dropdown.Item>);
						}
						return <div>{array}</div>
					}
					else if(prize.id === 2)
					{
						
						for(let i=0;i<prize.quantity;i++)
						{
							
							array.push(
								<Dropdown.Item
									style={{color:"white",backgroundColor:"green"}}
									onClick={() => {
										localStorage.setItem("prize","2");
										this.props.changePrizeInfo(info);
										this.setState({giftTopic:"Giải khuyến khích 1"});
									}}>
										Giải khuyến khích 1
								</Dropdown.Item>);
						}
						return <div>{array}</div>
					}
					else if(prize.id === 3)
					{
						
						for(let i=0;i<prize.quantity;i++)
						{
							array.push(
								<Dropdown.Item				
									style={{color:"white",backgroundColor:"green"}}
									onClick={() => {
										localStorage.setItem("prize","3");
										this.props.changePrizeInfo(info);
										this.setState({giftTopic:"Giải khuyến khích 2"});
									}}>
									Giải khuyến khích 2
								</Dropdown.Item>);
						}
						return <div>{array}</div>
					}
				})}

			</DropdownButton>
		);
	}
}
