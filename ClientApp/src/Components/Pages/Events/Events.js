import React, { Component } from 'react'
import EventsRequests from '../../../Helpers/Data/GoogleRequests/EventsRequests';

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

    componentDidMount(){
        getNashvilleEvents();
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
                    <h1>Events</h1>
                    <div className="interestTypeContainer">
                        {eventItemComponents}
                    </div>
                </div>
            </div>
        )
    }
}
