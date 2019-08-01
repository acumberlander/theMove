import React, { Component } from 'react'
import InterestTypeCard from '../../InterestTypeCard/InterestTypeCard';
import EventsRequests from '../../../Helpers/Data/GoogleRequests/EventsRequests';
import { Link } from 'react-router-dom';
import BackArrow from '../../../img/backArrow.png';
import './Events.scss';

export default class Events extends Component {
    state = {
        events: []
    }

    
    // function that gets events in Nashville area and stores them into state
    getNashvilleEvents = () => {
        EventsRequests.getEventsInNashville()
            .then((results) => {
                this.setState({ events: results })
                console.log(results);
            }
        )
    }

    // funcation that runs the getNashvilleEvents function on page load
    componentDidMount(){
        this.getNashvilleEvents();
    }

    render() {
        const { events } = this.state;

        const eventItemComponents = events.map( item => (
            <InterestTypeCard
                item={item}
                key={item.id}
            />));

        return (
            <div>
                <div className="interestContainer">
                        <div className="row">
                            <div className="arrowDiv col-4">
                                <Link to="/thingstodo">
                                    <img className="backArrow" src={BackArrow} alt="back"></img>
                                </Link>
                            </div>
                            <div className="interestHeaderDiv col-8">
                                <h1>Events</h1>
                            </div>
                        </div>
                    <div className="interestTypeContainer">
                        {eventItemComponents}
                    </div>
                </div>
            </div>
        )
    }
}
