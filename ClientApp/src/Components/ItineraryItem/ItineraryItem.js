import React, { Component } from 'react'
import ApiKey from '../../Helpers/Data/apiKeys';
import noImage from '../../img/no-image-slide.webp';
import pencil from '../../img/edit-2-24.png';
import trash from '../../img/trash-2-24.png';
import './ItineraryItem.scss';


export default class ItineraryItem extends Component {
	
	render() {
		const itineraryId = this.props.itinerary.id;
		const itineraryName = this.props.itinerary.itineraryName;
		const photoRef = this.props.itinerary.locations[0].photo_ref;
		const apiKey = ApiKey.data.apiKey;
		const $ = '$';

		
		const itineraryNameBuilder = () => {
			if (itineraryName != "") {
				return itineraryName;
			} else {
				return "Itinerary";
			}
		}

		const locations = this.props.itinerary.locations;
		
		const imageBuilder = () => {
			for (let i=0; i<locations.length; i++) {
				if (locations[i].photo_ref === "") {
					continue;
				} else {
					return <img className="itineraryImg" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoRef}&key=${apiKey}`} alt="location image"></img>
				}
			}
			if (photoRef === "") {
				return <img className="itineraryImg" src={noImage} alt="default image"></img>
			}
		}

		const priceBuilder = () => {
			let places = locations.length;
			let totalCost= 0;
			for (let i=0; i<locations.length; i++) {
				totalCost += locations[i].price
			}
			let avg = Math.ceil((totalCost/places));
			
			return $.repeat(avg);
		}

		const deleteItinerary = (e) => {
			e.preventDefault();
			const { deleteItinerary } = this.props;
			deleteItinerary(itineraryId);
		}

		return (
			<div className="itineraryItemDiv">
				<div className="deleteAndEditDiv">
					<button onClick={deleteItinerary} className="deleteItineraryButton">
						<img src={trash} alt="delete"></img>
					</button>
					<button className="editItineraryButton">
						<img src={pencil} alt="edit"></img>
					</button>
				</div>
                <div className="itineraryItemContainer">
					<div className="itineraryHeaderDiv">
						<h1>{itineraryNameBuilder()}</h1>
					</div>
					<div className="itineraryImgDiv">
						{/* {imageBuilder()} */}
					</div>
                </div>
				<div className="sideInfo">
					<div>
						<h4>Overall Distance</h4>
						<p>4.3 miles</p>
					</div>
					<div>
						<h4>Price Range</h4>
						<p>{priceBuilder()}</p>
					</div>
				</div>
            </div>
		)
	}
}
