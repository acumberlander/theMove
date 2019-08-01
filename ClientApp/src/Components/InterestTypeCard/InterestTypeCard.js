import React, { Component } from 'react'
import ApiKeys from '../../Helpers/Data/apiKeys';
import './InterestTypeCard.scss';

export default class InterestTypeCard extends Component {
	render() {
		const { item } = this.props;
		const photoRef = item.photos[0].photo_reference;
		const apiKey = ApiKeys.data.apiKey;
		const htmlAttribute = item.photos[0].html_attributions[0];

		return (
			<div className="cardContainer">
				<img className="interestCardImg col-4" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoRef}&key=${apiKey}`} alt="interest type item"></img>
				{/* {htmlAttribute} */}
				<div className="col-8">
					<div className="interestCardHeader">
						<h3 className="">{item.name}</h3>
					</div>
					<hr className="lineBreak"></hr>
					<div className="row">
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
