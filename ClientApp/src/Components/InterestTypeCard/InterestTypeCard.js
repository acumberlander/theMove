import React, { Component } from 'react'
import BackendRequests from '../../Helpers/Data/BackendRequests/BackendRequests';
import {
	Modal,
	ModalBody,
	ModalFooter,
} from 'reactstrap';
import { Redirect } from 'react-router';
import ApiKeys from '../../Helpers/Data/apiKeys';
import defaultPhoto from '../../img/no-image-slide.webp';
import './InterestTypeCard.scss';

export default class InterestTypeCard extends Component {
	state = {
		modalOpen: false,
		isUpdatingLocation: false,
		locationToAdd: {}
	}
	
	componentDidMount() {
		const { locationId } = this.props;
		console.log(`Location: ${locationId}`)
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
		}
		if (location.photos === undefined) {
			myLocation.Photo_Ref = defaultPhoto;
			// myLocation.Html_Attr = defaultPhoto;
		} else {
			myLocation.Photo_Ref = location.photos[0].photo_reference;
			// myLocation.Html_Attr = location.photos[0].html_attributions[0];
		}
		this.setState({locationToAdd: myLocation});
		
		if (locationId != undefined) {
			this.setState({ isUpdatingLocation: true })
		}
	}

	openModal = () => {
		this.setState({ modalOpen: true })
	  }

	closeModal = () => {
		this.setState({ modalOpen: false })
	}

	saveLocation = () => {
		const newlocationToSave = {...this.state.locationToAdd};
		BackendRequests.addNewLocation(newlocationToSave);
		this.closeModal();
	}

	backToItineraryView = () => {
		const itineraryId = this.props.itineraryId;
		return(
			<Redirect to={`/itineraryLocations/${itineraryId}`} />
		)
	}
	
	updateLocation = (idParam) => {
		const newlocationToSave = {...this.state.locationToAdd};
		const { locationId } = this.props;
		idParam = locationId;
		newlocationToSave.id = idParam;
		BackendRequests.updateLocation(newlocationToSave)
		// .then((res) => {
		// 	this.closeModal();
		// 	this.backToItineraryView();
		// });
		this.setState({ isUpdatingLocation: false });
	}

	render() {
		const { isUpdatingLocation } = this.state;
		const { item } = this.props;

		let photoRef;
		if (item.photos === undefined) {
			photoRef = defaultPhoto;
		} else {
			photoRef = item.photos[0].photo_reference;
		}

		const apiKey = ApiKeys.data.apiKey;
		const { modalOpen } =this.state;
		const $ = '$';
		const buildPrice = (priceLevel) => {
			if (priceLevel < 1 ) {
				return "Price info unavailable"
			} else {
				return $.repeat(priceLevel);
			}
		}
		const buildModal = () => {
			if (isUpdatingLocation) {
				return(
					<div>
					<Modal className="confirmModal"
						isOpen={modalOpen}
					>
						<ModalBody className="addLocationModalBody">
							<p>Update your location?</p>
						</ModalBody>
						<ModalFooter>
							<div className="confirmButtonsDiv">
								<button className="confirmButton" onClick={this.updateLocation}>Yes</button>
								<button className="cancelButton" onClick={this.closeModal}>Cancel</button>
							</div>
						</ModalFooter>
					</Modal>
				</div>
				)
			} else {
				return(
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
				)
			}
		}
		return (
			<div className="cardContainer" onClick={this.openModal}>
				{buildModal()}
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
							{/* <h5 className="subHeader">Time to Distance</h5>
							<p className="">10 mins</p> */}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
