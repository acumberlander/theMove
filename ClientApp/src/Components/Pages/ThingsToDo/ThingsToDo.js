import React, { Component } from 'react'
import './ThingsToDo.scss';
import { Link } from 'react-router-dom';
import foodAndDrink from '../../../img/food-and-drink-icon.png';
import attractions from '../../../img/attractions-icon.png';
import entertainment from '../../../img/entertainment-icon.png';
import leisure from '../../../img/leisure-icon.png';
import nightLife from '../../../img/night-life-icon.png';
import events from '../../../img/events-icon.png';

export default class ThingsToDo extends Component {
    render() {
        return (
            <div className="interestSquareContainer">
                <Link to="/foodanddrink">
                    <div className="interestSquare">
                        <img className="interestIcon" src={foodAndDrink} alt="food and drink"></img>
                        <div className="interestTitle">
                            <h3>Food and Drink</h3>
                        </div>
                    </div>
                </Link>
                <Link to="/events">
                    <div className="interestSquare">
                        <img className="interestIcon" src={events} alt="events"></img>
                        <div className="interestTitle">
                            <h3>Events</h3>
                        </div>
                    </div>
                </Link>
                <Link to="/attractions">
                    <div className="interestSquare">
                        <img className="interestIcon" src={attractions} alt="attractions"></img>
                        <div className="interestTitle">
                            <h3>Attractions</h3>
                        </div>
                    </div>
                </Link>
                <Link to="/entertainment">
                    <div className="interestSquare">
                        <img className="interestIcon" src={entertainment} alt="entertainment"></img>
                        <div className="interestTitle">
                            <h3>Entertainment</h3>
                        </div>
                    </div>
                </Link>
                <Link to="/nightlife">
                    <div className="interestSquare">
                        <img className="interestIcon" src={nightLife} alt="night life"></img>
                        <div className="interestTitle">
                            <h3>Night Life</h3>
                        </div>
                    </div>
                </Link>
                <Link to="/leisure">
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
