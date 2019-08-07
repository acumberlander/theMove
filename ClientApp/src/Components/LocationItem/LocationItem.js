import React, { Component } from 'react'
import BackendRequests from '../../Helpers/Data/BackendRequests/BackendRequests';
import ApiKeys from '../../Helpers/Data/apiKeys';
import pencil from '../../img/edit-2-24.png';
import trash from '../../img/trash-2-24.png';
import { Link } from 'react-router-dom';
import './LocationItem.scss';

export default class InterestTypeCard extends Component {
	state = {
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

	render() {
		const { item } = this.props;
		const photoRef = item.photos[0].photo_reference;
		const itineraryId = this.props.itineraryId;
		const apiKey = ApiKeys.data.apiKey;
		const $ = '$';
		const buildPrice = (priceLevel) => {
			if (priceLevel < 1 ) {
				return "Price info unavailable"
			} else {
				return $.repeat(priceLevel);
			}
		}
		
		const deleteLocation = (locationId) => {
			locationId = item.id;
			BackendRequests.deleteLocation(locationId)
		}

		return (
			<div className="locationItemDiv">
				<div className="deleteAndEditDiv">
					<button onClick={deleteLocation} className="deleteLocationButton">
						<img src={trash} alt="delete"></img>
					</button>
					<Link to={{
						pathname: "/thingstodo/",
						itineraryId: itineraryId,
						locationId: item.id
						}}>
						<button className="editLocationButton">
							<img src={pencil} alt="edit"></img>
						</button>
					</Link>
				</div>
				<div className="cardContainer2">
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
								<p className="">{buildPrice(item.price)}</p>
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
			</div>
		)
	}
}
