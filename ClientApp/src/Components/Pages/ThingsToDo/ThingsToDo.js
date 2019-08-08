import React, { Component } from 'react'
import './ThingsToDo.scss';
import { Link } from 'react-router-dom';
import BackendRequests from '../../../Helpers/Data/BackendRequests/BackendRequests';
import foodAndDrink from '../../../img/food-and-drink-icon.png';
import attractions from '../../../img/attractions-icon.png';
import entertainment from '../../../img/entertainment-icon.png';
import leisure from '../../../img/leisure-icon.png';
import nightLife from '../../../img/night-life-icon.png';

export default class ThingsToDo extends Component {

    
    getLocationId = () => {
        BackendRequests.getSingleLocation(this.locationNum)
        .then((results) => {
            let location = results.data[0];
            this.locationId = location.id;
            return this.locationId;
        })
    }
    
    
    render() {
        const itineraryId = this.props.match.params.itineraryId;
        const locationId = this.props.location.locationId;
        // const locationId = locationNum;

        return (
            <div className="interestSquareContainer">
                <Link to={{
                    pathname: `/foodanddrink`,
                    itineraryId: itineraryId,
                    location: locationId,
                }}
                >
                    <div className="interestSquare">
                        <img className="interestIcon" src={foodAndDrink} alt="food and drink"></img>
                        <div className="interestTitle">
                            <h3>Food and Drink</h3>
                        </div>
                    </div>
                </Link>
                {/* <Link to={{
                    pathname: "/attractions",
                    itineraryId: itineraryId,
                    locationId: locationId
                }}
                >
                    <div className="interestSquare">
                        <img className="interestIcon" src={attractions} alt="attractions"></img>
                        <div className="interestTitle">
                            <h3>Attractions</h3>
                        </div>
                    </div>
                </Link> */}
                <Link to={{
                    pathname: "/entertainment",
                    itineraryId: itineraryId,
                    locationId: locationId
                }}
                >
                    <div className="interestSquare">
                        <img className="interestIcon" src={entertainment} alt="entertainment"></img>
                        <div className="interestTitle">
                            <h3>Entertainment</h3>
                        </div>
                    </div>
                </Link>
                <Link to={{
                    pathname: "/nightlife",
                    itineraryId: itineraryId,
                    locationId: locationId
                }}
                >
                    <div className="interestSquare">
                        <img className="interestIcon" src={nightLife} alt="night life"></img>
                        <div className="interestTitle">
                            <h3>Night Life</h3>
                        </div>
                    </div>
                </Link>
                <Link to={{
                    pathname: "/leisure",
                    itineraryId: itineraryId,
                    locationId: locationId
                }}
                >
                    <div className="interestSquare">
                        <img className="interestIcon" src={leisure} alt="leisure"></img>
                        <div className="interestTitle">
                            <h3>Leisure</h3>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}
