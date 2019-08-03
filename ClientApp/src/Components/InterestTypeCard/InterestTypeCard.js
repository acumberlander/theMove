import React, { Component } from 'react'
import {
	Modal,
	ModalBody,
	ModalFooter,
} from 'reactstrap';
import ApiKeys from '../../Helpers/Data/apiKeys';
import './InterestTypeCard.scss';

export default class InterestTypeCard extends Component {
	state = {
		modalOpen: false,
		selectedItems: []
	}
	
	componentDidUpdate() {

	}

	openModal = (e) => {
		e.preventDefault();
		console.log(e.target);
		this.setState({ modalOpen: true })
	  }

	closeModal() {
		this.setState({ modalOpen: false })
	}

	
	render() {
		const { item } = this.props;
		const addLocationToState = (e) => {
			
		}
		const photoRef = item.photos[0].photo_reference;
		const apiKey = ApiKeys.data.apiKey;
		const { modalOpen } =this.state;
		// const htmlAttribute = item.photos[0].html_attributions[0];
		// const { toggle } = this.props;
		
		return (
			<div className="cardContainer" onClick={()=>this.openModal()}>
				<div>
					<Modal className="confirmModal"
						isOpen={modalOpen}
					>
						<ModalBody className="addLocationModalBody">
							<p>Add location to your itinerary?</p>
						</ModalBody>
						<ModalFooter>
							<div className="confirmButtonsDiv">
								<button className="confirmButton" /*onClick={}*/>Yes</button>
								<button className="cancelButton" onClick={()=>this.closeModal()}>Cancel</button>
							</div>
						</ModalFooter>
					</Modal>
				</div>
				<img className="interestCardImg col-4" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoRef}&key=${apiKey}`} alt="interest type item"></img>
				{/* {htmlAttribute} */}
				<div className="col-8">
					<div className="interestCardHeader">
						<h3 className="">{item.name}</h3>
					</div>
					<hr className="lineBreak"></hr>
					<div className="row detailsDiv">
						<div className="addressAndCost">
							<h5 className="subHeader">Address</h5>
							<p className="">{item.formatted_address}</p>
							{/* <p className="">Nashville, TN 37220</p> */}
							<h5 className="subHeader">Cost Range</h5>
							<p className="">{item.price_level}</p>
						</div>
						<div className="distanceAndTime">
							<h5 className="subHeader">Rating</h5>
							<p className="">{item.rating}</p>
							<h5 className="subHeader">Time to Distance</h5>
							<p className="">10 mins</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
