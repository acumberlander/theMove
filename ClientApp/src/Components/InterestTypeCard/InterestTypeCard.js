import React, { Component } from 'react'
import BackendRequests from '../../Helpers/Data/BackendRequests/BackendRequests';
import {
	Modal,
	ModalBody,
	ModalFooter,
} from 'reactstrap';
// import star from '../../img/star-24.png';
// import halfStar from '../../img/star-half-48.png';
import ApiKeys from '../../Helpers/Data/apiKeys';
import './InterestTypeCard.scss';

export default class InterestTypeCard extends Component {
	state = {
		modalOpen: false,
		selectedItems: [],
		locationToAdd: {}
	}
	
	componentDidMount() {
		const location = {...this.props.item};
		const itineraryId = this.props.itineraryId;
		const interestTypeId = this.props.interestTypeId;
		const lat = location.geometry.location.lat
		const lng = location.geometry.location.lng

		const myLocation = {
			Latitude: lat,
			Longitude: lng,
			UserId: 1,
			ItineraryId: itineraryId,
			InterestTypeId: interestTypeId,
			LocationName: location.name,
			Address: location.formatted_address,
			Rating: location.rating,
			Price: location.price_level,
			Photo_Ref: location.photos[0].photo_reference,
			Html_Attr: location.photos[0].html_attributions[0],
		}
		this.setState({locationToAdd: myLocation});
	}

	openModal = () => {
		this.setState({ modalOpen: true })
	  }

	closeModal = () => {
		this.setState({ modalOpen: false })
	}

	saveLocation = () => {
		const newlocationToSave = {...this.state.locationToAdd};
		BackendRequests.addNewLocation(newlocationToSave)
		this.closeModal();
	}

	
	// buildRating = (rating) => {
	// 	let fullStars = Math.floor(rating);
	// 	let imgArray = new Array(fullStars);
	// 	let difference = rating - fullStars;

	// 	for(let i=0;i<imgArray.length;i++) {
	// 		imgArray.push(`<img src={${star}} alt=""></img>`)
	// 	}
	// 	if (difference >= 5) {
	// 		imgArray.push(`<img src={${halfStar}} alt=""></img>`)
	// 	}
	// 	return {...imgArray}
	// }

	render() {
		const { item } = this.props;
		const photoRef = item.photos[0].photo_reference;
		const apiKey = ApiKeys.data.apiKey;
		const { modalOpen } =this.state;
		const $ = '$';
		const buildPrice = (priceLevel) => {
			if (priceLevel < 1 || null) {
				return "Price info unavailable"
			} else {
				return $.repeat(priceLevel);
			}
		}
		
		return (
			<div className="cardContainer" onClick={this.openModal}>
				<div>
					<Modal className="confirmModal"
						isOpen={modalOpen}
					>
						<ModalBody className="addLocationModalBody">
							<p>Add location to your itinerary?</p>
						</ModalBody>
						<ModalFooter>
							<div className="confirmButtonsDiv">
								<button className="confirmButton" onClick={this.saveLocation}>Yes</button>
								<button className="cancelButton" onClick={this.closeModal}>Cancel</button>
							</div>
						</ModalFooter>
					</Modal>
				</div>
				<img className="interestCardImg col-4" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoRef}&key=${apiKey}`} alt="interest type item"></img>
				<div className="col-8">
					<div className="interestCardHeader">
						<h3 className="">{item.name}</h3>
					</div>
					<hr className="lineBreak"></hr>
					<div className="row detailsDiv">
						<div className="addressAndCost">
							<h5 className="subHeader">Address</h5>
							<p className="">{item.formatted_address}</p>
							<h5 className="subHeader">Cost Range</h5>
							<p className="">{buildPrice(item.price_level)}</p>
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
